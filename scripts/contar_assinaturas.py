#!/usr/bin/env python3
"""Lê o total de assinaturas da petição na Change.org e grava em assets/assinaturas.json.

Roda pela tarefa agendada do GitHub (.github/workflows/assinaturas.yml).
Só altera o arquivo quando encontra um número confiável; se a página mudar
de formato ou bloquear o acesso, mantém o último valor e termina com erro,
para o GitHub avisar por e-mail.
"""
import html
import json
import re
import sys
import urllib.request
from datetime import datetime, timedelta, timezone

URL = "https://www.change.org/colegioserseguro"
ARQUIVO = "assets/assinaturas.json"
BRT = timezone(timedelta(hours=-3))

PADROES_JSON = [
    r'"signatureCount"\s*:\s*\{[^{}]*?"displayed"\s*:\s*(\d+)',
    r'"signatureCount"\s*:\s*\{[^{}]*?"total"\s*:\s*(\d+)',
    r'"signatureCount"\s*:\s*(\d+)',
    r'"totalSignatureCount"\s*:\s*(\d+)',
    r'"signaturesCount"\s*:\s*(\d+)',
    r'"total_signature_count"\s*:\s*(\d+)',
]
PADROES_TEXTO = [
    r'assinaturas verificadas\s*([\d.]+)\b',
    r'\b([\d.]+)\s*assinaturas verificadas',
    r'verified signatures\s*([\d,]+)\b',
    r'\b([\d,]+)\s*verified signatures',
]


def baixar():
    req = urllib.request.Request(URL, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "pt-BR,pt;q=0.9",
    })
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def numero(txt):
    return int(re.sub(r"[^\d]", "", txt))


def extrair(pagina):
    for p in PADROES_JSON:
        m = re.search(p, pagina)
        if m:
            return numero(m.group(1)), "json:" + p
    texto = html.unescape(re.sub(r"<[^>]+>", " ", pagina))
    texto = re.sub(r"\s+", " ", texto).lower()
    for p in PADROES_TEXTO:
        m = re.search(p, texto)
        if m:
            return numero(m.group(1)), "texto:" + p
    return None, None


def main():
    try:
        atual = json.load(open(ARQUIVO, encoding="utf-8"))
    except (OSError, ValueError):
        atual = {}
    anterior = atual.get("assinaturas")

    try:
        pagina = baixar()
    except Exception as e:  # rede, bloqueio, etc.
        print(f"Não consegui abrir a petição: {e}")
        return 1

    total, origem = extrair(pagina)
    if total is None:
        print("Não encontrei o número de assinaturas na página (formato pode ter mudado).")
        return 1
    if not 0 <= total < 10_000_000:
        print(f"Número fora do esperado: {total}")
        return 1
    if anterior and total < anterior * 0.5 and anterior - total > 10:
        print(f"Queda suspeita ({anterior} → {total}); mantendo o valor anterior.")
        return 1

    print(f"Assinaturas: {total} (antes: {anterior}) — encontrado por {origem}")
    if total == anterior:
        return 0
    novo = {
        "assinaturas": total,
        "atualizado_em": datetime.now(BRT).isoformat(timespec="minutes"),
        "fonte": URL,
    }
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        json.dump(novo, f, ensure_ascii=False, indent=2)
        f.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
