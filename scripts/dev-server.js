const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),port=+process.argv[2]||8080;console.log('Sito su http://localhost:'+port);
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain','.json':'application/json','.ico':'image/x-icon'};
http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/index.html';let f=path.join(root,p);
if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){if(fs.existsSync(f+'.html'))f+='.html';else{const nf=path.join(root,'404.html');res.writeHead(404,{'Content-Type':types['.html']});return res.end(fs.existsSync(nf)?fs.readFileSync(nf):'404');}}
res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(f).pipe(res);}).listen(port);
