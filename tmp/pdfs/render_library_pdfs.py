import html
import json
import subprocess
import tempfile
import shutil
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / 'tmp/pdfs/library_translations.json').read_text(encoding='utf-8'))
HTML_DIR = ROOT / 'tmp/pdfs/html'
PDF_DIR = ROOT / 'public/library'
ARTIFACT_DIR = ROOT / 'output/pdf/library'
CHROME = shutil.which('google-chrome') or shutil.which('chromium') or '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

LABELS = {
    'en': {'summary':'Concise summary','source':'Original publication','notice':'This is a concise unofficial summary, not a full or official translation. For complete information, consult the original publication.'},
    'ru': {'summary':'Краткое содержание','source':'Оригинальная публикация','notice':'Это краткое неофициальное изложение, а не полный или официальный перевод. Для полной информации обратитесь к оригинальной публикации.'},
    'fr': {'summary':'Résumé concis','source':'Publication originale','notice':'Ceci est un résumé concis non officiel, et non une traduction complète ou officielle. Consultez la publication originale pour les informations complètes.'},
    'es': {'summary':'Resumen conciso','source':'Publicación original','notice':'Este es un resumen breve no oficial, no una traducción completa u oficial. Consulte la publicación original para obtener la información completa.'},
    'ar': {'summary':'ملخص موجز','source':'المنشور الأصلي','notice':'هذا ملخص موجز غير رسمي، وليس ترجمة كاملة أو رسمية. للحصول على المعلومات الكاملة، يُرجى الرجوع إلى المنشور الأصلي.'},
    'zh': {'summary':'简明摘要','source':'原始出版物','notice':'这是非官方简明摘要，并非完整或官方译本。完整信息请查阅原始出版物。'},
}

HTML_DIR.mkdir(parents=True, exist_ok=True)
PDF_DIR.mkdir(parents=True, exist_ok=True)
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

jobs = []
for item in DATA['items']:
    for lang in DATA['languages']:
        loc = item['localized'][lang]
        lab = LABELS[lang]
        direction = 'rtl' if lang == 'ar' else 'ltr'
        source = html.escape(item['source_url'], quote=True)
        page = f'''<!doctype html><html lang="{lang}" dir="{direction}"><head><meta charset="utf-8">
<style>
@page {{ size: A4; margin: 0; }} * {{ box-sizing: border-box; }}
body {{ margin:0; color:#183b3b; background:#f3f8f6; font-family:"Arial Unicode MS","Noto Sans",Arial,sans-serif; }}
.page {{ width:210mm; min-height:297mm; padding:20mm 18mm; background:linear-gradient(145deg,#f9fcfb 0%,#eef7f3 100%); position:relative; }}
.brand {{ color:#147d74; font-size:12px; text-transform:uppercase; letter-spacing:2px; font-weight:700; margin-bottom:18mm; }}
.category {{ display:inline-block; color:#11665f; background:#dcefeb; border-radius:99px; padding:7px 12px; font-size:12px; font-weight:700; }}
h1 {{ font-size:27px; line-height:1.22; margin:8mm 0 5mm; color:#153f3d; }}
.meta {{ color:#55706e; font-size:12px; margin-bottom:13mm; }}
.label {{ color:#147d74; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-bottom:4mm; }}
.summary {{ font-size:17px; line-height:1.62; color:#274a48; }}
.notice {{ margin-top:13mm; border-inline-start:4px solid #d59a3d; background:#fff8ea; padding:12px 14px; font-size:12px; line-height:1.5; color:#655133; }}
.source {{ position:absolute; inset-inline:18mm; bottom:18mm; border-top:1px solid #c7dcd7; padding-top:5mm; font-size:11px; line-height:1.45; color:#56706e; }}
.source a {{ color:#126f68; word-break:break-all; }}
</style></head><body><main class="page">
<div class="brand">Atlas Women Help</div><div class="category">{html.escape(loc['category'])}</div>
<h1>{html.escape(loc['title'])}</h1><div class="meta">{html.escape(item['author'])} · {html.escape(item['date'])}</div>
<div class="label">{lab['summary']}</div><div class="summary">{html.escape(loc['summary'])}</div>
<div class="notice">{lab['notice']}</div>
<div class="source"><strong>{lab['source']}:</strong><br><a href="{source}">{source}</a></div>
</main></body></html>'''
        stem = f"library-{item['id']:02d}-{lang}"
        html_path = HTML_DIR / f'{stem}.html'
        pdf_path = PDF_DIR / f'{stem}.pdf'
        html_path.write_text(page, encoding='utf-8')
        jobs.append((html_path, pdf_path))

def render(job):
    html_path, pdf_path = job
    if not pdf_path.exists():
        with tempfile.TemporaryDirectory(prefix='atlas-chrome-') as profile:
            subprocess.run([
                CHROME, '--headless=new', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
                '--disable-background-networking', '--disable-sync', '--disable-default-apps',
                '--run-all-compositor-stages-before-draw', f'--user-data-dir={profile}',
                f'--print-to-pdf={pdf_path}', html_path.resolve().as_uri()
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=45)
    (ARTIFACT_DIR / pdf_path.name).write_bytes(pdf_path.read_bytes())
    return pdf_path.name

with ThreadPoolExecutor(max_workers=2) as pool:
    for future in as_completed([pool.submit(render, job) for job in jobs]):
        print(future.result(), flush=True)

print(f"created {len(DATA['items']) * len(DATA['languages'])} PDFs")
