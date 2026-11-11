/*
 * Textos de orientação — Famílias por uma Escola Segura
 * Redigidos a partir de: Cartilha "Bullying e Cyberbullying" (MPRS, 2026),
 * Lei 13.185/2015, materiais da SaferNet Brasil e PeNSE 2024 (IBGE).
 * IMPORTANTE: revisar com a Comissão de Famílias antes de publicar.
 *
 * Na área do aluno: "f1" = Fundamental I (mais lúdico)
 *                   "f2" = Fundamental II e Médio (mais direto)
 */
window.TEXTOS = {
  fontes: {
    cartilha: 'Cartilha “Bullying e Cyberbullying”, Ministério Público do Rio Grande do Sul (CAO Educação, Infância e Juventude), 2026.',
    lei: 'Lei nº 13.185/2015 (Programa de Combate à Intimidação Sistemática).',
    safernet: 'SaferNet Brasil — orientações sobre cyberbullying e Canal de Ajuda.',
    pense: 'IBGE, Pesquisa Nacional de Saúde do Escolar (PeNSE) 2024, divulgação de resultados em 25/03/2026.'
  },

  /* ---------------- Canais de ajuda (seção 8) ---------------- */
  canais: {
    adulto: [
      { titulo: 'Coordenação do Colégio Ser', para: 'Primeiro contato sobre um caso', contato: [{ t: 'Pelo aplicativo Layers' }] },
      { titulo: 'Conselho Tutelar de Sorocaba', para: 'Violência ou risco a uma criança', contato: [
        { t: '(15) 3235-1212', tel: '1532351212', obs: 'seg. a sex., 8h às 17h' },
        { t: '125 ou 153', tel: '153', obs: 'fins de semana e feriados (Guarda Civil Municipal)' },
        { t: 'Av. General Carneiro, 312, Vila Soares' }
      ] },
      { titulo: 'Disque 100', para: 'Denúncia de violência contra crianças e adolescentes, inclusive anônima', contato: [
        { t: 'Ligue 100', tel: '100', obs: 'grátis, 24 horas' },
        { t: 'WhatsApp (61) 99611-0100', link: 'https://wa.me/5561996110100' }
      ] },
      { titulo: 'SaferNet — Canal de Ajuda', para: 'Orientação em casos de cyberbullying', contato: [
        { t: 'Conversar por chat ou e-mail', link: 'https://new.safernet.org.br/helpline' }
      ] },
      { titulo: 'Emergência', para: 'Risco imediato', destaque: true, contato: [
        { t: '190 · Polícia', tel: '190' },
        { t: '192 · SAMU', tel: '192' }
      ] }
    ],
    f1: [
      { titulo: 'Um adulto de confiança', para: 'Pai, mãe, avó, tio, professora… Alguém que cuida de você. Conte o que está acontecendo.', icone: '🧡' },
      { titulo: 'Na escola', para: 'Procure sua professora ou a coordenação. Pode ir com um amigo.', icone: '🏫' },
      { titulo: 'Disque 100', para: 'É uma ligação grátis. Você pode ligar sem dizer seu nome.', icone: '☎️', contato: [{ t: 'Ligar 100', tel: '100' }] },
      { titulo: 'Se for na internet', para: 'Mostre para um adulto. Juntos vocês podem pedir ajuda à SaferNet.', icone: '📱', contato: [{ t: 'SaferNet', link: 'https://new.safernet.org.br/helpline' }] },
      { titulo: 'Perigo agora?', para: 'Se alguém está machucado ou em perigo, peça para um adulto ligar.', icone: '🚨', destaque: true, contato: [{ t: '190 · Polícia', tel: '190' }, { t: '192 · SAMU', tel: '192' }] }
    ],
    f2: [
      { titulo: 'Um adulto de confiança', para: 'Em casa ou na escola: pais, responsáveis, um professor, a coordenação. Se o primeiro não ajudar, procure outro.', icone: '🧡' },
      { titulo: 'Disque 100', para: 'Para violência contra crianças e adolescentes. Grátis, 24 horas, pode ser anônimo.', icone: '☎️', contato: [{ t: 'Ligar 100', tel: '100' }, { t: 'WhatsApp (61) 99611-0100', link: 'https://wa.me/5561996110100' }] },
      { titulo: 'SaferNet — Canal de Ajuda', para: 'Para cyberbullying, exposição, ameaças online. Atendimento por chat ou e-mail.', icone: '📱', contato: [{ t: 'Abrir o Canal de Ajuda', link: 'https://new.safernet.org.br/helpline' }] },
      { titulo: 'Conselho Tutelar de Sorocaba', para: 'Quando há violência ou risco e os adultos por perto não resolvem.', icone: '🏛️', contato: [{ t: '(15) 3235-1212', tel: '1532351212', obs: 'seg. a sex., 8h às 17h' }, { t: '125 ou 153', tel: '153', obs: 'fins de semana e feriados' }] },
      { titulo: 'Perigo agora?', para: 'Se alguém está em risco imediato.', icone: '🚨', destaque: true, contato: [{ t: '190 · Polícia', tel: '190' }, { t: '192 · SAMU', tel: '192' }] }
    ]
  },

  /* ---------------- Página inicial ---------------- */
  inicio: {
    portaAluno: { titulo: 'Sou aluno', sub: 'Entenda, se proteja e ajude um colega' },
    portaResp: { titulo: 'Sou responsável', sub: 'Orientação, direitos e pesquisa' }
  },

  /* ---------------- Área do aluno ---------------- */
  aluno: {
    intro: {
      f1: 'Aqui você aprende a diferença entre brincadeira e bullying, o que fazer se acontecer com você ou com um colega, e com quem conversar.',
      f2: 'Um espaço para entender o que é bullying e cyberbullying, saber como agir e onde buscar ajuda. Sem julgamento.'
    },
    secoes: [
      { id: 'pesquisa', titulo: 'Pesquisa do aluno', curto: 'Pesquisa' },
      { id: 'quiz', titulo: 'Isso é bullying ou brincadeira?', curto: 'Quiz' },
      { id: 'termometro', titulo: 'Termômetro do respeito', curto: 'Termômetro' },
      { id: 'comigo', titulo: 'Se está acontecendo com você', curto: 'Comigo' },
      { id: 'vejo', titulo: 'Se você vê acontecer', curto: 'Eu vi' },
      { id: 'internet', titulo: 'Na internet', curto: 'Internet' },
      { id: 'ajuda', titulo: 'Onde buscar ajuda', curto: 'Ajuda' }
    ],

    quiz: {
      intro: {
        f1: 'Leia cada situação e escolha o que você acha. Não tem nota: o importante é pensar junto!',
        f2: 'Nem todo conflito é bullying, e nem toda “zoeira” é brincadeira. Escolha uma resposta para cada situação e veja a explicação.'
      },
      opcoes: [
        { v: 'nao', r: 'Não é bullying', e: '✅' },
        { v: 'atencao', r: 'Fique atento', e: '⚠️' },
        { v: 'bullying', r: 'É bullying', e: '🛑' }
      ],
      situacoes: [
        { resp: 'nao',
          f1: { t: 'Dois amigos inventam apelidos engraçados um para o outro no recreio. Os dois riem juntos.', x: 'Quando todo mundo está se divertindo, é brincadeira. Mas, se um deles pedir para parar, é hora de parar.' },
          f2: { t: 'Você e seu melhor amigo se zoam com apelidos. Os dois acham graça e ninguém se incomoda.', x: 'Brincadeira é quando todos se divertem. Se a outra pessoa pedir para parar e você continuar, deixou de ser brincadeira.' } },
        { resp: 'bullying',
          f1: { t: 'Todo dia, um grupo chama um colega por um apelido sobre o corpo dele. Ele já pediu para pararem, mas eles continuam.', x: 'É bullying: acontece de novo e de novo, é de propósito e faz o colega sofrer. Ele precisa da ajuda de um adulto.' },
          f2: { t: 'Um grupo usa um apelido sobre a aparência de um colega todos os dias. Ele já pediu para pararem.', x: 'Repetição, intenção e um lado mais forte (o grupo): são os sinais do bullying. A pessoa não precisa “aguentar” nem “levar na esportiva”.' } },
        { resp: 'nao',
          f1: { t: 'Um colega não te convidou para a festa de aniversário dele.', x: 'Ficar chateado é normal. Mas ninguém é obrigado a convidar todo mundo, e isso não é bullying. Diferente é quando um grupo combina de deixar alguém sempre de fora, de propósito.' },
          f2: { t: 'Um colega não te chamou para o aniversário dele.', x: 'Pode doer, mas não ser amigo de alguém não é bullying. Excluir de propósito e de forma repetida, para humilhar, é outra história.' } },
        { resp: 'bullying',
          f1: { t: 'No grupo de mensagens da turma, alguém postou uma foto de um colega com um desenho para zoar. Muita gente mandou risadas.', x: 'É cyberbullying. Na internet, uma foto se espalha muito rápido e é difícil apagar. Quem manda risada também ajuda a machucar.' },
          f2: { t: 'Alguém posta no grupo da turma uma montagem com a foto de um colega, e várias pessoas reagem rindo.', x: 'É cyberbullying. Na internet, o alcance é grande e o conteúdo fica. Reagir, encaminhar ou curtir também espalha a violência.' } },
        { resp: 'nao',
          f1: { t: 'Dois colegas brigam por causa de um gol no futebol. No dia seguinte, estão jogando juntos de novo.', x: 'Brigas acontecem e podem ser resolvidas. Isso não é bullying, porque foi uma vez, de igual para igual, e passou.' },
          f2: { t: 'Dois colegas discutem feio no jogo, mas no dia seguinte já estão de boa.', x: 'Conflito pontual entre iguais não é bullying. Bullying é repetido, intencional e com desequilíbrio de poder.' } },
        { resp: 'bullying',
          f1: { t: 'Um colega mais velho sempre pega seu lanche no intervalo e diz que, se você contar, vai ser pior.', x: 'É bullying, e a ameaça é para você ficar quieto. Contar para um adulto não é “dedurar”: é se proteger.' },
          f2: { t: 'Um aluno mais velho pega suas coisas e ameaça você caso conte para alguém.', x: 'É bullying com ameaça. Pedir ajuda é o caminho mais seguro, e a culpa nunca é de quem sofre.' } },
        { resp: 'nao',
          f1: { t: 'Uma colega fez uma piada sobre seu cabelo. Você ficou chateado, ela percebeu, pediu desculpas e nunca mais fez.', x: 'Foi uma atitude chata, mas ela parou e pediu desculpas. Isso é o certo a fazer quando a gente magoa alguém!' },
          f2: { t: 'Alguém fez uma piada sobre você, percebeu que te incomodou, pediu desculpas e não repetiu.', x: 'Errar acontece. Perceber, parar e pedir desculpas é exatamente o que se espera. Não virou bullying.' } },
        { resp: 'atencao',
          f1: { t: 'Começaram a te chamar por um apelido que você não gosta. Já aconteceu duas vezes.', x: 'Ainda pode parar. Diga com calma: “Não gosto, para.” Se continuar, conte para um adulto, porque pode virar bullying.' },
          f2: { t: 'Puxaram um apelido que você odeia. Foi duas vezes até agora.', x: 'Sinal de alerta. Diga claramente que não gosta. Se continuar, procure um adulto: repetição é o que transforma em bullying.' } },
        { resp: 'atencao',
          f1: { t: 'Na fila, um colega te empurrou. Você não sabe se foi sem querer.', x: 'Pode ter sido sem querer. Se acontecer de novo e parecer de propósito, conte para a professora.' },
          f2: { t: 'Você levou um esbarrão no corredor e não sabe se foi de propósito.', x: 'Uma vez, sem certeza, pede atenção, não conclusão. Se começar a se repetir, registre e fale com um adulto.' } }
      ],
      final: {
        f1: ['Você chegou ao fim! Lembre das três pistas do bullying:', 'Acontece de novo e de novo.', 'É de propósito, para machucar ou humilhar.', 'Um lado tem mais força: é maior, mais velho ou está em grupo.'],
        f2: ['Fim! As três marcas do bullying, segundo a lei:', 'Repetição.', 'Intenção de intimidar, humilhar ou agredir.', 'Desequilíbrio de poder (idade, força, grupo, popularidade).']
      }
    },

    termometro: {
      intro: {
        f1: 'Toque em uma frase e veja onde ela fica no termômetro.',
        f2: 'Escolha um comportamento e veja onde ele fica: amizade, convivência ou algo que não é aceitável.'
      },
      zonas: [
        { id: 'amigo', titulo: 'Coisa de amigo', e: '💚', f1: 'Que bom! Isso é amizade.', f2: 'Isso é amizade de verdade.' },
        { id: 'colega', titulo: 'Colega, não amigo', e: '💛', f1: 'Vocês podem ser só colegas. Tudo bem, isso não é bullying.', f2: 'Vocês podem ser colegas sem ser amigos. Isso não é bullying.' },
        { id: 'nao', titulo: 'Não é aceitável', e: '❤️', f1: 'Isso não está certo. Se acontece de novo e de novo, é bullying. Peça ajuda a um adulto.', f2: 'Não é aceitável. Se é repetido, é bullying. Peça ajuda.' }
      ],
      itens: [
        { z: 'amigo', f1: 'Respeita minhas escolhas', f2: 'Respeita minhas escolhas' },
        { z: 'amigo', f1: 'Gosta de mim do jeito que eu sou', f2: 'Me aceita como eu sou' },
        { z: 'amigo', f1: 'Fica feliz quando dá certo pra mim', f2: 'Fica feliz por mim' },
        { z: 'amigo', f1: 'Brinca comigo', f2: 'Faz coisas comigo' },
        { z: 'colega', f1: 'Não liga muito para mim', f2: 'É indiferente comigo' },
        { z: 'colega', f1: 'Não me chama para tudo', f2: 'Não me convida para tudo' },
        { z: 'nao', f1: 'Ri de mim para me deixar mal', f2: 'Debocha de mim' },
        { z: 'nao', f1: 'Me chama por apelido que eu não gosto', f2: 'Usa apelidos que eu não gosto' },
        { z: 'nao', f1: 'Inventa mentiras sobre mim', f2: 'Espalha mentiras sobre mim' },
        { z: 'nao', f1: 'Manda coisas ruins sobre mim no celular', f2: 'Posta ou manda ofensas sobre mim' },
        { z: 'nao', f1: 'Diz que vai me machucar', f2: 'Ameaça ou chantageia' },
        { z: 'nao', f1: 'Me obriga a fazer o que eu não quero', f2: 'Me obriga a fazer o que eu não quero' },
        { z: 'nao', f1: 'Pega ou estraga minhas coisas', f2: 'Pega ou estraga minhas coisas' },
        { z: 'nao', f1: 'Bate, empurra ou machuca', f2: 'Age com violência física' },
        { z: 'nao', urgente: true, f1: 'Toca no meu corpo de um jeito que eu não quero', f2: 'Toca no meu corpo sem eu querer' }
      ],
      urgente: {
        f1: 'Ninguém pode tocar no seu corpo sem você querer. Conte agora para um adulto de confiança, mesmo que tenha acontecido só uma vez.',
        f2: 'Isso nunca é aceitável, nem uma vez. Conte para um adulto de confiança agora ou ligue 100.'
      }
    },

    comigo: {
      f1: {
        recado: 'A culpa não é sua. Ninguém merece ser machucado ou humilhado.',
        passos: [
          { e: '🗣️', t: 'Conte para um adulto', x: 'Pode ser alguém da sua casa, sua professora ou a coordenação. Contar não é dedurar: é cuidar de você.' },
          { e: '🔁', t: 'Se não ajudarem, conte de novo', x: 'Às vezes o adulto não entende na primeira vez. Conte de novo ou procure outro adulto.' },
          { e: '👫', t: 'Fique perto de quem gosta de você', x: 'No recreio, fique perto de amigos e de lugares onde há adultos.' },
          { e: '🙅', t: 'Você não precisa revidar', x: 'Bater de volta pode piorar e te colocar em risco. Saia de perto e procure ajuda.' }
        ],
        frasesIntro: 'Não sabe como começar a conversa? Experimente:',
        frases: ['Posso te contar uma coisa que está me deixando triste?', 'Tem um colega que está me tratando mal e eu não sei o que fazer.', 'Preciso da sua ajuda com uma coisa da escola.', 'Promete que vai me ouvir até o fim?']
      },
      f2: {
        recado: 'A culpa não é sua. Nada que você seja ou faça justifica ser humilhado, ameaçado ou excluído de propósito.',
        passos: [
          { e: '🗣️', t: 'Fale com um adulto de confiança', x: 'Pais, responsáveis, um professor, a coordenação. Pedir ajuda não é fraqueza: é estratégia.' },
          { e: '📝', t: 'Registre o que acontece', x: 'Anote datas, lugares, o que foi dito ou feito e quem viu. Na internet, tire print antes de qualquer coisa.' },
          { e: '🔁', t: 'Insista se não resolver', x: 'Se nada mudar, procure outro adulto ou peça para seus responsáveis falarem com a escola por escrito.' },
          { e: '🧭', t: 'Proteja-se sem revidar', x: 'Revidar pode virar contra você. Evite ficar sozinho nos lugares onde acontece e saia da situação.' }
        ],
        frasesIntro: 'Difícil começar? Algumas frases que ajudam:',
        frases: ['Preciso te contar uma coisa séria, mas quero que você me ouça antes de agir.', 'Está acontecendo uma coisa na escola que está me fazendo mal.', 'Não quero que você vá tirar satisfação. Quero que a gente pense junto no que fazer.', 'Tem gente me expondo na internet e eu não sei como parar.']
      }
    },

    vejo: {
      f1: {
        intro: 'Você não precisa ser super-herói. Pequenas atitudes fazem muita diferença.',
        ajudar: [
          { e: '🚫', t: 'Não ria junto', x: 'Quando ninguém ri, a “graça” acaba.' },
          { e: '🧑‍🏫', t: 'Chame um adulto', x: 'Conte para a professora ou para alguém da escola. Pode contar baixinho, só para ela.' },
          { e: '🤝', t: 'Chegue perto depois', x: 'Diga: “Quer brincar com a gente?” ou “Eu vi, e não foi legal.”' },
          { e: '📵', t: 'Não passe para frente', x: 'Se for no celular, não mande para mais ninguém.' }
        ],
        lembrete: 'Não precisa enfrentar quem está fazendo. Sua segurança vem primeiro.'
      },
      f2: {
        intro: 'Quem assiste também tem poder. Dá para ajudar sem se expor.',
        ajudar: [
          { e: '🚫', t: 'Não dê plateia', x: 'Não ria, não grave, não comente. Sem público, a agressão perde força.' },
          { e: '🧑‍🏫', t: 'Avise um adulto, com discrição', x: 'Fale reservadamente com um professor ou com a coordenação. Você pode pedir para não ser identificado.' },
          { e: '🤝', t: 'Apoie quem sofreu', x: 'Uma mensagem privada (“Vi o que fizeram, não foi justo”) ou um convite para sentar junto ajuda muito.' },
          { e: '📵', t: 'Corte a corrente', x: 'Não encaminhe, não curta. Se puder, denuncie o conteúdo na plataforma.' }
        ],
        lembrete: 'Você não precisa confrontar ninguém. Proteger a si mesmo também é importante.'
      }
    },

    internet: {
      f1: {
        intro: 'Se alguém te deixar mal no celular, no jogo ou no grupo, faça estes passos com um adulto:',
        passos: [
          { e: '📸', t: 'Tire print', x: 'Guarde uma foto da tela antes de apagar. Assim o adulto consegue ver e ajudar.', dica: 'No Android: aperte ligar + diminuir volume. No iPhone: botão lateral + aumentar volume.' },
          { e: '⛔', t: 'Bloqueie', x: 'Bloqueie quem está te incomodando. Você não precisa responder.' },
          { e: '🚩', t: 'Denuncie no aplicativo', x: 'Quase todo app tem um botão “Denunciar”. Peça ajuda a um adulto para achar.' },
          { e: '🧡', t: 'Conte para um adulto', x: 'Mostre o que aconteceu. Você não fez nada de errado.' }
        ]
      },
      f2: {
        intro: 'Cyberbullying é intimidação por meio digital: redes, mensagens, jogos. Quatro passos, nesta ordem:',
        passos: [
          { e: '📸', t: 'Tire print', x: 'Mostre a data, o perfil e a mensagem. Salve o link, se tiver. Faça isso antes de bloquear ou apagar.', dica: 'Android: ligar + diminuir volume. iPhone: lateral + aumentar volume. Guarde em uma pasta só para isso.' },
          { e: '⛔', t: 'Bloqueie', x: 'Não responda nem revide: resposta alimenta o ataque. Bloqueie e silencie.' },
          { e: '🚩', t: 'Denuncie na plataforma', x: 'Use “Denunciar” no post, perfil ou grupo. Se houver exposição de imagens íntimas, ameaça ou chantagem, procure ajuda imediatamente.' },
          { e: '🧡', t: 'Conte para um adulto', x: 'Com os prints, um adulto pode acionar a escola, a SaferNet ou outros canais.' }
        ],
        extra: 'Cuidado com o que você encaminha: compartilhar uma humilhação também é participar dela.'
      }
    },

    pesquisa: {
      f1: 'Queremos saber como você se sente na escola. São 7 perguntas rápidas, com figurinhas. Ninguém vai saber quem respondeu. Peça para um adulto da sua casa deixar.',
      f2: 'Pesquisa anônima, 7 perguntas, cerca de 2 minutos. Sem nome, sem turma, sem texto. Responda com a autorização de um responsável.'
    }
  },

  /* ---------------- Área do responsável ---------------- */
  responsavel: {
    intro: 'Orientação prática para reconhecer sinais, conversar, agir e conhecer seus direitos.',
    secoes: [
      { id: 'pesquisa', titulo: 'Pesquisa dos responsáveis', curto: 'Pesquisa' },
      { id: 'sinais', titulo: 'Sinais de alerta', curto: 'Sinais' },
      { id: 'conversar', titulo: 'Como conversar com seu filho', curto: 'Conversar' },
      { id: 'vitima', titulo: 'Se seu filho é vítima', curto: 'Se é vítima' },
      { id: 'pratica', titulo: 'Se seu filho pratica bullying', curto: 'Se pratica' },
      { id: 'direitos', titulo: 'Seus direitos', curto: 'Direitos' },
      { id: 'dados', titulo: 'O que dizem os dados nacionais', curto: 'Dados' }
    ],

    sinais: {
      intro: 'Marque o que você tem percebido. Nada do que você marcar sai do seu aparelho.',
      grupos: [
        { t: 'Na escola', e: '🏫', itens: ['Queda no rendimento ou desinteresse repentino', 'Faltas frequentes ou pedidos para não ir', 'Fica sozinho no recreio, sem grupo', 'Materiais e objetos somem ou voltam estragados', 'Roupas rasgadas ou machucados sem explicação clara', 'Procura ficar sempre perto de adultos'] },
        { t: 'Em casa', e: '🏠', itens: ['Medo ou resistência para ir à escola', 'Dores de cabeça ou de barriga perto do horário da aula', 'Mudanças de humor: irritação, tristeza, choro', 'Mudanças no sono ou no apetite', 'Para de falar de colegas ou deixa de receber convites', 'Pede dinheiro ou lanche a mais sem explicar o motivo'] },
        { t: 'No celular e na internet', e: '📱', itens: ['Fica tenso ou assustado ao receber mensagens', 'Esconde a tela ou muda de assunto quando você chega', 'Sai de grupos ou apaga perfis de repente', 'Passa a evitar o celular, ou a usá-lo escondido de madrugada'] }
      ],
      resultado: [
        { ate: 0, t: 'Marque os sinais que você tem percebido para ver uma orientação.' },
        { ate: 2, t: 'Sinais isolados podem ter muitas causas. Fique atento, observe por alguns dias e abra uma conversa tranquila (veja “Como conversar”).' },
        { ate: 99, t: 'Vários sinais ao mesmo tempo merecem atenção agora. Converse com seu filho com calma, registre o que perceber e procure a escola por escrito. Se houver sofrimento intenso, busque também um profissional de saúde.' }
      ],
      aviso: 'Esta lista ajuda a observar, mas não é um diagnóstico.'
    },

    conversar: {
      intro: 'O objetivo é que seu filho sinta que pode contar, sem medo de bronca, exagero ou descaso.',
      fazer: ['Escolha um momento tranquilo: no carro, cozinhando juntos, antes de dormir.', 'Comece com perguntas abertas: “Como está o recreio?” “Com quem você tem andado?”', 'Escute até o fim, sem interromper nem corrigir.', 'Agradeça a confiança e diga que a culpa não é dele.', 'Combine os próximos passos junto com ele.'],
      evitar: ['Minimizar: “Isso é bobagem, ignora.”', 'Culpar: “O que você fez para isso acontecer?”', 'Prometer sigilo total: você talvez precise acionar a escola.', 'Ir tirar satisfação com a outra criança ou com a família dela.', 'Expor o caso em grupos de pais ou redes sociais.'],
      frasesIntro: 'Frases para abrir o assunto sem assustar:',
      frases: ['“Vi uma notícia sobre bullying e fiquei pensando: isso acontece na sua escola?”', '“Tem alguém na escola que te deixa desconfortável?”', '“Se algum dia alguém te tratar mal, você pode me contar. Eu vou te ouvir antes de fazer qualquer coisa.”', '“Como estão as coisas no grupo da turma?”']
    },

    vitima: {
      intro: 'Um passo de cada vez. O mais importante é que seu filho se sinta protegido e que tudo fique registrado.',
      passos: [
        { t: 'Acolha', x: 'Diga que acredita nele, que a culpa não é dele e que vocês vão resolver juntos. Evite reações explosivas na frente da criança.' },
        { t: 'Registre', x: 'Anote datas, locais, o que aconteceu, como seu filho reagiu e quem presenciou. Um registro simples, feito no mesmo dia, vale muito.' },
        { t: 'Guarde provas', x: 'Em casos online, faça prints com data, nome do perfil e link. Não apague conversas e não repasse o conteúdo para outras pessoas.' },
        { t: 'Comunique a escola por escrito', x: 'Pelo Layers, por e-mail ou por protocolo na secretaria. Peça confirmação de recebimento e guarde uma cópia. Use o modelo abaixo.' },
        { t: 'Saiba o que esperar', x: 'Segundo as orientações do Ministério Público, diante de um caso a escola deve: acolher e identificar; interromper o comportamento; apoiar imediatamente a vítima; comunicar as famílias da vítima e de quem praticou; informar a direção e a equipe pedagógica; acionar o Conselho Tutelar e a rede de proteção quando for o caso; e registrar e acompanhar o caso.' },
        { t: 'Se não houver resposta ou houver risco', x: 'Procure o Conselho Tutelar ou o Disque 100. Em caso de agressão física ou ameaça grave, registre boletim de ocorrência. Para casos online, a SaferNet orienta.' }
      ],
      modelo: {
        titulo: 'Modelo de comunicado à escola',
        intro: 'Preencha e copie o texto. Nada do que você digitar sai do seu aparelho. Os campos entre colchetes você completa depois de copiar.',
        dicaNomes: 'Se precisar citar outras crianças, faça isso apenas no comunicado à escola, de forma objetiva e sem adjetivos.'
      }
    },

    pratica: {
      intro: 'Descobrir que o próprio filho está praticando bullying é difícil. A reação dos adultos faz diferença: o objetivo é mudar o comportamento, não humilhar a criança.',
      passos: [
        { t: 'Mantenha a calma e ouça', x: 'Pergunte o que aconteceu e por quê. Entender o contexto (pressão do grupo, busca de popularidade, algo que ele também está sofrendo) ajuda a agir melhor.' },
        { t: 'Separe a pessoa do comportamento', x: '“Você é importante para mim, e o que você fez não é aceitável.” Rótulos como “você é mau” não ajudam a mudar.' },
        { t: 'Ajude a enxergar o outro lado', x: 'Converse sobre como o colega se sentiu. Perguntas como “Como você se sentiria?” desenvolvem empatia.' },
        { t: 'Proponha reparação', x: 'Pedir desculpas, devolver ou consertar o que estragou, apagar o que postou. Reparar é aprender.' },
        { t: 'Combine regras e acompanhe', x: 'Defina limites claros (inclusive no uso do celular) e acompanhe de perto nas semanas seguintes.' },
        { t: 'Trabalhe junto com a escola', x: 'Mantenha contato com a coordenação. Se o comportamento persistir, procure apoio psicológico.' }
      ],
      evitar: 'Evite punições humilhantes, exposição em grupos de pais ou redes, e reações violentas: elas ensinam exatamente o que se quer mudar.',
      lembrete: 'A lei orienta que se evite, tanto quanto possível, a punição de quem pratica, privilegiando medidas que promovam a responsabilização e a mudança de comportamento (Lei 13.185/2015, art. 4º, VIII).'
    },

    direitos: {
      intro: 'As principais leis, em linguagem simples.',
      itens: [
        { t: 'Lei 13.185/2015 — Programa de Combate ao Bullying', x: ['Define bullying como violência física ou psicológica intencional e repetitiva, praticada por uma pessoa ou grupo, com o objetivo de intimidar ou agredir, em situação de desequilíbrio de poder.', 'Diz que é dever da escola garantir medidas de conscientização, prevenção, diagnóstico e combate ao bullying (art. 5º).', 'Entre os objetivos do programa estão capacitar professores, orientar pais e responsáveis, e dar assistência psicológica, social e jurídica a vítimas e agressores (art. 4º).'] },
        { t: 'LDB, alterada pela Lei 13.663/2018', x: ['Incluiu entre as obrigações de todas as escolas promover medidas de conscientização, prevenção e combate a todos os tipos de violência, especialmente o bullying, e promover a cultura de paz.'] },
        { t: 'Estatuto da Criança e do Adolescente (ECA)', x: ['Nenhuma criança ou adolescente pode ser objeto de negligência, discriminação, violência ou opressão (art. 5º).', 'Pais e responsáveis têm direito de conhecer o processo pedagógico e participar da definição das propostas educacionais (art. 53, parágrafo único).'] },
        { t: 'Lei 14.811/2024 — bullying no Código Penal', x: ['Tornou crime a intimidação sistemática (bullying) e a intimidação sistemática virtual (cyberbullying), esta com punição mais grave.', 'Quando quem pratica tem menos de 18 anos, não há crime, mas ato infracional, tratado pelo ECA com medidas socioeducativas ou de proteção. A lei é um caminho, não o único: a prevenção envolve escola, famílias e sociedade.'] },
        { t: 'ECA Digital — Lei 15.211/2025', x: ['Obriga as plataformas digitais usadas por crianças e adolescentes a adotar medidas para prevenir e reduzir riscos como intimidação virtual e assédio.'] },
        { t: 'Decreto 12.880/2026', x: ['Instituiu a Política Nacional de Promoção e Proteção dos Direitos da Criança e do Adolescente no Ambiente Digital, que tem como princípio a proteção contra todas as formas de violência, incluindo a intimidação.'] }
      ],
      aviso: 'Este resumo não substitui orientação jurídica. Em caso de dúvida, procure a Defensoria Pública, a OAB ou um advogado.'
    },

    dados: {
      intro: 'Antes de ver os números, teste seu palpite. Os dados são da PeNSE 2024, do IBGE, com estudantes de 13 a 17 anos de todo o Brasil.',
      palpites: [
        { p: 'Em cada 100 estudantes, quantos relataram bullying recorrente em 2024?', valor: 27.2, extra: 'Em 2019 eram 23%. Na rede pública, 27,2%; na privada, 27,5%.' },
        { p: 'Em cada 100, quantos relataram ter sofrido cyberbullying?', valor: 12.7, extra: 'Entre as meninas, 15,2%; entre os meninos, 10,3%.' },
        { p: 'Em cada 100, quantos deixaram de ir à escola por falta de segurança dentro dela?', valor: 13.7, extra: 'Dado referente aos 30 dias anteriores à pesquisa.' }
      ],
      fatos: [
        { n: '13,7%', t: 'disseram ter praticado bullying nos 30 dias anteriores.' },
        { n: '30,2%', t: 'das vítimas citaram a aparência do rosto ou do cabelo como motivo; 24,7%, o corpo; 10,6%, cor ou raça.' },
        { n: '47,7%', t: 'estavam em escolas com algum tipo de suporte psicológico para situações de bullying e violência.' },
        { n: '63,4%', t: 'disseram que os pais compreendiam seus problemas e preocupações.' }
      ],
      precisa: ['Protocolos claros para receber relatos, acolher, intervir e acompanhar.', 'Ações permanentes, não apenas palestras pontuais.', 'Escuta e participação dos estudantes, inclusive de quem presencia as agressões.', 'Parceria contínua entre escola e famílias, com avaliação das ações.'],
      aviso: 'A PeNSE é um retrato nacional de estudantes de 13 a 17 anos. Os dados não representam um diagnóstico específico do Colégio Ser nem devem ser extrapolados diretamente para crianças menores.',
      credito: 'Seleção dos dados: Luciana Abreu | LA Desenvolvimento Humano · Inteligência Emocional e Parentalidade.'
    },

    comoAjudar: [
      { e: '✍️', t: 'Assine a petição', x: 'Leva 1 minuto: nome e e-mail.' },
      { e: '📲', t: 'Compartilhe com outras famílias', x: 'Use a mensagem pronta logo abaixo e envie nos grupos da escola.' },
      { e: '📊', t: 'Responda à pesquisa', x: 'Anônima, 1 minuto. Ajuda a mostrar a dimensão do problema.' },
      { e: '💬', t: 'Converse com seus filhos', x: 'Use as orientações desta página.' }
    ]
  },

  rodape: {
    independente: 'Este site é uma iniciativa independente, criada e mantida voluntariamente por uma mãe que acredita que a proteção das crianças é uma responsabilidade de todos. Não é um canal oficial do Colégio Ser.',
    naoSubstitui: 'Este site orienta, mas não substitui atendimento psicológico ou jurídico.',
    privacidade: 'Privacidade: este site não coleta dados pessoais. A pesquisa é anônima: não pedimos nome, e-mail, telefone ou turma, e não guardamos o endereço de internet (IP) de quem responde.'
  }
};
