/*
 * Configuração do site — Famílias por uma Escola Segura
 *
 * api: endereço do "App da Web" do Google Apps Script (termina em /exec).
 *      Enquanto estiver vazio, o site funciona em modo de demonstração:
 *      mostra o conteúdo abaixo e a pesquisa NÃO grava respostas.
 */
window.CONFIG = {
  api: '',
  padrao: {
  "site": {
    "nome": "Famílias por uma Escola Segura",
    "missao": "Toda criança merece crescer, aprender e conviver em um ambiente seguro, respeitoso e livre de violência.",
    "resumo_situacao": "O movimento Famílias por uma Escola Segura nasceu da iniciativa de famílias do 5º ano do Colégio Ser, em Sorocaba, que querem participar ativamente de ações de prevenção ao bullying e ao cyberbullying. A proposta se estende a toda a comunidade escolar.\n\nAs famílias estão finalizando um abaixo-assinado que pede à escola um posicionamento formal, os protocolos e canais que já existem, uma reunião com a Comissão de Famílias e um plano de ação com responsáveis e cronograma. O protocolo na secretaria está previsto para 10/11/2026.",
    "abaixo_assinado": "",
    "contato": "criar-email",
    "assinatura": "Comissão de Famílias",
    "peticao": {
      "link": "",
      "assinaturas": 0,
      "texto_botao": "Assine a petição"
    },
    "etapas": [
      {
        "nome": "Protocolo do abaixo-assinado na secretaria",
        "prazo_texto": "Data do protocolo",
        "data": "2026-11-10",
        "situacao": "previsto"
      },
      {
        "nome": "Posicionamento formal da escola",
        "prazo_texto": "5 dias úteis após o protocolo",
        "data": "2026-11-17",
        "situacao": "aguardando"
      },
      {
        "nome": "Envio dos protocolos e canais existentes",
        "prazo_texto": "5 dias úteis após o protocolo",
        "data": "2026-11-17",
        "situacao": "aguardando"
      },
      {
        "nome": "Reunião com a Comissão de Famílias",
        "prazo_texto": "10 dias úteis após o protocolo",
        "data": "2026-11-25",
        "situacao": "aguardando"
      },
      {
        "nome": "Plano de ação com responsáveis e cronograma",
        "prazo_texto": "10 dias úteis após o protocolo",
        "data": "2026-11-25",
        "situacao": "aguardando"
      },
      {
        "nome": "Relatório de acompanhamento",
        "prazo_texto": "A cada 2 meses, a partir do plano de ação",
        "data": "2027-01-25",
        "situacao": "aguardando"
      }
    ],
    "respostas_escola": [],
    "acoes_familias": [],
    "pesquisa": {
      "minimo": 30,
      "compartilhar_com_escola": true
    },
    "atualizado_em": "2026-11-06"
  },
  "resultados": {
    "aluno": {
      "total": 0,
      "minimo": 30,
      "liberado": false,
      "perguntas": {}
    },
    "responsavel": {
      "total": 0,
      "minimo": 30,
      "liberado": false,
      "perguntas": {}
    }
  }
}
};
