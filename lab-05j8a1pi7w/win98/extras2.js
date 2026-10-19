/* =====================================================================
   Zach 98 — more programs: screen savers + Display tabs, color schemes,
   Regedit, Zach 98 Update, Disk Defragmenter, Network Neighborhood,
   dial-up networking, system menu / Alt+F4.
   ===================================================================== */

document.head.insertAdjacentHTML('beforeend', `<style id="scheme"></style><style>
.reg{flex:1;display:flex;gap:2px;min-height:0}
.reg .tree-view{flex:0 0 42%;margin:0;overflow:auto}
.reg .tree-view summary,.reg .tree-view li span{cursor:default;padding:0 2px}
.reg .tree-view .sel{background:var(--navy);color:#fff}
.reg .vals{flex:1;min-width:0;overflow:auto;background:#fff}
.reg .vals table{width:100%;border-collapse:collapse}
.reg .vals th{position:sticky;top:0;text-align:left;font-weight:normal;background:var(--face);box-shadow:var(--raised);padding:2px 6px}
.reg .vals td{padding:1px 6px;white-space:nowrap}
.reg .vals tr.sel td{background:var(--navy);color:#fff}
.reg .vals td .ico{width:16px;height:16px;display:inline-block;vertical-align:-3px;margin-right:3px}
.wu{flex:1;min-height:0;overflow:auto;background:#fff;box-shadow:var(--sunken);font:13px Arial,sans-serif;user-select:text}
.wu-head{background:linear-gradient(90deg,#000080,#1084d0);color:#fff;padding:12px 16px;font:bold 20px Arial}
.wu-head small{display:block;font:12px Arial;color:#cfe3ff;margin-top:2px}
.wu-item{display:flex;gap:10px;padding:10px 16px;border-bottom:1px solid #ddd;align-items:flex-start}
.wu-item b{color:#000080}
.wu-item .when{color:#666;font-size:11px}
.defrag-grid{display:grid;grid-template-columns:repeat(32,1fr);gap:1px;background:#fff;box-shadow:var(--sunken);padding:3px;flex:1;min-height:0;align-content:start}
.defrag-grid i{display:block;aspect-ratio:1;border:1px solid rgba(0,0,0,.35)}
.defrag-grid i.cur{outline:2px solid #ff0}
.legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin:6px 2px}
.legend span{display:inline-flex;align-items:center;gap:4px}
.legend i{display:inline-block;width:12px;height:12px;border:1px solid #000}
.dial p{margin:4px 0}
.sch-prev{background:var(--desk,#008080);padding:12px;box-shadow:var(--sunken);margin-bottom:8px}
</style>`);

/* ---------------- screen savers ---------------- */
const SAVERS = {
  starfield: { name:'Starfield Simulation', init(c,W,H){
    const cx=W/2, cy=H/2, stars = Array.from({length:240},()=>({x:(Math.random()-.5)*W,y:(Math.random()-.5)*H,z:Math.random()*W}));
    return () => { c.fillStyle='rgba(0,0,0,.4)'; c.fillRect(0,0,W,H);
      for (const s of stars){ s.z -= 7; if (s.z<1){ s.z=W; s.x=(Math.random()-.5)*W; s.y=(Math.random()-.5)*H; }
        const k=200/s.z, r=Math.max(.6, 2.4-s.z/W*2); c.fillStyle='#fff'; c.fillRect(cx+s.x*k, cy+s.y*k, r, r); } }; } },
  flying: { name:'Flying Zach 98', init(c,W,H){
    const cx=W/2, cy=H/2, fl = Array.from({length:14},()=>({x:(Math.random()-.5)*W,y:(Math.random()-.5)*H,z:Math.random()*W}));
    const flag=(x,y,s)=>{ const q=s/2.2; [['#f33',0,0],['#3c3',1,0],['#36f',0,1],['#fc0',1,1]].forEach(([col,i,j])=>{ c.fillStyle=col; c.beginPath();
      const ox=x+i*q*1.1-q, oy=y+j*q*1.1-q; c.moveTo(ox,oy+q*.15); c.quadraticCurveTo(ox+q/2,oy-q*.1,ox+q,oy+q*.15); c.lineTo(ox+q,oy+q*1.05); c.quadraticCurveTo(ox+q/2,oy+q*.8,ox,oy+q*1.05); c.fill(); }); };
    return () => { c.fillStyle='#000'; c.fillRect(0,0,W,H);
      for (const f of fl){ f.z -= 4; if (f.z<1){ f.z=W; f.x=(Math.random()-.5)*W; f.y=(Math.random()-.5)*H; } const k=200/f.z; flag(cx+f.x*k, cy+f.y*k, Math.min(140, 30*k)); } }; } },
  mystify: { name:'Mystify Your Mind', init(c,W,H){
    const mk = () => ({ p:Array.from({length:4},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()*2+1)*(Math.random()<.5?-1:1)*2.2,vy:(Math.random()*2+1)*(Math.random()<.5?-1:1)*2.2})), hue:Math.random()*360, trail:[] });
    const shapes = [mk(), mk()];
    return () => { c.fillStyle='#000'; c.fillRect(0,0,W,H);
      for (const s of shapes){
        s.p.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1; });
        s.trail.unshift(s.p.map(p=>[p.x,p.y])); if (s.trail.length>7) s.trail.length=7; s.hue=(s.hue+.6)%360;
        s.trail.forEach((pts,k)=>{ if (k%2) return; c.strokeStyle=`hsl(${s.hue},100%,${60-k*5}%)`; c.lineWidth=1; c.beginPath(); pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.closePath(); c.stroke(); });
      } }; } },
  pipes: { name:'3D Pipes', init(c,W,H){
    const G=34, cols=Math.ceil(W/G), rows=Math.ceil(H/G); let pipes=[], segs=0;
    c.fillStyle='#000'; c.fillRect(0,0,W,H);
    const newPipe = () => ({ x:Math.floor(Math.random()*cols), y:Math.floor(Math.random()*rows), d:Math.floor(Math.random()*4), hue:Math.floor(Math.random()*6)*60 });
    const seg = (x1,y1,x2,y2,hue) => { const g=c.createLinearGradient(x1-6,y1-6,x1+6,y1+6);
      g.addColorStop(0,`hsl(${hue},90%,75%)`); g.addColorStop(.5,`hsl(${hue},90%,45%)`); g.addColorStop(1,`hsl(${hue},90%,20%)`);
      c.strokeStyle=g; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke(); };
    const ball = (x,y,hue) => { const g=c.createRadialGradient(x-3,y-3,1,x,y,10); g.addColorStop(0,`hsl(${hue},90%,85%)`); g.addColorStop(1,`hsl(${hue},90%,25%)`); c.fillStyle=g; c.beginPath(); c.arc(x,y,9,0,7); c.fill(); };
    pipes.push(newPipe());
    return () => { for (let n=0;n<2;n++){
      if (segs > 900){ c.fillStyle='#000'; c.fillRect(0,0,W,H); pipes=[newPipe()]; segs=0; }
      if (Math.random()<.01 && pipes.length<5) pipes.push(newPipe());
      for (const p of pipes){
        if (Math.random()<.2){ p.d=(p.d+(Math.random()<.5?1:3))%4; ball(p.x*G+G/2,p.y*G+G/2,p.hue); }
        const dx=[1,0,-1,0][p.d], dy=[0,1,0,-1][p.d], nx=p.x+dx, ny=p.y+dy;
        if (nx<0||ny<0||nx>=cols||ny>=rows){ p.d=(p.d+2)%4; continue; }
        seg(p.x*G+G/2,p.y*G+G/2,nx*G+G/2,ny*G+G/2,p.hue); p.x=nx; p.y=ny; segs++;
      } } }; } },
  text3d: { name:'3D Text', init(c,W,H){
    const text = localGet('z98sstext') || 'Hire Zach!'; let t = 0;
    return () => { t += .02; c.fillStyle='#000'; c.fillRect(0,0,W,H);
      c.save(); c.translate(W/2 + Math.sin(t*.7)*W*.2, H/2 + Math.cos(t*.5)*H*.2); c.scale(Math.cos(t), 1 + Math.sin(t*1.3)*.15);
      const fs = Math.min(W/6, 140); c.font = `bold ${fs}px "Times New Roman"`; c.textAlign='center'; c.textBaseline='middle';
      for (let d=10; d>0; d--){ c.fillStyle = `rgb(${40+d*8},${20+d*6},0)`; c.fillText(text, d*1.4, d*1.4); }
      const g = c.createLinearGradient(0,-fs/2,0,fs/2); g.addColorStop(0,'#fff6a0'); g.addColorStop(.5,'#ffc000'); g.addColorStop(1,'#a06000');
      c.fillStyle = g; c.fillText(text, 0, 0); c.restore(); }; } },
};
let saverRAF = null;
screensaver = function(kind){
  if (saverOn || document.getElementById('boot').style.display==='block') return;
  kind = SAVERS[kind] ? kind : (localGet('z98saver') || 'flying');
  if (kind === 'none') return;
  saverOn = true; saverCv.style.display = 'block';
  const c = saverCv.getContext('2d'); saverCv.width = innerWidth; saverCv.height = innerHeight;
  c.fillStyle='#000'; c.fillRect(0,0,innerWidth,innerHeight);
  const frame = SAVERS[kind].init(c, innerWidth, innerHeight);
  cancelAnimationFrame(saverRAF);
  (function loop(){ if (!saverOn) return; frame(); saverRAF = requestAnimationFrame(loop); })();
};
resetIdle = function(){ clearTimeout(idleT); const m = +(localGet('z98wait') || 3); if (m > 0) idleT = setTimeout(()=>screensaver(), m*60000); };
resetIdle();

/* ---------------- color schemes ---------------- */
const SCHEMES = {
  standard:{ name:'Zach 98 Standard', css:'' },
  rainy:{ name:'Rainy Day', face:'#8a96a8', title:'linear-gradient(90deg,#4f6a8e,#8fa6c8)', ink:'#000' },
  lilac:{ name:'Lilac', face:'#b4aed4', title:'linear-gradient(90deg,#5c4f8f,#a69ad4)', ink:'#000' },
  desert:{ name:'Desert', face:'#d5ccbb', title:'linear-gradient(90deg,#008080,#4fb0b0)', ink:'#000' },
  hotdog:{ name:'Hot Dog Stand', face:'#ffff00', title:'#ff0000', ink:'#000', extra:'.window-body,.panel-white,.explorer,.files,textarea,input[type=text]{background:#ff0000!important;color:#fff!important}.app .title-bar-text{color:#fff}' },
  contrast:{ name:'High Contrast Black', face:'#000', title:'#800080', ink:'#fff', extra:'.panel-white,.explorer,.files,.webview,textarea,input[type=text],.desc-box,.wp-doc,.web{background:#000!important;color:#fff!important}.webview h2,.web h1,.web h2{color:#ff0!important}a{color:#0ff!important}' },
};
function applyScheme(key){
  const s = SCHEMES[key] || SCHEMES.standard, el = document.getElementById('scheme');
  if (!s.face){ el.textContent = ''; return; }
  el.textContent = `.window,#taskbar,#startMenu,.submenu,.dropdown,#ctx,button,.toolbar,.status-bar-field,.menubar,.addr,menu[role=tablist] li{background-color:${s.face}!important;color:${s.ink}!important}
    .title-bar{background:${s.title}!important}.title-bar.inactive{background:#808080!important}
    .mi:hover,.mi.hover{background:#000080!important;color:#fff!important}${s.extra||''}`;
}
applyScheme(localGet('z98scheme'));

/* ---------------- Display Properties (Background / Screen Saver / Appearance) ---------------- */
APPS.display = { title:'Display Properties', icon:'display', dialog:true, w:400, h:450, render(w){
  const COLORS = [['Teal','#008080'],['Clouds','linear-gradient(#5d8fd8,#a8c8f0 55%,#e8f2ff)'],['Navy','#000080'],['Black','#000'],['Maroon','#800000'],['Olive','#808000'],['Violet','#57068c'],['Gray','#808080']];
  let bg = localGet('z98bg') || '#008080', saver = localGet('z98saver') || 'flying', wait = localGet('z98wait') || '3', sch = localGet('z98scheme') || 'standard', text = localGet('z98sstext') || 'Hire Zach!';
  let tab = 0;
  w.body.style.display='flex'; w.body.style.flexDirection='column';
  const draw = () => {
    const tabs = ['Background','Screen Saver','Appearance'];
    w.body.innerHTML = `<div class="tabs"><menu role="tablist">${tabs.map((t,i)=>`<li role="tab" aria-selected="${i===tab}"><a href="#" data-tab="${i}">${t}</a></li>`).join('')}</menu>
      <div class="window" role="tabpanel"><div class="window-body" style="display:block;margin:10px" data-pane></div></div></div>
      <div class="btn-row"><button class="default" data-ok>OK</button><button data-cancel>Cancel</button><button data-apply>Apply</button></div>`;
    const pane = w.body.querySelector('[data-pane]');
    const monitor = inner => `<div class="monitor-prev">${icon('computer',180).replace('class="ico"','class="ico" style="width:180px;height:180px"')}<div class="scr" data-prev>${inner||''}</div></div>`;
    if (tab===0){
      pane.innerHTML = monitor() + `<div>Wallpaper:</div><div class="colors">${COLORS.map(c=>`<div class="swatch" data-c="${c[1]}" title="${c[0]}" style="background:${c[1]}"></div>`).join('')}</div>`;
      const paint = () => { pane.querySelector('[data-prev]').style.background = bg; pane.querySelectorAll('.swatch').forEach(s=>s.classList.toggle('on', s.dataset.c===bg)); };
      pane.querySelectorAll('.swatch').forEach(s=>s.onclick=()=>{ bg=s.dataset.c; paint(); }); paint();
    } else if (tab===1){
      pane.innerHTML = monitor(`<div style="position:absolute;inset:0;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font:11px Arial;text-align:center">${saver==='none'?'(None)':esc(SAVERS[saver].name)}</div>`) +
        `<fieldset><legend>Screen Saver</legend>
          <div class="field-row"><select data-saver style="flex:1"><option value="none">(None)</option>${Object.entries(SAVERS).map(([k,v])=>`<option value="${k}" ${k===saver?'selected':''}>${v.name}</option>`).join('')}</select><button data-preview>Preview</button></div>
          <div class="field-row" data-textrow style="display:${saver==='text3d'?'flex':'none'}"><label>Text:</label><input type="text" data-text value="${esc(text)}" style="flex:1" maxlength="24"></div>
          <div class="field-row"><label>Wait:</label><select data-wait>${[1,2,3,5,10,15].map(m=>`<option ${String(m)===wait?'selected':''}>${m}</option>`).join('')}</select><label>minutes</label></div></fieldset>`;
      pane.querySelector('[data-saver]').onchange = e => { saver = e.target.value; draw(); };
      pane.querySelector('[data-wait]').onchange = e => wait = e.target.value;
      const t = pane.querySelector('[data-text]'); if (t) t.oninput = () => text = t.value;
      pane.querySelector('[data-preview]').onclick = () => { if (saver!=='none'){ localSet('z98sstext', text); setTimeout(()=>screensaver(saver), 300); } };
      pane.querySelector('[data-preview]').style.minWidth='70px';
    } else {
      pane.innerHTML = `<div class="sch-prev" style="background:${bg}"><div class="window" style="width:100%"><div class="title-bar"><div class="title-bar-text">Active Window</div></div><div class="window-body"><p style="margin:4px 0">Window Text</p><button>OK</button></div></div></div>
        <div class="field-row"><label>Scheme:</label><select data-sch style="flex:1">${Object.entries(SCHEMES).map(([k,v])=>`<option value="${k}" ${k===sch?'selected':''}>${v.name}</option>`).join('')}</select></div>`;
      pane.querySelector('[data-sch]').onchange = e => { sch = e.target.value; applyScheme(sch); };
    }
    w.body.querySelectorAll('[data-tab]').forEach(a=>a.onclick=e=>{ e.preventDefault(); tab=+a.dataset.tab; draw(); });
    const apply = () => { setDesktop(bg); localSet('z98bg', bg); localSet('z98saver', saver); localSet('z98wait', wait); localSet('z98sstext', text); localSet('z98scheme', sch==='standard'?'':sch); applyScheme(sch); resetIdle(); };
    w.body.querySelector('[data-apply]').onclick = apply;
    w.body.querySelector('[data-ok]').onclick = () => { apply(); w.close(); };
    w.body.querySelector('[data-cancel]').onclick = () => { applyScheme(localGet('z98scheme')); w.close(); };
  };
  draw();
}};

/* ---------------- Regedit: the résumé as a registry ---------------- */
APPS.regedit = { title:'Registry Editor', icon:'regedit', w:700, h:460, render(w){
  const S = (n,d) => [n,'REG_SZ',`"${d}"`], D = (n,v) => [n,'REG_DWORD',`0x${v.toString(16).padStart(8,'0')} (${v})`];
  const key = (name, values, kids) => ({ name, values:values||[], kids:kids||[] });
  const TREE = [
    key('HKEY_CLASSES_ROOT'),
    key('HKEY_CURRENT_ZACH', [S('(Default)','Zach Winship'), S('Title','Quantitative Economist and Data Analyst')], [
      key('Contact', [S('Email',EMAIL), S('LinkedIn','linkedin.com/in/zwinship'), S('GitHub','github.com/zwinship')]),
      key('Education', [], [
        key('NYU', [S('Degree','MS in Quantitative Economics'), S('Expected','May 2027'), S('Fellowship','NYU Economics Teaching Fellowship, Summer 2026'), S('Role','Teaching Assistant, Introductory Macroeconomics')]),
        key('Bentley', [S('Degree','BS in Quantitative Economics'), S('Minors','Mathematics; Data Technologies'), S('GPA','3.74'), S('Graduated','May 2026')]),
      ]),
      key('Experience', [], EXPERIENCE.map(e => key(e.role.replace(/,.*/,''), [S('Organization',e.org), S('When',e.when), S('Description',e.body)]))),
      key('Research', [], RESEARCH.map(p => key(shortName(p.title), [S('Title',p.title), S('Year',p.year), S('Fields',p.meta), S('Methods',p.tags.join(', ')), ...(p.badge?[S('Series',p.badge)]:[]), ...(p.links||[]).map(l=>S(l[1],l[0]))]))),
      key('Software', [], [ key('Skills', SKILLS.map(sk => D(sk, 1))) ]),
    ]),
    key('HKEY_LOCAL_MACHINE', [], [ key('Hardware', [], [ key('MBTA_LED_Art', [S('Board','Raspberry Pi'), S('Status','Software complete; frame in progress')]) ]) ]),
    key('HKEY_USERS', [], [ key('.DEFAULT', [S('Visitor','Welcome!')]) ]),
  ];
  w.body.innerHTML = menubar([['Registry',[['Export Registry File...','export'],'-',['Exit','close']]],['Edit',[]],['View',[]],['Help',[['About Registry Editor','abt']]]])
    + `<div class="reg"><ul class="tree-view" data-tree></ul><div class="vals"><table><thead><tr><th>Name</th><th>Type</th><th>Data</th></tr></thead><tbody data-vals></tbody></table></div></div>
       <div class="status-bar"><p class="status-bar-field" data-path>My Computer</p></div>`;
  const treeEl = w.body.querySelector('[data-tree]'), vals = w.body.querySelector('[data-vals]'), pathEl = w.body.querySelector('[data-path]');
  const fold = `<svg viewBox="0 0 32 32" class="ico" style="width:16px;height:16px;display:inline-block;vertical-align:-3px">${ICON.folder}</svg>`;
  const build = (k, path) => {
    const li = document.createElement('li'); const p = path ? path+'\\'+k.name : k.name;
    if (k.kids.length){ li.innerHTML = `<details><summary>${fold} <span>${esc(k.name)}</span></summary><ul></ul></details>`; k.kids.forEach(c => li.querySelector('ul').appendChild(build(c, p))); }
    else li.innerHTML = `${fold} <span>${esc(k.name)}</span>`;
    li.querySelector('span').onclick = e => { e.preventDefault(); treeEl.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel')); e.target.classList.add('sel'); show(k, p); };
    return li;
  };
  TREE.forEach(k => treeEl.appendChild(build(k, 'My Computer')));
  function show(k, p){
    pathEl.textContent = p;
    const rows = k.values.length ? k.values : [['(Default)','REG_SZ','(value not set)']];
    vals.innerHTML = rows.map(([n,t,d])=>`<tr><td>${icon(t==='REG_SZ'?'regsz':'regbin',16)}${esc(n)}</td><td>${t}</td><td>${esc(d)}</td></tr>`).join('');
    vals.querySelectorAll('tr').forEach((tr,i)=>{ tr.onclick=()=>{ vals.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel')); tr.classList.add('sel'); };
      tr.ondblclick=()=>{ const [n,t,d]=rows[i]; const url = (d.match(/https?:\/\/[^"]+/)||[])[0];
        msgbox('Edit String', `Value name: <b>${esc(n)}</b><br>Value data: ${esc(d)}${url?`<br><br><a href="${url}" target="_blank" rel="noopener">Open link</a>`:''}<br><br><i>This key is read-only.</i>`, 'info'); }; });
  }
  const zach = treeEl.children[1]; zach.querySelector('details').open = true; zach.querySelector('span').click();
  wireMenubar(w, { export:()=>{ const lines=['REGEDIT4','']; const walk=(k,p)=>{ const q=p?p+'\\'+k.name:k.name; lines.push(`[${q}]`); k.values.forEach(([n,t,d])=>lines.push(`"${n}"=${t==='REG_SZ'?d:'dword:'+d.slice(2,10)}`)); lines.push(''); k.kids.forEach(c=>walk(c,q)); }; TREE.forEach(k=>walk(k,''));
      const a=document.createElement('a'); a.download='zach.reg'; a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(lines.join('\r\n')); a.click(); },
    abt:()=>msgbox('About Registry Editor','Registry Editor<br>HKEY_CURRENT_ZACH holds the résumé. Double-click a value to read it.','info') });
}};

/* ---------------- Zach 98 Update: news as "critical updates" ---------------- */
const UPDATES = [
  ['NBER Working Paper No. 35414', 'Congestion Pricing and EMS Response Time: Evidence From New York City. Under journal review.', '2026', ()=>openProject(ALL_PROJECTS[0])],
  ['Media Coverage Pack', 'Fortune, ABC7, Gothamist, Streetsblog NYC, City Observatory and Yahoo Finance covered the EMS paper.', 'July 2026', ()=>openApp('ie')],
  ['NYU MS Quantitative Economics', 'Installs graduate coursework. Expected completion May 2027.', 'Summer 2026', ()=>openApp('system')],
  ['Teaching Assistant Service Pack', 'Introductory Macroeconomics recitations, exams and grading at NYU.', 'Aug 2026', ()=>openApp('wordpad')],
  ['Unlikely Instruments 1.0', 'A bi-monthly blog about unusual proxy variables. First post: Strava as a proxy for urban crime perception.', 'Sept 2026', ()=>openApp('blog')],
  ['OctaStats UFC Model V2', 'Full rebuild: dynamic logit framework, automated pipeline, proprietary data.', '2026', ()=>openProject(ALL_PROJECTS.find(p=>/OctaStats/.test(p.title)))],
  ['Bentley University Graduation', 'BS Quantitative Economics, minors in Mathematics and Data Technologies. GPA 3.74.', 'May 2026', ()=>openApp('system')],
];
APPS.wupdate = { title:'Zach 98 Update - Internet Explorer', icon:'update', w:640, h:500, render(w){
  w.body.innerHTML = `<div class="wu"><div class="wu-head">Zach 98 Update<small>Product Updates · Critical Updates for ZACH-PC</small></div>
      ${UPDATES.map((u,i)=>`<div class="wu-item"><input type="checkbox" id="wu${i}" checked><label for="wu${i}" style="flex:1"><b>${esc(u[0])}</b> <span class="when">(${esc(u[2])})</span><br>${esc(u[1])}</label><button data-i="${i}" style="min-width:64px">Install</button></div>`).join('')}
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:6px"><div class="progress-indicator segmented" style="flex:1"><span class="progress-indicator-bar" data-bar style="width:0%"></span></div><button class="default" data-all>Download</button></div>
    <div class="status-bar"><p class="status-bar-field" data-st>${UPDATES.length} critical updates available.</p></div>`;
  w.body.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>UPDATES[+b.dataset.i][3]());
  const bar = w.body.querySelector('[data-bar]'), st = w.body.querySelector('[data-st]');
  let t = null;
  w.body.querySelector('[data-all]').onclick = () => {
    const picked = UPDATES.filter((u,i)=>w.body.querySelector('#wu'+i).checked); if (!picked.length) return;
    let pct = 0; clearInterval(t);
    t = setInterval(()=>{ pct = Math.min(100, pct + 4 + Math.random()*6); bar.style.width = pct+'%';
      st.textContent = pct<100 ? `Downloading ${picked[Math.min(picked.length-1, Math.floor(pct/100*picked.length))][0]}... ${Math.floor(pct)}%` : 'Download complete.';
      if (pct>=100){ clearInterval(t); beep('tada'); msgbox('Zach 98 Update', `${picked.length} update(s) installed successfully. Zach is now up to date.<br><br>Click <b>Install</b> next to any item to open it.`, 'info'); } }, 120);
  };
  w.onClose = () => clearInterval(t);
}};

/* ---------------- Disk Defragmenter ---------------- */
APPS.defrag = { title:'Defragmenting Drive C', icon:'defrag', w:520, h:430, minW:360, minH:300, render(w){
  const KIND = [['#0000c0','Research'],['#00a0a0','Personal Projects'],['#c00000','Presentations'],['#c0c000','Experience'],['#ffffff','Free space']];
  const N = 32*14; let blocks, sorted, i, timer;
  const order = k => k === 4 ? 99 : k;
  w.body.innerHTML = `<div class="defrag-grid" data-g></div>
    <div class="legend">${KIND.map(([c,l])=>`<span><i style="background:${c}"></i>${l}</span>`).join('')}<span><i style="background:#ff0"></i>Reading</span></div>
    <div style="display:flex;align-items:center;gap:8px"><div class="progress-indicator segmented" style="flex:1"><span class="progress-indicator-bar" data-bar style="width:0%"></span></div><span data-pct style="width:90px">0% Complete</span></div>
    <div class="btn-row"><button data-stop>Stop</button><button data-pause>Pause</button><button data-legend>Show Details</button></div>`;
  const g = w.body.querySelector('[data-g]'), bar = w.body.querySelector('[data-bar]'), pctEl = w.body.querySelector('[data-pct]');
  function init(){
    blocks = Array.from({length:N}, () => { const r = Math.random(); return r<.18?0 : r<.36?1 : r<.46?2 : r<.54?3 : 4; });
    sorted = blocks.slice().sort((a,b)=>order(a)-order(b)); i = 0;
    g.innerHTML = blocks.map(k=>`<i style="background:${KIND[k][0]}"></i>`).join('');
  }
  let paused = false;
  function step(){
    if (paused) return;
    for (let n=0; n<3 && i<N; n++, i++){
      if (blocks[i] === sorted[i]) continue;
      const j = blocks.indexOf(sorted[i], i+1); if (j<0) continue;
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
      const a = g.children[i], b = g.children[j];
      a.style.background = KIND[blocks[i]][0]; b.style.background = KIND[blocks[j]][0];
      g.querySelectorAll('.cur').forEach(x=>x.classList.remove('cur')); b.classList.add('cur');
    }
    const pct = Math.floor(i/N*100); bar.style.width = pct+'%'; pctEl.textContent = pct + '% Complete';
    if (i >= N){ clearInterval(timer); g.querySelectorAll('.cur').forEach(x=>x.classList.remove('cur')); beep('ding');
      msgbox('Disk Defragmenter', "Defragmentation of Zach's portfolio is complete.<br><br>0 bytes of coursework were found.", 'info'); }
  }
  init(); timer = setInterval(step, 40);
  w.body.querySelector('[data-stop]').onclick = w.close;
  w.body.querySelector('[data-pause]').onclick = e => { paused = !paused; e.target.textContent = paused ? 'Resume' : 'Pause'; };
  w.body.querySelector('[data-legend]').onclick = () => msgbox('Defrag Legend', KIND.map(([c,l])=>`<span style="display:inline-block;width:10px;height:10px;background:${c};border:1px solid #000"></span> ${l}`).join('<br>'), 'info');
  w.onClose = () => clearInterval(timer);
}};

/* ---------------- Network Neighborhood ---------------- */
const NET = [
  ['NBER', 'National Bureau of Economic Research', 'Publisher of Working Paper No. 35414 (Congestion Pricing and EMS Response Time).', [['https://www.nber.org/papers/w35414','Open Paper']]],
  ['NBER-COAUTHORS', 'Workgroup: co-authors', 'Yulia Chikish, Greg Colman, Dhaval Dave, Brad Humphreys and Zachary Santamaria.', []],
  ['NYU-ECON', 'New York University · Economics', 'MS in Quantitative Economics (May 2027). Teaching Assistant, Introductory Macroeconomics.', []],
  ['BENTLEY', 'Bentley University', 'BS Quantitative Economics, May 2026. Research Assistant and Instructional Content Assistant.', [['https://falconeconsim.github.io/','Course Site']]],
  ['AAF-DC', 'American Action Forum · Washington, DC', 'Regulatory Data Intern, May to August 2025.', [['https://policyinterns.com/author/typhoonscented11a6c9fde0/','Blog Posts']]],
  ['OCTASTATS', 'OctaStats server', 'UFC fight prediction model, live dashboard.', [['https://octastats.github.io/index.html','Open Site']]],
  ['TALEOFTHETAPE', 'Tale of the Tape server', 'Daily UFC fighter guessing game.', [['https://taleofthetape.github.io','Play']]],
  ['GITHUB', 'GitHub', 'Source code for every project.', [['https://github.com/zwinship','Open']]],
];
FOLDERS.network = () => ({ title:'Network Neighborhood', path:'Network Neighborhood', icon:'network',
  desc:`<p>Computers on ZachNet: the places and people behind this portfolio.</p>`,
  items: NET.map(([n,t,d,links]) => ({ name:n, icon:'computer', type:t, blurb:d, open:r=>openWin('net:'+n, { title:n+' Properties', dialog:true, help:true, center:true, w:360, h:230, render(x){
    x.body.innerHTML = `<div class="props">${icon('computer')}<div><h4>\\\\${esc(n)}</h4><div>${esc(t)}</div></div></div><div class="hr98"></div><div class="desc-box">${esc(d)}</div>
      <div class="btn-row">${links.map(l=>`<button data-u="${l[0]}">${esc(l[1])}</button>`).join('')}<button class="default" data-ok>OK</button></div>`;
    x.body.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>ext(b.dataset.u)); x.body.querySelector('[data-ok]').onclick = x.close; } }, r) }))
});
APPS.network = { title:'Network Neighborhood', icon:'network', w:620, h:400, render:w=>explorer(w, FOLDERS.network()) };
FOLDERS.mycomputer = (orig => () => { const f = orig(); f.items.push({ name:'Network Neighborhood', icon:'network', type:'System Folder', blurb:'Places and people behind the portfolio.', folder:'network' }); return f; })(FOLDERS.mycomputer);

/* ---------------- Dial-up networking (first browser launch) ---------------- */
let dialed = false;
function modemSound(){
  try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)();
    const t0 = AC.currentTime, g = AC.createGain(); g.gain.value = .025; g.connect(AC.destination);
    const tone = (f,a,b,type='sine') => { const o = AC.createOscillator(); o.type=type; o.frequency.value=f; o.connect(g); o.start(t0+a); o.stop(t0+b); return o; };
    [697,1209].forEach(f=>tone(f,0,.12)); [770,1336].forEach(f=>tone(f,.18,.3)); [852,1477].forEach(f=>tone(f,.36,.48)); [941,1336].forEach(f=>tone(f,.54,.66));
    tone(2100,.8,1.3); tone(1300,1.35,1.5,'square'); tone(2400,1.5,1.7,'sawtooth');
    const n = AC.createBufferSource(), buf = AC.createBuffer(1, AC.sampleRate*.9, AC.sampleRate), d = buf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * (Math.sin(i/90)>0 ? 1 : .3);
    n.buffer = buf; n.connect(g); n.start(t0+1.7);
  }catch(e){}
}
const openAppBase = openApp;
openApp = function(key, r){
  if ((key==='ie' || key==='blog' || key==='wupdate') && !dialed && !wins.has(key)){
    dialed = true;
    const steps = ['Dialing attempt 1...', 'Verifying user name and password...', 'Logging on to network...'];
    let k = 0, cancelled = false;
    const dlg = openWin('dialup', { title:'Connecting to ZachNet', dialog:true, center:true, w:340, h:180, render(x){
      x.body.innerHTML = `<div class="err dial">${icon('network')}<div><p><b>Status:</b> <span data-s>${steps[0]}</span></p><p>Number: 1-800-HIRE-ZACH</p><p>Connected at 56,000 bps</p></div></div><div class="btn-row"><button data-c>Cancel</button></div>`;
      x.body.querySelector('[data-c]').onclick = () => { cancelled = true; dialed = false; x.close(); };
    }});
    modemSound();
    const t = setInterval(() => { if (cancelled){ clearInterval(t); return; } k++;
      if (k < steps.length){ const s = dlg.body.querySelector('[data-s]'); if (s) s.textContent = steps[k]; }
      else { clearInterval(t); dlg.close(); openAppBase(key, r); } }, 850);
    return;
  }
  return openAppBase(key, r);
};

/* ---------------- system menu on the title-bar icon, Alt+F4 ---------------- */
document.addEventListener('click', e => {
  const ico = e.target.closest('.app .title-bar-text .ico'); if (!ico) return;
  const winEl = ico.closest('.app'), w = [...wins.values()].find(o=>o.el===winEl); if (!w) return;
  const r = ico.getBoundingClientRect();
  const isMax = winEl.classList.contains('max');
  showCtx(r.left, r.bottom, [
    ['Restore', isMax ? ()=>winEl.querySelector('[aria-label=Restore]')?.click() : null],
    ['Move', null], ['Size', null],
    ['Minimize', winEl.querySelector('[aria-label=Minimize]') ? ()=>winEl.querySelector('[aria-label=Minimize]').click() : null],
    ['Maximize', !isMax && winEl.querySelector('[aria-label=Maximize]:not(:disabled)') ? ()=>w.maximize() : null],
    '-', ['<b>Close</b>&nbsp;&nbsp;&nbsp;&nbsp;Alt+F4', ()=>w.close()],
  ]);
});
addEventListener('keydown', e => { if (e.altKey && e.key==='F4' && active){ e.preventDefault(); active.close(); } });

/* ---------------- Recycle Bin: Empty ---------------- */
desktop.addEventListener('contextmenu', e => {
  const ic = e.target.closest('.dicon'); if (!ic || ic.querySelector('.lbl').textContent !== 'Recycle Bin') return;
  e.preventDefault(); e.stopImmediatePropagation();
  showCtx(e.clientX, e.clientY, [['<b>Open</b>', ()=>openApp('recycle')], ['Explore', ()=>openApp('recycle')], '-',
    ['Empty Recycle Bin', ()=>msgbox('Confirm Multiple File Delete','Are you sure you want to delete these 4 items?','warn',['Yes','No'], b => { if (b===0) msgbox('Error Deleting File','Cannot delete coursework_portfolio.zip: it never existed in the first place.','errorx'); })],
    '-', ['Properties', ()=>msgbox('Recycle Bin Properties','Maximum size of Recycle Bin: 10% of drive.<br>Contents: things this portfolio deliberately leaves out.','info')]]);
}, true);

/* ---------------- icons, Start menu, Run ---------------- */
Object.assign(ICON, {
  regedit:`<rect x="3" y="4" width="26" height="22" fill="#c0c0c0" stroke="#000"/><rect x="6" y="8" width="7" height="5" fill="#00a0ff" stroke="#000"/><rect x="11" y="15" width="7" height="5" fill="#00a0ff" stroke="#000"/><rect x="16" y="22" width="7" height="3" fill="#00a0ff" stroke="#000"/><path d="M9 13v4h2M14 20v3h2" stroke="#000" fill="none"/>`,
  regsz:`<rect x="4" y="6" width="24" height="20" fill="#fff" stroke="#000"/><text x="16" y="21" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#c00">ab</text>`,
  regbin:`<rect x="4" y="6" width="24" height="20" fill="#fff" stroke="#000"/><text x="16" y="21" text-anchor="middle" font-family="Courier New" font-weight="bold" font-size="10" fill="#00f">011</text>`,
  defrag:`<rect x="3" y="6" width="26" height="20" fill="#c0c0c0" stroke="#000"/><g stroke="#000" stroke-width=".5"><rect x="6" y="9" width="4" height="4" fill="#00c"/><rect x="11" y="9" width="4" height="4" fill="#00c"/><rect x="16" y="9" width="4" height="4" fill="#c00"/><rect x="21" y="9" width="4" height="4" fill="#fff"/><rect x="6" y="15" width="4" height="4" fill="#0aa"/><rect x="11" y="15" width="4" height="4" fill="#fff"/><rect x="16" y="15" width="4" height="4" fill="#0aa"/><rect x="21" y="15" width="4" height="4" fill="#cc0"/></g>`,
});
// network icon on the desktop was rendered by index.html before this file loaded
const acc = SUBS.programs.find(x=>x[0]==='Accessories');
const tools = acc && acc[3].find(x=>x[0]==='System Tools');
if (tools) tools[3].push(['Disk Defragmenter','defrag','defrag'], ['Registry Editor','regedit','regedit']);
SUBS.programs.push(['Welcome to Zach 98','update','welcome'], ['Zach 98 Update','update','wupdate']);
buildSub('programs', SUBS.programs);
SUBS.settings.push(['Zach 98 Update...','update','wupdate']);
buildSub('settings', SUBS.settings);
Object.assign(RUN, { regedit:()=>openApp('regedit'), wupdate:()=>openApp('wupdate'), defrag:()=>openApp('defrag'), scandisk:()=>openApp('defrag'), network:()=>openApp('network'), welcome:()=>openApp('welcome') });
if (typeof layoutIcons === 'function') layoutIcons();
