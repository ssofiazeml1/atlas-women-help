import html,json,os,shutil,subprocess,tempfile,time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
ROOT=Path(__file__).resolve().parents[2]
DATA=None
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
OUT=ROOT/'public/library'; HTML=ROOT/'tmp/pdfs/detailed_html';OUT.mkdir(parents=True,exist_ok=True);HTML.mkdir(parents=True,exist_ok=True)
langs=['en','ru','fr','es','ar','zh']; only=os.getenv('ONLY')
jobs=[]
for lang in langs:
 data=json.load(open(ROOT/f'tmp/pdfs/detailed_guides_{lang}.json'))
 for g in data['items']:
  stem=f"library-{g['id']:02d}-{lang}"
  if only and stem!=only:continue
  labels=data['labels']; direction='rtl' if lang=='ar' else 'ltr'
  sections=[]
  for n,(heading,blocks) in enumerate(g['sections'],1):
   bullets=''.join(f'<li>{html.escape(x)}</li>' for x in blocks)
   sections.append(f'<section><div class="num">{n:02d}</div><div><h2>{html.escape(heading)}</h2><ul>{bullets}</ul></div></section>')
  src=html.escape(g['source_url'],quote=True)
  page=f'''<!doctype html><html lang="{lang}" dir="{direction}"><head><meta charset="utf-8"><style>
@page{{size:A4;margin:17mm 16mm 18mm}}*{{box-sizing:border-box}}body{{font-family:"Noto Sans","Noto Sans Arabic","Noto Sans CJK SC","Arial Unicode MS",Arial,sans-serif;color:#173f3d;font-size:12.5px;line-height:1.55;margin:0}}.cover{{min-height:240mm;display:flex;flex-direction:column;justify-content:center;border-top:7px solid #158078}}.brand{{color:#158078;font-weight:800;letter-spacing:2px;text-transform:uppercase;font-size:12px}}.tag{{margin-top:22mm;color:#8b6425;font-weight:700;text-transform:uppercase;letter-spacing:1px}}h1{{font-size:30px;line-height:1.2;margin:8mm 0 5mm}}.meta{{color:#57706f}}.notice{{margin-top:18mm;padding:13px 15px;background:#fff5df;border-inline-start:4px solid #d39a36;color:#66522f}}.source{{margin-top:auto;padding-top:12mm;font-size:10px;color:#58706f;word-break:break-all}}.source a{{color:#14766f}}.contents{{page-break-before:always}}.contents h2{{font-size:25px}}.contents ol{{font-size:15px;line-height:2}}section{{page-break-inside:avoid;display:grid;grid-template-columns:13mm 1fr;gap:4mm;border-top:1px solid #cfe0dc;padding:8mm 0}}section:first-of-type{{page-break-before:always}}.num{{font-size:15px;font-weight:800;color:#159086}}h2{{font-size:20px;line-height:1.25;margin:0 0 4mm}}ul{{margin:0;padding-inline-start:6mm}}li{{margin:0 0 3.2mm}}li::marker{{color:#159086}}footer{{margin-top:12mm;padding-top:5mm;border-top:1px solid #cfe0dc;font-size:10px;color:#617775}}
</style></head><body><div class="cover"><div class="brand">Atlas Women Help</div><div class="tag">{html.escape(labels['Detailed practical guide'])}</div><h1>{html.escape(g['title'])}</h1><div class="meta">{html.escape(g['author'])} · {html.escape(g['date'])}</div><div class="notice"><strong>{html.escape(labels['Important'])}:</strong> {html.escape(labels['This is a detailed unofficial reading guide, not an official translation. Consult the original publication for complete requirements and context.'])}</div><div class="source"><strong>{html.escape(labels['Based on the original publication'])}</strong><br><a href="{src}">{src}</a></div></div><div class="contents"><h2>{html.escape(labels['Contents'])}</h2><ol>{''.join(f'<li>{html.escape(h)}</li>' for h,_ in g['sections'])}</ol></div>{''.join(sections)}<footer>Atlas Women Help · {html.escape(labels['Based on the original publication'])}: {src}</footer></body></html>'''
  hp=HTML/f'{stem}.html';pp=OUT/f'{stem}.pdf';hp.write_text(page,encoding='utf-8');jobs.append((hp,pp))
def render(job):
 hp,pp=job
 if pp.exists(): pp.unlink()
 with tempfile.TemporaryDirectory(prefix='atlas-pdf-') as profile:
  proc=subprocess.Popen([CHROME,'--headless=new','--no-sandbox','--disable-gpu','--disable-background-networking','--no-pdf-header-footer',f'--user-data-dir={profile}',f'--print-to-pdf={pp}',hp.resolve().as_uri()],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  stable=0;last=-1
  for _ in range(60):
   time.sleep(1)
   size=pp.stat().st_size if pp.exists() else 0
   stable=stable+1 if size>10000 and size==last else 0;last=size
   if stable>=2:break
  proc.terminate()
  try:proc.wait(timeout=5)
  except subprocess.TimeoutExpired:proc.kill()
  if not pp.exists() or pp.stat().st_size<10000:raise RuntimeError(f'PDF was not created: {pp}')
 return pp.name
with ThreadPoolExecutor(max_workers=2) as ex:
 for f in as_completed([ex.submit(render,j) for j in jobs]):print(f.result(),flush=True)
print('created',len(jobs))
