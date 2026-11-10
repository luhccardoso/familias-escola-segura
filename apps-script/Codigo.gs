/**
 * Famílias por uma Escola Segura — servidor da pesquisa anônima
 *
 * Cole este código no Apps Script da planilha (Extensões > Apps Script)
 * e publique como "App da Web". Instruções completas: apps-script/LEIA-ME.md
 *
 * O que faz:
 *  - POST: recebe uma resposta da pesquisa e grava uma linha na aba "Respostas".
 *  - GET: devolve os resultados agregados (só os totais; nunca as respostas individuais).
 *
 * Privacidade: não grava nome, e-mail, telefone, turma nem endereço de internet (IP).
 * Grava só a data (sem hora), as alternativas escolhidas, o tipo de aparelho e o sistema.
 */

var MINIMO = 30;            // respostas necessárias para liberar os gráficos de cada pesquisa
var LIMITE_POR_HORA = 400;  // proteção contra envios automáticos em massa
var ABA = 'Respostas';

/* Perguntas e alternativas válidas (iguais às de assets/pesquisa.js) */
var DEF = {"aluno":{"segmento":{"tipo":"unica","opcoes":["f1","f2","em"]},"seguro":{"tipo":"escala5","opcoes":["1","2","3","4","5"]},"viu":{"tipo":"unica","opcoes":["nunca","as_vezes","muitas"]},"comigo":{"tipo":"unica","opcoes":["nunca","ja","agora"]},"onde":{"tipo":"varias","opcoes":["sala","intervalo","entrada_saida","internet"]},"contou":{"tipo":"unica","opcoes":["nao","sim_mudou","sim_nada"]},"melhorar":{"tipo":"varias","opcoes":["professores","jeito_seguro","conversas","regras"]}},"responsavel":{"segmento":{"tipo":"varias","opcoes":["f1","f2","em"]},"viveu":{"tipo":"unica","opcoes":["nao","nao_sei","presenciou","viveu"]},"avisou":{"tipo":"unica","opcoes":["nao","sim_retorno","sim_sem"]},"canais":{"tipo":"unica","opcoes":["sim","nao"]},"confianca":{"tipo":"escala0a10","opcoes":["0","1","2","3","4","5","6","7","8","9","10"]},"medo":{"tipo":"unica","opcoes":["nunca","as_vezes","frequencia"]}}};

function doGet() {
  var cache = CacheService.getScriptCache();
  var guardado = cache.get('resultados');
  var resultados = guardado ? JSON.parse(guardado) : calcularResultados_();
  if (!guardado) cache.put('resultados', JSON.stringify(resultados), 300);
  return json_({ site: {}, resultados: resultados });
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.site) return json_({ ok: true });                     // armadilha para robôs
    var versao = d.versao;
    if (!DEF[versao]) return json_({ ok: false, erro: 'Pesquisa desconhecida.' });
    var resp = d.respostas || {};
    var limpo = {};
    Object.keys(DEF[versao]).forEach(function (id) {
      var q = DEF[versao][id], v = resp[id];
      if (v === undefined || v === null || v === '') return;
      if (q.tipo === 'varias') {
        if (!Array.isArray(v)) return;
        var ok = v.map(String).filter(function (x) { return q.opcoes.indexOf(x) >= 0; });
        if (ok.length) limpo[id] = ok;
      } else if (q.opcoes.indexOf(String(v)) >= 0) {
        limpo[id] = String(v);
      }
    });
    if (!Object.keys(limpo).length) return json_({ ok: false, erro: 'Nenhuma resposta válida.' });
    if (Number(d.duracao_seg) < 3) return json_({ ok: true });   // rápido demais: provavelmente robô

    var cache = CacheService.getScriptCache();
    var chave = 'envios_' + Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyyMMddHH');
    var n = Number(cache.get(chave) || 0);
    if (n >= LIMITE_POR_HORA) return json_({ ok: false, erro: 'Muitas respostas agora. Tente de novo mais tarde.' });
    cache.put(chave, String(n + 1), 3700);

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var aba = abaRespostas_();
      var linha = [
        Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM-dd'),
        versao,
        Math.min(Math.max(Math.round(Number(d.duracao_seg) || 0), 0), 86400),
        String(d.aparelho || '').slice(0, 20),
        String(d.sistema || '').slice(0, 20),
        JSON.stringify(limpo)
      ];
      aba.appendRow(linha);
    } finally {
      lock.releaseLock();
    }
    cache.remove('resultados');
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: 'Não foi possível gravar a resposta.' });
  }
}

function calcularResultados_() {
  var linhas = abaRespostas_().getDataRange().getValues().slice(1);
  var out = {};
  Object.keys(DEF).forEach(function (versao) {
    var lista = linhas.filter(function (l) { return l[1] === versao; }).map(function (l) {
      try { return JSON.parse(l[5]); } catch (e) { return null; }
    }).filter(Boolean);
    out[versao] = agregar_(DEF[versao], lista);
  });
  return out;
}

/* Totais por pergunta. Os gráficos só são liberados com MINIMO respostas, para ninguém ser identificado. */
function agregar_(def, lista) {
  var r = { total: lista.length, minimo: MINIMO, liberado: lista.length >= MINIMO, perguntas: {} };
  if (!r.liberado) return r;
  Object.keys(def).forEach(function (id) {
    var q = def[id], contagem = {}, base = 0;
    q.opcoes.forEach(function (o) { contagem[o] = 0; });
    lista.forEach(function (resp) {
      var v = resp[id];
      if (v === undefined) return;
      base++;
      (Array.isArray(v) ? v : [v]).forEach(function (x) { if (contagem[x] !== undefined) contagem[x]++; });
    });
    r.perguntas[id] = { base: base, contagem: contagem };
  });
  return r;
}

function abaRespostas_() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
    aba.appendRow(['data', 'pesquisa', 'duracao_seg', 'aparelho', 'sistema', 'respostas']);
    aba.setFrozenRows(1);
  }
  return aba;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* Rode esta função uma vez pelo editor para criar a aba e autorizar o script. */
function preparar() {
  abaRespostas_();
  Logger.log('Aba "' + ABA + '" pronta.');
}
