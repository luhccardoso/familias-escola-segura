/* Famílias por uma Escola Segura — interface do site (sem dependências) */
(function () {
  'use strict';

  var CFG = window.CONFIG || { api: '', padrao: {} };
  var T = window.TEXTOS;
  var app = document.getElementById('app');
  var SITUACOES = { previsto: 'Previsto', realizado: 'Realizado', andamento: 'Em andamento', pendente: 'Pendente', aguardando: 'Aguardando', respondido: 'Respondido', vencido: 'Vencido sem resposta' };
  var DADOS = { site: CFG.padrao.site, resultados: CFG.padrao.resultados, pesquisa: window.PESQUISA, situacoes: SITUACOES, url: location.origin + location.pathname };
  var temCache = false;
  try {
    var guardado = JSON.parse(window.localStorage.getItem('es_dados') || 'null');
    if (guardado && guardado.site && CFG.api) { DADOS.site = guardado.site; DADOS.resultados = guardado.resultados; temCache = true; }
  } catch (e) { /* sem armazenamento */ }
  var S = DADOS.site;
  var estado = { carregado: !CFG.api || temCache, falhou: false, demo: !CFG.api };
  var HOJE = (function () { try { return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date()); } catch (e) { return new Date().toISOString().slice(0, 10); } })();
  function sit(e) { return (e.situacao === 'aguardando' && e.data && e.data < HOJE) ? 'vencido' : (e.situacao || 'aguardando'); }

  /* Partes do site que mudam com a planilha: são redesenhadas quando os dados chegam */
  var slots = [];
  function slot(fn, sempre) {
    var box = el('div', { class: 'slot' });
    var item = { box: box, fn: fn, sempre: !!sempre };
    slots.push(item);
    desenharSlot(item);
    return box;
  }
  function desenharSlot(item) {
    item.box.innerHTML = '';
    add(item.box, (!estado.carregado && !item.sempre) ? el('div', { class: 'esqueleto', 'aria-busy': 'true' }, el('span'), el('span'), el('span'), el('p', { class: 'sr' }, 'Carregando atualizações…')) : item.fn());
    aplicarProgresso(item.box);
  }
  function redesenharSlots() {
    slots = slots.filter(function (i) { return i.box.isConnected; });
    slots.forEach(desenharSlot);
  }
  function carregar() {
    if (!CFG.api) return;
    var ctrl = window.AbortController ? new AbortController() : null;
    var tempo = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
    fetch(CFG.api, { method: 'GET', signal: ctrl ? ctrl.signal : undefined, cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        clearTimeout(tempo);
        if (!d || !d.site) throw new Error('dados');
        DADOS.site = d.site; DADOS.resultados = d.resultados; S = d.site;
        estado.carregado = true; estado.falhou = false;
        try { window.localStorage.setItem('es_dados', JSON.stringify({ site: d.site, resultados: d.resultados })); } catch (e) { /* ok */ }
        redesenharSlots();
      })
      .catch(function () {
        clearTimeout(tempo);
        estado.falhou = !temCache; estado.carregado = true;
        redesenharSlots();
      });
  }

  /* ---------------- utilidades ---------------- */
  function el(tag, attrs) {
    var n = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') n.className = v;
        else if (k === 'text') n.textContent = v;
        else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), v);
        else n.setAttribute(k, v === true ? '' : v);
      }
    }
    for (var i = 2; i < arguments.length; i++) add(n, arguments[i]);
    return n;
  }
  function add(n, c) {
    if (c === null || c === undefined || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(n, x); }); return; }
    n.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  }
  function paragrafos(txt, cls) {
    return String(txt || '').split(/\n\s*\n/).filter(Boolean).map(function (p) {
      var linhas = p.split('\n');
      var out = el('p', { class: cls || null });
      linhas.forEach(function (l, i) { if (i) out.appendChild(el('br')); out.appendChild(document.createTextNode(l)); });
      return out;
    });
  }
  function dataBR(iso) {
    if (!iso) return '';
    var m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? m[3] + '/' + m[2] + '/' + m[1] : iso;
  }
  function num(n) { return Number(n || 0).toLocaleString('pt-BR'); }
  function pct(n) { return (Math.round(n * 10) / 10).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + '%'; }
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* sem armazenamento */ } }
  };
  function fonte(txt) { return el('p', { class: 'fonte' }, 'Fonte: ' + txt); }
  function linkExterno(href, texto, cls) { return el('a', { href: href, target: '_blank', rel: 'noopener', class: cls || null }, texto); }
  function anunciar(msg) { var a = document.getElementById('anuncio'); if (a) { a.textContent = ''; setTimeout(function () { a.textContent = msg; }, 30); } }

  /* ---------------- nível de linguagem do aluno ---------------- */
  var nivel = store.get('es_nivel') === 'f2' ? 'f2' : (store.get('es_nivel') === 'f1' ? 'f1' : null);

  /* ---------------- estrutura comum ---------------- */
  function barraTopo(voltar) {
    return el('header', { class: 'barra' },
      voltar ? el('a', { href: '#/', class: 'voltar', 'aria-label': 'Voltar ao início' }, '← Início') : null,
      el('a', { href: '#/', class: 'marca' }, el('span', { class: 'marca-icone', 'aria-hidden': 'true' }), S.nome)
    );
  }

  function rodape() {
    var t = T.rodape;
    return el('footer', { class: 'rodape' },
      el('div', { class: 'rodape-maos', 'aria-hidden': 'true' }, svg(ilustracaoMaos(true))),
      el('p', { class: 'rodape-nome' }, S.nome),
      slot(function () {
        return [el('p', null, S.assinatura),
          el('p', null, 'Contato: ', el('strong', null, S.contato || '—')),
          S.atualizado_em ? el('p', null, 'Última atualização: ' + dataBR(S.atualizado_em)) : null];
      }),
      el('p', null, t.independente),
      el('p', null, t.naoSubstitui),
      el('p', { class: 'pequeno' }, t.privacidade)
    );
  }

  /* ---------------- ilustração: pessoas de mãos dadas ---------------- */
  function svg(markup) {
    var t = document.createElement('template');
    t.innerHTML = markup.trim();
    return t.content.firstChild;
  }
  function ilustracaoMaos(mini) {
    var pele = ['#F1C7A4', '#8D5A3B', '#E3A87F', '#5E3B27', '#F5D3B8', '#B87A52'];
    var roupa = ['#F4A291', '#8DB8E2', '#F3C95C', '#8CCBA5', '#F7B98F', '#B9A6E3'];
    var cabelo = ['#3B2A22', '#1F1A17', '#7A4B2A', '#1F1A17', '#C97B3C', '#3B2A22'];
    var escala = [1, 0.74, 0.98, 0.7, 0.8, 1.02];
    var xs = [38, 92, 150, 207, 258, 318];
    var chao = 160, o = [], ombros = [];
    xs.forEach(function (x, i) {
      var s = escala[i], perna = 26 * s, corpo = 46 * s, larg = 30 * s, r = 13 * s;
      var topo = chao - perna - corpo;
      ombros.push({ x: x, y: topo + 9 * s, l: larg / 2, s: s });
      o.push('<rect x="' + (x - 9 * s) + '" y="' + (chao - perna - 2) + '" width="' + 7 * s + '" height="' + (perna + 2) + '" rx="' + 3.5 * s + '" fill="#2A3348"/>');
      o.push('<rect x="' + (x + 2 * s) + '" y="' + (chao - perna - 2) + '" width="' + 7 * s + '" height="' + (perna + 2) + '" rx="' + 3.5 * s + '" fill="#2A3348"/>');
      o.push('<path d="M' + (x - larg / 2) + ' ' + (topo + 12 * s) + ' Q' + (x - larg / 2) + ' ' + topo + ' ' + x + ' ' + topo + ' Q' + (x + larg / 2) + ' ' + topo + ' ' + (x + larg / 2) + ' ' + (topo + 12 * s) + ' L' + (x + larg / 2 + 3 * s) + ' ' + (chao - perna + 2) + ' Q' + x + ' ' + (chao - perna + 8 * s) + ' ' + (x - larg / 2 - 3 * s) + ' ' + (chao - perna + 2) + ' Z" fill="' + roupa[i] + '"/>');
      var cy = topo - r - 2;
      o.push('<circle cx="' + x + '" cy="' + cy + '" r="' + r + '" fill="' + pele[i] + '"/>');
      o.push('<path d="M' + (x - r) + ' ' + (cy - 1) + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + (cy - 1) + ' Q' + x + ' ' + (cy - r * 0.45) + ' ' + (x - r) + ' ' + (cy - 1) + ' Z" fill="' + cabelo[i] + '"/>');
      o.push('<circle cx="' + (x - 4 * s) + '" cy="' + (cy + 2 * s) + '" r="' + 1.4 * s + '" fill="#2A3348"/><circle cx="' + (x + 4 * s) + '" cy="' + (cy + 2 * s) + '" r="' + 1.4 * s + '" fill="#2A3348"/>');
      o.push('<path d="M' + (x - 4 * s) + ' ' + (cy + 6 * s) + ' Q' + x + ' ' + (cy + 10 * s) + ' ' + (x + 4 * s) + ' ' + (cy + 6 * s) + '" stroke="#2A3348" stroke-width="' + 1.4 * s + '" fill="none" stroke-linecap="round"/>');
    });
    var bracos = [];
    for (var i = 0; i < ombros.length - 1; i++) {
      var a = ombros[i], b = ombros[i + 1];
      var mx = (a.x + a.l + b.x - b.l) / 2, my = Math.max(a.y, b.y) + 20;
      bracos.push('<path d="M' + (a.x + a.l - 2) + ' ' + a.y + ' Q' + (a.x + a.l + 6) + ' ' + (my - 2) + ' ' + mx + ' ' + my + '" stroke="' + roupa[i] + '" stroke-width="' + 7 * a.s + '" fill="none" stroke-linecap="round"/>');
      bracos.push('<path d="M' + (b.x - b.l + 2) + ' ' + b.y + ' Q' + (b.x - b.l - 6) + ' ' + (my - 2) + ' ' + mx + ' ' + my + '" stroke="' + roupa[i + 1] + '" stroke-width="' + 7 * b.s + '" fill="none" stroke-linecap="round"/>');
      bracos.push('<circle cx="' + mx + '" cy="' + my + '" r="5" fill="' + pele[i] + '"/>');
    }
    var p0 = ombros[0], pn = ombros[ombros.length - 1];
    bracos.push('<path d="M' + (p0.x - p0.l + 2) + ' ' + p0.y + ' Q' + (p0.x - p0.l - 14) + ' ' + (p0.y - 4) + ' ' + (p0.x - p0.l - 12) + ' ' + (p0.y - 26) + '" stroke="' + roupa[0] + '" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="' + (p0.x - p0.l - 12) + '" cy="' + (p0.y - 29) + '" r="5" fill="' + pele[0] + '"/>');
    bracos.push('<path d="M' + (pn.x + pn.l - 2) + ' ' + pn.y + ' Q' + (pn.x + pn.l + 14) + ' ' + (pn.y - 4) + ' ' + (pn.x + pn.l + 12) + ' ' + (pn.y - 26) + '" stroke="' + roupa[5] + '" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="' + (pn.x + pn.l + 12) + '" cy="' + (pn.y - 29) + '" r="5" fill="' + pele[5] + '"/>');
    var fundo = mini ? '' :
      '<circle cx="300" cy="44" r="26" fill="#F6D57A"/>' +
      '<path d="M8 120 C40 70 110 80 150 96 C200 116 250 70 300 86 C340 98 356 130 352 160 L8 160 Z" fill="#FDE6D6"/>' +
      '<circle cx="34" cy="40" r="9" fill="#9CC3E6"/><circle cx="64" cy="22" r="5" fill="#F4A291"/><rect x="200" y="20" width="14" height="14" rx="4" fill="#9FD3B4" transform="rotate(18 207 27)"/>' +
      '<path d="M120 34 a10 10 0 0 1 20 0 Z" fill="#F7B98F"/><circle cx="250" cy="54" r="5" fill="#B9A6E3"/>';
    var chaoSvg = '<path d="M0 160 Q180 146 360 160 L360 170 L0 170 Z" fill="' + (mini ? '#DDF0E3' : '#9FD3B4') + '"/>';
    return '<svg viewBox="0 0 360 172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pessoas de mãos dadas">' + fundo + chaoSvg + bracos.join('') + o.join('') + '</svg>';
  }

  /* ---------------- botão fixo "Preciso de ajuda" ---------------- */
  var areaAtual = 'inicio';
  function botaoAjuda() {
    return el('button', { class: 'btn-ajuda', type: 'button', onclick: abrirAjuda, 'aria-haspopup': 'dialog' },
      el('span', { 'aria-hidden': 'true' }, '🛟'), ' Preciso de ajuda');
  }

  function cartaoCanal(c) {
    return el('li', { class: 'canal' + (c.destaque ? ' canal-urgente' : '') },
      c.icone ? el('span', { class: 'canal-icone', 'aria-hidden': 'true' }, c.icone) : null,
      el('div', null,
        el('strong', null, c.titulo),
        el('p', null, c.para),
        c.contato ? el('div', { class: 'canal-contatos' }, c.contato.map(function (k) {
          var n;
          if (k.tel) n = el('a', { href: 'tel:' + k.tel, class: 'chip-contato' }, '📞 ' + k.t);
          else if (k.link) n = linkExterno(k.link, '↗ ' + k.t, 'chip-contato');
          else n = el('span', { class: 'contato-txt' }, k.t);
          return el('span', { class: 'contato' }, n, k.obs ? el('small', null, k.obs) : null);
        })) : null
      )
    );
  }

  function listaCanais(tipo) {
    var lista = tipo === 'adulto' ? T.canais.adulto : T.canais[tipo];
    return el('ul', { class: 'canais' }, lista.map(cartaoCanal));
  }

  function abrirAjuda() {
    var paraAluno = (areaAtual === 'aluno' || areaAtual === 'pesquisa-aluno');
    var tipo = paraAluno ? (nivel || 'f1') : 'adulto';
    var anterior = document.activeElement;
    var fechar = function () {
      fundo.remove();
      document.removeEventListener('keydown', tecla);
      document.body.classList.remove('sem-rolagem');
      if (anterior && anterior.focus) anterior.focus();
    };
    var tecla = function (e) { if (e.key === 'Escape') fechar(); };
    var botaoFechar = el('button', { class: 'fechar', type: 'button', onclick: fechar, 'aria-label': 'Fechar' }, '✕');
    var caixa = el('div', { class: 'folha', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'titulo-ajuda' },
      el('div', { class: 'folha-topo' }, el('h2', { id: 'titulo-ajuda' }, paraAluno ? 'Você não está sozinho' : 'Onde buscar ajuda'), botaoFechar),
      paraAluno ? el('p', { class: 'recado' }, 'A culpa não é sua. Converse com um adulto de confiança.') : el('p', null, 'Este site não recebe relatos. Estes são os canais para procurar:'),
      listaCanais(tipo),
      el('p', { class: 'pequeno' }, T.rodape.naoSubstitui)
    );
    var fundo = el('div', { class: 'fundo-folha', onclick: function (e) { if (e.target === fundo) fechar(); } }, caixa);
    document.body.appendChild(fundo);
    document.body.classList.add('sem-rolagem');
    document.addEventListener('keydown', tecla);
    botaoFechar.focus();
  }

  /* ---------------- componentes de status ---------------- */
  var ICONE_SIT = { previsto: '📅', realizado: '✓', andamento: '✍️', pendente: '○', aguardando: '⏳', respondido: '✓', vencido: '!' };
  function pilula(sit) {
    return el('span', { class: 'pilula sit-' + sit }, el('span', { 'aria-hidden': 'true' }, ICONE_SIT[sit] || '•'), ' ' + (DADOS.situacoes[sit] || sit));
  }
  function proximoPrazo() {
    var abertas = S.etapas.filter(function (e) { var s2 = sit(e); return s2 !== 'realizado' && s2 !== 'respondido'; });
    return abertas[0] || null;
  }

  /* ---------------- petição e compartilhamento ---------------- */
  function textoAssinaturas(n) { return n === 1 ? 'assinatura na petição' : 'assinaturas na petição'; }
  function notaContagem() {
    var c = S.peticao.contagem_em;
    if (!c) return null;
    var hora = String(c).match(/T(\d{2}):(\d{2})/);
    return 'Atualizado automaticamente em ' + dataBR(c) + (hora ? ' às ' + hora[1] + 'h' + hora[2] : '') + '.';
  }
  /* Total de assinaturas: arquivo atualizado de hora em hora por uma tarefa do GitHub */
  function carregarAssinaturas() {
    if (!window.fetch) return;
    fetch('assets/assinaturas.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        if (!d || typeof d.assinaturas !== 'number') return;
        S.peticao.assinaturas = d.assinaturas;
        if (d.atualizado_em) S.peticao.contagem_em = d.atualizado_em;
        redesenharSlots();
      })
      .catch(function () { /* mantém o valor de config.js */ });
  }
  function mensagemCompartilhar() {
    return S.compartilhar_mensagem || (S.nome + ' — ' + S.missao + ' ' + DADOS.url);
  }
  function compartilharSite() {
    var msg = mensagemCompartilhar();
    if (navigator.share) { navigator.share({ title: S.nome, text: msg }).catch(function () {}); }
    else { window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener'); }
  }
  function botaoAssinar(cls) {
    return S.peticao.link ? linkExterno(S.peticao.link, '✍️ ' + (S.peticao.texto_botao || 'Assine a petição') + ' ↗', cls || 'btn') :
      el('span', { class: 'btn btn-desativado', 'aria-disabled': 'true' }, 'Petição em breve');
  }

  /* ================= PÁGINA INICIAL ================= */
  function blocoDestaque() {
    var prox = proximoPrazo();
    var ass = S.peticao.assinaturas || 0;
    return el('div', { class: 'destaque-grade' },
      el('div', { class: 'numero' },
        el('strong', null, num(ass)),
        el('span', null, textoAssinaturas(ass)),
        el('small', null, !S.peticao.link ? 'A petição será publicada em breve.' : notaContagem())),
      prox ? el('div', { class: 'prazo-atual' },
        el('span', { class: 'rotulo' }, sit(prox) === 'andamento' ? 'Agora' : 'Próximo passo'),
        el('strong', null, prox.nome),
        prox.data ? el('span', null, (sit(prox) === 'previsto' ? 'Previsto para ' : 'Até ') + dataBR(prox.data)) : (prox.prazo_texto ? el('span', null, prox.prazo_texto) : null),
        pilula(sit(prox))) : el('div', { class: 'prazo-atual' }, el('strong', null, 'Todos os passos foram concluídos.')));
  }

  function viewInicio() {
    return el('main', { id: 'conteudo', class: 'inicio' },
      el('header', { class: 'hero' },
        el('span', { class: 'peca peca-1', 'aria-hidden': 'true' }), el('span', { class: 'peca peca-2', 'aria-hidden': 'true' }), el('span', { class: 'peca peca-3', 'aria-hidden': 'true' }),
        el('p', { class: 'etiqueta' }, 'Movimento de famílias'),
        slot(function () { return [el('h1', null, S.nome), el('p', { class: 'missao' }, S.missao)]; }, true),
        slot(function () {
          var ass = S.peticao.assinaturas || 0;
          return el('div', { class: 'chamada' },
            el('p', { class: 'chamada-titulo' }, S.chamada || 'Uma escola segura não é um privilégio. É um direito.'),
            el('p', { class: 'chamada-texto' }, 'Famílias do Colégio Ser estão se unindo por protocolos claros e ações permanentes contra o bullying e o cyberbullying. Sua assinatura faz parte disso.'),
            el('div', { class: 'chamada-botoes' },
              botaoAssinar('btn btn-cta'),
              el('a', { href: '#/responsavel/mobilizacao', class: 'btn btn-sec' }, 'Entenda o movimento →')),
            S.peticao.link && ass ? el('p', { class: 'chamada-num' }, el('strong', null, num(ass)), ' ' + textoAssinaturas(ass) + ' até agora. Assine e passe adiante!') : null);
        }, true),
        el('div', { class: 'hero-ilustra' }, svg(ilustracaoMaos(false)))
      ),
      el('section', { class: 'manifesto', 'aria-label': 'Por que existimos' },
        el('p', { class: 'manifesto-forte' }, 'Bullying não é brincadeira.'),
        el('p', null, 'É violência entre pares. E tem solução quando escola, famílias e estudantes agem juntos.'),
        el('p', { class: 'manifesto-dado' }, el('strong', null, 'Mais de 1 em cada 4'), ' estudantes brasileiros de 13 a 17 anos relataram bullying recorrente.'),
        el('p', { class: 'fonte-curta' }, 'Fonte: PeNSE 2024, IBGE.')),
      el('nav', { class: 'portas', 'aria-label': 'Escolha sua área' },
        el('a', { href: '#/aluno', class: 'porta porta-aluno' },
          el('span', { class: 'porta-emoji', 'aria-hidden': 'true' }, '🎒'),
          el('span', { class: 'porta-titulo' }, T.inicio.portaAluno.titulo),
          el('span', { class: 'porta-sub' }, T.inicio.portaAluno.sub),
          el('span', { class: 'porta-seta', 'aria-hidden': 'true' }, '→')),
        el('a', { href: '#/responsavel', class: 'porta porta-resp' },
          el('span', { class: 'porta-emoji', 'aria-hidden': 'true' }, '🤝'),
          el('span', { class: 'porta-titulo' }, T.inicio.portaResp.titulo),
          el('span', { class: 'porta-sub' }, T.inicio.portaResp.sub),
          el('span', { class: 'porta-seta', 'aria-hidden': 'true' }, '→'))
      ),
      el('section', { class: 'destaque', 'aria-labelledby': 'tit-mob' },
        el('h2', { id: 'tit-mob' }, 'A mobilização'),
        slot(blocoDestaque),
        el('a', { href: '#/responsavel/mobilizacao', class: 'btn' }, 'Acompanhe →')
      ),
      rodape()
    );
  }

  /* ================= NAVEGAÇÃO DE SEÇÕES ================= */
  function navSecoes(area, secoes) {
    return el('nav', { class: 'chips', 'aria-label': 'Seções desta área' },
      secoes.map(function (s) { return el('a', { href: '#/' + area + '/' + s.id, class: 'chip' }, s.curto); }));
  }
  var ICONES = { quiz: '🤔', termometro: '🌡️', comigo: '💛', vejo: '👀', internet: '📱', pesquisa: '📊', ajuda: '🛟', sinais: '🔎', conversar: '💬', vitima: '🫂', pratica: '🌱', direitos: '⚖️', dados: '📈', mobilizacao: '✊' };
  var corIdx = 0;
  function secao(id, titulo, corpo, extraClass) {
    var cor = 'cor-' + (corIdx++ % 5);
    return el('section', { id: 'sec-' + id, class: 'secao ' + cor + ' ' + (extraClass || ''), 'aria-labelledby': 'h-' + id, tabindex: '-1' },
      el('div', { class: 'secao-cabeca' },
        el('span', { class: 'secao-icone', 'aria-hidden': 'true' }, ICONES[id] || '•'),
        el('h2', { id: 'h-' + id }, titulo)),
      corpo);
  }

  /* ================= ÁREA DO ALUNO ================= */
  function seletorNivel(onMudar) {
    var opcoes = [['f1', 'Fundamental I'], ['f2', 'Fundamental II ou Médio']];
    return el('div', { class: 'nivel', role: 'radiogroup', 'aria-label': 'Em que segmento você está?' },
      el('span', { class: 'nivel-rotulo' }, 'Eu estou no:'),
      el('div', { class: 'nivel-botoes' }, opcoes.map(function (o) {
        return el('button', { type: 'button', role: 'radio', 'aria-checked': nivel === o[0] ? 'true' : 'false', class: 'nivel-btn' + (nivel === o[0] ? ' ativo' : ''),
          onclick: function () { nivel = o[0]; store.set('es_nivel', nivel); onMudar(); } }, o[1]);
      }))
    );
  }

  function viewAluno() {
    var A = T.aluno;
    var main = el('main', { id: 'conteudo', class: 'area area-aluno' + (nivel === 'f1' ? ' ludico' : '') });
    function montar() {
      main.innerHTML = '';
      corIdx = 0;
      add(main, [
        barraTopo(true),
        el('header', { class: 'area-cabeca' },
          el('p', { class: 'sobretitulo' }, 'Área do aluno'),
          el('h1', null, nivel === 'f1' ? 'Oi! Que bom que você chegou.' : 'Sou aluno'),
          nivel ? el('p', null, A.intro[nivel]) : el('p', null, 'Escolha seu segmento para ver os textos do seu jeito.'),
          seletorNivel(function () { main.classList.toggle('ludico', nivel === 'f1'); montar(); })
        )
      ]);
      if (!nivel) { add(main, rodape()); return; }
      add(main, [
        navSecoes('aluno', A.secoes),
        secao('quiz', A.secoes[0].titulo, quiz()),
        secao('termometro', A.secoes[1].titulo, termometro()),
        secao('comigo', A.secoes[2].titulo, blocoComigo()),
        secao('vejo', A.secoes[3].titulo, blocoVejo()),
        secao('internet', A.secoes[4].titulo, blocoInternet()),
        secao('pesquisa', A.secoes[5].titulo, blocoChamadaPesquisa('aluno', A.pesquisa[nivel])),
        secao('ajuda', A.secoes[6].titulo, el('div', null, el('p', { class: 'recado' }, 'Você não está sozinho, e a culpa não é sua.'), listaCanais(nivel))),
        rodape()
      ]);
    }
    montar();
    return main;
  }

  function quiz() {
    var Q = T.aluno.quiz;
    var lista = Q.situacoes;
    var i = 0;
    var box = el('div', { class: 'quiz' });
    function tela() {
      box.innerHTML = '';
      if (i >= lista.length) {
        var f = Q.final[nivel];
        add(box, el('div', { class: 'quiz-fim' },
          el('p', { class: 'quiz-fim-emoji', 'aria-hidden': 'true' }, '🌱'),
          el('p', null, el('strong', null, f[0])),
          el('ol', null, f.slice(1).map(function (x) { return el('li', null, x); })),
          el('button', { type: 'button', class: 'btn btn-sec', onclick: function () { i = 0; tela(); } }, 'Fazer de novo')));
        return;
      }
      var s = lista[i];
      var txt = s[nivel];
      var feedback = el('div', { class: 'quiz-feedback', 'aria-live': 'polite' });
      var botoes = Q.opcoes.map(function (o) {
        return el('button', { type: 'button', class: 'quiz-op', onclick: function () {
          botoes.forEach(function (b) { b.disabled = true; });
          var certo = o.v === s.resp;
          var correta = Q.opcoes.filter(function (x) { return x.v === s.resp; })[0];
          this.classList.add(certo ? 'certo' : 'escolhido');
          botoes.forEach(function (b, k) { if (Q.opcoes[k].v === s.resp) b.classList.add('certo'); });
          feedback.innerHTML = '';
          add(feedback, [
            el('p', { class: 'quiz-veredito' }, (certo ? 'Isso mesmo! ' : 'Vamos pensar juntos. ') + correta.e + ' ' + correta.r + '.'),
            el('p', null, txt.x),
            el('button', { type: 'button', class: 'btn', onclick: function () { i++; tela(); box.querySelector('.quiz-situacao').focus(); } }, i < lista.length - 1 ? 'Próxima situação →' : 'Terminar')
          ]);
        } }, el('span', { 'aria-hidden': 'true' }, o.e), ' ' + o.r);
      });
      add(box, [
        i === 0 ? el('p', { class: 'quiz-intro' }, Q.intro[nivel]) : null,
        el('div', { class: 'progresso', 'aria-hidden': 'true' }, el('span', { style: null, class: 'progresso-barra', 'data-p': String(Math.round(100 * i / lista.length)) })),
        el('p', { class: 'quiz-contador' }, 'Situação ' + (i + 1) + ' de ' + lista.length),
        el('p', { class: 'quiz-situacao', tabindex: '-1' }, txt.t),
        el('div', { class: 'quiz-opcoes' }, botoes),
        feedback
      ]);
      aplicarProgresso(box);
    }
    tela();
    return el('div', null, box, fonte(T.fontes.cartilha + ' ' + T.fontes.lei));
  }

  function aplicarProgresso(raiz) {
    // Largura da barra via propriedade CSS (sem estilos inline, compatível com a política de segurança)
    raiz.querySelectorAll('.progresso-barra').forEach(function (b) { b.style.setProperty('width', (b.getAttribute('data-p') || 0) + '%'); });
  }

  function termometro() {
    var M = T.aluno.termometro;
    var resultado = el('div', { class: 'termo-resultado', 'aria-live': 'polite' });
    var marcador = el('span', { class: 'termo-marcador', 'aria-hidden': 'true' });
    var escala = el('div', { class: 'termo-escala', 'aria-hidden': 'true' },
      M.zonas.map(function (z) { return el('span', { class: 'termo-zona zona-' + z.id }, z.e + ' ' + z.titulo); }), marcador);
    var chips = M.itens.map(function (it) {
      return el('button', { type: 'button', class: 'termo-chip', 'aria-pressed': 'false', onclick: function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); c.classList.remove('ativo'); });
        this.setAttribute('aria-pressed', 'true'); this.classList.add('ativo');
        var zi = M.zonas.map(function (z) { return z.id; }).indexOf(it.z);
        var z = M.zonas[zi];
        marcador.className = 'termo-marcador pos-' + zi;
        resultado.innerHTML = '';
        setTimeout(function () { escala.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 30);
        add(resultado, [
          el('p', { class: 'termo-zona-titulo zona-' + z.id }, z.e + ' ' + z.titulo),
          el('p', null, z[nivel]),
          it.urgente ? el('p', { class: 'alerta' }, M.urgente[nivel]) : null
        ]);
      } }, it[nivel]);
    });
    return el('div', null, el('p', null, M.intro[nivel]), escala, resultado, el('div', { class: 'termo-chips' }, chips),
      fonte(T.fontes.cartilha));
  }

  function rotativo(intro, frases) {
    var k = 0;
    var alvo = el('p', { class: 'frase', 'aria-live': 'polite' }, frases[0]);
    return el('div', { class: 'frases' },
      el('p', { class: 'frases-intro' }, intro), alvo,
      el('button', { type: 'button', class: 'btn btn-sec', onclick: function () { k = (k + 1) % frases.length; alvo.textContent = frases[k]; } }, 'Outra frase ↻'));
  }

  function passos(lista, numerado) {
    return el(numerado ? 'ol' : 'ul', { class: 'passos' }, lista.map(function (p) {
      return el('li', { class: 'passo' },
        p.e ? el('span', { class: 'passo-icone', 'aria-hidden': 'true' }, p.e) : null,
        el('div', null, el('strong', null, p.t), el('p', null, p.x)));
    }));
  }

  function blocoComigo() {
    var C = T.aluno.comigo[nivel];
    return el('div', null, el('p', { class: 'recado' }, C.recado), passos(C.passos), rotativo(C.frasesIntro, C.frases), fonte(T.fontes.cartilha));
  }

  function blocoVejo() {
    var V = T.aluno.vejo[nivel];
    return el('div', null, el('p', null, V.intro), passos(V.ajudar), el('p', { class: 'nota' }, V.lembrete), fonte(T.fontes.cartilha));
  }

  function blocoInternet() {
    var I = T.aluno.internet[nivel];
    var feitos = 0;
    var status = el('p', { class: 'checklist-status', 'aria-live': 'polite' }, '0 de ' + I.passos.length + ' passos');
    var itens = I.passos.map(function (p, idx) {
      var marcado = false;
      var btn = el('button', { type: 'button', class: 'check-btn', 'aria-pressed': 'false', 'aria-label': 'Marcar “' + p.t + '” como feito' }, '');
      var li = el('li', { class: 'check-item' },
        el('span', { class: 'check-num', 'aria-hidden': 'true' }, String(idx + 1)),
        el('div', { class: 'check-corpo' },
          el('strong', null, p.e + ' ' + p.t),
          el('p', null, p.x),
          p.dica ? el('details', null, el('summary', null, 'Como fazer'), el('p', null, p.dica)) : null),
        btn);
      btn.addEventListener('click', function () {
        marcado = !marcado;
        btn.setAttribute('aria-pressed', marcado ? 'true' : 'false');
        li.classList.toggle('feito', marcado);
        btn.textContent = marcado ? '✓' : '';
        feitos += marcado ? 1 : -1;
        status.textContent = feitos === I.passos.length ? 'Todos os passos feitos. Você agiu certo!' : feitos + ' de ' + I.passos.length + ' passos';
      });
      return li;
    });
    return el('div', null, el('p', null, I.intro), el('ol', { class: 'checklist' }, itens), status,
      I.extra ? el('p', { class: 'nota' }, I.extra) : null,
      fonte(T.fontes.safernet + ' ' + T.fontes.cartilha));
  }

  function blocoChamadaPesquisa(versao, texto) {
    var feita = store.get('es_pesquisa_' + versao);
    return el('div', { class: 'chamada-pesquisa' },
      el('p', null, texto),
      feita ? el('p', { class: 'nota' }, '✓ Você já respondeu neste aparelho. Obrigado!') :
        el('a', { href: '#/pesquisa/' + versao, class: 'btn' }, versao === 'aluno' ? 'Começar a pesquisa' : 'Responder à pesquisa'));
  }

  /* ================= ÁREA DO RESPONSÁVEL ================= */
  function viewResponsavel() {
    var R = T.responsavel;
    corIdx = 0;
    var sec = R.secoes;
    return el('main', { id: 'conteudo', class: 'area area-resp' },
      barraTopo(true),
      el('header', { class: 'area-cabeca' },
        el('p', { class: 'sobretitulo' }, 'Área do responsável'),
        el('h1', null, 'Sou responsável'),
        el('p', null, R.intro)),
      navSecoes('responsavel', sec),
      secao('sinais', sec[0].titulo, blocoSinais()),
      secao('conversar', sec[1].titulo, blocoConversar()),
      secao('vitima', sec[2].titulo, blocoVitima()),
      secao('pratica', sec[3].titulo, blocoPratica()),
      secao('direitos', sec[4].titulo, blocoDireitos()),
      secao('dados', sec[5].titulo, blocoDados()),
      secao('mobilizacao', sec[6].titulo, slot(blocoMobilizacao), 'secao-mob'),
      secao('pesquisa', sec[7].titulo, el('div', null,
        blocoChamadaPesquisa('responsavel', 'Pesquisa anônima com 6 perguntas rápidas. Não pedimos nome, e-mail, telefone nem turma, e não há campos de texto.'),
        slot(blocoResultados))),
      rodape()
    );
  }

  function blocoSinais() {
    var X = T.responsavel.sinais;
    var marcados = 0;
    var saida = el('div', { class: 'sinais-saida', 'aria-live': 'polite' });
    function atualizar() {
      var msg = X.resultado.filter(function (r) { return marcados <= r.ate; })[0];
      saida.innerHTML = '';
      add(saida, [el('p', { class: 'sinais-contagem' }, marcados + (marcados === 1 ? ' sinal marcado' : ' sinais marcados')), el('p', null, msg.t)]);
      saida.className = 'sinais-saida nivel-' + (marcados === 0 ? 0 : marcados <= 2 ? 1 : 2);
    }
    var grupos = X.grupos.map(function (g) {
      return el('fieldset', { class: 'sinais-grupo' },
        el('legend', null, g.e + ' ' + g.t),
        g.itens.map(function (txt) {
          var cb = el('input', { type: 'checkbox', onchange: function () { marcados += this.checked ? 1 : -1; atualizar(); } });
          return el('label', { class: 'sinal' }, cb, el('span', null, txt));
        }));
    });
    atualizar();
    return el('div', null, el('p', null, X.intro), grupos, saida, el('p', { class: 'pequeno' }, X.aviso), fonte(T.fontes.cartilha));
  }

  function blocoConversar() {
    var C = T.responsavel.conversar;
    return el('div', null,
      el('p', null, C.intro),
      el('div', { class: 'duas-colunas' },
        el('div', { class: 'caixa caixa-sim' }, el('h3', null, '✓ Ajuda'), el('ul', null, C.fazer.map(function (x) { return el('li', null, x); }))),
        el('div', { class: 'caixa caixa-nao' }, el('h3', null, '✕ Evite'), el('ul', null, C.evitar.map(function (x) { return el('li', null, x); })))),
      rotativo(C.frasesIntro, C.frases),
      fonte(T.fontes.cartilha));
  }

  function blocoVitima() {
    var V = T.responsavel.vitima;
    return el('div', null, el('p', null, V.intro), passos(V.passos, true), modeloComunicado(V.modelo), fonte(T.fontes.cartilha + ' ' + T.fontes.lei));
  }

  function modeloComunicado(M) {
    var f = {
      seg: el('select', { id: 'm-seg' }, ['Fundamental I', 'Fundamental II', 'Ensino Médio'].map(function (s) { return el('option', null, s); })),
      tipos: [['verbal', 'ofensas, apelidos ou humilhações'], ['exclusao', 'exclusão proposital do grupo'], ['fisica', 'agressões físicas'], ['objetos', 'objetos pegos ou danificados'], ['ameaca', 'ameaças ou intimidação'], ['internet', 'ofensas ou exposição pela internet']],
      locais: [['sala', 'em sala de aula'], ['intervalo', 'no intervalo'], ['entrada', 'na entrada ou saída'], ['internet', 'em grupos e redes sociais']],
      freq: el('select', { id: 'm-freq' }, ['algumas vezes', 'com frequência', 'quase todos os dias'].map(function (s) { return el('option', null, s); })),
      desde: el('input', { id: 'm-desde', type: 'month' }),
      provas: el('input', { id: 'm-provas', type: 'checkbox' }),
      pedidos: [['acolher', 'acolhimento do meu/minha filho(a) e medidas para a sua proteção'], ['interromper', 'medidas para interromper as situações'], ['reuniao', 'uma reunião para tratarmos do assunto'], ['plano', 'informações sobre o acompanhamento que será feito'], ['protocolo', 'informações sobre o protocolo da escola para esses casos']],
      prazo: el('select', { id: 'm-prazo' }, ['3', '5', '10'].map(function (s) { return el('option', { value: s, selected: s === '5' }, s + ' dias úteis'); }))
    };
    function grupoChecks(nome, lista, marcados) {
      return lista.map(function (x) {
        return el('label', { class: 'sinal' }, el('input', { type: 'checkbox', name: nome, value: x[0], checked: marcados.indexOf(x[0]) >= 0 }), el('span', null, x[1]));
      });
    }
    var form = el('div', { class: 'modelo-form' },
      el('label', { class: 'campo' }, 'Segmento', f.seg),
      el('fieldset', null, el('legend', null, 'O que tem acontecido'), grupoChecks('m-tipo', f.tipos, ['verbal'])),
      el('fieldset', null, el('legend', null, 'Onde'), grupoChecks('m-local', f.locais, [])),
      el('div', { class: 'duas-colunas' },
        el('label', { class: 'campo' }, 'Com que frequência', f.freq),
        el('label', { class: 'campo' }, 'Desde quando (aproximado)', f.desde)),
      el('label', { class: 'sinal' }, f.provas, el('span', null, 'Tenho registros (anotações ou prints)')),
      el('fieldset', null, el('legend', null, 'O que você pede à escola'), grupoChecks('m-pedido', f.pedidos, ['acolher', 'interromper', 'reuniao'])),
      el('label', { class: 'campo' }, 'Prazo para retorno por escrito', f.prazo)
    );
    var saida = el('textarea', { class: 'modelo-saida', rows: '14', 'aria-label': 'Texto do comunicado', readonly: true });
    var aviso = el('p', { class: 'nota', 'aria-live': 'polite' });
    function valores(nome, lista) {
      var ok = Array.prototype.map.call(form.querySelectorAll('input[name="' + nome + '"]:checked'), function (i) { return i.value; });
      return lista.filter(function (x) { return ok.indexOf(x[0]) >= 0; }).map(function (x) { return x[1]; });
    }
    function juntar(a) { return a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1]; }
    function gerar() {
      var tipos = valores('m-tipo', f.tipos);
      var locais = valores('m-local', f.locais);
      var pedidos = valores('m-pedido', f.pedidos);
      var cyber = tipos.indexOf('ofensas ou exposição pela internet') >= 0 || locais.indexOf('em grupos e redes sociais') >= 0;
      var desde = f.desde.value ? (function () { var p = f.desde.value.split('-'); return ', desde ' + ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'][+p[1] - 1] + ' de ' + p[0]; })() : '';
      var linhas = [
        'Prezada Coordenação,',
        '',
        'Sou responsável pelo(a) aluno(a) [NOME DO ALUNO], do [ANO/TURMA] (' + f.seg.value + ').',
        '',
        'Venho comunicar, por escrito, situações relatadas por meu/minha filho(a) que podem caracterizar intimidação sistemática (bullying' + (cyber ? ' e cyberbullying' : '') + '), nos termos da Lei nº 13.185/2015.',
        '',
        'Segundo o relato, as situações envolvem ' + (juntar(tipos) || '[descrever]') + (locais.length ? ', ' + juntar(locais) : '') + ', ' + f.freq.value + desde + '.'
      ];
      if (f.provas.checked) linhas.push('', 'Tenho registros (anotações e/ou capturas de tela) que posso apresentar.');
      if (pedidos.length) {
        linhas.push('', 'Solicito:');
        pedidos.forEach(function (p) { linhas.push('- ' + p.charAt(0).toUpperCase() + p.slice(1) + ';'); });
      }
      linhas.push('', 'Peço, por gentileza, a confirmação do recebimento desta mensagem e um retorno por escrito em até ' + f.prazo.value + ' dias úteis.', '', 'Fico à disposição para conversar.', '', 'Atenciosamente,', '[SEU NOME]', '[DATA]');
      saida.value = linhas.join('\n');
    }
    form.addEventListener('change', gerar);
    gerar();
    var copiar = el('button', { type: 'button', class: 'btn', onclick: function () {
      var feito = function () { aviso.textContent = 'Texto copiado. Agora cole na mensagem para a escola e complete os campos entre colchetes.'; };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(saida.value).then(feito, function () { saida.select(); document.execCommand('copy'); feito(); });
      } else { saida.select(); try { document.execCommand('copy'); feito(); } catch (e) { aviso.textContent = 'Selecione o texto e copie manualmente.'; } }
    } }, 'Copiar texto');
    return el('details', { class: 'modelo' },
      el('summary', null, '✉️ ' + M.titulo),
      el('p', null, M.intro), form, saida, copiar, aviso, el('p', { class: 'pequeno' }, M.dicaNomes));
  }

  function blocoPratica() {
    var P = T.responsavel.pratica;
    return el('div', null, el('p', null, P.intro), passos(P.passos, true), el('p', { class: 'nota' }, P.evitar), el('p', { class: 'pequeno' }, P.lembrete), fonte(T.fontes.cartilha + ' ' + T.fontes.lei));
  }

  function blocoDireitos() {
    var D = T.responsavel.direitos;
    return el('div', null, el('p', null, D.intro),
      D.itens.map(function (it, k) {
        return el('details', { class: 'sanfona', open: k === 0 },
          el('summary', null, it.t),
          el('ul', null, it.x.map(function (x) { return el('li', null, x); })));
      }),
      el('p', { class: 'nota' }, D.aviso),
      fonte(T.fontes.cartilha + ' Textos das leis em planalto.gov.br.'));
  }

  function blocoDados() {
    var D = T.responsavel.dados;
    var palpites = D.palpites.map(function (q) {
      var valor = 25;
      var saida = el('output', { class: 'palpite-valor' }, '25');
      var resultado = el('div', { class: 'palpite-resultado', 'aria-live': 'polite' });
      var range = el('input', { type: 'range', min: '0', max: '100', step: '1', value: '25', 'aria-label': 'Seu palpite, de 0 a 100', oninput: function () { valor = +this.value; saida.textContent = this.value; } });
      var botao = el('button', { type: 'button', class: 'btn btn-sec', onclick: function () {
        range.disabled = true; botao.disabled = true;
        resultado.innerHTML = '';
        var real = el('span', { class: 'barra-real', 'data-p': String(q.valor) });
        var chute = el('span', { class: 'barra-chute', 'data-p': String(valor) });
        add(resultado, [
          el('div', { class: 'comparacao', 'aria-hidden': 'true' },
            el('div', { class: 'linha-comp' }, el('span', { class: 'rot' }, 'Seu palpite'), el('span', { class: 'trilho' }, chute), el('span', { class: 'val' }, valor + '%')),
            el('div', { class: 'linha-comp' }, el('span', { class: 'rot' }, 'PeNSE 2024'), el('span', { class: 'trilho' }, real), el('span', { class: 'val' }, pct(q.valor)))),
          el('p', null, el('strong', null, 'Resposta: ' + pct(q.valor) + '. '), 'Você chutou ' + valor + '%. ' + q.extra)
        ]);
        aplicarProgresso(resultado);
      } }, 'Ver resposta');
      return el('div', { class: 'palpite' }, el('p', { class: 'palpite-pergunta' }, q.p),
        el('div', { class: 'palpite-controle' }, range, saida), botao, resultado);
    });
    return el('div', null,
      el('p', null, D.intro), palpites,
      el('h3', null, 'Outros dados da pesquisa'),
      el('ul', { class: 'fatos' }, D.fatos.map(function (f) { return el('li', null, el('strong', null, f.n), ' ' + f.t); })),
      el('h3', null, 'O que precisa acontecer'),
      el('ul', { class: 'lista-check' }, D.precisa.map(function (x) { return el('li', null, x); })),
      el('p', { class: 'nota' }, D.aviso),
      fonte(T.fontes.pense),
      el('p', { class: 'fonte' }, D.credito));
  }

  function blocoMobilizacao() {
    var linha = el('ol', { class: 'linha-tempo' }, S.etapas.map(function (e) {
      var st = sit(e);
      return el('li', { class: 'lt-item lt-' + st },
        el('span', { class: 'lt-ponto', 'aria-hidden': 'true' }),
        el('div', { class: 'lt-corpo' },
          e.data ? el('span', { class: 'lt-data' }, dataBR(e.data)) : null,
          el('strong', null, e.nome),
          e.prazo_texto ? el('span', { class: 'lt-prazo' }, e.prazo_texto) : null,
          pilula(st)));
    }));

    var respostas = S.respostas_escola.length ? el('ul', { class: 'registros' }, S.respostas_escola.map(function (r) {
      return el('li', { class: 'registro' },
        el('span', { class: 'reg-data' }, dataBR(r.data)),
        el('strong', null, r.resumo || 'Resposta da escola'),
        r.texto ? el('details', null, el('summary', null, 'Ler na íntegra'), el('div', { class: 'integra' }, paragrafos(r.texto))) : null,
        r.link ? linkExterno(r.link, 'Abrir documento ↗', 'link-doc') : null);
    })) : el('p', { class: 'vazio' }, 'Ainda sem resposta da escola.');

    var acoes = S.acoes_familias.length ? el('ul', { class: 'registros' }, S.acoes_familias.map(function (a) {
      return el('li', { class: 'registro' },
        el('span', { class: 'reg-data' }, dataBR(a.data)),
        el('span', null, a.descricao),
        a.link ? linkExterno(a.link, 'Ver ↗', 'link-doc') : null);
    })) : el('p', { class: 'vazio' }, 'Nenhuma ação registrada ainda.');

    var ass = S.peticao.assinaturas || 0;
    var peticao = el('div', { class: 'peticao' },
      el('p', { class: 'peticao-num' }, el('strong', null, num(ass)), ' ', textoAssinaturas(ass)),
      notaContagem() ? el('p', { class: 'pequeno' }, notaContagem()) : null,
      botaoAssinar(),
      S.peticao.link ? el('p', { class: 'pequeno' }, 'Assinar é gratuito: basta nome e e-mail. Depois de assinar, a Change.org pode sugerir uma contribuição para a plataforma. Não é necessário contribuir, e o movimento não recebe nenhum valor.') : null,
      el('p', { class: 'pequeno' }, 'Este site mostra apenas o total de assinaturas.'));

    var pedidos = (S.pedidos && S.pedidos.length) ? el('div', null,
      S.pedidos_intro ? el('p', null, S.pedidos_intro) : null,
      el('ol', { class: 'pedidos' }, S.pedidos.map(function (p) {
        return el('li', null, el('strong', null, p.t), el('span', null, p.x));
      })),
      S.peticao.link ? el('p', { class: 'pequeno' }, 'O texto completo está na página da petição.') : null)
      : (S.abaixo_assinado ? el('details', { class: 'sanfona' }, el('summary', null, 'Ler o abaixo-assinado completo'), el('div', { class: 'integra' }, paragrafos(S.abaixo_assinado)))
        : el('p', { class: 'vazio' }, 'O resumo dos pedidos será publicado aqui em breve.'));

    var resumo = el('div', { class: 'resumo-mob' },
      S.chamada ? el('p', { class: 'resumo-chamada' }, S.chamada) : null,
      paragrafos(S.resumo_situacao),
      (S.compromissos && S.compromissos.length) ? el('ol', { class: 'compromissos' }, S.compromissos.map(function (c) { return el('li', null, c); })) : null,
      S.resumo_fecho_destaque ? el('p', { class: 'resumo-forte' }, S.resumo_fecho_destaque) : null,
      S.resumo_fecho ? paragrafos(S.resumo_fecho) : null);

    var msg = mensagemCompartilhar();
    var avisoCopia = el('p', { class: 'pequeno', role: 'status' });
    var compartilhar = el('div', { class: 'compartilhar' },
      el('p', null, 'Quanto mais famílias souberem, mais forte fica o pedido. Envie esta mensagem para os grupos da escola, para amigos e para quem se importa com as crianças:'),
      el('blockquote', { class: 'msg-compartilhar' }, paragrafos(msg)),
      el('div', { class: 'chamada-botoes' },
        el('a', { href: 'https://wa.me/?text=' + encodeURIComponent(msg), target: '_blank', rel: 'noopener', class: 'btn btn-cta' }, '📲 Enviar no WhatsApp'),
        el('button', { type: 'button', class: 'btn btn-sec', onclick: function () {
          var feito = function () { avisoCopia.textContent = 'Mensagem copiada. É só colar onde quiser.'; };
          if (navigator.clipboard) navigator.clipboard.writeText(msg).then(feito, function () { avisoCopia.textContent = 'Não foi possível copiar. Selecione o texto acima.'; });
          else avisoCopia.textContent = 'Selecione o texto acima para copiar.';
        } }, '📋 Copiar mensagem'),
        navigator.share ? el('button', { type: 'button', class: 'btn btn-sec', onclick: compartilharSite }, '↗ Outros apps') : null),
      avisoCopia);

    return el('div', null,
      estado.falhou ? el('p', { class: 'nota' }, 'Não foi possível carregar as atualizações agora. Recarregue a página em instantes.') : null,
      el('h3', null, 'Resumo da mobilização'), resumo,
      el('h3', null, 'O que pede o abaixo-assinado'), pedidos,
      el('h3', null, 'Petição e adesão'), peticao,
      el('h3', null, 'Linha do tempo'),
      el('p', { class: 'pequeno' }, 'As datas dos próximos passos serão definidas na reunião com a escola e publicadas aqui.'),
      linha,
      el('h3', null, 'Respostas da escola'), respostas,
      el('h3', null, 'Ações das famílias'), acoes,
      el('h3', null, 'Como ajudar'),
      el('ul', { class: 'passos' }, T.responsavel.comoAjudar.map(function (c, k) {
        return el('li', { class: 'passo' }, el('span', { class: 'passo-icone', 'aria-hidden': 'true' }, c.e),
          el('div', null, el('strong', null, c.t), el('p', null, k === 0 && S.peticao.link ? 'O link está logo acima. Leva 1 minuto.' : c.x)));
      })),
      el('h3', { id: 'compartilhe' }, 'Compartilhe este site'), compartilhar);
  }

  /* ---------------- resultados da pesquisa ---------------- */
  function blocoResultados() {
    var R = DADOS.resultados;
    var P = DADOS.pesquisa;
    var cont = el('div', { class: 'resultados' },
      el('h3', null, 'Resultados até agora'),
      el('p', { class: 'nota' }, 'Pesquisa voluntária. Não representa estatisticamente toda a escola.'),
      S.pesquisa.compartilhar_com_escola ? el('p', { class: 'pequeno' }, 'Os resultados agregados serão compartilhados com a escola como contribuição ao plano de ação.') : null);
    ['aluno', 'responsavel'].forEach(function (v) {
      var r = R[v];
      var bloco = el('div', { class: 'res-versao' }, el('h4', null, v === 'aluno' ? 'Respostas dos alunos' : 'Respostas dos responsáveis'));
      if (!r.liberado) {
        add(bloco, [
          el('p', null, r.total + ' de ' + r.minimo + ' respostas necessárias para mostrar os resultados.'),
          el('div', { class: 'progresso' }, el('span', { class: 'progresso-barra', 'data-p': String(Math.min(100, Math.round(100 * r.total / r.minimo))) }))
        ]);
      } else {
        add(bloco, el('p', { class: 'pequeno' }, r.total + ' respostas.'));
        P[v].perguntas.forEach(function (q) {
          var d = r.perguntas[q.id];
          if (!d || !d.base) return;
          var multi = q.tipo === 'varias';
          var media = null;
          if (q.tipo === 'escala0a10' || q.tipo === 'escala5') {
            var soma = 0; q.opcoes.forEach(function (o) { soma += (+o.v) * (d.contagem[o.v] || 0); });
            media = (soma / d.base).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
          }
          add(bloco, el('figure', { class: 'grafico' },
            el('figcaption', null, q.texto, el('small', null, (multi ? ' Podia marcar mais de uma. ' : ' ') + d.base + ' responderam.')),
            media !== null ? el('p', { class: 'media' }, 'Média: ' + media + (q.tipo === 'escala5' ? ' (de 1 a 5)' : ' (de 0 a 10)')) : null,
            el('ul', { class: 'barras' }, q.opcoes.map(function (o) {
              var n = d.contagem[o.v] || 0;
              var p = 100 * n / d.base;
              return el('li', null,
                el('span', { class: 'b-rot' }, (o.e ? o.e + ' ' : '') + o.r),
                el('span', { class: 'b-trilho' }, el('span', { class: 'b-barra', 'data-p': String(p) })),
                el('span', { class: 'b-val' }, pct(p), el('small', null, ' (' + n + ')')));
            }))));
        });
      }
      add(cont, bloco);
    });
    aplicarProgresso(cont);
    setTimeout(function () { cont.querySelectorAll('.b-barra').forEach(function (b) { b.style.setProperty('width', b.getAttribute('data-p') + '%'); }); }, 0);
    return cont;
  }

  /* ================= PESQUISA (fluxo) ================= */
  function viewPesquisa(versao) {
    var def = DADOS.pesquisa[versao];
    var main = el('main', { id: 'conteudo', class: 'pesquisa pesquisa-' + versao });
    var estado = { passo: store.get('es_pesquisa_' + versao) ? 'ja' : 'intro', idx: 0, resp: {}, inicio: 0, acolhido: false };
    var voltarPara = versao === 'aluno' ? '#/aluno/pesquisa' : '#/responsavel/pesquisa';

    function visivel(p) {
      if (!p.se) return true;
      return Object.keys(p.se).some(function (k) {
        var v = estado.resp[k];
        return [].concat(v === undefined ? [] : v).some(function (x) { return p.se[k].indexOf(x) >= 0; });
      });
    }
    function lista() { return def.perguntas.filter(visivel); }

    function topo(prog) {
      return el('div', { class: 'pq-topo' },
        el('a', { href: voltarPara, class: 'pq-sair' }, '✕ Sair'),
        prog !== null ? el('div', { class: 'progresso', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(prog), 'aria-label': 'Progresso da pesquisa' },
          el('span', { class: 'progresso-barra', 'data-p': String(prog) })) : null);
    }

    function acolhimento(final, botao) {
      var aluno = versao === 'aluno';
      return el('div', { class: 'pq-acolhe' },
        el('p', { class: 'pq-emoji', 'aria-hidden': 'true' }, '🫶'),
        final ? el('h1', { tabindex: '-1' }, 'Obrigado por responder!') : el('h1', { tabindex: '-1' }, 'Obrigado por contar.'),
        aluno ? el('p', { class: 'recado' }, 'Você não está sozinho, e a culpa não é sua. Converse com um adulto de confiança.')
          : el('p', { class: 'recado' }, 'Se seu filho estiver passando por isso, vocês não estão sozinhos. Procure a escola por escrito e conte com estes canais.'),
        botao || null,
        el('h2', { class: 'pq-canais-titulo' }, aluno ? 'Com quem falar' : 'Onde buscar ajuda'),
        listaCanais(aluno ? (nivel || 'f1') : 'adulto'));
    }

    function render() {
      main.innerHTML = '';
      var L = lista();
      var foco = null;
      if (estado.passo === 'ja') {
        add(main, [topo(null), el('div', { class: 'pq-tela' }, el('h1', { tabindex: '-1' }, 'Você já respondeu neste aparelho.'), el('p', null, 'Obrigado pela participação! Para manter a pesquisa justa, vale uma resposta por aparelho.'), acolhimento(true), el('a', { href: voltarPara, class: 'btn' }, 'Voltar'))]);
      } else if (estado.passo === 'intro') {
        var aluno = versao === 'aluno';
        add(main, [topo(null), el('div', { class: 'pq-tela pq-intro' },
          el('p', { class: 'pq-emoji', 'aria-hidden': 'true' }, aluno ? '📝' : '📊'),
          aluno ? el('p', { class: 'pq-autorizacao' }, 'Responda com a autorização de um responsável.') : null,
          el('h1', { tabindex: '-1' }, def.titulo),
          el('ul', { class: 'pq-regras' },
            el('li', null, '🔒 Anônima: sem nome, e-mail, telefone ou turma.'),
            el('li', null, '⏱️ ' + (aluno ? '7' : '6') + ' perguntas rápidas, só de tocar.'),
            el('li', null, '🚪 Você pode sair quando quiser.')),
          el('input', { type: 'text', id: 'hp-site', class: 'hp', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' }),
          el('button', { type: 'button', class: 'btn btn-grande', onclick: function () { estado.passo = 'q'; estado.idx = 0; estado.inicio = Date.now(); render(); } }, aluno ? 'Tenho autorização. Começar' : 'Começar'))]);
      } else if (estado.passo === 'q') {
        var p = L[estado.idx];
        var ordem = def.perguntas.map(function (x) { return x.id; }).indexOf(p.id);
        var prog = Math.round(100 * ordem / def.perguntas.length);
        var atual = estado.resp[p.id];
        var multi = p.tipo === 'varias';
        var escolhidos = multi ? (atual || []).slice() : null;
        var continuar = el('button', { type: 'button', class: 'btn btn-grande', disabled: multi ? !escolhidos.length : atual === undefined, onclick: avancar }, 'Continuar');
        function avancar() {
          if (multi) estado.resp[p.id] = escolhidos;
          var q = def.perguntas.filter(function (x) { return x.id === p.id; })[0];
          if (q.acolher_se && q.acolher_se.indexOf(estado.resp[p.id]) >= 0 && !estado.acolhido) { estado.acolhido = true; estado.passo = 'acolhe'; render(); return; }
          var L2 = lista();
          var pos = L2.map(function (x) { return x.id; }).indexOf(p.id);
          if (pos + 1 >= L2.length) { enviar(); return; }
          estado.idx = pos + 1; render();
        }
        var cls = 'pq-opcoes tipo-' + p.tipo;
        var botoes = p.opcoes.map(function (o) {
          var sel = multi ? escolhidos.indexOf(o.v) >= 0 : atual === o.v;
          return el('button', { type: 'button', class: 'pq-op' + (sel ? ' sel' : ''), 'aria-pressed': sel ? 'true' : 'false', onclick: function () {
            if (multi) {
              var k = escolhidos.indexOf(o.v);
              if (k >= 0) escolhidos.splice(k, 1); else escolhidos.push(o.v);
              this.classList.toggle('sel'); this.setAttribute('aria-pressed', this.classList.contains('sel') ? 'true' : 'false');
              continuar.disabled = !escolhidos.length;
            } else {
              estado.resp[p.id] = o.v;
              botoes.forEach(function (b) { b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
              this.classList.add('sel'); this.setAttribute('aria-pressed', 'true');
              continuar.disabled = false;
              setTimeout(avancar, 260);
            }
          } }, o.e ? el('span', { class: 'pq-op-emoji', 'aria-hidden': 'true' }, o.e) : null, el('span', { class: 'pq-op-txt' }, o.r));
        });
        add(main, [topo(prog), el('div', { class: 'pq-tela' },
          el('p', { class: 'pq-contador' }, 'Pergunta ' + (ordem + 1) + ' de ' + def.perguntas.length),
          foco = el('h1', { class: 'pq-pergunta', tabindex: '-1' }, p.texto),
          p.ajuda ? el('p', { class: 'pq-ajuda' }, p.ajuda) : null,
          p.tipo === 'escala0a10' ? el('div', { class: 'escala-legenda', 'aria-hidden': 'true' }, el('span', null, '0 = nada'), el('span', null, '10 = totalmente')) : null,
          el('div', { class: cls, role: 'group', 'aria-label': p.texto }, botoes),
          el('div', { class: 'pq-acoes' },
            estado.idx > 0 ? el('button', { type: 'button', class: 'btn btn-sec', onclick: function () { estado.idx--; render(); } }, '← Voltar') : el('span'),
            continuar))]);
      } else if (estado.passo === 'acolhe') {
        add(main, [topo(Math.round(100 * 4 / def.perguntas.length)), el('div', { class: 'pq-tela' }, acolhimento(false, el('button', { type: 'button', class: 'btn btn-grande', onclick: function () {
            estado.passo = 'q';
            var L2 = lista(); var pos = L2.map(function (x) { return x.id; }).indexOf('comigo');
            estado.idx = Math.min(pos + 1, L2.length - 1); render();
          } }, 'Continuar a pesquisa')))]);
      } else if (estado.passo === 'enviando') {
        add(main, [topo(100), el('div', { class: 'pq-tela' }, el('h1', { tabindex: '-1' }, 'Enviando…'))]);
      } else if (estado.passo === 'erro') {
        add(main, [topo(100), el('div', { class: 'pq-tela' }, el('h1', { tabindex: '-1' }, 'Não foi possível enviar'), el('p', null, estado.erro || 'Verifique a internet e tente de novo.'),
          el('button', { type: 'button', class: 'btn btn-grande', onclick: enviar }, 'Tentar de novo'))]);
      } else if (estado.passo === 'fim') {
        add(main, [topo(100), el('div', { class: 'pq-tela' }, window.CONFIG && !CONFIG.api ? el('p', { class: 'nota' }, 'Modo de demonstração: esta resposta não foi gravada.') : null, acolhimento(true), el('a', { href: voltarPara, class: 'btn' }, 'Voltar ao site'))]);
      }
      aplicarProgresso(main);
      var alvo = foco || main.querySelector('h1');
      if (alvo) alvo.focus({ preventScroll: false });
      window.scrollTo(0, 0);
    }

    function enviar() {
      var limpo = {};
      lista().forEach(function (p) { if (estado.resp[p.id] !== undefined) limpo[p.id] = estado.resp[p.id]; });
      estado.passo = 'enviando'; render();
      var hp = document.getElementById('hp-site');
      var ua = navigator.userAgent.toLowerCase();
      var sistema = /android/.test(ua) ? 'Android' : /iphone|ipad|ipod/.test(ua) ? 'iOS' : /windows/.test(ua) ? 'Windows' : /mac os/.test(ua) ? 'macOS' : /cros/.test(ua) ? 'ChromeOS' : /linux/.test(ua) ? 'Linux' : 'Outro';
      var aparelho = /ipad|tablet/.test(ua) || (sistema === 'Android' && !/mobile/.test(ua)) ? 'Tablet' : /mobile|iphone|ipod/.test(ua) ? 'Celular' : 'Computador';
      var corpo = JSON.stringify({ versao: versao, respostas: limpo, duracao_seg: Math.round((Date.now() - estado.inicio) / 1000), aparelho: aparelho, sistema: sistema, site: hp ? hp.value : '' });
      var envio = CFG.api
        ? fetch(CFG.api, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: corpo }).then(function (r) { return r.json().then(function (j) { return { ok: !!j.ok, j: j }; }); })
        : new Promise(function (ok) { setTimeout(function () { ok({ ok: true, j: { demo: true } }); }, 500); });
      envio
        .then(function (res) {
          if (res.ok) { store.set('es_pesquisa_' + versao, new Date().toISOString()); estado.passo = 'fim'; }
          else { estado.passo = 'erro'; estado.erro = res.j && res.j.erro; }
          render();
        })
        .catch(function () { estado.passo = 'erro'; estado.erro = null; render(); });
    }

    render();
    return main;
  }

  /* ================= ROTEADOR ================= */
  var renderizado = null;
  function rota() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var partes = h.split('/');
    var area = partes[0] || 'inicio';
    var sub = partes[1] || '';
    var chave = area === 'pesquisa' ? 'pesquisa-' + sub : area;
    if (['inicio', 'aluno', 'responsavel', 'pesquisa-aluno', 'pesquisa-responsavel'].indexOf(chave) < 0) { chave = 'inicio'; sub = ''; }

    if (chave !== renderizado) {
      areaAtual = chave;
      app.innerHTML = '';
      var view = chave === 'aluno' ? viewAluno() : chave === 'responsavel' ? viewResponsavel()
        : chave === 'pesquisa-aluno' ? viewPesquisa('aluno') : chave === 'pesquisa-responsavel' ? viewPesquisa('responsavel') : viewInicio();
      add(app, [view, botaoAjuda(), el('div', { id: 'anuncio', class: 'sr', 'aria-live': 'polite' })]);
      renderizado = chave;
      document.title = (chave === 'aluno' ? 'Sou aluno · ' : chave === 'responsavel' ? 'Sou responsável · ' : chave.indexOf('pesquisa') === 0 ? 'Pesquisa · ' : '') + S.nome;
      if (!sub) window.scrollTo(0, 0);
    }
    if (sub && chave.indexOf('pesquisa') !== 0) {
      var alvo = document.getElementById('sec-' + sub);
      if (alvo) {
        alvo.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        alvo.focus({ preventScroll: true });
      }
    }
  }
  window.addEventListener('hashchange', rota);
  rota();
  carregar();
  carregarAssinaturas();
})();
