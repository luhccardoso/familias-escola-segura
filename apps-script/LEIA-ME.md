# Pesquisa anônima: como ligar a planilha ao site

1. Crie uma planilha nova no Google Planilhas (ex.: "Escola Segura – Pesquisa").
2. Na planilha, abra **Extensões > Apps Script**.
3. Apague o conteúdo de `Código.gs` e cole todo o arquivo `apps-script/Codigo.gs` deste repositório. Salve.
4. No menu de funções, escolha **preparar** e clique em **Executar**. Autorize o acesso quando o Google pedir.
   (Aparece um aviso "O Google não verificou este app": clique em *Avançado* > *Acessar*. O app é seu.)
5. Clique em **Implantar > Nova implantação** > tipo **App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
6. Copie o endereço que termina em `/exec` e cole em `assets/config.js`, no campo `api: ''`.

As respostas ficam na aba "Respostas". Os gráficos só aparecem no site quando cada pesquisa
tiver 30 respostas (valor `MINIMO` no script).

Se mudar o script depois, use **Implantar > Gerenciar implantações > editar (lápis) > Nova versão**,
para manter o mesmo endereço `/exec`.
