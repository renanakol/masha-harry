set -e
# Builds dist-preview/masharry-preview.html: one self-contained file (images/fonts inlined) for review.
cd /home/user/masha-harry
npx tsc -b && npx vite build -c vite.preview.config.ts >/dev/null
python3 - <<'PY'
import base64,os
s=open('dist-preview/preview.html',encoding='utf8').read()
def uri(p,m): return f'data:{m};base64,'+base64.b64encode(open('public'+p,'rb').read()).decode()
M={'webp':'image/webp','png':'image/png','gif':'image/gif'}
for root,_,fs in os.walk('public/img'):
  for f in fs:
    rel=os.path.join(root,f)[len('public'):]
    s=s.replace(rel,uri(rel,M[f.rsplit('.',1)[1]]))
s=s.replace('./fonts/OhShirChanaGorgi-Regular.woff2','/fonts/OhShirChanaGorgi-Regular.woff2');s=s.replace('/fonts/OhShirChanaGorgi-Regular.woff2',uri('/fonts/OhShirChanaGorgi-Regular.woff2','font/woff2'))
s=s.replace('/favicon.png',uri('/favicon.png','image/png'))
open('dist-preview/masharry-preview.html','w',encoding='utf8').write(s)
PY
