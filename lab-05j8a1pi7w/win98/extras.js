/* =====================================================================
   Zach 98 — extra programs: Paint, Solitaire, Calculator, ZIM messenger,
   screensaver, blue screen, Close Program, Date/Time.
   Loaded after the main script; registers into APPS / RUN.
   ===================================================================== */

/* ---------- extra icons ---------- */
Object.assign(ICON, {
  paint:`<rect x="3" y="3" width="22" height="20" fill="#fff" stroke="#000"/><path d="M6 18c3-6 6-2 9-8" stroke="#00f" stroke-width="2" fill="none"/><circle cx="18" cy="8" r="2" fill="#f00"/><path d="M28 6l-12 14-3 1 1-3L26 4z" fill="#c90" stroke="#000"/><path d="M13 21l-3 6 6-3" fill="#888" stroke="#000"/>`,
  cards:`<rect x="3" y="5" width="16" height="22" rx="2" fill="#fff" stroke="#000" transform="rotate(-12 11 16)"/><rect x="12" y="4" width="16" height="22" rx="2" fill="#fff" stroke="#000"/><path d="M20 9c-2 3-5 4-5 7a2.5 2.5 0 005 .5 2.5 2.5 0 005-.5c0-3-3-4-5-7z" fill="#000"/><path d="M19 17l-1 4h4l-1-4z" fill="#000"/>`,
  calc:`<rect x="6" y="2" width="20" height="28" fill="#c0c0c0" stroke="#000"/><rect x="9" y="5" width="14" height="5" fill="#cfe8c8" stroke="#000"/><g fill="#fff" stroke="#000"><rect x="9" y="13" width="3" height="3"/><rect x="14.5" y="13" width="3" height="3"/><rect x="20" y="13" width="3" height="3"/><rect x="9" y="18" width="3" height="3"/><rect x="14.5" y="18" width="3" height="3"/><rect x="20" y="18" width="3" height="3"/><rect x="9" y="23" width="3" height="3"/><rect x="14.5" y="23" width="3" height="3"/></g><rect x="20" y="23" width="3" height="3" fill="#f00" stroke="#000"/>`,
  zim:`<circle cx="16" cy="16" r="13" fill="#ffd800" stroke="#000"/><path d="M11 23l4-12h2l4 12" fill="none" stroke="#000" stroke-width="2.5"/><circle cx="16" cy="7" r="2.5" fill="#000"/><path d="M8 15c2-2 4-2 6 0M18 15c2-2 4-2 6 0" stroke="#000" fill="none"/>`,
  buddy:`<circle cx="16" cy="9" r="5" fill="#ffd800" stroke="#000"/><path d="M8 28c0-8 3-12 8-12s8 4 8 12z" fill="#ffd800" stroke="#000"/>`,
  clock:`<circle cx="16" cy="16" r="13" fill="#fff" stroke="#000" stroke-width="2"/><path d="M16 8v8l5 3" stroke="#000" stroke-width="2" fill="none"/>`,
  taskmgr:`<rect x="3" y="5" width="26" height="22" fill="#c0c0c0" stroke="#000"/><rect x="3" y="5" width="26" height="4" fill="#000080"/><rect x="6" y="12" width="20" height="12" fill="#fff" stroke="#808080"/><path d="M8 15h16M8 18h16M8 21h10" stroke="#000"/>`,
  saver:`<rect x="3" y="3" width="26" height="19" fill="#c0c0c0" stroke="#000"/><rect x="6" y="6" width="20" height="13" fill="#000"/><circle cx="10" cy="10" r=".8" fill="#fff"/><circle cx="20" cy="9" r=".8" fill="#fff"/><circle cx="15" cy="15" r="1.2" fill="#fff"/><circle cx="23" cy="16" r=".8" fill="#fff"/><rect x="12" y="22" width="8" height="3" fill="#808080" stroke="#000"/><rect x="7" y="25" width="18" height="3" fill="#c0c0c0" stroke="#000"/>`,
  pencil:`<path d="M22 4l6 6-15 15-7 2 2-7z" fill="#ffd800" stroke="#000"/><path d="M8 20l4 4" stroke="#000"/>`,
  brush:`<path d="M26 3l3 3-11 13-3-3z" fill="#a06030" stroke="#000"/><path d="M15 16l3 3c-1 5-6 9-13 9 3-2 3-5 5-8 1-2 3-4 5-4z" fill="#000"/>`,
  eraser:`<path d="M4 20l12-12 10 10-8 8H10z" fill="#ffb0c8" stroke="#000"/><path d="M4 20l6 6" stroke="#000"/>`,
  fill:`<path d="M6 14l10-10 10 10-10 10z" fill="#fff" stroke="#000"/><path d="M6 14h20l-10 10z" fill="#00a0ff"/><path d="M26 16c0 4 3 6 3 9a3 3 0 01-6 0c0-3 3-5 3-9z" fill="#00a0ff" stroke="#000"/>`,
  picker:`<path d="M24 3l5 5-4 4-5-5z" fill="#000"/><path d="M20 9l3 3L10 25l-5 2 2-5z" fill="#fff" stroke="#000"/>`,
  spray:`<rect x="10" y="12" width="10" height="17" fill="#c0c0c0" stroke="#000"/><rect x="12" y="7" width="6" height="5" fill="#808080" stroke="#000"/><g fill="#000"><circle cx="23" cy="5" r="1"/><circle cx="26" cy="8" r="1"/><circle cx="24" cy="10" r="1"/><circle cx="28" cy="4" r="1"/><circle cx="27" cy="12" r="1"/></g>`,
  tline:`<path d="M5 27L27 5" stroke="#000" stroke-width="2"/>`,
  trect:`<rect x="5" y="8" width="22" height="16" fill="none" stroke="#000" stroke-width="2"/>`,
  tellipse:`<ellipse cx="16" cy="16" rx="11" ry="8" fill="none" stroke="#000" stroke-width="2"/>`,
  trrect:`<rect x="5" y="8" width="22" height="16" rx="5" fill="none" stroke="#000" stroke-width="2"/>`,
  ttext:`<text x="16" y="25" text-anchor="middle" font-family="Times New Roman" font-weight="bold" font-size="24">A</text>`,
  tselect:`<rect x="5" y="7" width="22" height="18" fill="none" stroke="#000" stroke-dasharray="3 2" stroke-width="2"/>`,
  tzoom:`<circle cx="13" cy="13" r="8" fill="#bdf" stroke="#000" stroke-width="2"/><path d="M19 19l8 8" stroke="#000" stroke-width="3"/>`,
  tcurve:`<path d="M5 25C10 0 22 32 27 7" stroke="#000" stroke-width="2" fill="none"/>`,
  tpoly:`<path d="M5 24l5-16 8 6 9-8-4 18z" fill="none" stroke="#000" stroke-width="2"/>`,
  tfree:`<path d="M6 10c4-6 14-6 18 0s-2 14-8 12-14-4-10-12z" fill="none" stroke="#000" stroke-dasharray="3 2" stroke-width="2"/>`,
});

/* ---------- extra styles ---------- */
document.head.insertAdjacentHTML('beforeend', `<style>
/* Paint */
.pt{flex:1;display:flex;flex-direction:column;min-height:0}
.pt-main{flex:1;display:flex;min-height:0;gap:2px}
.pt-tools{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:4px;padding:2px}
.pt-grid{display:grid;grid-template-columns:repeat(2,25px);gap:0}
.pt-grid button{min-width:0!important;min-height:0!important;width:25px;height:25px;padding:0!important;display:flex;align-items:center;justify-content:center}
.pt-grid button .ico{width:16px;height:16px}
.pt-grid button.on{box-shadow:var(--sunken)!important;background:repeating-conic-gradient(#fff 0 25%,var(--face) 0 50%) 0 0/2px 2px}
.pt-grid button:disabled .ico{opacity:.35}
.pt-opts{width:44px;height:64px;box-shadow:var(--thin-sunk);display:flex;flex-direction:column;align-items:center;justify-content:space-around;padding:2px}
.pt-opts div{width:34px;display:flex;align-items:center;justify-content:center;height:12px;cursor:default}
.pt-opts div.on{background:var(--navy)}
.pt-opts div i{display:block;background:#000;border-radius:50%}
.pt-opts div.on i{background:#fff}
.pt-area{flex:1;min-width:0;overflow:auto;background:#808080;box-shadow:var(--sunken);padding:3px;position:relative}
.pt-area .wrap{position:relative;display:inline-block;line-height:0;box-shadow:1px 1px 0 #000}
.pt-area canvas{display:block;touch-action:none}
.pt-area canvas.ov{position:absolute;left:0;top:0;pointer-events:none}
.pt-colors{flex:0 0 auto;display:flex;align-items:center;gap:4px;padding:4px 2px 2px}
.pt-cur{position:relative;width:32px;height:32px;box-shadow:var(--sunken);background:repeating-conic-gradient(#fff 0 25%,#c0c0c0 0 50%) 0 0/2px 2px}
.pt-cur i{position:absolute;width:14px;height:14px;box-shadow:inset -1px -1px #fff,inset 1px 1px #808080,0 0 0 1px #c0c0c0}
.pt-cur .fg{left:5px;top:5px;z-index:1}.pt-cur .bg{left:13px;top:13px}
.pt-pal{display:grid;grid-template-columns:repeat(14,16px);grid-template-rows:16px 16px;gap:0}
.pt-pal i{width:16px;height:16px;box-shadow:inset -1px -1px #fff,inset 1px 1px #808080,inset -2px -2px #dfdfdf,inset 2px 2px #0a0a0a;cursor:default}
/* Solitaire */
.sol{flex:1;min-height:0;position:relative;overflow:hidden;background:#008000;touch-action:none}
.sol-board{position:absolute;left:0;top:0;width:580px;height:470px;transform-origin:0 0}
.card,.slot{position:absolute;width:71px;height:96px;border-radius:4px}
.slot{border:1px solid #004000;box-shadow:inset 0 0 0 1px #00a000}
.slot.found::after{content:"A";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#00a000;font:bold 34px Arial}
.slot.stock::after{content:"";position:absolute;left:18px;top:30px;width:30px;height:30px;border:5px solid #0c0;border-radius:50%}
.card{background:#fff;border:1px solid #000;font-family:Arial,sans-serif;cursor:default;user-select:none}
.card.red{color:#d00}.card.blk{color:#000}
.card .c1,.card .c2{position:absolute;font:bold 13px/12px Arial;text-align:center;width:13px}
.card .c1{left:3px;top:4px}.card .c2{right:3px;bottom:4px;transform:rotate(180deg)}
.card .c1 span,.card .c2 span{display:block;font-size:12px}
.card .pip{position:absolute;font-size:16px;line-height:16px;width:16px;text-align:center}
.card .big{position:absolute;left:0;right:0;top:28px;text-align:center;font-size:34px;line-height:40px}
.card .face{position:absolute;left:14px;right:14px;top:14px;bottom:14px;border:1px solid currentColor;display:flex;flex-direction:column;align-items:center;justify-content:center;background:repeating-linear-gradient(45deg,#fff7d0 0 4px,#ffe9a0 4px 8px);font:bold 26px "Times New Roman",serif}
.card .face small{font-size:18px}
.card.back{background:#fff}
.card.back::before{content:"";position:absolute;inset:3px;border-radius:2px;background:
  repeating-linear-gradient(45deg,transparent 0 3px,rgba(255,255,255,.35) 3px 4px),
  repeating-linear-gradient(-45deg,transparent 0 3px,rgba(255,255,255,.35) 3px 4px),#1f3fbf;border:1px solid #001070}
.card.back::after{content:"Z";position:absolute;left:0;right:0;top:32px;text-align:center;font:bold 26px "Times New Roman";color:#ffd800;text-shadow:1px 1px 0 #000}
.card.drag{box-shadow:2px 2px 0 rgba(0,0,0,.4)}
.card.hl{filter:invert(1)}
/* Calculator */
.calc{padding:4px 6px 6px;display:flex;flex-direction:column;gap:6px}
.calc input{text-align:right;font:14px "Courier New",monospace;height:24px;width:100%}
.calc-row{display:flex;gap:6px;align-items:center}
.calc .mem{width:28px;height:26px;box-shadow:var(--sunken)}
.calc button{min-width:0!important;padding:0!important;height:28px;font-size:12px}
.calc .k{width:36px}.calc .w{flex:1}
.calc .red{color:#d00}.calc .blue{color:#00c}
.calc-grid{display:grid;grid-template-columns:36px 6px repeat(5,36px);gap:5px 5px}
/* ZIM */
.zim-list{flex:1;min-height:0;background:#fff;box-shadow:var(--sunken);overflow:auto;padding:4px 2px}
.zim-list .grp{font-weight:bold;padding:2px 4px}
.zim-list .bud{display:flex;align-items:center;gap:4px;padding:1px 4px 1px 18px;cursor:default}
.zim-list .bud .ico{width:14px;height:14px}
.zim-list .bud.sel{background:var(--navy);color:#fff}
.zim-list .off{color:#808080;font-style:italic}
.zim-logo{flex:0 0 auto;height:64px;background:linear-gradient(#ffe24a,#ffb400);box-shadow:var(--sunken);display:flex;align-items:center;justify-content:center;gap:8px;font:bold 22px Arial;color:#003;margin-bottom:4px}
.zim-logo .ico{width:40px;height:40px}
.chat-log{flex:1;min-height:0;background:#fff;box-shadow:var(--sunken);overflow:auto;padding:6px;font:13px Arial,sans-serif;user-select:text;line-height:1.35}
.chat-log .me{color:#d00;font-weight:bold}.chat-log .them{color:#00c;font-weight:bold}
.chat-log .sys{color:#808080;font-size:11px;font-style:italic}
.chat-in{flex:0 0 64px;resize:none;font:13px Arial,sans-serif;padding:4px;border:0;box-shadow:var(--sunken);margin-top:4px}
.chat-fmt{display:flex;gap:2px;margin-top:4px}
.chat-fmt button{min-width:0!important;width:24px;padding:0!important}
/* Date/Time */
.dt{display:flex;gap:12px;margin:8px 4px}
.cal{background:#fff;box-shadow:var(--sunken);padding:4px;display:grid;grid-template-columns:repeat(7,24px);gap:1px;text-align:center}
.cal b{font-weight:normal;background:#808080;color:#fff}
.cal span{padding:2px 0}
.cal span.today{background:var(--navy);color:#fff}
/* Screensaver + BSOD */
#saver,#bsod{position:fixed;inset:0;z-index:9800;display:none;cursor:none}
#saver{background:#000}
#bsod{background:#0000aa;color:#fff;font:18px/1.5 "Courier New",monospace;align-items:center;justify-content:center;cursor:default}
#bsod .in{max-width:760px;padding:20px}
#bsod .hd{display:table;margin:0 auto 26px;background:#aaa;color:#0000aa;padding:0 8px;font-weight:bold}
#bsod .blink{animation:blink98 1s steps(1) infinite}
/* desktop context menu */
#ctx{position:fixed;z-index:6500;background:var(--face);box-shadow:var(--raised);padding:3px;min-width:160px;display:none}
#ctx .mi{height:20px;padding:0 20px}
#ctx .mi.dis{color:#808080;text-shadow:1px 1px #fff}
#ctx .mi.dis:hover{background:none;color:#808080}
#tip{position:fixed;z-index:9000;background:#ffffe1;border:1px solid #000;padding:2px 4px;display:none;pointer-events:none;white-space:nowrap}
</style>`);
document.body.insertAdjacentHTML('beforeend', `<canvas id="saver"></canvas><div id="bsod"><div class="in"></div></div><div id="ctx"></div><div id="tip"></div>`);

/* =====================================================================
   PAINT
   ===================================================================== */
const PAL = ['#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080','#808040','#004040','#0080ff','#004080','#8000ff','#804000',
             '#ffffff','#c0c0c0','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff','#ffff80','#00ff80','#80ffff','#8080ff','#ff0080','#ff8040'];
APPS.paint = { title:'untitled - Paint', icon:'paint', w:700, h:520, minW:420, minH:320, render(w){
  const TOOLS = [['tfree',0],['tselect',0],['eraser',1],['fill',1],['picker',1],['tzoom',0],['pencil',1],['brush',1],['spray',1],['ttext',1],['tline',1],['tcurve',0],['trect',1],['tpoly',0],['tellipse',1],['trrect',1]];
  const NAMES = {tfree:'Free-Form Select',tselect:'Select',eraser:'Eraser/Color Eraser',fill:'Fill With Color',picker:'Pick Color',tzoom:'Magnifier',pencil:'Pencil',brush:'Brush',spray:'Airbrush',ttext:'Text',tline:'Line',tcurve:'Curve',trect:'Rectangle',tpoly:'Polygon',tellipse:'Ellipse',trrect:'Rounded Rectangle'};
  let tool = 'pencil', fg = '#000000', bg = '#ffffff', size = 1, undo = [];
  w.body.innerHTML = menubar([['File',[['New','new'],['Save As PNG...','save'],'-',['Exit','close']]],['Edit',[['Undo','undo']]],['View',[]],['Image',[['Invert Colors','invert'],['Clear Image','clear']]],['Colors',[]],['Help',[['About Paint','abt']]]])
    + `<div class="pt"><div class="pt-main">
        <div class="pt-tools"><div class="pt-grid">${TOOLS.map(([t,ok])=>`<button data-tool="${t}" title="${NAMES[t]}" ${ok?'':'disabled'}>${icon(t,16)}</button>`).join('')}</div>
          <div class="pt-opts"></div></div>
        <div class="pt-area"><div class="wrap"><canvas width="560" height="360"></canvas><canvas class="ov" width="560" height="360"></canvas></div></div>
      </div>
      <div class="pt-colors"><div class="pt-cur"><i class="fg"></i><i class="bg"></i></div><div class="pt-pal">${PAL.map(c=>`<i data-c="${c}" style="background:${c}"></i>`).join('')}</div></div>
      <div class="status-bar"><p class="status-bar-field">For Help, click Help Topics on the Help Menu.</p><p class="status-bar-field" style="flex:0 0 90px" data-xy></p></div></div>`;
  const cv = w.body.querySelector('canvas'), ov = w.body.querySelector('canvas.ov');
  const ctx = cv.getContext('2d'), octx = ov.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,cv.width,cv.height);
  ctx.fillStyle = '#000'; ctx.font = '13px Arial'; ctx.fillText('Draw something! (Zach 98 Paint)', 10, 22);
  const optsEl = w.body.querySelector('.pt-opts'), xy = w.body.querySelector('[data-xy]');
  const paintCur = () => { w.body.querySelector('.pt-cur .fg').style.background = fg; w.body.querySelector('.pt-cur .bg').style.background = bg; };
  const SIZES = { brush:[2,5,8], eraser:[4,8,12], pencil:[1], tline:[1,2,3,4], trect:[1,2,3], tellipse:[1,2,3], trrect:[1,2,3], spray:[8,14,20] };
  function renderOpts(){
    const s = SIZES[tool] || []; if (!s.includes(size)) size = s[0] || 1;
    optsEl.innerHTML = s.map(v=>`<div data-s="${v}" class="${v===size?'on':''}"><i style="width:${Math.min(30,Math.max(2,v*(tool==='spray'?1:2)))}px;height:${Math.min(10,Math.max(2,v))}px;border-radius:${tool==='tline'?0:'50%'}"></i></div>`).join('');
    optsEl.querySelectorAll('[data-s]').forEach(d=>d.onclick=()=>{ size=+d.dataset.s; renderOpts(); });
  }
  w.body.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{ tool=b.dataset.tool; w.body.querySelectorAll('[data-tool]').forEach(x=>x.classList.toggle('on',x===b)); renderOpts(); });
  w.body.querySelector('[data-tool="pencil"]').classList.add('on');
  w.body.querySelectorAll('.pt-pal i').forEach(i=>{ i.onclick=()=>{fg=i.dataset.c;paintCur();}; i.oncontextmenu=e=>{e.preventDefault();bg=i.dataset.c;paintCur();}; });
  paintCur(); renderOpts();
  const pushUndo = () => { undo.push(ctx.getImageData(0,0,cv.width,cv.height)); if (undo.length>15) undo.shift(); };
  const pos = e => { const r = cv.getBoundingClientRect(); return [Math.round((e.clientX-r.left)*cv.width/r.width), Math.round((e.clientY-r.top)*cv.height/r.height)]; };
  const hex = c => [parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
  function flood(x,y,col){
    const img = ctx.getImageData(0,0,cv.width,cv.height), d = img.data, W = cv.width, H = cv.height;
    const i0 = (y*W+x)*4, t = [d[i0],d[i0+1],d[i0+2]], [r,g,b] = hex(col);
    if (t[0]===r && t[1]===g && t[2]===b) return;
    const st = [[x,y]];
    const same = i => d[i]===t[0] && d[i+1]===t[1] && d[i+2]===t[2];
    while (st.length){
      let [cx,cy] = st.pop(); let i = (cy*W+cx)*4;
      while (cx>=0 && same(i)){ cx--; i-=4; } cx++; i+=4;
      let up=false, dn=false;
      while (cx<W && same(i)){
        d[i]=r; d[i+1]=g; d[i+2]=b; d[i+3]=255;
        if (cy>0){ const u=i-W*4; if (same(u)){ if(!up){st.push([cx,cy-1]);up=true;} } else up=false; }
        if (cy<H-1){ const v=i+W*4; if (same(v)){ if(!dn){st.push([cx,cy+1]);dn=true;} } else dn=false; }
        cx++; i+=4;
      }
    }
    ctx.putImageData(img,0,0);
  }
  function shape(c, kind, x0,y0,x1,y1, col){
    c.strokeStyle = col; c.lineWidth = size; c.lineCap='round';
    c.beginPath();
    if (kind==='tline'){ c.moveTo(x0+.5,y0+.5); c.lineTo(x1+.5,y1+.5); }
    else if (kind==='trect') c.rect(Math.min(x0,x1)+.5,Math.min(y0,y1)+.5,Math.abs(x1-x0),Math.abs(y1-y0));
    else if (kind==='tellipse') c.ellipse((x0+x1)/2,(y0+y1)/2,Math.abs(x1-x0)/2,Math.abs(y1-y0)/2,0,0,Math.PI*2);
    else if (kind==='trrect' && c.roundRect) c.roundRect(Math.min(x0,x1)+.5,Math.min(y0,y1)+.5,Math.abs(x1-x0),Math.abs(y1-y0),8);
    c.stroke();
  }
  let down=false, sx=0, sy=0, lx=0, ly=0, col='#000', sprayT=null;
  cv.addEventListener('contextmenu', e=>e.preventDefault());
  cv.addEventListener('pointerdown', e => {
    e.preventDefault(); cv.setPointerCapture(e.pointerId);
    const [x,y] = pos(e); col = e.button===2 ? bg : fg; down = true; sx=lx=x; sy=ly=y;
    if (tool==='picker'){ const p = ctx.getImageData(x,y,1,1).data; const c='#'+[p[0],p[1],p[2]].map(v=>v.toString(16).padStart(2,'0')).join(''); if(e.button===2) bg=c; else fg=c; paintCur(); down=false; return; }
    pushUndo();
    if (tool==='fill'){ flood(x,y,col); down=false; return; }
    if (tool==='ttext'){ down=false; const t = prompt('Text:'); if (t){ ctx.fillStyle=col; ctx.font='16px Arial'; ctx.fillText(t,x,y); } return; }
    if (tool==='pencil'||tool==='brush'||tool==='eraser'){ ctx.fillStyle = tool==='eraser'?bg:col; ctx.fillRect(x-Math.floor(size/2), y-Math.floor(size/2), size, size); }
    if (tool==='spray'){ const go=()=>{ ctx.fillStyle=col; for(let k=0;k<12;k++){ const a=Math.random()*6.28, r=Math.random()*size; ctx.fillRect(Math.round(lx+Math.cos(a)*r), Math.round(ly+Math.sin(a)*r),1,1);} }; go(); sprayT=setInterval(go,30); }
  });
  cv.addEventListener('pointermove', e => {
    const [x,y] = pos(e); xy.textContent = `${x},${y}`;
    if (!down) return;
    if (tool==='pencil'||tool==='brush'||tool==='eraser'){
      ctx.strokeStyle = tool==='eraser'?bg:col; ctx.lineWidth = size; ctx.lineCap = tool==='brush'?'round':'square';
      ctx.beginPath(); ctx.moveTo(lx+.5,ly+.5); ctx.lineTo(x+.5,y+.5); ctx.stroke();
    } else if (['tline','trect','tellipse','trrect'].includes(tool)){
      octx.clearRect(0,0,ov.width,ov.height); shape(octx, tool, sx,sy,x,y, col);
    }
    lx=x; ly=y;
  });
  const end = e => {
    if (!down) return; down=false; clearInterval(sprayT);
    if (['tline','trect','tellipse','trrect'].includes(tool)){ const [x,y]=pos(e); octx.clearRect(0,0,ov.width,ov.height); shape(ctx, tool, sx,sy,x,y, col); }
  };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  wireMenubar(w, {
    new:()=>{ pushUndo(); ctx.fillStyle='#fff'; ctx.fillRect(0,0,cv.width,cv.height); },
    clear:()=>{ pushUndo(); ctx.fillStyle=bg; ctx.fillRect(0,0,cv.width,cv.height); },
    undo:()=>{ const u=undo.pop(); if(u) ctx.putImageData(u,0,0); },
    invert:()=>{ pushUndo(); const im=ctx.getImageData(0,0,cv.width,cv.height); for(let i=0;i<im.data.length;i+=4){ im.data[i]=255-im.data[i]; im.data[i+1]=255-im.data[i+1]; im.data[i+2]=255-im.data[i+2]; } ctx.putImageData(im,0,0); },
    save:()=>{ const a=document.createElement('a'); a.download='untitled.png'; a.href=cv.toDataURL('image/png'); a.click(); },
    abt:()=>msgbox('About Paint','Paint<br>Zach 98 Edition. Left-click paints with the foreground color, right-click with the background color.','info'),
  });
}};

/* =====================================================================
   SOLITAIRE (Klondike, draw one)
   ===================================================================== */
const SUITS = ['♠','♥','♣','♦'], RANKS = ['','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const isRed = s => s===1 || s===3;
const PIPS = { // positions (% of card) for number cards
  1:[[50,50]],2:[[50,20],[50,80]],3:[[50,20],[50,50],[50,80]],4:[[30,20],[70,20],[30,80],[70,80]],
  5:[[30,20],[70,20],[50,50],[30,80],[70,80]],6:[[30,20],[70,20],[30,50],[70,50],[30,80],[70,80]],
  7:[[30,20],[70,20],[50,35],[30,50],[70,50],[30,80],[70,80]],8:[[30,20],[70,20],[50,35],[30,50],[70,50],[50,65],[30,80],[70,80]],
  9:[[30,18],[70,18],[30,39],[70,39],[50,50],[30,61],[70,61],[30,82],[70,82]],10:[[30,18],[70,18],[50,29],[30,39],[70,39],[30,61],[70,61],[50,71],[30,82],[70,82]]};
function cardHTML(c){
  if (!c.up) return '';
  const s = SUITS[c.s], r = RANKS[c.r];
  let mid;
  if (c.r===1) mid = `<div class="big" style="font-size:40px">${s}</div>`;
  else if (c.r>10) mid = `<div class="face">${r}<small>${s}</small></div>`;
  else mid = PIPS[c.r].map(([x,y])=>`<div class="pip" style="left:calc(${x}% - 8px);top:calc(${y}% - 8px)${y>50?';transform:rotate(180deg)':''}">${s}</div>`).join('');
  return `<div class="c1">${r}<span>${s}</span></div>${mid}<div class="c2">${r}<span>${s}</span></div>`;
}
APPS.sol = { title:'Solitaire', icon:'cards', w:600, h:540, minW:300, minH:260, render(w){
  const COLX = i => 10 + i*81, TOPY = 10, TABY = 122;
  let stock, waste, found, tab, score, secs, timer, history, won;
  w.body.innerHTML = menubar([['Game',[['Deal','deal'],'-',['Undo','undo'],'-',['Exit','close']]],['Help',[['How to Play','how'],['About Solitaire','abt']]]])
    + `<div class="sol"><div class="sol-board"></div><canvas style="position:absolute;inset:0;display:none" data-win></canvas></div>
       <div class="status-bar"><p class="status-bar-field" data-msg>Drag cards to build the foundations from Ace to King.</p><p class="status-bar-field" style="flex:0 0 150px" data-score></p></div>`;
  const sol = w.body.querySelector('.sol'), board = w.body.querySelector('.sol-board'), scoreEl = w.body.querySelector('[data-score]');
  const fit = () => { const s = Math.min(1, sol.clientWidth/580, sol.clientHeight/470); board.style.transform = `scale(${s})`; board.dataset.s = s; };
  w.onResize = fit; new ResizeObserver(fit).observe(sol);
  const snap = () => JSON.stringify({stock,waste,found,tab,score});
  function deal(){
    const deck = []; for (let s=0;s<4;s++) for (let r=1;r<=13;r++) deck.push({s,r,up:false});
    for (let i=deck.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
    tab = Array.from({length:7},(_,i)=>{ const col = deck.splice(0,i+1); col[col.length-1].up = true; return col; });
    stock = deck; waste = []; found = [[],[],[],[]]; score = 0; secs = 0; history = []; won = false;
    clearInterval(timer); timer = setInterval(()=>{ if(!won){ secs++; status(); } },1000);
    w.body.querySelector('[data-win]').style.display='none';
    render();
  }
  const status = () => { scoreEl.textContent = `Score: ${score}  Time: ${secs}`; };
  const save = () => { history.push(snap()); if (history.length>50) history.shift(); };
  function canTab(card, col){ const top = col[col.length-1]; if (!top) return card.r===13; return top.up && isRed(top.s)!==isRed(card.s) && top.r===card.r+1; }
  function canFound(card, f){ const top = f[f.length-1]; return top ? (top.s===card.s && card.r===top.r+1) : card.r===1; }
  function flipTops(){ tab.forEach(col=>{ const t=col[col.length-1]; if (t && !t.up){ t.up=true; score+=5; } }); }
  function el(card, x, y, src){
    const d = document.createElement('div');
    d.className = 'card ' + (card.up ? (isRed(card.s)?'red':'blk') : 'back');
    d.style.left = x+'px'; d.style.top = y+'px'; d.innerHTML = cardHTML(card);
    if (src) Object.assign(d.dataset, src);
    board.appendChild(d); return d;
  }
  function render(){
    board.innerHTML = '';
    const slot = (x,y,cls,data) => { const s=document.createElement('div'); s.className='slot '+cls; s.style.left=x+'px'; s.style.top=y+'px'; Object.assign(s.dataset,data||{}); board.appendChild(s); return s; };
    slot(COLX(0),TOPY,'stock',{pile:'stock'});
    if (stock.length) el(stock[stock.length-1], COLX(0), TOPY, {pile:'stock'});
    slot(COLX(1),TOPY,'',{pile:'waste'});
    if (waste.length) el(waste[waste.length-1], COLX(1), TOPY, {pile:'waste', idx:waste.length-1});
    found.forEach((f,i)=>{ slot(COLX(3+i),TOPY,'found',{pile:'found',n:i}); if (f.length) el(f[f.length-1], COLX(3+i), TOPY, {pile:'found', n:i, idx:f.length-1}); });
    tab.forEach((col,i)=>{ slot(COLX(i),TABY,'',{pile:'tab',n:i}); let y = TABY; col.forEach((c,k)=>{ el(c, COLX(i), y, {pile:'tab', n:i, idx:k}); y += c.up ? 18 : 4; }); });
    status(); fit();
    if (!won && found.every(f=>f.length===13)){ won = true; clearInterval(timer); setTimeout(cascade, 200); }
  }
  function autoFound(card, from){
    for (let i=0;i<4;i++) if (canFound(card, found[i])){ save(); from(); found[i].push(card); score+=10; flipTops(); render(); return true; }
    return false;
  }
  // stock click
  board.addEventListener('click', e => {
    const t = e.target.closest('[data-pile="stock"]'); if (!t) return;
    save();
    if (stock.length){ const c = stock.pop(); c.up = true; waste.push(c); }
    else { stock = waste.reverse().map(c=>({...c,up:false})); waste = []; score = Math.max(0, score-100); }
    render();
  });
  // double-click to foundation
  board.addEventListener('dblclick', e => {
    const t = e.target.closest('.card'); if (!t || !t.classList.contains('red') && !t.classList.contains('blk')) return;
    const p = t.dataset.pile;
    if (p==='waste') autoFound(waste[waste.length-1], ()=>waste.pop());
    else if (p==='tab'){ const col = tab[+t.dataset.n]; if (+t.dataset.idx===col.length-1) autoFound(col[col.length-1], ()=>col.pop()); }
  });
  // dragging
  let drag = null;
  board.addEventListener('pointerdown', e => {
    const t = e.target.closest('.card'); if (!t || t.classList.contains('back') || e.button!==0) return;
    const p = t.dataset.pile, idx = +t.dataset.idx;
    let cards, els;
    if (p==='tab'){ const col = tab[+t.dataset.n]; cards = col.slice(idx); els = [...board.querySelectorAll(`.card[data-pile="tab"][data-n="${t.dataset.n}"]`)].filter(x=>+x.dataset.idx>=idx); }
    else if (p==='waste' || p==='found'){ cards = [p==='waste' ? waste[waste.length-1] : found[+t.dataset.n].slice(-1)[0]]; els = [t]; }
    else return;
    const s = +board.dataset.s || 1;
    drag = { p, n:+t.dataset.n, idx, cards, els, sx:e.clientX, sy:e.clientY, s, moved:false, orig: els.map(x=>[x.offsetLeft,x.offsetTop]) };
    els.forEach(x=>{ x.style.zIndex = 1000; x.classList.add('drag'); });
    board.setPointerCapture(e.pointerId);
  });
  board.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = (e.clientX-drag.sx)/drag.s, dy = (e.clientY-drag.sy)/drag.s;
    if (Math.abs(dx)+Math.abs(dy) > 3) drag.moved = true;
    drag.els.forEach((x,k)=>{ x.style.left = (drag.orig[k][0]+dx)+'px'; x.style.top = (drag.orig[k][1]+dy)+'px'; });
  });
  board.addEventListener('pointerup', e => {
    if (!drag) return; const d = drag; drag = null;
    if (!d.moved){ d.els.forEach((x,k)=>{ x.style.left=d.orig[k][0]+'px'; x.style.top=d.orig[k][1]+'px'; x.style.zIndex=''; x.classList.remove('drag'); });
      if (matchMedia('(pointer:coarse)').matches) board.dispatchEvent(new MouseEvent('dblclick',{bubbles:true}));
      return; }
    const cx = d.els[0].offsetLeft + 35, cy = d.els[0].offsetTop + 30;
    const card = d.cards[0];
    const remove = () => { if (d.p==='tab') tab[d.n].splice(d.idx); else if (d.p==='waste') waste.pop(); else found[d.n].pop(); };
    let done = false;
    // foundations
    if (cy < TABY - 10 && d.cards.length===1){
      const i = Math.round((cx - 10 - 35)/81) - 3;
      if (i>=0 && i<4 && canFound(card, found[i]) && !(d.p==='found' && d.n===i)){ save(); remove(); found[i].push(card); score += d.p==='found'?0:10; done = true; }
    } else {
      const i = Math.max(0, Math.min(6, Math.round((cx - 10 - 35)/81)));
      if (!(d.p==='tab' && d.n===i) && canTab(card, tab[i])){ save(); remove(); tab[i].push(...d.cards); score += d.p==='waste'?5:d.p==='found'?-15:0; done = true; }
    }
    if (done) flipTops();
    render();
  });
  function cascade(){
    beep('tada');
    w.body.querySelector('[data-msg]').textContent = 'You win! Game > Deal to play again.';
    const cvs = w.body.querySelector('[data-win]'); cvs.style.display='block';
    cvs.width = sol.clientWidth; cvs.height = sol.clientHeight;
    const c = cvs.getContext('2d'), s = +board.dataset.s || 1;
    const cards = []; found.forEach((f,i)=>f.slice().reverse().forEach(card=>cards.push({card, x:COLX(3+i)*s, y:TOPY*s})));
    let k = 0, cur = null;
    const draw = (card,x,y) => {
      c.fillStyle='#fff'; c.strokeStyle='#000'; c.fillRect(x,y,71*s,96*s); c.strokeRect(x+.5,y+.5,71*s-1,96*s-1);
      c.fillStyle = isRed(card.s)?'#d00':'#000'; c.font = `bold ${13*s}px Arial`; c.fillText(RANKS[card.r], x+3*s, y+14*s);
      c.font = `${30*s}px Arial`; c.fillText(SUITS[card.s], x+22*s, y+60*s);
    };
    (function step(){
      if (!w.el.isConnected || !won) return;
      if (!cur){ if (k>=cards.length) return; cur = {...cards[k++], vx:(Math.random()*6+2)*(Math.random()<.5?-1:1), vy:-Math.random()*6}; }
      cur.vy += .6; cur.x += cur.vx; cur.y += cur.vy;
      if (cur.y > cvs.height-96*s){ cur.y = cvs.height-96*s; cur.vy *= -.75; }
      draw(cur.card, cur.x, cur.y);
      if (cur.x < -80 || cur.x > cvs.width+10) cur = null;
      requestAnimationFrame(step);
    })();
  }
  wireMenubar(w, {
    deal, undo:()=>{ const h=history.pop(); if(h){ ({stock,waste,found,tab,score} = JSON.parse(h)); render(); } },
    how:()=>msgbox('How to Play','Build each foundation up by suit from Ace to King. In the tableau, stack cards in descending order, alternating red and black. Click the deck to draw a card. Double-click a card to send it to a foundation.','info'),
    abt:()=>msgbox('About Solitaire','Solitaire<br>Zach 98 Edition.','info'),
  });
  w.onClose = () => { clearInterval(timer); won = true; };
  deal();
}};

/* =====================================================================
   CALCULATOR
   ===================================================================== */
APPS.calc = { title:'Calculator', icon:'calc', w:270, h:290, noMax:true, noResize:true, render(w){
  let cur = '0', acc = null, op = null, fresh = true, mem = 0;
  w.body.innerHTML = menubar([['Edit',[['Copy','copy']]],['View',[]],['Help',[['About Calculator','abt']]]]) + `<div class="calc">
    <input type="text" readonly value="0" data-d>
    <div class="calc-row"><div class="mem" data-m></div><button class="w red" data-k="back">Backspace</button><button class="w red" data-k="ce">CE</button><button class="w red" data-k="c">C</button></div>
    <div class="calc-grid">
      ${[['MC','7','8','9','/','sqrt'],['MR','4','5','6','*','%'],['MS','1','2','3','-','1/x'],['M+','0','+/-','.','+','=']].map(r=>
        `<button class="k red" data-k="${r[0]}">${r[0]}</button><span></span>${r.slice(1).map(k=>`<button class="k ${/[0-9.]|\+\/-/.test(k)&&k.length<=3&&!/[\/*\-+=]$/.test(k)||k==='+/-'?'blue':'red'}" data-k="${k}">${k}</button>`).join('')}`).join('')}
    </div></div>`;
  const disp = w.body.querySelector('[data-d]'), memEl = w.body.querySelector('[data-m]');
  const show = () => { disp.value = cur.length>18 ? Number(cur).toExponential(10) : cur; memEl.textContent = mem ? 'M' : ''; memEl.style.textAlign='center'; memEl.style.lineHeight='26px'; };
  const calc = (a,b,o) => o==='+'?a+b : o==='-'?a-b : o==='*'?a*b : o==='/'?(b===0?NaN:a/b) : b;
  const fmt = n => isNaN(n) ? 'Cannot divide by zero' : String(+n.toPrecision(14));
  function key(k){
    if (/^[0-9]$/.test(k)){ cur = fresh || cur==='0' ? k : cur + k; fresh = false; }
    else if (k==='.'){ if (fresh){ cur='0.'; fresh=false; } else if (!cur.includes('.')) cur += '.'; }
    else if (k==='back'){ if (!fresh){ cur = cur.length>1 ? cur.slice(0,-1) : '0'; } }
    else if (k==='ce'){ cur='0'; fresh=true; }
    else if (k==='c'){ cur='0'; acc=null; op=null; fresh=true; }
    else if (k==='+/-'){ cur = cur.startsWith('-') ? cur.slice(1) : (cur==='0'?cur:'-'+cur); }
    else if (k==='sqrt'){ cur = fmt(Math.sqrt(+cur)); fresh=true; }
    else if (k==='1/x'){ cur = fmt(1/+cur); fresh=true; }
    else if (k==='%'){ cur = fmt((acc||0)*(+cur)/100); fresh=true; }
    else if ('+-*/'.includes(k)){ if (op && !fresh){ acc = calc(acc, +cur, op); cur = fmt(acc); } else acc = +cur; op = k; fresh = true; }
    else if (k==='='){ if (op){ const r = calc(acc, +cur, op); cur = fmt(r); acc = null; op = null; fresh = true; } }
    else if (k==='MC') mem = 0; else if (k==='MR'){ cur = fmt(mem); fresh = true; } else if (k==='MS') mem = +cur; else if (k==='M+') mem += +cur;
    show();
  }
  w.body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>key(b.dataset.k));
  w.el.addEventListener('keydown', e => {
    const m = {Enter:'=',Backspace:'back',Escape:'c',Delete:'ce'}; const k = m[e.key] || e.key;
    if (/^[0-9.+\-*/=%]$/.test(k) || ['back','c','ce'].includes(k)){ e.preventDefault(); key(k); }
  });
  w.el.tabIndex = 0; setTimeout(()=>w.el.focus(), 30);
  wireMenubar(w, { copy:()=>navigator.clipboard && navigator.clipboard.writeText(cur), abt:()=>msgbox('About Calculator','Calculator<br>Zach 98 Edition. Keyboard works too.','info') });
  show();
}};

/* =====================================================================
   ZIM — Zach Instant Messenger (scripted auto-responses)
   ===================================================================== */
function doorSound(open=true){
  try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)();
    const t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain();
    o.type='square'; o.frequency.setValueAtTime(open?220:330,t); o.frequency.exponentialRampToValueAtTime(open?330:180,t+.25);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.03,t+.02); g.gain.exponentialRampToValueAtTime(.0001,t+.3);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t+.32); }catch(e){}
}
function imSound(){ try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)();
  [660,990].forEach((f,i)=>{ const t=AC.currentTime+i*.07, o=AC.createOscillator(), g=AC.createGain(); o.type='sine'; o.frequency.value=f;
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.05,t+.01); g.gain.exponentialRampToValueAtTime(.0001,t+.15); o.connect(g).connect(AC.destination); o.start(t); o.stop(t+.16); }); }catch(e){} }

const BOT = [
  [/\b(hi|hey|hello|yo|sup|hiya)\b/, () => `hey! thanks for stopping by my site :) ask me about my research, projects, résumé, or how to reach me`],
  [/a\/?s\/?l/, () => `lol. econ grad student / NYC`],
  [/(nber|ems|ambulance|congestion|research|paper)/, () => { setTimeout(()=>openApp('research'),900); return `my main research: NBER Working Paper No. 35414 on NYC congestion pricing + EMS response times. diff-in-disc at the 60th St boundary, ~63-70 sec faster ambulance trips. opening the Research drive for you!`; }],
  [/(project|portfolio|built|build)/, () => { setTimeout(()=>openApp('mycomputer'),900); return `everything's on My Computer: Research is C:, personal projects are D:. the UFC model and the MBTA LED art are my favorites`; }],
  [/(resume|résumé|cv)/, () => { setTimeout(()=>openApp('resume'),900); return `sure, pulling up my résumé now`; }],
  [/(email|contact|reach|mail)/, () => `email me: ${EMAIL}. or linkedin.com/in/zwinship`],
  [/(hire|job|intern|position|opportunit|recruit)/, () => `I'd love to chat! best way is email: ${EMAIL}`],
  [/(ufc|octa|fight|mma)/, () => `OctaStats! a UFC fight prediction model, rebuilt as a dynamic logit for v2. there's also Tale of the Tape, a daily UFC guessing game`],
  [/(mbta|train|\bt\b|subway|led)/, () => `MBTA stuff: an ARIMA ridership forecast in R, and a Raspberry Pi LED map that tracks trains in real time (frame still in progress)`],
  [/(nyu|grad|school|masters|ms\b)/, () => `I'm in NYU's MS in Quantitative Economics (May 2027) and TA intro macro`],
  [/(bentley|undergrad|college)/, () => `Bentley '26, BS Quantitative Economics, minors in math + data tech`],
  [/(skill|python|stata|\br\b|code|language)/, () => `Python, R, Stata mostly. causal inference (RD, diff-in-disc), forecasting, ML, some web dev`],
  [/(blog|unlikely|instrument)/, () => { setTimeout(()=>openApp('blog'),900); return `Unlikely Instruments: a blog about weird proxy variables. launching Sept 2026`; }],
  [/(llm|ai\b|agent|silicus)/, () => `Homo silicus: using LLMs as simulated economic agents to replicate classic experiments. coming soon`],
  [/(wii)/, () => `there's a Wii version of this site too 👀 try Start > Run > wii`],
  [/(bye|gtg|ttyl|later|cya)/, () => `ttyl! :)`],
  [/(lol|haha|lmao)/, () => `haha`],
  [/(\?)$/, () => `good question. try asking about research, projects, résumé, UFC, MBTA, or contact`],
];
function botReply(msg){
  const m = msg.toLowerCase();
  for (const [re, fn] of BOT) if (re.test(m)) return fn();
  return `nice. you can ask me about my research, projects, résumé, or how to contact me`;
}

APPS.zim = { title:'ZIM', icon:'zim', w:220, h:420, noMax:true, render(w){
  w.body.innerHTML = menubar([['My ZIM',[['Sign Off','close']]],['People',[['Send Instant Message','im']]],['Help',[['About ZIM','abt']]]])
    + `<div class="zim-logo">${icon('zim',40)}ZIM</div>
      <div class="zim-list">
        <div class="grp">▾ Buddies (1/1)</div>
        <div class="bud" data-b>${icon('buddy',14)}ZachW98</div>
        <div class="grp">▾ Family (0/0)</div>
        <div class="grp">▾ Co-Workers (0/0)</div>
        <div class="grp">▾ Offline (2/2)</div>
        <div class="bud off">${icon('buddy',14)}NBER_Reviewer2</div>
        <div class="bud off">${icon('buddy',14)}MBTA_Driver</div>
      </div>
      <div class="btn-row" style="justify-content:space-between;margin-top:4px"><button data-im>IM</button><button data-info>Info</button></div>`;
  const b = w.body.querySelector('[data-b]');
  b.onclick = () => b.classList.add('sel');
  b.ondblclick = () => openApp('zimchat', b.getBoundingClientRect());
  if (matchMedia('(pointer:coarse)').matches) b.onclick = () => openApp('zimchat');
  w.body.querySelector('[data-im]').onclick = () => openApp('zimchat');
  w.body.querySelector('[data-info]').onclick = () => msgbox('Buddy Info: ZachW98','<b>ZachW98</b><br>Quantitative economist. NYU MS \'27, Bentley \'26.<br><i>"careful empirical methods, fun projects"</i>','info');
  wireMenubar(w, { im:()=>openApp('zimchat'), abt:()=>msgbox('About ZIM','Zach Instant Messenger<br>Replies are scripted auto-responses, not live chat.','info') });
  doorSound(true);
}};
APPS.zimchat = { title:'ZachW98 - Instant Message', icon:'zim', w:420, h:380, render(w){
  w.body.innerHTML = menubar([['File',[['Close','close']]],['Edit',[]],['Insert',[]],['People',[]]])
    + `<div class="chat-log"></div>
      <div class="chat-fmt"><button style="font-weight:bold">B</button><button style="font-style:italic">I</button><button style="text-decoration:underline">U</button><button>A</button><button>☺</button></div>
      <textarea class="chat-in" placeholder="Type a message..."></textarea>
      <div class="btn-row" style="margin-top:4px"><button data-warn>Warn</button><button data-block>Block</button><button class="default" data-send>Send</button></div>`;
  const log = w.body.querySelector('.chat-log'), inp = w.body.querySelector('.chat-in');
  const add = html => { log.insertAdjacentHTML('beforeend', `<div>${html}</div>`); log.scrollTop = log.scrollHeight; };
  const them = (t, auto) => { add(`<span class="them">ZachW98${auto?' <span class="sys">(Auto-Response)</span>':''}:</span> ${esc(t)}`); imSound(); };
  let typingT;
  const send = () => {
    const t = inp.value.trim(); if (!t) return; inp.value = '';
    add(`<span class="me">Visitor:</span> ${esc(t)}`);
    const reply = botReply(t);
    w.setTitle('ZachW98 is typing...');
    clearTimeout(typingT); typingT = setTimeout(()=>{ w.setTitle('ZachW98 - Instant Message'); them(reply, true); }, 700 + Math.min(1600, reply.length*12));
  };
  inp.onkeydown = e => { if (e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); } };
  w.body.querySelector('[data-send]').onclick = send;
  w.body.querySelector('[data-warn]').onclick = () => add(`<span class="sys">You warned ZachW98. Their warning level is now 10%. (rude!)</span>`);
  w.body.querySelector('[data-block]').onclick = () => msgbox('ZIM','You can\'t block the person whose computer this is. :)','warn');
  add(`<span class="sys">ZachW98 signed on at ${new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}.</span>`);
  setTimeout(()=>them("hey! I'm away from my computer, but my auto-responder knows a lot. ask about my research, projects, résumé, or contact info", true), 500);
  setTimeout(()=>inp.focus(), 50);
  w.onClose = () => clearTimeout(typingT);
}};

/* =====================================================================
   DATE / TIME, CLOSE PROGRAM, SCREENSAVER, BLUE SCREEN
   ===================================================================== */
APPS.datetime = { title:'Date/Time Properties', dialog:true, center:true, w:420, h:330, render(w){
  const now = new Date(), y = now.getFullYear(), m = now.getMonth();
  const first = new Date(y,m,1).getDay(), days = new Date(y,m+1,0).getDate();
  const cells = Array(first).fill('<span></span>').concat(Array.from({length:days},(_,i)=>`<span class="${i+1===now.getDate()?'today':''}">${i+1}</span>`));
  w.body.style.display='flex'; w.body.style.flexDirection='column';
  w.body.innerHTML = `<div class="tabs"><menu role="tablist"><li role="tab" aria-selected="true"><a href="#">Date &amp; Time</a></li><li role="tab"><a href="#">Time Zone</a></li></menu>
    <div class="window" role="tabpanel"><div class="window-body" style="display:block;margin:8px">
    <div class="dt"><fieldset style="margin:0"><legend>Date</legend>
      <div style="display:flex;gap:4px;margin-bottom:6px"><select><option>${now.toLocaleString('en-US',{month:'long'})}</option></select><input type="number" value="${y}" style="width:64px"></div>
      <div class="cal">${['S','M','T','W','T','F','S'].map(d=>`<b>${d}</b>`).join('')}${cells.join('')}</div></fieldset>
    <fieldset style="margin:0;flex:1;text-align:center"><legend>Time</legend>
      <svg viewBox="0 0 100 100" width="110" height="110" data-clock></svg>
      <input type="text" readonly data-t style="width:100px;text-align:center;margin-top:6px"></fieldset></div>
    <p style="margin:4px">Current time zone: Eastern Time (US &amp; Canada)</p></div></div></div>
    <div class="btn-row"><button class="default" data-ok>OK</button><button data-ok>Cancel</button></div>`;
  w.body.querySelectorAll('[role=tab] a').forEach(a=>a.onclick=e=>e.preventDefault());
  w.body.querySelectorAll('[data-ok]').forEach(b=>b.onclick=w.close);
  const clk = w.body.querySelector('[data-clock]'), tf = w.body.querySelector('[data-t]');
  const draw = () => { const d = new Date(), h = d.getHours()%12, mi = d.getMinutes(), s = d.getSeconds();
    const hand = (a,l,wd,c) => `<line x1="50" y1="50" x2="${50+Math.sin(a)*l}" y2="${50-Math.cos(a)*l}" stroke="${c}" stroke-width="${wd}" stroke-linecap="square"/>`;
    clk.innerHTML = `<circle cx="50" cy="50" r="46" fill="#c0c0c0"/>${Array.from({length:12},(_,i)=>`<rect x="48.5" y="7" width="3" height="3" fill="${i%3?'#008080':'#000080'}" transform="rotate(${i*30} 50 50)"/>`).join('')}
      ${hand((h+mi/60)/12*6.283,24,5,'#008080')}${hand(mi/60*6.283,36,3.5,'#008080')}${hand(s/60*6.283,38,1,'#000')}`;
    tf.value = d.toLocaleTimeString('en-US'); };
  draw(); const t = setInterval(draw, 1000); w.onClose = () => clearInterval(t);
}};

APPS.taskmgr = { title:'Close Program', dialog:true, center:true, top:true, w:340, h:300, render(w){
  const list = () => [...wins.values()].filter(x=>x!==w && !x.opts.dialog).map(x=>({ name:x.el.querySelector('.title-bar-text span').textContent, w:x }));
  w.body.style.display='flex'; w.body.style.flexDirection='column';
  const render = () => {
    const items = [...list().map(i=>i.name), 'Explorer', 'Systray', 'Zim'];
    w.body.innerHTML = `<div class="panel-white" style="flex:1;padding:0">${items.map((n,i)=>`<div class="tmi" data-i="${i}" style="padding:1px 4px">${esc(n)}</div>`).join('')}</div>
      <p style="margin:8px 2px;line-height:1.35">WARNING: Pressing CTRL+ALT+DEL again will restart your computer. You will lose unsaved information in all programs that are running.</p>
      <div class="btn-row"><button data-end>End Task</button><button data-shut>Shut Down</button><button class="default" data-cancel>Cancel</button></div>`;
    let sel = 0; const rows = w.body.querySelectorAll('.tmi');
    const hl = () => rows.forEach((r,k)=>{ r.style.background = k===sel?'var(--navy)':''; r.style.color = k===sel?'#fff':''; });
    rows.forEach((r,k)=>r.onclick=()=>{ sel=k; hl(); }); hl();
    w.body.querySelector('[data-cancel]').onclick = w.close;
    w.body.querySelector('[data-shut]').onclick = () => { w.close(); openApp('shutdown'); };
    w.body.querySelector('[data-end]').onclick = () => {
      const progs = list();
      if (sel < progs.length){ progs[sel].w.close(); render(); }
      else if (items[sel]==='Explorer'){ w.close(); bsod(); }
      else msgbox('Close Program', `${items[sel]} is a system process and cannot be ended.`, 'warn');
    };
  };
  render();
}};

const saverCv = document.getElementById('saver');
let saverOn = false, idleT = null;
function screensaver(){
  if (saverOn || document.getElementById('boot').style.display==='block') return;
  saverOn = true; saverCv.style.display = 'block';
  const c = saverCv.getContext('2d'); saverCv.width = innerWidth; saverCv.height = innerHeight;
  const W = saverCv.width, H = saverCv.height, cx = W/2, cy = H/2;
  const stars = Array.from({length:220}, () => ({ x:(Math.random()-.5)*W, y:(Math.random()-.5)*H, z:Math.random()*W }));
  const flags = Array.from({length:10}, () => ({ x:(Math.random()-.5)*W, y:(Math.random()-.5)*H, z:Math.random()*W }));
  const flag = (x,y,s) => { const q = s/2.2; [['#f33',0,0],['#3c3',1,0],['#36f',0,1],['#fc0',1,1]].forEach(([col,i,j])=>{ c.fillStyle=col; c.beginPath();
      const ox = x + i*q*1.1 - q, oy = y + j*q*1.1 - q; c.moveTo(ox,oy+q*.15); c.quadraticCurveTo(ox+q/2,oy-q*.1,ox+q,oy+q*.15); c.lineTo(ox+q,oy+q*1.05); c.quadraticCurveTo(ox+q/2,oy+q*.8,ox,oy+q*1.05); c.fill(); }); };
  const start = performance.now();
  (function frame(){
    if (!saverOn) return;
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0,0,W,H);
    for (const s of stars){ s.z -= 6; if (s.z < 1){ s.z = W; s.x=(Math.random()-.5)*W; s.y=(Math.random()-.5)*H; }
      const k = 200/s.z, x = cx + s.x*k, y = cy + s.y*k, r = Math.max(.5, 2.2 - s.z/W*2); c.fillStyle = '#fff'; c.fillRect(x,y,r,r); }
    for (const f of flags){ f.z -= 3; if (f.z < 1){ f.z = W; f.x=(Math.random()-.5)*W; f.y=(Math.random()-.5)*H; }
      const k = 200/f.z; flag(cx + f.x*k, cy + f.y*k, Math.min(120, 30*k)); }
    if (performance.now()-start < 4000){ c.fillStyle='#fff'; c.font='bold 18px Arial'; c.textAlign='center'; c.fillText('Zach 98', cx, H-30); }
    requestAnimationFrame(frame);
  })();
}
function stopSaver(){ if (!saverOn) return; saverOn = false; saverCv.style.display = 'none'; }
function resetIdle(){ clearTimeout(idleT); idleT = setTimeout(screensaver, 150000); }
let saverMoveGuard = 0;
['pointermove','pointerdown','keydown','wheel','touchstart'].forEach(ev => addEventListener(ev, e => {
  if (saverOn){ if (ev==='pointermove' && ++saverMoveGuard < 4) return; saverMoveGuard = 0; stopSaver(); e.preventDefault && ev!=='pointermove' && e.stopPropagation(); }
  resetIdle();
}, true));
resetIdle();

function bsod(){
  const b = document.getElementById('bsod');
  b.querySelector('.in').innerHTML = `<div class="hd">Zach 98</div>
    <p>A fatal exception 0E has occurred at 0028:C0035414 in VXD ECONOMETRICS(01) + 00010E36. The current application will be terminated.</p>
    <p>*&nbsp; Press any key to terminate the current application.<br>*&nbsp; Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.</p>
    <p style="text-align:center;margin-top:30px">Press any key to continue <span class="blink">_</span></p>`;
  b.style.display = 'flex';
  const done = () => { b.style.display = 'none'; removeEventListener('keydown', done, true); b.removeEventListener('click', done); };
  setTimeout(()=>{ addEventListener('keydown', done, true); b.addEventListener('click', done); }, 400);
}

/* =====================================================================
   WIRE-UP: run commands, desktop icons, start menu, context menu, clock
   ===================================================================== */
Object.assign(RUN, {
  mspaint:()=>openApp('paint'), paint:()=>openApp('paint'), sol:()=>openApp('sol'), solitaire:()=>openApp('sol'),
  calc:()=>openApp('calc'), calculator:()=>openApp('calc'), zim:()=>openApp('zim'), aim:()=>openApp('zim'), chat:()=>openApp('zim'),
  taskman:()=>openApp('taskmgr'), timedate:()=>openApp('datetime'), scrnsave:()=>setTimeout(screensaver,300), bsod:()=>bsod(),
});

// desktop icons (insert before Recycle Bin)
[['sol','Solitaire','cards'],['paint','Paint','paint'],['zim','ZIM','zim'],['calc','Calculator','calc']].forEach(([app,label,ic]) => {
  const d = document.createElement('div'); d.className='dicon'; d.tabIndex=0;
  d.innerHTML = `${icon(ic)}<div class="lbl">${label}</div>`;
  const open = () => openApp(app, d.querySelector('.ico').getBoundingClientRect());
  d.addEventListener('click', e => { iconsEl.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel')); d.classList.add('sel'); if (matchMedia('(pointer:coarse)').matches) open(); e.stopPropagation(); });
  d.addEventListener('dblclick', open);
  d.addEventListener('keydown', e => { if (e.key==='Enter') open(); });
  iconsEl.insertBefore(d, iconsEl.lastElementChild);
});

// Start > Programs: Accessories, Games, System Tools, Online
SUBS.programs.splice(0, 1,
  ['Accessories','folder',null,[
    ['Games','folder',null,[['Solitaire','cards','sol'],['Minesweeper','mine','winmine']]],
    ['System Tools','folder',null,[['Close Program','taskmgr','taskmgr'],['Date/Time','clock','datetime'],['Screen Saver','saver','@saver']]],
    ['Calculator','calc','calc'],['Notepad','notepad','notepad'],['Paint','paint','paint'],['WordPad','doc','wordpad'],['Media Player','media','media']]],
  ['ZIM','zim','zim']);
buildSub('programs', SUBS.programs);

// Ctrl+Alt+Del (where the OS lets it through) and Ctrl+Shift+Esc open Close Program
addEventListener('keydown', e => {
  if ((e.ctrlKey && e.altKey && (e.key==='Delete' || e.key==='Backspace')) || (e.ctrlKey && e.shiftKey && e.key==='Escape')){ e.preventDefault(); openApp('taskmgr'); }
});

// taskbar clock: tooltip + double-click
const clockEl = document.getElementById('clock'), tip = document.getElementById('tip');
clockEl.addEventListener('dblclick', () => openApp('datetime'));
clockEl.addEventListener('click', () => { if (matchMedia('(pointer:coarse)').matches) openApp('datetime'); });
clockEl.addEventListener('pointerenter', () => { tip.textContent = new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}); tip.style.display='block'; const r = clockEl.getBoundingClientRect(); tip.style.left = Math.min(innerWidth - tip.offsetWidth - 4, r.left)+'px'; tip.style.top = (r.top - 22)+'px'; });
clockEl.addEventListener('pointerleave', () => tip.style.display='none');

// desktop right-click menu + draggable icons
const ctxEl = document.getElementById('ctx');
function showCtx(x, y, items){
  ctxEl.innerHTML = items.map((it,i)=> it==='-' ? '<div class="msep"></div>' : `<div class="mi${it[1]?'':' dis'}" data-i="${i}">${it[0]}</div>`).join('');
  ctxEl.style.display='block';
  ctxEl.style.left = Math.min(x, innerWidth - ctxEl.offsetWidth - 2)+'px';
  ctxEl.style.top = Math.min(y, innerHeight - 28 - ctxEl.offsetHeight)+'px';
  ctxEl.querySelectorAll('.mi').forEach(mi => { const it = items[+mi.dataset.i]; if (it[1]) mi.onclick = () => { ctxEl.style.display='none'; it[1](); }; });
}
document.addEventListener('pointerdown', e => { if (!e.target.closest('#ctx')) ctxEl.style.display='none'; });
desktop.addEventListener('contextmenu', e => {
  if (e.target.closest('.app')) return;
  e.preventDefault();
  const ic = e.target.closest('.dicon');
  if (ic){ ic.dispatchEvent(new MouseEvent('click',{bubbles:true}));
    showCtx(e.clientX, e.clientY, [['<b>Open</b>', ()=>ic.dispatchEvent(new MouseEvent('dblclick',{bubbles:true}))], '-', ['Cut',null],['Copy',null],'-',['Delete', ()=>msgbox('Confirm File Delete','Nice try. This icon is load-bearing.','warn')],['Rename',null],'-',['Properties', ()=>openApp('system')]]);
    return; }
  showCtx(e.clientX, e.clientY, [
    ['Arrange Icons', arrangeIcons], ['Line Up Icons', arrangeIcons], '-', ['Refresh', ()=>{ desktop.style.opacity=.4; setTimeout(()=>desktop.style.opacity='',120); }], '-',
    ['Paste',null], ['Paste Shortcut',null], '-', ['New ▸',null], '-',
    ['Active Desktop ▸',null], ['Properties', ()=>openApp('display')] ]);
});
// Convert the icon grid to free-positioned icons so they can be dragged around (desktop only).
function arrangeIcons(){
  const icons = [...iconsEl.children], rows = Math.max(1, Math.floor((desktop.clientHeight - 8) / 76));
  icons.forEach((d,i)=>{ d.style.left = (4 + Math.floor(i/rows)*78)+'px'; d.style.top = (4 + (i%rows)*76)+'px'; });
  try{ localStorage.removeItem('z98icons'); }catch(e){}
}
if (!matchMedia('(pointer:coarse)').matches){
  iconsEl.style.cssText = 'position:absolute;inset:0;display:block';
  [...iconsEl.children].forEach(d => { d.style.position='absolute'; });
  let saved = null; try{ saved = JSON.parse(localStorage.getItem('z98icons')||'null'); }catch(e){}
  arrangeIcons();
  if (saved) [...iconsEl.children].forEach((d,i)=>{ if (saved[i]){ d.style.left=saved[i][0]+'px'; d.style.top=saved[i][1]+'px'; } });
  addEventListener('resize', () => { if (!localStorage.getItem('z98icons')) arrangeIcons(); });
  iconsEl.addEventListener('pointerdown', e => {
    const d = e.target.closest('.dicon'); if (!d || e.button!==0) return;
    const sx = e.clientX, sy = e.clientY, ox = d.offsetLeft, oy = d.offsetTop; let moved = false;
    const mv = ev => { const dx = ev.clientX-sx, dy = ev.clientY-sy; if (!moved && Math.abs(dx)+Math.abs(dy) < 5) return; moved = true;
      d.style.left = (ox+dx)+'px'; d.style.top = (oy+dy)+'px'; d.style.opacity = .7; };
    const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); d.style.opacity='';
      if (!moved) return;
      d.style.left = Math.max(0, Math.round((d.offsetLeft-4)/78)*78+4)+'px'; d.style.top = Math.max(0, Math.round((d.offsetTop-4)/76)*76+4)+'px';
      try{ localStorage.setItem('z98icons', JSON.stringify([...iconsEl.children].map(x=>[x.offsetLeft,x.offsetTop]))); }catch(err){} };
    addEventListener('pointermove', mv); addEventListener('pointerup', up);
  });
}
