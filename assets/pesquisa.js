/* Perguntas da pesquisa (iguais às do script da planilha) */
window.PESQUISA = {
  "aluno": {
    "titulo": "Pesquisa dos alunos",
    "perguntas": [
      {
        "id": "segmento",
        "texto": "Em que segmento você está?",
        "tipo": "unica",
        "opcoes": [
          {
            "v": "f1",
            "r": "Fundamental I",
            "e": "🎒"
          },
          {
            "v": "f2",
            "r": "Fundamental II",
            "e": "📚"
          },
          {
            "v": "em",
            "r": "Médio",
            "e": "🎓"
          }
        ]
      },
      {
        "id": "seguro",
        "texto": "Você se sente seguro na escola?",
        "tipo": "escala5",
        "opcoes": [
          {
            "v": "1",
            "r": "Nada seguro",
            "e": "😟"
          },
          {
            "v": "2",
            "r": "Pouco seguro",
            "e": "🙁"
          },
          {
            "v": "3",
            "r": "Mais ou menos",
            "e": "😐"
          },
          {
            "v": "4",
            "r": "Seguro",
            "e": "🙂"
          },
          {
            "v": "5",
            "r": "Muito seguro",
            "e": "😄"
          }
        ]
      },
      {
        "id": "viu",
        "texto": "Você já viu um colega sendo humilhado, excluído ou ameaçado?",
        "tipo": "unica",
        "opcoes": [
          {
            "v": "nunca",
            "r": "Nunca",
            "e": "🙂"
          },
          {
            "v": "as_vezes",
            "r": "Às vezes",
            "e": "😕"
          },
          {
            "v": "muitas",
            "r": "Muitas vezes",
            "e": "😣"
          }
        ]
      },
      {
        "id": "comigo",
        "texto": "Isso já aconteceu com você?",
        "tipo": "unica",
        "acolher_se": [
          "agora"
        ],
        "opcoes": [
          {
            "v": "nunca",
            "r": "Nunca",
            "e": "🙂"
          },
          {
            "v": "ja",
            "r": "Já aconteceu",
            "e": "😕"
          },
          {
            "v": "agora",
            "r": "Está acontecendo agora",
            "e": "😣"
          }
        ]
      },
      {
        "id": "onde",
        "texto": "Onde acontece?",
        "ajuda": "Pode marcar mais de uma.",
        "tipo": "varias",
        "se": {
          "comigo": [
            "ja",
            "agora"
          ]
        },
        "opcoes": [
          {
            "v": "sala",
            "r": "Sala",
            "e": "🏫"
          },
          {
            "v": "intervalo",
            "r": "Intervalo",
            "e": "⚽"
          },
          {
            "v": "entrada_saida",
            "r": "Entrada ou saída",
            "e": "🚪"
          },
          {
            "v": "internet",
            "r": "Internet e grupos",
            "e": "📱"
          }
        ]
      },
      {
        "id": "contou",
        "texto": "Você contou para algum adulto?",
        "ajuda": "Sobre o que aconteceu com você ou com um colega.",
        "tipo": "unica",
        "se": {
          "viu": [
            "as_vezes",
            "muitas"
          ],
          "comigo": [
            "ja",
            "agora"
          ]
        },
        "opcoes": [
          {
            "v": "nao",
            "r": "Não",
            "e": "🤐"
          },
          {
            "v": "sim_mudou",
            "r": "Sim, e algo mudou",
            "e": "👍"
          },
          {
            "v": "sim_nada",
            "r": "Sim, e nada mudou",
            "e": "👎"
          }
        ]
      },
      {
        "id": "melhorar",
        "texto": "O que deixaria a escola mais segura?",
        "ajuda": "Pode marcar mais de uma.",
        "tipo": "varias",
        "opcoes": [
          {
            "v": "professores",
            "r": "Professores mais atentos",
            "e": "👀"
          },
          {
            "v": "jeito_seguro",
            "r": "Um jeito seguro de contar",
            "e": "🤝"
          },
          {
            "v": "conversas",
            "r": "Conversas sobre respeito",
            "e": "💬"
          },
          {
            "v": "regras",
            "r": "Regras mais claras",
            "e": "📋"
          }
        ]
      }
    ]
  },
  "responsavel": {
    "titulo": "Pesquisa dos responsáveis",
    "perguntas": [
      {
        "id": "segmento",
        "texto": "Em que segmento está seu filho?",
        "ajuda": "Se tiver mais de um filho na escola, marque todos.",
        "tipo": "varias",
        "opcoes": [
          {
            "v": "f1",
            "r": "Fundamental I",
            "e": "🎒"
          },
          {
            "v": "f2",
            "r": "Fundamental II",
            "e": "📚"
          },
          {
            "v": "em",
            "r": "Médio",
            "e": "🎓"
          }
        ]
      },
      {
        "id": "viveu",
        "texto": "Seu filho já viveu ou presenciou bullying na escola?",
        "tipo": "unica",
        "opcoes": [
          {
            "v": "nao",
            "r": "Não",
            "e": "🙂"
          },
          {
            "v": "nao_sei",
            "r": "Não sei",
            "e": "🤔"
          },
          {
            "v": "presenciou",
            "r": "Presenciou",
            "e": "👀"
          },
          {
            "v": "viveu",
            "r": "Viveu",
            "e": "😣"
          }
        ]
      },
      {
        "id": "avisou",
        "texto": "Você avisou a escola?",
        "tipo": "unica",
        "se": {
          "viveu": [
            "presenciou",
            "viveu"
          ]
        },
        "opcoes": [
          {
            "v": "nao",
            "r": "Não",
            "e": "✋"
          },
          {
            "v": "sim_retorno",
            "r": "Sim, e houve retorno",
            "e": "📨"
          },
          {
            "v": "sim_sem",
            "r": "Sim, e não houve retorno",
            "e": "📭"
          }
        ]
      },
      {
        "id": "canais",
        "texto": "Você conhece os canais da escola para esses casos?",
        "tipo": "unica",
        "opcoes": [
          {
            "v": "sim",
            "r": "Sim",
            "e": "✅"
          },
          {
            "v": "nao",
            "r": "Não",
            "e": "❔"
          }
        ]
      },
      {
        "id": "confianca",
        "texto": "De 0 a 10, quanto você confia que a escola lida bem com bullying?",
        "tipo": "escala0a10",
        "opcoes": [
          {
            "v": "0",
            "r": "0",
            "e": ""
          },
          {
            "v": "1",
            "r": "1",
            "e": ""
          },
          {
            "v": "2",
            "r": "2",
            "e": ""
          },
          {
            "v": "3",
            "r": "3",
            "e": ""
          },
          {
            "v": "4",
            "r": "4",
            "e": ""
          },
          {
            "v": "5",
            "r": "5",
            "e": ""
          },
          {
            "v": "6",
            "r": "6",
            "e": ""
          },
          {
            "v": "7",
            "r": "7",
            "e": ""
          },
          {
            "v": "8",
            "r": "8",
            "e": ""
          },
          {
            "v": "9",
            "r": "9",
            "e": ""
          },
          {
            "v": "10",
            "r": "10",
            "e": ""
          }
        ]
      },
      {
        "id": "medo",
        "texto": "Seu filho tem medo de ir à escola por causa de colegas?",
        "tipo": "unica",
        "opcoes": [
          {
            "v": "nunca",
            "r": "Nunca",
            "e": "🙂"
          },
          {
            "v": "as_vezes",
            "r": "Às vezes",
            "e": "😕"
          },
          {
            "v": "frequencia",
            "r": "Com frequência",
            "e": "😣"
          }
        ]
      }
    ]
  }
};
