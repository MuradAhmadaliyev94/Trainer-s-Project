
/* Trainer's Platform - main application (globals shared with js/config.js and js/data/*) */
const $=document.getElementById("app");
let bk=null,bd=todayIso(),BK=[],vs=null,ve=null,sel=[],dr=null,dirty=false,fa=null,pv=null,pe=null,dlg=null,ed=null,dbs="wait",who=null,peer="all",MS=[],P={},rd={},view="cab",meets=[],docs={},me=null,sec="offline",db=null,admin=false,loginFor=null,panel=false,ready=false;
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const info=id=>T.find(t=>t[0]===id);
const D=id=>docs[id]||{data:{}};
const list=(id,k)=>(D(id).data||{})[k]||[];
const cnt=id=>S.reduce((n,s)=>n+list(id,s[0]).length,0);
const ini=n=>n[0];
const fd=d=>d?d.split("-").reverse().join("."):"";

async function save(id,data){
  docs[id]={data};
  render();
  try{ if(db) await db.doc("trainers/"+id).set({data}); }catch(e){ alert("Yadda saxlanmadı: "+(e.message||e)); }
}
function AV(id){if(PH[id])return `<img src="${PH[id]}" alt="">`;const c=AC[id],x=c.ex,h=c.hair,
H={short:`<path d="M20 28c-1-12 8-17 14-16 8 1 11 8 10 16-3-5-6-8-12-8s-9 3-12 8z" fill="${h}"/>`,swept:`<path d="M20 28c-2-13 8-18 17-15 6 2 8 8 7 15-2-6-7-9-14-8-5 1-8 4-10 8z" fill="${h}"/>`,curly:`<g fill="${h}"><circle cx="22" cy="20" r="6"/><circle cx="32" cy="15" r="7"/><circle cx="42" cy="20" r="6"/><circle cx="20" cy="27" r="4"/><circle cx="44" cy="27" r="4"/></g>`,bald:"",long:`<path d="M19 28c-1-12 8-17 13-17s14 5 13 17c-3-5-6-8-13-8s-10 3-13 8z" fill="${h}"/><path d="M19 28c-2 8-2 16 0 22h6V30z" fill="${h}"/><path d="M45 28c2 8 2 16 0 22h-6V30z" fill="${h}"/>`};
const beard=x.includes("beard"),face=(beard?`<path d="M20 31c0 10 5 13 12 13s12-3 12-13c-2 5-6 6-12 6s-10-1-12-6z" fill="${h}"/>`:"")+(x.includes("stubble")?`<path d="M20 31c0 10 5 13 12 13s12-3 12-13c-2 5-6 6-12 6s-10-1-12-6z" fill="${h}" opacity=".3"/>`:"")+(x.includes("mustache")?`<path d="M26 34q3-3 6 0q3-3 6 0q-3 3-6 1q-3 2-6-1z" fill="${h}"/>`:"");
return `<svg viewBox="0 0 64 64"><defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.b[0]}"/><stop offset="1" stop-color="${c.b[1]}"/></linearGradient><clipPath id="k${id}"><circle cx="32" cy="32" r="32"/></clipPath></defs><circle cx="32" cy="32" r="32" fill="url(#g${id})"/><g clip-path="url(#k${id})"><path d="M8 64c0-14 10-20 24-20s24 6 24 20z" fill="${c.suit}"/><path d="M26 45l6 8 6-8z" fill="#fff"/><path d="M30 50h4l1 10h-6z" fill="${c.tie}"/><rect x="28" y="38" width="8" height="8" fill="${c.skin}"/><circle cx="20" cy="30" r="2.6" fill="${c.skin}"/><circle cx="44" cy="30" r="2.6" fill="${c.skin}"/><ellipse cx="32" cy="29" rx="12" ry="13" fill="${c.skin}"/>${H[c.hs]}${face}<circle cx="27" cy="29" r="1.6" fill="#222"/><circle cx="37" cy="29" r="1.6" fill="#222"/><path d="M27 36q5 4 10 0" stroke="${beard?"#fff":"#7a3b2e"}" fill="none" stroke-width="1.8" stroke-linecap="round"/>${x.includes("glasses")?`<g fill="none" stroke="#222" stroke-width="1.6"><circle cx="27" cy="29" r="4.6"/><circle cx="37" cy="29" r="4.6"/><path d="M31.6 29h.8"/></g>`:""}${x.includes("headset")?`<g stroke="#333" stroke-width="2" fill="none"><path d="M19 28a13 13 0 0 1 26 0"/><path d="M19 35q2 6 9 6"/></g><rect x="16.5" y="27" width="4" height="8" rx="2" fill="#333"/>`:""}</g>${x.includes("badge")?`<circle cx="52" cy="12" r="8" fill="#f59e0b" stroke="#fff" stroke-width="2"/><text x="52" y="16" text-anchor="middle" font-size="11" fill="#fff">★</text>`:""}</svg>`}
const IC={offline:`<path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6M9 11h.01M15 11h.01"/>`,online:`<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>`,vendor:`<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>`,kat:`<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>`,ves:`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M8 7h8M8 11h5M4 19.5V22h16"/>`,oex:`<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14l2 2 4-4"/>`,ezam:`<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>`,mez:`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`,promo:`<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>`};
const ic=k=>`<svg class="ic" viewBox="0 0 24 24">${IC[k]}</svg>`;
const avc=(id,st)=>`<div class="av ${id==="t1"?"adm":""}" style="${st||""}">${AV(id)}<i class="dot ${isOn(id)?"on":""}"></i>${SB(id)}</div>`;
const AY=["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"];
function DS(id,val){const [y,m,d]=(val||"").split("-"),Y=new Date().getFullYear();
 return `<div class="ds" id="${id}"><select><option value="">Gün</option>${Array.from({length:31},(_,i)=>`<option value="${i+1}"${+d===i+1?" selected":""}>${i+1}</option>`).join("")}</select><select><option value="">Ay</option>${AY.map((n,i)=>`<option value="${i+1}"${+m===i+1?" selected":""}>${n}</option>`).join("")}</select><select><option value="">İl</option>${Array.from({length:6},(_,i)=>Y-1+i).map(v=>`<option${+y===v?" selected":""}>${v}</option>`).join("")}</select></div>`}
function GD(id){const [d,m,y]=[...document.querySelectorAll("#"+id+" select")].map(x=>+x.value);if(!d||!m||!y)return "";
 const t=new Date(y,m-1,d);if(t.getMonth()!==m-1)return null;return y+"-"+String(m).padStart(2,"0")+"-"+String(d).padStart(2,"0")}
IC.cam=`<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4z"/>`;
const roomBanner=()=>`<div class="rb" data-room><div><b>${ic("online")}Görüş otağı</b><br><small>Online dərsləri Zoom, Google Meet və ya Teams ilə keçirin</small></div><span class="btn">Aç →</span></div>`;
const toast=m=>{const t=document.createElement("div");t.className="toast";t.textContent=trs(m);document.body.appendChild(t);setTimeout(()=>t.remove(),4500)};
window.alert=toast;
const ask=(msg,fn,input,val)=>{dlg={msg,fn,input,val};render();};
const GR=["5","4","3","2","1"],gcls=v=>+v>=4?"ok":+v>=1?"bad":"";
const gsel=(v,at)=>`<select class="gs ${gcls(v)}" ${at}><option value="">Qiymətləndirilməyib</option>${GR.map(g=>`<option value="${g}"${String(v)===g?" selected":""}>${g}</option>`).join("")}</select>`;
function setGrade(pid,v){const data={...(D(me).data||{})};data[sec]=list(me,sec).map(x=>x.id===pv?{...x,ist:(x.ist||[]).map(y=>y.id===pid?{...y,gr:v}:y)}:x);save(me,data);}
const KEYS=["ad","mag","reg","yer","gr"];
const nr=()=>({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),ad:"",mag:"",reg:"Bakı filialı",yer:"",gr:""});
function initDr(en){dr=(en.ist||[]).map(x=>({...nr(),...x}));for(let i=0;i<3;i++)dr.push(nr());dirty=false;}
function addRow(copy){const p=dr[dr.length-1],n=nr();if(copy&&p){n.mag=p.mag;n.reg=p.reg;n.yer=p.yer;}dr.push(n);}
function saveIst(){const L=dr.filter(r=>(r.ad||"").trim()||(r.mag||"").trim()||(r.yer||"").trim()).map(r=>({id:r.id,ad:(r.ad||"").trim(),mag:(r.mag||"").trim(),reg:r.reg,yer:(r.yer||"").trim(),gr:r.gr||""}));
 const data={...(D(me).data||{})};data[sec]=list(me,sec).map(x=>x.id===pv?{...x,ist:L}:x);dirty=false;dr=null;save(me,data);toast(L.length+" iştirakçı saxlanıldı");}
function ipanel(en){if(!dr)initDr(en);
 const L=dr.filter(r=>(r.ad||"").trim()),b=L.filter(x=>x.reg==="Bakı filialı").length,G=L.filter(x=>x.gr),ok=G.filter(x=>+x.gr>=4).length,avg=G.length?(G.reduce((n,x)=>n+ +x.gr,0)/G.length).toFixed(1):"–";
 return `<div class="panel"><div class="top" style="margin-bottom:6px"><h3 style="margin:0;display:flex;align-items:center">${ic("users")}Təlim iştirakçıları</h3><button class="btn g" id="iback">← Təlimlərə qayıt</button></div>
 <p style="margin:0 0 12px;color:var(--mu)"><b style="color:var(--tx)">${esc(en.ad)}</b> · ${fd(en.d1)}${en.d2?" – "+fd(en.d2):""}<br>İştirakçı sayı: <b>${L.length}</b> · Bakı filialı: <b>${b}</b> · Rayon: <b>${L.length-b}</b><br>İmtahan: 4–5: <b style="color:#16a34a">${ok}</b> · 1–3: <b style="color:#dc2626">${G.length-ok}</b> · orta bal: <b>${avg}</b></p>
 <p class="note" style="margin:0 0 10px">Cədvəldə birbaşa yazın. <b>Enter</b> düyməsi aşağı sətrə keçir (yeni sətir yaranır, mağaza və filial əvvəlkindən kopyalanır). Excel-dən sətirləri kopyalayıb ilk xanaya yapışdıra bilərsiniz: Ad Soyad, Mağaza, Bakı filialı/Rayon, Filial/Rayon adı, Qiymət.</p>
 <div class="scroll"><table class="gt"><tr><th>№</th><th>Ad Soyad</th><th>Mağaza</th><th>Bakı filialı / Rayon</th><th>Filial / Rayon adı</th><th>İmtahan (1–5)</th><th></th></tr>
 ${dr.map((r,i)=>`<tr><td>${i+1}</td><td class="${+r.gr>=4?"nok":+r.gr>=1?"nbad":""}"><input data-r="${i}" data-c="0" value="${esc(r.ad)}" placeholder="Ad Soyad"></td><td><input data-r="${i}" data-c="1" value="${esc(r.mag)}"></td><td><select data-r="${i}" data-c="2">${["Bakı filialı","Rayon"].map(o=>`<option${r.reg===o?" selected":""}>${o}</option>`).join("")}</select></td><td><input data-r="${i}" data-c="3" value="${esc(r.yer)}"></td><td>${gsel(r.gr,`data-r="${i}" data-c="4"`)}</td><td><button class="x" data-rdel="${i}" title="Sətri sil">✕</button></td></tr>`).join("")}</table></div>
 <div class="sv"><div><button class="btn g" data-radd="1">+ Sətir</button> <button class="btn g" data-radd="5">+ 5 sətir</button> <span id="dirty" style="display:${dirty?"inline":"none"};color:#d97706;font-size:13px">Saxlanmamış dəyişikliklər var</span></div><button class="btn" id="isave">Yadda saxla</button></div></div>`}
IC.cap=`<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>`;
IC.bookopen=`<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>`;
IC.bulb=`<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.7.6 1 1.4 1 2.3h6c0-.9.3-1.7 1-2.3A7 7 0 0 0 12 2z"/>`;
IC.target=`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`;
IC.trophy=`<path d="M6 9H4a2 2 0 0 1-2-2V5h4M18 9h2a2 2 0 0 0 2-2V5h-4M6 3h12v6a6 6 0 0 1-12 0zM12 15v4M8 21h8"/>`;
IC.rocket=`<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`;
IC.star=`<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>`;
IC.chart=`<path d="M3 3v18h18M7 14v4M12 8v10M17 11v7"/>`;
const FLI=[["cap",4,11,0,60],["bookopen",14,9,-3,48],["bulb",25,12,-6,54],["target",36,10,-1,46],["trophy",47,13,-8,58],["rocket",58,9.5,-4,50],["star",69,11.5,-7,44],["chart",80,10.5,-2,56],["msg",91,12.5,-5,48]];
const FLC=["rgba(255,255,255,.18)","rgba(253,224,71,.28)","rgba(251,113,133,.30)","rgba(52,211,153,.28)"];
const FLT=()=>FLI.map(([k,l,d,dl,z],i)=>`<span class="fi" style="left:${l}%;width:${z}px;height:${z}px;background:${FLC[i%4]};animation-duration:${d}s;animation-delay:${dl}s">${ic(k)}</span>`).join("");
const ITEMS=[["Bakı",49.90,40.38],["Abşeron",49.75,40.47],["Sumqayıt",49.65,40.60],["Xızı",49.10,40.91],["Siyəzən",49.12,41.07],["Şabran",48.95,41.22],["Quba",48.55,41.30],["Qusar",48.38,41.52],["Xaçmaz",48.80,41.46],["Qəbələ",47.85,40.98],["İsmayıllı",48.15,40.79],["Şamaxı",48.64,40.63],["Qobustan",48.93,40.53],["Ağsu",48.40,40.57],["Oğuz",47.46,41.07],["Şəki",47.19,41.19],["Qax",46.92,41.42],["Zaqatala",46.64,41.63],["Balakən",46.40,41.71],["Ağdaş",47.47,40.65],["Göyçay",47.74,40.65],["Ucar",47.65,40.52],["Kürdəmir",48.16,40.34],["Zərdab",47.71,40.22],["Ağcabədi",47.46,40.05],["Beyləqan",47.62,39.77],["Bərdə",47.13,40.38],["Yevlax",47.15,40.62],["Mingəçevir",47.06,40.77],["Goranboy",46.72,40.65],["Naftalan",46.95,40.50],["Gəncə",46.36,40.68],["Göygöl",46.30,40.50],["Daşkəsən",46.08,40.52],["Samux",46.55,40.82],["Şəmkir",46.02,40.83],["Gədəbəy",45.81,40.57],["Tovuz",45.63,40.99],["Ağstafa",45.50,41.15],["Qazax",45.20,41.10],["Yardımlı",48.25,38.91],["Lerik",48.42,38.77],["Masallı",48.67,39.03],["Lənkəran",48.80,38.78],["Astara",48.78,38.52],["Cəlilabad",48.51,39.21],["Biləsuvar",48.54,39.46],["Saatlı",48.37,39.93],["Sabirabad",48.55,40.06],["Salyan",48.98,39.59],["Neftçala",49.25,39.37],["Şirvan",49.00,39.88],["Hacıqabul",48.95,40.12],["İmişli",48.07,39.87],["Füzuli",47.14,39.60],["Ağdam",46.93,39.99],["Tərtər",46.92,40.40],["Ağdərə",46.85,40.18],["Xocalı",46.80,39.92],["Xankəndi",46.75,39.82],["Şuşa",46.75,39.70],["Xocavənd",47.00,39.78],["Laçın",46.55,39.64],["Kəlbəcər",46.04,40.10],["Qubadlı",46.58,39.34],["Zəngilan",46.65,39.08],["Cəbrayıl",47.03,39.38],["Naxçıvan",45.35,39.25],["Babək",45.50,39.10],["Şərur",44.98,39.55],["Ordubad",46.00,39.03],["Culfa",45.63,38.96],["Şahbuz",45.57,39.41],["Kəngərli",45.17,39.40],["Sədərək",44.88,39.71]];
let EZP=null,EZL=[],EZO="",EZMZ=0;
const ZL=[1,1.7,2.6],ZP=[100,170,260];
const CITY=new Set(["Bakı","Sumqayıt","Gəncə","Mingəçevir","Naxçıvan","Şəki","Şirvan","Lənkəran","Yevlax","Xankəndi","Naftalan"]);
const OUTM=[[46.40,41.86],[46.62,41.89],[46.90,41.80],[47.10,41.62],[47.30,41.46],[47.52,41.34],[47.70,41.26],[47.86,41.22],[48.02,41.32],[48.10,41.42],[48.22,41.58],[48.30,41.74],[48.46,41.80],[48.55,41.84],[48.78,41.62],[48.98,41.42],[49.22,41.15],[49.40,40.95],[49.58,40.77],[49.72,40.64],[49.90,40.58],[50.12,40.58],[50.34,40.50],[50.38,40.38],[50.28,40.28],[50.05,40.27],[49.85,40.30],[49.68,40.20],[49.48,40.02],[49.44,39.80],[49.46,39.55],[49.42,39.38],[49.30,39.15],[49.12,38.95],[49.03,38.75],[48.92,38.50],[48.87,38.43],[48.62,38.40],[48.40,38.50],[48.20,38.62],[48.05,38.76],[48.08,38.92],[48.25,39.08],[48.30,39.27],[48.18,39.38],[47.98,39.52],[47.70,39.50],[47.45,39.47],[47.30,39.40],[47.18,39.25],[46.98,39.12],[46.80,38.98],[46.62,38.90],[46.54,38.87],[46.42,39.02],[46.30,39.22],[46.18,39.42],[46.12,39.62],[45.95,39.80],[45.85,40.05],[45.85,40.18],[45.60,40.42],[45.35,40.72],[45.02,41.02],[44.93,41.17],[45.05,41.28],[45.25,41.38],[45.55,41.36],[45.80,41.30],[46.10,41.22],[46.40,41.13],[46.38,41.35],[46.30,41.55],[46.26,41.75]];
const OUTN=[[44.78,39.70],[44.95,39.80],[45.20,39.70],[45.45,39.68],[45.75,39.58],[45.90,39.40],[46.10,39.20],[46.18,38.95],[45.90,38.88],[45.55,38.90],[45.25,38.96],[45.05,39.12],[44.88,39.28],[44.80,39.50]];
function clipHP(poly,a,b,c){const out=[];for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],dp=a*p[0]+b*p[1]-c,dq=a*q[0]+b*q[1]-c;if(dp<=0)out.push(p);if((dp<0&&dq>0)||(dp>0&&dq<0)){const t=dp/(dp-dq);out.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}}return out;}
function ezinit(){if(EZP)return;
 const pt=(lo,la)=>[40+(lo-44.7)*118,40+(41.95-la)*154],P=ITEMS.map(x=>pt(x[1],x[2]));
 EZO=[OUTM,OUTN].map(o=>"M"+o.map(q=>{const r=pt(q[0],q[1]);return r[0].toFixed(1)+","+r[1].toFixed(1)}).join("L")+"Z").join("");
 EZP=P.map((c,i)=>{let poly=[[0,0],[770,0],[770,640],[0,640]];P.forEach((q,j)=>{if(j===i)return;poly=clipHP(poly,q[0]-c[0],q[1]-c[1],(q[0]*q[0]+q[1]*q[1]-c[0]*c[0]-c[1]*c[1])/2);});return poly;});
 const order=ITEMS.map((_,i)=>i).sort((a,b)=>(CITY.has(ITEMS[b][0])-CITY.has(ITEMS[a][0]))),placed=[[],[],[]];EZL=[];
 order.forEach(i=>{const nm=ITEMS[i][0],w=nm.length*(CITY.has(nm)?8:7.2)+6,h=15,x=P[i][0],y=P[i][1];
  for(let L=0;L<3;L++){let ok=true;for(let M=L;M<3;M++){const hw=w/2/ZL[M],hh=h/2/ZL[M];if(placed[M].some(t=>Math.abs(x-t[0])<hw+t[2]&&Math.abs(y-t[1])<hh+t[3])){ok=false;break;}}
   if(ok){for(let M=L;M<3;M++)placed[M].push([x,y,w/2/ZL[M],h/2/ZL[M]]);EZL.push([i,x,y,L]);break;}}});}
function visSet(){const out=new Set(sel);list(me,"ezam").forEach(e=>{if(e.id!==ed)(e.rays||[]).forEach(r=>out.add(r));});return out;}
function ezstat(){const V=visSet(),n=ITEMS.length,vs=ITEMS.filter(x=>V.has(x[0])),rs=ITEMS.filter(x=>!V.has(x[0])),pc=Math.round(vs.length/n*100);return{V,n,vs,rs,pc};}
const chips=(a,c)=>a.length?a.map(x=>`<span class="chp ${c}">${esc(x[0])}</span>`).join(""):`<span style="color:var(--mu);font-size:12px">—</span>`;
function ezinner(){ezinit();const {V,n,vs,rs,pc}=ezstat();
 return `<div class="mapc"><div class="mz"><button data-mz="1" title="Yaxınlaşdır">+</button><button data-mz="-1" title="Uzaqlaşdır">−</button></div><div class="mscroll" id="msc"><svg id="msvg" class="z${EZMZ}" viewBox="0 0 770 640" style="width:${ZP[EZMZ]}%"><defs><clipPath id="azc"><path d="${EZO}"/></clipPath></defs><g clip-path="url(#azc)">${EZP.map((pl,i)=>`<path class="rg ${V.has(ITEMS[i][0])?"on":"off"}" data-rg="${i}" d="M${pl.map(q=>q[0].toFixed(1)+","+q[1].toFixed(1)).join("L")}Z"><title>${esc(ITEMS[i][0])}</title></path>`).join("")}</g><path class="ob" d="${EZO}"/>${EZL.map(l=>`<text class="mt${CITY.has(ITEMS[l[0]][0])?" ct":""}" data-z="${l[3]}" x="${l[1].toFixed(1)}" y="${(l[2]+4).toFixed(1)}" text-anchor="middle">${esc(ITEMS[l[0]][0])}</text>`).join("")}</svg></div></div>
 <div class="scale"><div class="vbar"><div class="vg" id="vg" style="height:${pc}%"></div><i style="top:25%"></i><i style="top:50%"></i><i style="top:75%"></i><b id="vpc">${pc}%</b></div>
 <div><h4 style="margin:0 0 6px">Ezamiyyət skalası</h4><div style="font-size:13px"><span style="color:#16a34a"><b id="vgn">${vs.length}</b> getdiyi</span> · <span style="color:#dc2626"><b id="vrn">${rs.length}</b> getmədiyi</span></div>
 <div class="gl">Getdiyi rayon və şəhərlər</div><div class="chips" id="chg">${chips(vs,"g")}</div><div class="gl">Getmədiyi</div><div class="chips" id="chr">${chips(rs,"r")}</div></div></div>`}
function setZoom(d){const sc=document.getElementById("msc"),sv=document.getElementById("msvg");if(!sc||!sv)return;const n=Math.max(0,Math.min(2,EZMZ+d));if(n===EZMZ)return;
 const cx=(sc.scrollLeft+sc.clientWidth/2)/sv.clientWidth,cy=(sc.scrollTop+sc.clientHeight/2)/sv.clientHeight;EZMZ=n;sv.style.width=ZP[n]+"%";sv.setAttribute("class","z"+n);
 sc.scrollLeft=cx*sv.clientWidth-sc.clientWidth/2;sc.scrollTop=cy*sv.clientHeight-sc.clientHeight/2;}
const ezmap=()=>`<div class="ezw"><label>Ezamiyyətdə olduğunuz rayon və şəhərləri xəritədə seçin (təkrar klik seçimi ləğv edir)</label><div class="ezm" id="ezmap">${ezinner()}</div></div>`;
function updMap(){if(!document.getElementById("vg"))return;const {V,vs,rs,pc}=ezstat();
 document.querySelectorAll("#ezmap .rg").forEach(q=>q.setAttribute("class","rg "+(V.has(ITEMS[+q.dataset.rg][0])?"on":"off")));
 document.getElementById("vg").style.height=pc+"%";document.getElementById("vpc").textContent=pc+"%";
 document.getElementById("vgn").textContent=vs.length;document.getElementById("vrn").textContent=rs.length;
 document.getElementById("chg").innerHTML=chips(vs,"g");document.getElementById("chr").innerHTML=chips(rs,"r");applyLang(document.getElementById("chg"));applyLang(document.getElementById("chr"));}
const VD=[["dig","Rəqəmsal","Televizor, smartfon, kompüter və digər rəqəmsal məhsullar",["Samsung","LG","Hisense","Toshiba","Xiaomi","Sony"]],["mis","Məişət","Soyuducu, paltaryuyan, kondisioner və digər məişət texnikası",["Beko","Samsung","LG","Hisense","Toshiba","Bosch"]]];
const BC={Samsung:"#1428a0",LG:"#a50034",Hisense:"#00a19b",Toshiba:"#d6001c",Xiaomi:"#ff6900",Sony:"#111827",Beko:"#0f4c97",Bosch:"#c8102e"};
const bcol=b=>BC[b]||"#7c3aed";
function vbl(data,dp){const d0=VD.find(x=>x[0]===dp);return (data.vbl&&data.vbl[dp])||[...d0[3],...(((data.vb||{})[dp])||[])];}
function vbmat(data){const o={};VD.forEach(d=>o[d[0]]=vbl(data,d[0]).slice());return o;}
function renameBrand(m2,dp,old,nm){nm=(nm||"").trim();if(!nm||nm===old)return;const data={...(D(m2).data||{})},m=vbmat(data);
 if(m[dp].some(x=>x!==old&&x.toLowerCase()===nm.toLowerCase())){toast("Bu adlı brend artıq var.");return;}
 m[dp]=m[dp].map(x=>x===old?nm:x);data.vbl=m;data.vendor=list(m2,"vendor").map(e=>e.dept===dp&&e.brand===old?{...e,brand:nm}:e);
 if(vs&&vs.dept===dp&&vs.brand===old)vs={dept:dp,brand:nm};save(m2,data);}
function deleteBrand(m2,dp,b){const data={...(D(m2).data||{})},m=vbmat(data);m[dp]=m[dp].filter(x=>x!==b);data.vbl=m;data.vendor=list(m2,"vendor").filter(e=>!(e.dept===dp&&e.brand===b));save(m2,data);}
function vpanel(){const L=list(me,"vendor"),vb=(D(me).data||{}).vb||{};if(vs)return vdiary(L,vs);
 const old=L.filter(e=>!e.brand);
 return `<div class="vw">${VD.map(d=>{const bs=vbl(D(me).data||{},d[0]);return `<div class="vd ${d[0]}"><div class="vh"><div><h3>${d[1]} şöbəsi</h3><small>${d[2]}</small></div><button class="btn g" data-vnew="${d[0]}">+ Brend</button></div><div class="vg2">${bs.map(b=>{const n=L.filter(e=>e.dept===d[0]&&e.brand===b),pc=n.reduce((t,e)=>t+(+e.say||0),0);return `<div class="btw"><button class="bt" data-vd="${d[0]}" data-vbr="${esc(b)}"><span class="wm" style="color:${bcol(b)}">${esc(b)}</span><small>${n.length} təlim · ${pc} iştirakçı</small></button><span class="bta"><button class="bti" data-vbe="${d[0]}" data-vbn="${esc(b)}" title="Redaktə et">${ic("edit")}</button><button class="bti dl" data-vbd="${d[0]}" data-vbn="${esc(b)}" title="Sil">✕</button></span></div>`}).join("")}</div></div>`}).join("")}</div>
 ${old.length?`<div class="panel" style="margin-top:16px"><h3 style="margin-top:0">Əvvəlki qeydlər (brendsiz)</h3>${old.map(e=>`<div class="row"><div><b>${esc(e.ad||"")}</b><br><small>${fd(e.d1)}</small>${e.q?`<div>${esc(e.q)}</div>`:""}</div><button class="x" data-vdel="${e.id}" title="Sil">✕</button></div>`).join("")}</div>`:""}`}
function vdiary(L,v){const dn=(VD.find(x=>x[0]===v.dept)||[])[1]||"",it=L.filter(e=>e.dept===v.dept&&e.brand===v.brand).sort((a,b)=>(b.d1||"").localeCompare(a.d1||"")),E=ve&&it.find(x=>x.id===ve)||null,tot=it.reduce((t,e)=>t+(+e.say||0),0);
 return `<div class="panel"><div class="top" style="margin-bottom:10px"><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="wm big pill" style="color:${bcol(v.brand)}">${esc(v.brand)}</span><span class="badge">${dn} şöbəsi</span></div><button class="btn g" id="vback">← Brendlərə qayıt</button></div>
 <h3 style="margin:0 0 4px">Vendor gündəliyi</h3><p style="margin:0 0 14px;color:var(--mu)">Təlim sayı: <b style="color:var(--tx)">${it.length}</b> · Ümumi iştirakçı: <b style="color:var(--tx)">${tot}</b></p>
 <div class="form"><div><label>Təlim günü</label>${DS("v_d",E?E.d1:new Date().toISOString().slice(0,10))}</div><div><label>Təlim iştirakçılarının sayı</label><input id="v_c" type="number" min="0" value="${E&&E.say!=null?E.say:""}"></div><div class="w"><label>Qeyd (istəyə bağlı)</label><textarea id="v_q" rows="2">${esc(E?E.q||"":"")}</textarea></div></div>
 <button class="btn" id="vadd">${E?"Yadda saxla":"+ Gündəliyə əlavə et"}</button>${E?` <button class="btn g" id="vcancel">Ləğv et</button>`:""}
 <div style="margin-top:14px">${it.length?it.map(e=>`<div class="row"><div class="dt"><b>${(e.d1||"").slice(8,10)||"–"}</b><small>${mab(e.d1)}</small></div><div><b>${fd(e.d1)}</b><br><small>İştirakçı sayı: <b>${e.say!=null?e.say:"–"}</b></small>${e.q?`<div>${esc(e.q)}</div>`:""}</div><button class="x" data-vedit="${e.id}" title="Redaktə et">${ic("edit")}</button><button class="x" data-vdel="${e.id}" title="Sil">✕</button></div>`).join(""):`<div class="empty">Bu brend üçün hələ təlim qeyd edilməyib.</div>`}</div></div>`}
function todayIso(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
IC.door=`<path d="M3 21h18M6 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M16 7h2a1 1 0 0 1 1 1v13M12.5 12v.01"/>`;
IC.dot=`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/>`;
const SR=[["rooms","Təlim otaqları","door"],["red","RED otaqları","dot"]];
const RG={rooms:[["r106","106"],["r108","108"],["r109","109"],["r117","117"]],red:[["red_k","Qırmızı otaq"],["red_y","Yaşıl otaq"]]};
const RS0={};
const HRS=(()=>{const a=[];for(let h=8;h<=21;h++){a.push(String(h).padStart(2,"0")+":00");if(h<21)a.push(String(h).padStart(2,"0")+":30");}return a;})();
const rname=id=>{for(const k in RG){const r=RG[k].find(x=>x[0]===id);if(r)return k==="rooms"?r[1]+" nömrəli otaq":r[1];}return id;};
const bnum=k=>BK.filter(b=>RG[k].some(r=>r[0]===b.room)&&b.date>=todayIso()).length;
const rico=on=>`<svg viewBox="0 0 64 64" class="aic"><defs><linearGradient id="${on?"agr":"agg"}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${on?"#ff6b60":"#5ee07a"}"/><stop offset="1" stop-color="${on?"#ff3b30":"#28b94a"}"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="15" fill="url(#${on?"agr":"agg"})"/>${on?`<rect x="19" y="29" width="26" height="19" rx="5" fill="#fff"/><path d="M24 29v-5a8 8 0 0 1 16 0v5" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/>`:`<path d="M19 33l9 9 17-20" stroke="#fff" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`}</svg>`;
function rcards(kind){return RG[kind].map(r=>{const all=BK.filter(b=>b.room===r[0]).sort((a,b)=>(a.date+a.from).localeCompare(b.date+b.from)),day=all.filter(b=>b.date===bd),on=day.length>0,fut=all.filter(b=>b.date>=todayIso());
 const pop=RS0[r[0]]!==undefined&&RS0[r[0]]!==on;RS0[r[0]]=on;
 const row=(b,full)=>`<div class="bi"><b>${full?fd(b.date)+" · ":""}${b.from}–${b.to}</b> · ${esc(((info(b.by)||[])[1])||"")}${b.topic?` <small>${esc(b.topic)}</small>`:""}${admin||b.by===who?` <button class="x" data-bdel="${esc(b.id)}" title="Bronu ləğv et">✕</button>`:""}</div>`;
 return `<div class="rc ${on?"busy":"free"}"><span class="aw ${on?"b":"f"}${pop?" pop":""}">${rico(on)}</span><div class="rn">${r[1]}${kind==="rooms"?"<small>nömrəli otaq</small>":""}</div><div class="rs ${on?"b":"f"}">${on?"Bron olunub":"Boşdur"}</div>
 <div class="bl">${day.length?day.map(b=>row(b,false)).join(""):`<small style="color:var(--mu)">${fd(bd)} tarixində boşdur</small>`}</div>
 <button class="btn" data-book="${r[0]}">Bron et</button>
 <div class="gl" style="align-self:flex-start">Bron edilmə tarixləri</div><div class="bl">${fut.length?fut.slice(0,8).map(b=>row(b,true)).join(""):`<small style="color:var(--mu)">Gələcək bron yoxdur</small>`}</div></div>`}).join("");}
function bform(){return `<div class="bf"><h4 style="margin:0 0 10px">${esc(rname(bk))} — bron et</h4><div class="form"><div><label>Tarix</label>${DS("bk_d",bd)}</div><div><label>Başlama saatı</label><select id="bk_f">${HRS.map(h=>`<option${h==="10:00"?" selected":""}>${h}</option>`).join("")}</select></div><div><label>Bitmə saatı</label><select id="bk_t">${HRS.map(h=>`<option${h==="11:00"?" selected":""}>${h}</option>`).join("")}</select></div><div class="w"><label>Mövzu / qeyd (istəyə bağlı)</label><input id="bk_q"></div></div><button class="btn" id="bkok">Bron et</button> <button class="btn g" id="bkno">Ləğv et</button></div>`}
function rpanel(kind){return `<div class="panel rm ${kind}"><h3 style="margin:0 0 12px;display:flex;align-items:center;font-size:24px">${ic(kind==="rooms"?"door":"dot")}${kind==="rooms"?"Təlim otaqları":"RED otaqları"}</h3>
 <div class="form" style="margin-bottom:12px"><div><label>Baxış tarixi (bu tarixə görə ikon rəngi göstərilir)</label>${DS("b_dt",bd)}</div></div>${bk?bform():""}<div class="rgrid" id="rgrid">${rcards(kind)}</div></div>`}
function updRooms(){const g=document.getElementById("rgrid");if(g){g.innerHTML=rcards(sec);applyLang(g);}}
async function doBook(){const d=GD("bk_d"),f=document.getElementById("bk_f").value,t=document.getElementById("bk_t").value,q=document.getElementById("bk_q").value.trim();
 if(!d){toast("Düzgün tarix seçin.");return;}if(d<todayIso()){toast("Keçmiş tarixə bron etmək olmaz.");return;}
 if(f>=t){toast("Bitmə saatı başlama saatından sonra olmalıdır.");return;}
 const c=BK.find(b=>b.room===bk&&b.date===d&&b.from<t&&f<b.to);if(c){toast("Bu vaxt artıq bron olunub: "+c.from+"–"+c.to+" ("+(((info(c.by)||[])[1])||"")+")");return;}
 const m={room:bk,date:d,from:f,to:t,by:who,topic:q},id=Date.now().toString(36)+Math.random().toString(36).slice(2,5);
 BK=[...BK,{id,...m}];bd=d;bk=null;render();toast("Otaq bron olundu.");
 try{if(db)await db.doc("bookings/"+id).set(m);}catch(e){toast("Bron saxlanmadı: "+(e.message||e));}}
const DSET={lang:"az",theme:"auto",snd:true,vol:70,nMsg:true,nBook:true,vib:true};
const SET={...DSET};
try{Object.assign(SET,JSON.parse(localStorage.getItem("tk_set")||"{}"))}catch(e){}
const saveSet=()=>{try{localStorage.setItem("tk_set",JSON.stringify(SET))}catch(e){}};
function applyTheme(){const r=document.documentElement;if(SET.theme==="dark"||SET.theme==="light")r.setAttribute("data-theme",SET.theme);else r.removeAttribute("data-theme");}
applyTheme();document.documentElement.lang=SET.lang==="ru"?"ru":"az";
const RUX={"Təlimlərə nəzarət et": "Контролируйте тренинги", "və təlim keyfiyyətini yüksəlt": "и повышайте качество обучения", "Kabinetə girmək üçün adınızın üzərinə klikləyin və PIN kodu daxil edin.": "Чтобы войти в кабинет, нажмите на своё имя и введите PIN-код.", "Admin": "Администратор", "Baş təlimçi": "Старший тренер", "Təlimçi": "Тренер", "Onlayn": "Онлайн", "Offline": "Офлайн", "PIN kod": "PIN-код", "PIN": "PIN", "PIN yanlışdır": "Неверный PIN", "Daxil ol": "Войти", "Bağla": "Закрыть", "· kabinet": "· кабинет", "Görüş otağı": "Комната встреч", "Mesajlar": "Сообщения", "PIN dəyiş": "Сменить PIN", "Çıxış": "Выход", "İdarəetmə paneli": "Панель управления", "← Öz kabinetim": "← Мой кабинет", "Nəzarət mərkəzi": "Центр контроля", "Online dərsləri Zoom, Google Meet və ya Teams ilə keçirin": "Проводите онлайн-занятия через Zoom, Google Meet или Teams", "Təlimçilərlə yazışın və kimin onlayn olduğunu görün": "Переписывайтесь с тренерами и смотрите, кто онлайн", "Aç →": "Открыть →", "Bütün təlimçilər üzrə icmal": "Сводка по всем тренерам", "Təlimçinin adına klikləyərək onun kabinetini aça və redaktə edə bilərsiniz.": "Нажмите на имя тренера, чтобы открыть его кабинет и редактировать.", "TOT": "TOT", "Reytinq": "Рейтинг", "Var": "Есть", "Yoxdur": "Нет", "Sıfırla": "Сбросить", "Cəmi": "Всего", "Status": "Статус", "TOT sertifikatlı": "Сертификат TOT", "Statuslu təlimçi": "Тренер со статусом", "Ortaq bazaya qoşulmaq mümkün olmadı. Mesajlar, təlim qeydləri və status yalnız bu cihazda qalır, başqalar görmür.": "Не удалось подключиться к общей базе. Сообщения, записи и статус остаются только на этом устройстве, другие их не видят. Войдите в аккаунт Claude и запросите доступ к странице.", "Offline təlimlər": "Офлайн-тренинги", "Online təlimlər": "Онлайн-тренинги", "Vendor təlimləri": "Тренинги вендоров", "Kateqoriya imtahanları": "Категорийные экзамены", "Dərs vəsaitləri": "Учебные материалы", "Ezamiyyətlər": "Командировки", "Məzuniyyətlər": "Отпуска", "Promouter təlimləri": "Тренинги промоутеров", "Təlim otaqları": "Учебные комнаты", "RED otaqları": "RED-комнаты", "Tənzimləmələr": "Настройки", "Təlimin adı": "Название тренинга", "Vendor / təlim": "Вендор / тренинг", "Kateqoriya": "Категория", "Vəsaitin adı": "Название материала", "Məkan / məqsəd": "Место / цель", "Məzuniyyət növü": "Вид отпуска", "Başlama tarixi": "Дата начала", "Bitmə tarixi (istəyə bağlı)": "Дата окончания (необязательно)", "Bitmə tarixi": "Дата окончания", "Qeyd / nəticə": "Заметка / результат", "+ Əlavə et": "+ Добавить", "Yadda saxla": "Сохранить", "Ləğv et": "Отмена", "Redaktə et": "Редактировать", "Sil": "Удалить", "Hələ qeyd yoxdur. Yuxarıdakı formadan əlavə edin.": "Записей пока нет. Добавьте через форму выше.", "Gün": "День", "Ay": "Месяц", "İl": "Год", "Tarix": "Дата", "Saat": "Время", "Yanvar": "Январь", "Fevral": "Февраль", "Mart": "Март", "Aprel": "Апрель", "May": "Май", "İyun": "Июнь", "İyul": "Июль", "Avqust": "Август", "Sentyabr": "Сентябрь", "Oktyabr": "Октябрь", "Noyabr": "Ноябрь", "Dekabr": "Декабрь", "Bəli": "Да", "Xeyr": "Нет", "Bu qeyd silinsin?": "Удалить эту запись?", "Bu dərs silinsin?": "Удалить это занятие?", "Bu bron ləğv edilsin?": "Отменить эту бронь?", "Bu iştirakçı silinsin?": "Удалить этого участника?", "Saxlanmamış dəyişikliklər var. Yadda saxlamadan çıxılsın?": "Есть несохранённые изменения. Выйти без сохранения?", "Yeni PIN kod (ən azı 4 rəqəm):": "Новый PIN-код (не менее 4 цифр):", "Yeni PIN": "Новый PIN", "PIN yalnız rəqəmlərdən ibarət olmalı və ən azı 4 simvol olmalıdır.": "PIN должен состоять только из цифр и содержать не менее 4 символов.", "Tarix düzgün deyil (məsələn, 31 Fevral mövcud deyil).": "Неверная дата (например, 31 февраля не существует).", "Düzgün tarix seçin.": "Выберите корректную дату.", "Zəhmət olmasa düzgün tarix seçin.": "Пожалуйста, выберите корректную дату.", "Zəhmət olmasa https:// ilə başlayan düzgün görüş linki daxil edin.": "Введите корректную ссылку на встречу, начинающуюся с https://.", "Otaq bron olundu.": "Комната забронирована.", "Keçmiş tarixə bron etmək olmaz.": "Нельзя бронировать на прошедшую дату.", "Bitmə saatı başlama saatından sonra olmalıdır.": "Время окончания должно быть позже времени начала.", "Təlim gününü düzgün seçin.": "Выберите корректный день тренинга.", "İştirakçı sayını yazın.": "Укажите количество участников.", "Təlim iştirakçıları": "Участники тренинга", "← Təlimlərə qayıt": "← К тренингам", "Ad Soyad": "Имя Фамилия", "Mağaza": "Магазин", "Bakı filialı / Rayon": "Филиал Баку / Район", "Filial / Rayon adı": "Название филиала / района", "İmtahan (1–5)": "Экзамен (1–5)", "Qiymətləndirilməyib": "Не оценено", "+ Sətir": "+ Строка", "+ 5 sətir": "+ 5 строк", "Sətri sil": "Удалить строку", "Saxlanmamış dəyişikliklər var": "Есть несохранённые изменения", "Bakı filialı": "Филиал Баку", "Rayon": "Район", "Cədvəldə birbaşa yazın.": "Пишите прямо в таблице.", "düyməsi aşağı sətrə keçir (yeni sətir yaranır, mağaza və filial əvvəlkindən kopyalanır). Excel-dən sətirləri kopyalayıb ilk xanaya yapışdıra bilərsiniz: Ad Soyad, Mağaza, Bakı filialı/Rayon, Filial/Rayon adı, Qiymət.": "переходит на строку ниже (создаётся новая строка, магазин и филиал копируются из предыдущей). Строки из Excel можно скопировать и вставить в первую ячейку: Имя Фамилия, Магазин, Филиал Баку/Район, Название филиала/района, Оценка.", "Hələ iştirakçı əlavə edilməyib.": "Участники пока не добавлены.", "Rəqəmsal": "Цифровая", "Məişət": "Бытовая", "Rəqəmsal şöbəsi": "Цифровой отдел", "Məişət şöbəsi": "Бытовой отдел", "Televizor, smartfon, kompüter və digər rəqəmsal məhsullar": "Телевизоры, смартфоны, компьютеры и другая цифровая техника", "Soyuducu, paltaryuyan, kondisioner və digər məişət texnikası": "Холодильники, стиральные машины, кондиционеры и другая бытовая техника", "+ Brend": "+ Бренд", "Əvvəlki qeydlər (brendsiz)": "Прежние записи (без бренда)", "← Brendlərə qayıt": "← К брендам", "Vendor gündəliyi": "Дневник вендора", "Təlim günü": "День тренинга", "Təlim iştirakçılarının sayı": "Количество участников тренинга", "Qeyd (istəyə bağlı)": "Заметка (необязательно)", "+ Gündəliyə əlavə et": "+ Добавить в дневник", "Bu brend üçün hələ təlim qeyd edilməyib.": "Для этого бренда тренинги ещё не записаны.", "Brendin adı": "Название бренда", "Yeni brendin adı:": "Название нового бренда:", "Ezamiyyətdə olduğunuz rayon və şəhərləri xəritədə seçin (təkrar klik seçimi ləğv edir)": "Отметьте на карте районы и города, где вы были в командировке (повторный клик отменяет выбор)", "Ezamiyyət skalası": "Шкала командировок", "getdiyi": "были", "getmədiyi": "не были", "Getdiyi rayon və şəhərlər": "Посещённые районы и города", "Getmədiyi": "Не посещённые", "Yaxınlaşdır": "Приблизить", "Uzaqlaşdır": "Отдалить", "← Kabinetə qayıt": "← Назад в кабинет", "CANLI DƏRS OTAĞI": "КОМНАТА ЖИВЫХ ЗАНЯТИЙ", "Dərhal yeni görüş başlat": "Сразу начать новую встречу", "Platformada görüş yaradın, linki kopyalayın və aşağıda dərsi planlaşdırıb təlimçilərlə paylaşın.": "Создайте встречу на платформе, скопируйте ссылку и запланируйте занятие ниже, чтобы поделиться им с тренерами.", "Online dərs planlaşdır": "Запланировать онлайн-занятие", "Dərsin mövzusu": "Тема занятия", "Platforma": "Платформа", "Görüş linki": "Ссылка на встречу", "Dərsi planlaşdır": "Запланировать занятие", "Planlaşdırılmış dərslər": "Запланированные занятия", "Hələ planlaşdırılmış dərs yoxdur.": "Запланированных занятий пока нет.", "Qoşul": "Присоединиться", "Bu gün": "Сегодня", "Digər": "Другое", "Ümumi söhbət": "Общий чат", "Hamı": "Все", "Hamı (ümumi söhbət)": "Все (общий чат)", "Bütün təlimçilər görür": "Видят все тренеры", "Mesaj yazın...": "Введите сообщение...", "Hələ mesaj yoxdur. İlk mesajı siz yazın.": "Сообщений пока нет. Напишите первым.", "Göndər": "Отправить", "Baxış tarixi (bu tarixə görə ikon rəngi göstərilir)": "Дата просмотра (цвет значка зависит от даты)", "Bron olunub": "Забронировано", "Boşdur": "Свободна", "Bron et": "Забронировать", "Bron edilmə tarixləri": "Даты бронирования", "Gələcək bron yoxdur": "Будущих броней нет", "Başlama saatı": "Время начала", "Bitmə saatı": "Время окончания", "Mövzu / qeyd (istəyə bağlı)": "Тема / заметка (необязательно)", "Bronu ləğv et": "Отменить бронь", "nömrəli otaq": "комната", "Qırmızı otaq": "Красная комната", "Yaşıl otaq": "Зелёная комната", "Otaq bron edildi": "Комната забронирована", "Dil": "Язык", "Görünüş": "Внешний вид", "Səs": "Звук", "Bildirişlər": "Уведомления", "Platformanın dilini seçin. Seçim bu cihazda yadda saxlanılır.": "Выберите язык платформы. Выбор сохраняется на этом устройстве.", "Gündüz": "День", "Gecə": "Ночь", "Avtomatik": "Авто", "Gecə rejimində interfeysin rəngləri tündləşir. Gündüz rejimi mövcud görünüşü saxlayır. Avtomatik cihazın ayarına uyğun olur.": "В ночном режиме цвета интерфейса становятся темнее. Дневной режим сохраняет привычный вид. «Авто» следует настройкам устройства.", "Bildiriş səsi": "Звук уведомлений", "Yeni mesaj və otaq bronu zamanı qısa ikon səsi çalınır": "При новом сообщении и брони комнаты звучит короткий сигнал", "Səs səviyyəsi": "Громкость", "Mesaj səsini yoxla": "Проверить звук сообщения", "Bron səsini yoxla": "Проверить звук брони", "Titrəmə": "Вибрация", "Telefonda bildiriş gələndə titrəsin": "Вибрация телефона при уведомлении", "Yeni mesaj gələndə": "При новом сообщении", "Başqa təlimçi sizə və ya ümumi söhbətə yazanda": "Когда другой тренер пишет вам или в общий чат", "Otaq bron ediləndə": "При бронировании комнаты", "Başqa təlimçi təlim və ya RED otağı bron edəndə": "Когда другой тренер бронирует учебную или RED-комнату", "Telefon bildirişlərinə icazə ver": "Разрешить уведомления на телефоне", "İcazə vəziyyəti:": "Состояние разрешения:", "İcazə verilib": "Разрешено", "İcazə verilməyib": "Не разрешено", "Rədd edilib": "Отклонено", "Dəstəklənmir": "Не поддерживается", "Bildirişlər yalnız yeni mesaj və otaq bronu üçün göndərilir. Səhifə açıq olduqda (arxa planda da) səs, titrəmə və bildiriş göstərilir.": "Уведомления отправляются только для новых сообщений и броней комнат. Пока страница открыта (в том числе в фоне), воспроизводятся звук и вибрация и показывается уведомление.", "Bu brauzer bildirişləri dəstəkləmir.": "Этот браузер не поддерживает уведомления.", "Bildirişlərə icazə verildi.": "Разрешение на уведомления получено.", "Bildirişlərə icazə verilmədi.": "Разрешение на уведомления не получено.", "Bu mühitdə brauzer bildirişləri bloklanıb. Bildirişlər səhifə açıq olduqda səs və başlıq ilə göstərilir.": "В этой среде системные уведомления браузера заблокированы. Пока страница открыта, уведомления показываются со звуком и заголовком.", "Bakı": "Баку", "Abşeron": "Абшерон", "Sumqayıt": "Сумгайыт", "Xızı": "Хызы", "Siyəzən": "Сиязань", "Şabran": "Шабран", "Quba": "Куба", "Qusar": "Гусар", "Xaçmaz": "Хачмаз", "Qəbələ": "Габала", "İsmayıllı": "Исмаиллы", "Şamaxı": "Шемаха", "Qobustan": "Гобустан", "Ağsu": "Агсу", "Oğuz": "Огуз", "Şəki": "Шеки", "Qax": "Гах", "Zaqatala": "Закатала", "Balakən": "Балакен", "Ağdaş": "Агдаш", "Göyçay": "Гёйчай", "Ucar": "Уджар", "Kürdəmir": "Кюрдамир", "Zərdab": "Зардоб", "Ağcabədi": "Агджабеди", "Beyləqan": "Бейлаган", "Bərdə": "Барда", "Yevlax": "Евлах", "Mingəçevir": "Мингечевир", "Goranboy": "Горанбой", "Naftalan": "Нафталан", "Gəncə": "Гянджа", "Göygöl": "Гёйгёль", "Daşkəsən": "Дашкесан", "Samux": "Самух", "Şəmkir": "Шамкир", "Gədəbəy": "Гедабей", "Tovuz": "Товуз", "Ağstafa": "Агстафа", "Qazax": "Газах", "Yardımlı": "Ярдымлы", "Lerik": "Лерик", "Masallı": "Масаллы", "Lənkəran": "Ленкорань", "Astara": "Астара", "Cəlilabad": "Джалилабад", "Biləsuvar": "Билясувар", "Saatlı": "Саатлы", "Sabirabad": "Сабирабад", "Salyan": "Сальян", "Neftçala": "Нефтечала", "Şirvan": "Ширван", "Hacıqabul": "Гаджигабул", "İmişli": "Имишли", "Füzuli": "Физули", "Ağdam": "Агдам", "Tərtər": "Тертер", "Ağdərə": "Агдере", "Xocalı": "Ходжалы", "Xankəndi": "Ханкенди", "Şuşa": "Шуша", "Xocavənd": "Ходжавенд", "Laçın": "Лачин", "Kəlbəcər": "Кяльбаджар", "Qubadlı": "Губадлы", "Zəngilan": "Зангилан", "Cəbrayıl": "Джебраил", "Naxçıvan": "Нахчыван", "Babək": "Бабек", "Şərur": "Шарур", "Ordubad": "Ордубад", "Culfa": "Джульфа", "Şahbuz": "Шахбуз", "Kəngərli": "Кангерли", "Sədərək": "Садарак", "İcazə ver": "Разрешить"},RUS={"İştirakçı sayı:": "Участников:", "Bakı filialı:": "Филиал Баку:", "Rayon:": "Район:", "İmtahan: 4–5:": "Экзамен: 4–5:", "orta bal:": "средний балл:", "Təlim sayı:": "Тренингов:", "Ümumi iştirakçı:": "Всего участников:", "Admin rejimi:": "Режим администратора:", "kabinetini redaktə edirsiniz": "— вы редактируете кабинет", "üçün PIN ilkin dəyərə qaytarılsın?": "— вернуть PIN к исходному значению?", "— bron et": "— бронирование", "Bu vaxt artıq bron olunub:": "Это время уже занято:", "Yadda saxlanmadı:": "Не сохранено:", "Mesaj göndərilə bilmədi:": "Не удалось отправить сообщение:", "Bron saxlanmadı:": "Бронь не сохранена:", "Qırmızı otaq": "Красная комната", "Yaşıl otaq": "Зелёная комната", "Hamı": "Все", "Murad Əhmədəliyev": "Мурад Ахмедалиев", "Kamal Məmmədov": "Камал Мамедов", "Xəyyam Adilov": "Хаям Адилов", "Zakir Əsədov": "Закир Асадов", "Eldar Mustafayev": "Элдар Мустафаев", "İlkin Xəlilov": "Илькин Халилов", "Aynur Vəliyeva": "Айнур Велиева", "Kamran Əhmədzadə": "Камран Ахмедзаде", "Elmir Vəliyev": "Эльмир Велиев", "Aysel Məmmədova": "Айсель Мамедова", "Emil Abbaszadə": "Эмиль Аббасзаде", "İcazə vəziyyəti:": "Состояние разрешения:", "İcazə verilib": "Разрешено", "İcazə verilməyib": "Не разрешено", "Rədd edilib": "Отклонено", "Dəstəklənmir": "Не поддерживается"},RUI={"h1a": "Кабинет", "h1b": "тренера"},RUR=[["^(\\d+) təlim · (\\d+) iştirakçı$", "$1 тренингов · $2 участников"], ["^(\\d+) iştirakçı saxlanıldı$", "Сохранено участников: $1"], ["^Təlim iştirakçıları \\((\\d+)\\)$", "Участники тренинга ($1)"], ["^(\\d{2}\\.\\d{2}\\.\\d{4}) tarixində boşdur$", "$1 — свободно"], ["(\\d+) nömrəli otaq", "комната $1"], ["^(\\d) ulduz$", "Оценка: $1 из 5"]].map(x=>[new RegExp(x[0]),x[1]]);
let RUREG=null;
function trs(str){if(SET.lang!=="ru"||!str)return str;const t=str.trim();if(!t)return str;
 if(Object.prototype.hasOwnProperty.call(RUX,t))return str.replace(t,RUX[t]);
 let o=str;for(const r of RUR)o=o.replace(r[0],r[1]);
 if(!RUREG)RUREG=new RegExp(Object.keys(RUS).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|"),"g");
 return o.replace(RUREG,m=>RUS[m]);}
function applyLang(root){if(SET.lang!=="ru")return;root=root||$;if(!root)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)||(p.closest&&p.closest("[data-nt]")))return NodeFilter.FILTER_REJECT;return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
 const ns=[];while(w.nextNode())ns.push(w.currentNode);
 ns.forEach(n=>{const v=trs(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;});
 root.querySelectorAll("[placeholder],[title]").forEach(e=>{["placeholder","title"].forEach(a=>{const v=e.getAttribute(a);if(v){const r=trs(v);if(r!==v)e.setAttribute(a,r);}});});
 root.querySelectorAll("[data-i]").forEach(e=>{const v=RUI[e.dataset.i];if(v)e.textContent=v;});}
const MAB={az:["Yan","Fev","Mar","Apr","May","İyn","İyl","Avq","Sen","Okt","Noy","Dek"],ru:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"]};
Object.assign(RUX,{"Rəqəmsal şöbəsi": "Цифровой отдел", "Məişət şöbəsi": "Бытовой отдел", "Mebel-tekstil şöbəsi": "Отдел мебели и текстиля", "Məsul şəxs": "Ответственный", "+ Fayl əlavə et": "+ Добавить файл", "Yüklənir…": "Загрузка…", "Fayl əlavə etmək yalnız məsul şəxsin hüququdur": "Добавлять файлы может только ответственный", "Hələ fayl əlavə edilməyib.": "Файлы ещё не добавлены.", "Bax": "Открыть", "Yüklə": "Скачать", "Bağla": "Закрыть", "Əvvəlki qeydlər": "Прежние записи", "Kateqoriya imtahan nəticələri": "Результаты категорийных экзаменов", "Nəticələr şöbələr üzrə burada yerləşdirilir. Məsul şəxs Excel və ya Word faylını əlavə edir, bütün təlimçilər baxa və yükləyə bilər.": "Результаты размещаются здесь по отделам. Ответственный добавляет файл Excel или Word, все тренеры могут просматривать и скачивать его.", "Bu fayl üçün önizləmə mümkün deyil. Yüklə düyməsi ilə açın.": "Предпросмотр этого файла недоступен. Откройте его кнопкой «Скачать».", "Cədvəl qısaldılıb, tam versiya üçün faylı yükləyin.": "Таблица сокращена, для полной версии скачайте файл.", "Yalnız Excel (.xlsx) və Word (.docx) faylları əlavə edilə bilər.": "Можно добавлять только файлы Excel (.xlsx) и Word (.docx).", "Fayl 2 MB-dan böyükdür. Zəhmət olmasa daha kiçik fayl seçin.": "Файл больше 2 МБ. Выберите файл меньшего размера.", "Ortaq bazaya qoşulmaq mümkün olmadı, fayl yadda saxlanmadı.": "Не удалось подключиться к общей базе, файл не сохранён.", "Fayl əlavə edildi.": "Файл добавлен.", "Bu fayl silinsin?": "Удалить этот файл?", "Bu mühitdə yükləmə dəstəklənmir.": "В этой среде скачивание не поддерживается."});
Object.assign(RUX,{"Brendin yeni adı:": "Новое название бренда:", "Bu brend silinsin?": "Удалить этот бренд?", "Bu brend və ona aid təlim qeydləri silinsin?": "Удалить этот бренд и связанные с ним записи тренингов?", "Bu adlı brend artıq var.": "Бренд с таким названием уже есть."});
Object.assign(RUX,{"Dərs vəsaitləri": "Учебные материалы", "Təlimçilər üçün bütün dərs materialları bir yerdə": "Все учебные материалы для тренеров в одном месте", "Axtar: ad, açıqlama, təlimçi…": "Поиск: название, описание, тренер…", "Hamısı": "Все", "Rəqəmsal": "Цифровой", "Məişət": "Бытовой", "Ən yeni əvvəl": "Сначала новые", "Ən köhnə əvvəl": "Сначала старые", "Ada görə (A–Z)": "По названию (А–Я)", "Son əlavə olunan dərs vəsaitləri": "Недавно добавленные учебные материалы", "Şöbələr üzrə kateqoriyalar": "Категории по отделам", "Rəqəmsal şöbəsi – Dərs vəsaitləri": "Цифровой отдел – Учебные материалы", "Məişət şöbəsi – Dərs vəsaitləri": "Бытовой отдел – Учебные материалы", "Hələ dərs vəsaiti əlavə edilməyib.": "Учебные материалы ещё не добавлены.", "Heç nə tapılmadı.": "Ничего не найдено.", "Hələ material yoxdur": "Материалов пока нет", "material": "материалов", "Son əlavə:": "Последнее добавление:", "Aç →": "Открыть →", "Aç": "Открыть", "← Dərs vəsaitləri": "← Учебные материалы", "+ Yeni dərs vəsaiti əlavə et": "+ Добавить новый учебный материал", "Hamısını göstər": "Показать все", "Yeni dərs vəsaiti": "Новый учебный материал", "Dərs vəsaitinin adı": "Название учебного материала", "Açıqlama": "Описание", "Fayl": "Файл", "Fayl seçin (PDF, Word, Excel, PowerPoint)": "Выберите файл (PDF, Word, Excel, PowerPoint)", "Maksimum 5 MB. Köhnə .doc, .xls, .ppt formatlarını yenisi (.docx, .xlsx, .pptx) kimi saxlayın.": "Максимум 5 МБ. Старые форматы .doc, .xls, .ppt сохраните как .docx, .xlsx, .pptx.", "Əlavə et": "Добавить", "Slayd": "Слайд", "Google Drive – Ümumi dərs vəsaitləri arxivi": "Google Drive – Общий архив учебных материалов", "Bütün şöbələrin ümumi dərs vəsaitləri bu Google Drive qovluğunda saxlanılır.": "Общие учебные материалы всех отделов хранятся в этой папке Google Drive.", "Drive qovluğunu aç": "Открыть папку Drive", "Dərs vəsaitinin adını yazın.": "Введите название учебного материала.", "Fayl seçin.": "Выберите файл.", "Yalnız PDF, Word (.docx), Excel (.xlsx) və PowerPoint (.pptx) faylları əlavə edilə bilər.": "Можно добавлять только файлы PDF, Word (.docx), Excel (.xlsx) и PowerPoint (.pptx).", "Fayl 5 MB-dan böyükdür.": "Файл больше 5 МБ.", "Ortaq bazaya qoşulmaq mümkün olmadı, material yadda saxlanmadı.": "Не удалось подключиться к общей базе, материал не сохранён.", "Dərs vəsaiti əlavə edildi.": "Учебный материал добавлен.", "Bu dərs vəsaiti silinsin?": "Удалить этот учебный материал?", "PDF önizləməsi bu mühitdə açılmadı. Yüklə düyməsindən istifadə edin.": "Предпросмотр PDF в этой среде не открылся. Используйте кнопку «Скачать».", "PDF görünmürsə Yüklə düyməsi ilə faylı açın.": "Если PDF не отображается, откройте файл кнопкой «Скачать».", "PDF önizləməsi mümkün olmadı. Yüklə düyməsindən istifadə edin.": "Предпросмотр PDF недоступен. Используйте кнопку «Скачать»."});
const mab=d=>MAB[SET.lang==="ru"?"ru":"az"][(+(d||"").slice(5,7)||1)-1]||"";
let AC0=null;
function chime(kind){if(!SET.snd)return;try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;AC0=AC0||new A();if(AC0.state==="suspended")AC0.resume();
 const v=Math.max(0,Math.min(1,SET.vol/100))*.5,now=AC0.currentTime,notes=kind==="book"?[[659.25,0],[830.61,.13],[1046.5,.26]]:[[880,0],[1318.5,.14]];
 notes.forEach(n=>{const o=AC0.createOscillator(),g=AC0.createGain();o.type=kind==="book"?"triangle":"sine";o.frequency.value=n[0];g.gain.setValueAtTime(.0001,now+n[1]);g.gain.exponentialRampToValueAtTime(Math.max(v,.0002),now+n[1]+.02);g.gain.exponentialRampToValueAtTime(.0001,now+n[1]+.45);o.connect(g);g.connect(AC0.destination);o.start(now+n[1]);o.stop(now+n[1]+.5);});}catch(e){}}
function nbanner(kind,title,body){const d=document.createElement("div");d.className="nbn";d.innerHTML=`<div class="ni" style="background:${kind==="book"?"linear-gradient(135deg,#ff9f0a,#ff375f)":"linear-gradient(135deg,#0a84ff,#5e5ce6)"}">${ic(kind==="book"?"door":"msg")}</div><div style="min-width:0"><b></b><small></small></div>`;
 d.querySelector("b").textContent=title;d.querySelector("small").textContent=body;d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>d.remove(),5500);}
function notify(kind,title,body){if(kind==="msg"?!SET.nMsg:!SET.nBook)return;const tt=trs(title),bb=kind==="book"?trs(body):body;chime(kind);
 try{if(SET.vib&&navigator.vibrate)navigator.vibrate(kind==="book"?[90,60,90]:[140]);}catch(e){}
 nbanner(kind,tt,bb);
 try{if(typeof Notification!=="undefined"&&Notification.permission==="granted"&&document.hidden)new Notification(tt,{body:bb,tag:kind});}catch(e){}}
let MSi=false,BKi=false;const seenM=new Set(),seenB=new Set();
function onMsgs(){if(!MSi){MS.forEach(m=>seenM.add(m.id));MSi=true;return;}
 MS.forEach(m=>{if(seenM.has(m.id))return;seenM.add(m.id);if(!who||m.from===who||!(m.to===who||m.to==="all"))return;
  if(view==="chat"&&!document.hidden&&(peer===m.from||(peer==="all"&&m.to==="all")))return;
  notify("msg",((info(m.from)||[])[1]||"")+(m.to==="all"?" · Hamı":""),m.text);});}
function onBks(){if(!BKi){BK.forEach(b=>seenB.add(b.id));BKi=true;return;}
 BK.forEach(b=>{if(seenB.has(b.id))return;seenB.add(b.id);if(!who||b.by===who)return;
  notify("book","Otaq bron edildi",((info(b.by)||[])[1]||"")+" · "+rname(b.room)+" · "+fd(b.date)+" "+b.from+"–"+b.to);});}
async function askPerm(){try{if(typeof Notification==="undefined"){toast("Bu brauzer bildirişləri dəstəkləmir.");return;}const r=await Notification.requestPermission();toast(r==="granted"?"Bildirişlərə icazə verildi.":"Bildirişlərə icazə verilmədi.");render();}catch(e){toast("Bu mühitdə brauzer bildirişləri bloklanıb. Bildirişlər səhifə açıq olduqda səs və başlıq ilə göstərilir.");}}
const star8=(cx,cy,R,r)=>Array.from({length:16},(_,i)=>{const a=i*Math.PI/8-Math.PI/2,k=i%2?r:R;return (cx+k*Math.cos(a)).toFixed(1)+","+(cy+k*Math.sin(a)).toFixed(1)}).join(" ");
const FLAZ=`<svg viewBox="0 0 60 40" class="flg"><rect width="60" height="14" fill="#00b5e2"/><rect y="13" width="60" height="14" fill="#ef3340"/><rect y="26" width="60" height="14" fill="#509e2f"/><circle cx="27" cy="20" r="6" fill="#fff"/><circle cx="29" cy="20" r="4.8" fill="#ef3340"/><polygon points="${star8(35,20,3.6,1.7)}" fill="#fff"/></svg>`;
const FLRU=`<svg viewBox="0 0 60 40" class="flg"><rect width="60" height="14" fill="#fff"/><rect y="13" width="60" height="14" fill="#0039a6"/><rect y="26" width="60" height="14" fill="#d52b1e"/></svg>`;
IC.gear=`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`;
IC.moon=`<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>`;
IC.bell=`<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>`;
IC.volume=`<path d="M11 5 6 9H2v6h4l5 4zM19 5a9 9 0 0 1 0 14M15.5 8.5a5 5 0 0 1 0 7"/>`;
IC.globe=`<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>`;
function spanel(){const sw=(k,t,d)=>`<div class="swr"><div><b>${t}</b><small>${d}</small></div><button class="sw${SET[k]?" on":""}" data-sw="${k}" role="switch" aria-checked="${!!SET[k]}"><i></i></button></div>`;
 const perm=typeof Notification==="undefined"?"Dəstəklənmir":Notification.permission==="granted"?"İcazə verilib":Notification.permission==="denied"?"Rədd edilib":"İcazə verilməyib";
 const th=(k,ico,t)=>`<button class="${SET.theme===k?"on":""}" data-th="${k}">${ic(ico)}${t}</button>`;
 return `<div class="stg">
 <div class="sc"><h4>${ic("globe")}Dil</h4><p class="sd">Platformanın dilini seçin. Seçim bu cihazda yadda saxlanılır.</p><div class="lgrow"><button class="lgb${SET.lang==="az"?" on":""}" data-lang="az">${FLAZ}<span data-nt>Azərbaycan dili</span></button><button class="lgb${SET.lang==="ru"?" on":""}" data-lang="ru">${FLRU}<span data-nt>Русский</span></button></div></div>
 <div class="sc"><h4>${ic("moon")}Görünüş</h4><p class="sd">Gecə rejimində interfeysin rəngləri tündləşir. Gündüz rejimi mövcud görünüşü saxlayır. Avtomatik cihazın ayarına uyğun olur.</p><div class="seg">${th("light","mez","Gündüz")}${th("dark","moon","Gecə")}${th("auto","online","Avtomatik")}</div></div>
 <div class="sc"><h4>${ic("volume")}Səs</h4>${sw("snd","Bildiriş səsi","Yeni mesaj və otaq bronu zamanı qısa ikon səsi çalınır")}<div class="swr" style="display:block"><b>Səs səviyyəsi</b><div class="vrow"><input id="vol" type="range" min="0" max="100" value="${SET.vol}"><span id="volv" style="min-width:44px;text-align:right">${SET.vol}%</span></div></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 4px"><button class="btn g" data-snd="msg">Mesaj səsini yoxla</button><button class="btn g" data-snd="book">Bron səsini yoxla</button></div>${sw("vib","Titrəmə","Telefonda bildiriş gələndə titrəsin")}</div>
 <div class="sc"><h4>${ic("bell")}Bildirişlər</h4>${sw("nMsg","Yeni mesaj gələndə","Başqa təlimçi sizə və ya ümumi söhbətə yazanda")}${sw("nBook","Otaq bron ediləndə","Başqa təlimçi təlim və ya RED otağı bron edəndə")}<div class="swr"><div><b>Telefon bildirişlərinə icazə ver</b><small>İcazə vəziyyəti: ${perm}</small></div><button class="btn" data-perm="1">İcazə ver</button></div><p class="sd" style="margin:12px 0 0">Bildirişlər yalnız yeni mesaj və otaq bronu üçün göndərilir. Səhifə açıq olduqda (arxa planda da) səs, titrəmə və bildiriş göstərilir.</p></div></div>`}
const KD=[["dig","Rəqəmsal şöbəsi","t5","#5e5ce6","#bf5af2"],["mis","Məişət şöbəsi","t6","#ff9f0a","#ff375f"],["meb","Mebel-tekstil şöbəsi","t7","#30d158","#0a84ff"]];
let KF=[],kPrev=null,kBusy=null;
const canUp=d=>admin||who===(KD.find(x=>x[0]===d)||[])[2];
const kb64=u=>{let s="";for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)};
async function inflate(d){const st=new Blob([d]).stream().pipeThrough(new DecompressionStream("deflate-raw"));return new Uint8Array(await new Response(st).arrayBuffer());}
async function unzip(buf){const u=new Uint8Array(buf),dv=new DataView(buf);let e=u.length-22;while(e>=0&&dv.getUint32(e,true)!==0x06054b50)e--;if(e<0)throw new Error("zip");
 const cnt=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const out={};
 for(let i=0;i<cnt;i++){if(dv.getUint32(p,true)!==0x02014b50)break;const meth=dv.getUint16(p+10,true),csz=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),el=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),off=dv.getUint32(p+42,true),name=new TextDecoder().decode(u.subarray(p+46,p+46+nl));p+=46+nl+el+cl;
  const lnl=dv.getUint16(off+26,true),lel=dv.getUint16(off+28,true),ds=off+30+lnl+lel,data=u.subarray(ds,ds+csz);out[name]=()=>meth===0?Promise.resolve(data):inflate(data);}
 return out;}
const ztxt=async(z,n)=>z[n]?new TextDecoder().decode(await z[n]()):null;
const xdoc=x=>new DOMParser().parseFromString(x,"application/xml");
const colIdx=r=>{let n=0;for(const ch of r.replace(/[0-9]/g,""))n=n*26+ch.charCodeAt(0)-64;return n-1;};
async function parseXlsx(buf){const z=await unzip(buf),ss=[],sx=await ztxt(z,"xl/sharedStrings.xml");
 if(sx)xdoc(sx).querySelectorAll("si").forEach(si=>ss.push([...si.querySelectorAll("t")].map(t=>t.textContent).join("")));
 const wb=xdoc(await ztxt(z,"xl/workbook.xml")),rel=xdoc(await ztxt(z,"xl/_rels/workbook.xml.rels")),rm={};rel.querySelectorAll("Relationship").forEach(r=>rm[r.getAttribute("Id")]=r.getAttribute("Target"));
 const sheets=[];
 for(const sh of [...wb.querySelectorAll("sheet")].slice(0,4)){let tg=(rm[sh.getAttribute("r:id")]||"").replace(/^\//,"");const path=tg.startsWith("xl/")?tg:"xl/"+tg,sxml=await ztxt(z,path);if(!sxml)continue;
  const rows=[];let cut=false;
  xdoc(sxml).querySelectorAll("sheetData > row").forEach(row=>{if(rows.length>=300){cut=true;return;}const r=[];
   row.querySelectorAll("c").forEach(c=>{const col=colIdx(c.getAttribute("r")||"A1"),t=c.getAttribute("t"),v=c.querySelector("v");while(r.length<col)r.push("");let val="";
    if(t==="s"&&v)val=ss[+v.textContent]||"";else if(t==="inlineStr")val=[...c.querySelectorAll("t")].map(x=>x.textContent).join("");else if(v)val=v.textContent;r[col]=String(val).slice(0,80);});
   rows.push(r.slice(0,25));});
  while(rows.length&&rows[rows.length-1].every(c=>!c))rows.pop();
  sheets.push({name:sh.getAttribute("name")||"Sheet",rows,cut});}
 return {sheets};}
async function parseDocx(buf){const z=await unzip(buf),x=await ztxt(z,"word/document.xml");if(!x)return null;const body=xdoc(x).querySelector("body"),blocks=[];
 const ptxt=p=>[...p.querySelectorAll("t,tab,br")].map(n=>n.localName==="t"?n.textContent:" ").join("").trim();
 for(const n of body?[...body.children]:[]){if(blocks.length>=400)break;
  if(n.localName==="p"){const t=ptxt(n);if(t)blocks.push({t:"p",s:t.slice(0,600)});}
  else if(n.localName==="tbl"){const rows=[...n.children].filter(c=>c.localName==="tr").slice(0,100).map(tr=>[...tr.children].filter(c=>c.localName==="tc").map(tc=>[...tc.querySelectorAll("p")].map(ptxt).join(" ").slice(0,80)));blocks.push({t:"tbl",rows});}}
 return {blocks};}
function kfit(pv){if(!pv)return pv;let g=0;while(JSON.stringify(pv).length>190000&&g++<12){if(pv.sheets)pv.sheets.forEach(s=>{s.rows=s.rows.slice(0,Math.max(5,Math.floor(s.rows.length*.7)));s.cut=true;});else pv.blocks=pv.blocks.slice(0,Math.max(5,Math.floor(pv.blocks.length*.7)));}return pv;}
async function kupload(k,file){if(!file)return;const ext=(file.name.split(".").pop()||"").toLowerCase();
 if(!["xlsx","docx"].includes(ext)){toast("Yalnız Excel (.xlsx) və Word (.docx) faylları əlavə edilə bilər.");return;}
 if(file.size>2*1024*1024){toast("Fayl 2 MB-dan böyükdür. Zəhmət olmasa daha kiçik fayl seçin.");return;}
 if(!db){toast("Ortaq bazaya qoşulmaq mümkün olmadı, fayl yadda saxlanmadı.");return;}
 kBusy=k;render();
 try{const buf=await file.arrayBuffer(),b64=kb64(new Uint8Array(buf));let prev=null;try{prev=kfit(ext==="xlsx"?await parseXlsx(buf):await parseDocx(buf));}catch(e){prev=null;}
  const id=Date.now().toString(36)+Math.random().toString(36).slice(2,5),CH=150000,n=Math.max(1,Math.ceil(b64.length/CH));
  for(let i=0;i<n;i++)await db.doc("katchunks/"+id+"_"+i).set({d:b64.slice(i*CH,(i+1)*CH)});
  const meta={dept:k,name:file.name,ext,size:file.size,by:who,ts:Date.now(),n,prev:prev||null};
  await db.doc("katfiles/"+id).set(meta);KF=[...KF.filter(x=>x.id!==id),{id,...meta}];toast("Fayl əlavə edildi.");
 }catch(e){toast("Fayl yüklənmədi: "+(e.message||e));}
 kBusy=null;render();}
async function kdl(id){const f=KF.find(x=>x.id===id);if(!f||!db)return;
 try{const parts=[];for(let i=0;i<(f.n||1);i++){const sn=await db.doc("katchunks/"+id+"_"+i).get();parts.push((sn.exists&&sn.data().d)||"");}
  const bin=atob(parts.join("")),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  saveFile(f.name,u);
 }catch(e){if(!e||e.code!=="declined")toast("Yükləmə alınmadı: "+((e&&e.message)||e));}}
const kfile=f=>{const by=info(f.by),dt=new Date(f.ts||0),p2=n=>String(n).padStart(2,"0"),ds=p2(dt.getDate())+"."+p2(dt.getMonth()+1)+"."+dt.getFullYear();
 return `<div class="kf"><span class="fty ${esc(f.ext)}">${esc((f.ext||"").toUpperCase())}</span><div class="kfi"><b>${esc(f.name)}</b><small>${Math.max(1,Math.round((f.size||0)/1024))} KB · ${ds}${by?" · "+esc(by[1].split(" ")[0]):""}</small></div><button class="btn g" data-kview="${esc(f.id)}">Bax</button><button class="btn g" data-kdl="${esc(f.id)}">Yüklə</button>${canUp(f.dept)?`<button class="x" data-kdel="${esc(f.id)}" title="Sil">✕</button>`:""}</div>`};
function kdept(d){const k=d[0],fs=KF.filter(f=>f.dept===k).sort((a,b)=>(b.ts||0)-(a.ts||0)),r=info(d[2]);
 return `<div class="kd" style="--k1:${d[3]};--k2:${d[4]}"><div class="kh"><div class="kt"><h3>${d[1]}</h3><div class="kr">${avc(d[2],"width:42px;height:42px;margin:0;flex:none")}<span><small>Məsul şəxs</small><b>${esc(r[1])}</b></span></div></div>
 ${canUp(k)?`<label class="btn kup">${kBusy===k?"Yüklənir…":"+ Fayl əlavə et"}<input type="file" data-kf="${k}" accept=".xlsx,.docx" hidden></label>`:`<small class="kn">Fayl əlavə etmək yalnız məsul şəxsin hüququdur</small>`}</div>
 <div>${fs.length?fs.map(kfile).join(""):`<div class="empty" style="padding:16px 0">Hələ fayl əlavə edilməyib.</div>`}</div></div>`}
function kmodal(){const f=KF.find(x=>x.id===kPrev.id);if(!f)return"";const p=f.prev;let body;
 if(!p)body=`<div class="empty">Bu fayl üçün önizləmə mümkün deyil. Yüklə düyməsi ilə açın.</div>`;
 else if(p.sheets){const sh=p.sheets[kPrev.si||0]||p.sheets[0]||{rows:[],name:""};body=`${p.sheets.length>1?`<div class="tabs">${p.sheets.map((x,i)=>`<button class="tab ${i===(kPrev.si||0)?"on":""}" data-ksh="${i}">${esc(x.name)}</button>`).join("")}</div>`:""}<div class="scroll"><table class="kt2">${sh.rows.map((r,ri)=>`<tr>${r.map(c=>ri===0?`<th>${esc(c)}</th>`:`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>${sh.cut?`<small style="color:var(--mu)">Cədvəl qısaldılıb, tam versiya üçün faylı yükləyin.</small>`:""}`;}
 else body=(p.blocks||[]).map(b=>b.t==="p"?`<p>${esc(b.s)}</p>`:`<div class="scroll"><table class="kt2">${b.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`).join("");
 return `<div class="modal" id="kov"><div class="mb kmb"><div class="kmh"><b>${esc(f.name)}</b><button class="btn g" id="kx">Bağla</button></div><div class="kmbody">${body}</div></div></div>`}
function kpanel(){const old=list(me,"kat");
 return `<div class="kmain"><div class="panel" style="margin-bottom:16px"><h3 style="margin:0 0 6px;display:flex;align-items:center">${ic("kat")}Kateqoriya imtahan nəticələri</h3><p style="margin:0;color:var(--mu)">Nəticələr şöbələr üzrə burada yerləşdirilir. Məsul şəxs Excel və ya Word faylını əlavə edir, bütün təlimçilər baxa və yükləyə bilər.</p></div><div class="kw">${KD.map(kdept).join("")}</div>
 ${old.length?`<div class="panel" style="margin-top:16px"><h3 style="margin-top:0">Əvvəlki qeydlər</h3>${old.map(e=>`<div class="row"><div><b>${esc(e.ad||"")}</b><br><small>${fd(e.d1)}</small>${e.q?`<div>${esc(e.q)}</div>`:""}</div><button class="x" data-kold="${esc(e.id)}" title="Sil">✕</button></div>`).join("")}</div>`:""}${kPrev?kmodal():""}</div>`}
const DVN={dig:"Rəqəmsal şöbəsi",mis:"Məişət şöbəsi"};
let DVS=[],dvView="home",dvq="",dvf="all",dvs="new",dvAll=false,dvForm=null,dvFile=null,dvPrev=null,dvBusy=false;
const FX={pdf:["#ff453a","#c9150b","PDF"],docx:["#0a84ff","#0a47c9","DOC"],xlsx:["#30d158","#17923a","XLS"],pptx:["#ff9f0a","#e0560c","PPT"]};
const fx=e=>{const c=FX[e]||["#8e8e93","#636366",(e||"").toUpperCase().slice(0,4)];return `<span class="fx" style="background:linear-gradient(150deg,${c[0]},${c[1]})"><svg viewBox="0 0 24 24"><path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="rgba(255,255,255,.2)"/><path d="M14 2v5h5z" fill="rgba(255,255,255,.4)"/></svg><b>${c[2]}</b></span>`};
const dvdate=ts=>{const d=new Date(ts||0),p=n=>String(n).padStart(2,"0");return p(d.getDate())+"."+p(d.getMonth()+1)+"."+d.getFullYear()};
const dvsize=b=>b>=1048576?(b/1048576).toFixed(1)+" MB":Math.max(1,Math.round(b/1024))+" KB";
const dvcan=m=>admin||m.by===who;
function dvfilter(dept){const q=dvq.trim().toLocaleLowerCase("az");let a=DVS.filter(m=>dept?m.dept===dept:(dvf==="all"||m.dept===dvf));
 if(q)a=a.filter(m=>[m.title,m.desc,m.fname,(info(m.by)||[])[1],DVN[m.dept]].join(" ").toLocaleLowerCase("az").includes(q));
 return a.slice().sort((x,y)=>dvs==="old"?(x.ts||0)-(y.ts||0):dvs==="az"?(x.title||"").localeCompare(y.title||"","az"):(y.ts||0)-(x.ts||0));}
const dvrow=m=>{const by=info(m.by);return `<div class="dvr"><div class="dvl">${fx(m.ext)}</div><div class="dvm"><div class="dvt">${esc(m.title)}</div>${m.desc?`<div class="dvd">${esc(m.desc)}</div>`:""}<div class="dvx"><span class="dvb ${esc(m.dept)}">${esc(DVN[m.dept]||"")}</span><span>${dvdate(m.ts)}</span>${by?`<span class="dvu"><span class="mini">${AV(m.by)}</span>${esc(by[1])}</span>`:""}<span>${dvsize(m.size||0)}</span></div></div><div class="dva"><button class="btn" data-dvo="${esc(m.id)}">Aç</button><button class="btn g" data-dvdl="${esc(m.id)}">Yüklə</button>${dvcan(m)?`<button class="x" data-dvdel="${esc(m.id)}" title="Sil">✕</button>`:""}</div></div>`};
function dvlist(dept){const a=dvfilter(dept),lim=!dept&&!dvAll&&!dvq.trim()&&dvf==="all"&&dvs==="new"&&a.length>6,show=lim?a.slice(0,6):a;
 if(!a.length)return `<div class="empty">${DVS.filter(m=>!dept||m.dept===dept).length?"Heç nə tapılmadı.":"Hələ dərs vəsaiti əlavə edilməyib."}</div>`;
 return show.map(dvrow).join("")+(lim?`<button class="btn g dvmore" id="dvall">Hamısını göstər <b>${a.length}</b></button>`:"");}
function dvrefresh(){const el=document.getElementById("dvlist");if(el)el.innerHTML=dvlist(dvView==="home"?null:dvView);}
function dvctrl(){return `<div class="dvc"><div class="dvsr"><svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="dvq" placeholder="Axtar: ad, açıqlama, təlimçi…" value="${esc(dvq)}" autocomplete="off"></div>${dvView==="home"?`<div class="dvchips">${[["all","Hamısı"],["dig","Rəqəmsal"],["mis","Məişət"]].map(c=>`<button class="dvchip ${dvf===c[0]?"on":""}" data-dvf="${c[0]}">${c[1]}</button>`).join("")}</div>`:""}<select id="dvs"><option value="new"${dvs==="new"?" selected":""}>Ən yeni əvvəl</option><option value="old"${dvs==="old"?" selected":""}>Ən köhnə əvvəl</option><option value="az"${dvs==="az"?" selected":""}>Ada görə (A–Z)</option></select></div>`}
async function parsePptx(buf){const z=await unzip(buf),names=Object.keys(z).filter(n=>/^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a,b)=>parseInt(a.match(/\d+/)[0])-parseInt(b.match(/\d+/)[0])),slides=[];
 for(const n of names.slice(0,60)){const d=xdoc(await ztxt(z,n)),lines=[];d.querySelectorAll("p").forEach(p=>{const t=[...p.querySelectorAll("t")].map(x=>x.textContent).join("").trim();if(t&&lines.length<40)lines.push(t.slice(0,300));});slides.push({lines});}
 return {slides};}
function dvfit(pv){if(!pv)return pv;if(pv.slides){let g=0;while(JSON.stringify(pv).length>190000&&g++<12)pv.slides=pv.slides.slice(0,Math.max(3,Math.floor(pv.slides.length*.7)));return pv;}return kfit(pv);}
async function dvbytes(m){const parts=[];for(let i=0;i<(m.n||1);i++){const sn=await db.doc("veschunks/"+m.id+"_"+i).get();parts.push((sn.exists&&sn.data().d)||"");}const bin=atob(parts.join("")),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
async function dvdl(id){const m=DVS.find(x=>x.id===id);if(!m||!db)return;
 try{const u=await dvbytes(m);saveFile(m.fname,u);}
 catch(e){if(!e||e.code!=="declined")toast("Yükləmə alınmadı: "+((e&&e.message)||e));}}
async function dvopen(id){const m=DVS.find(x=>x.id===id);if(!m)return;dvPrev={id,si:0,url:null,loading:m.ext==="pdf"};render();
 if(m.ext==="pdf"){try{const u=await dvbytes(m);if(dvPrev&&dvPrev.id===id)dvPrev.url=URL.createObjectURL(new Blob([u],{type:"application/pdf"}));}catch(e){toast("Fayl açılmadı: "+((e&&e.message)||e));}if(dvPrev&&dvPrev.id===id)dvPrev.loading=false;render();}}
function dvclose(){if(dvPrev&&dvPrev.url)try{URL.revokeObjectURL(dvPrev.url)}catch(e){}dvPrev=null;render();}
async function dvupload(){const f=dvForm;if(!f||dvBusy)return;const title=(f.t||"").trim();
 if(!title){toast("Dərs vəsaitinin adını yazın.");return;}
 if(!dvFile){toast("Fayl seçin.");return;}
 const file=dvFile,ext=(file.name.split(".").pop()||"").toLowerCase();
 if(!["pdf","docx","xlsx","pptx"].includes(ext)){toast("Yalnız PDF, Word (.docx), Excel (.xlsx) və PowerPoint (.pptx) faylları əlavə edilə bilər.");return;}
 if(file.size>5*1024*1024){toast("Fayl 5 MB-dan böyükdür.");return;}
 if(!db){toast("Ortaq bazaya qoşulmaq mümkün olmadı, material yadda saxlanmadı.");return;}
 dvBusy=true;const bt=document.getElementById("dvsave"),pg=document.getElementById("dvpg");if(bt)bt.textContent="Yüklənir…";
 try{const buf=await file.arrayBuffer(),b64=kb64(new Uint8Array(buf));let prev=null;try{prev=dvfit(ext==="xlsx"?await parseXlsx(buf):ext==="docx"?await parseDocx(buf):ext==="pptx"?await parsePptx(buf):null);}catch(e){prev=null;}
  const id=Date.now().toString(36)+Math.random().toString(36).slice(2,5),CH=150000,n=Math.max(1,Math.ceil(b64.length/CH));
  for(let i=0;i<n;i++){await db.doc("veschunks/"+id+"_"+i).set({d:b64.slice(i*CH,(i+1)*CH)});if(pg)pg.textContent=Math.round((i+1)/n*100)+"%";}
  const meta={title,desc:(f.d||"").trim(),dept:f.dept,fname:file.name,ext,size:file.size,by:who,ts:Date.now(),n,prev:prev||null};
  await db.doc("vesdocs/"+id).set(meta);DVS=[...DVS.filter(x=>x.id!==id),{id,...meta}];dvForm=null;dvFile=null;toast("Dərs vəsaiti əlavə edildi.");
 }catch(e){toast("Yükləmə alınmadı: "+((e&&e.message)||e));}
 dvBusy=false;render();}
function dvformh(){const f=dvForm;return `<div class="modal" id="dvov"><div class="mb dvmb"><h3 style="margin:0">Yeni dərs vəsaiti</h3><span class="badge" style="margin:6px 0 10px;display:inline-block">${esc(DVN[f.dept]||"")}</span><label>Dərs vəsaitinin adı</label><input id="dv_t" maxlength="120" value="${esc(f.t||"")}"><label>Açıqlama</label><textarea id="dv_d" rows="3" maxlength="600">${esc(f.d||"")}</textarea><label>Fayl</label><label class="dvfile"><input type="file" id="dv_f" accept=".pdf,.docx,.xlsx,.pptx" hidden><span id="dv_fn">${dvFile?esc(dvFile.name)+" · "+dvsize(dvFile.size):"Fayl seçin (PDF, Word, Excel, PowerPoint)"}</span></label><small class="dvhint">Maksimum 5 MB. Köhnə .doc, .xls, .ppt formatlarını yenisi (.docx, .xlsx, .pptx) kimi saxlayın.</small><div class="dvbtns"><button class="btn" id="dvsave">${dvBusy?"Yüklənir…":"Əlavə et"}</button><button class="btn g" id="dvcancel">Ləğv et</button><span id="dvpg" class="dvpg"></span></div></div></div>`}
function dvmodal(){const m=DVS.find(x=>x.id===dvPrev.id);if(!m)return"";const p=m.prev;let body;
 if(m.ext==="pdf")body=dvPrev.loading?`<div class="empty">Yüklənir…</div>`:dvPrev.url?`<object class="dvpdf" data="${dvPrev.url}" type="application/pdf"><div class="empty">PDF önizləməsi bu mühitdə açılmadı. Yüklə düyməsindən istifadə edin.</div></object><small class="dvhint">PDF görünmürsə Yüklə düyməsi ilə faylı açın.</small>`:`<div class="empty">PDF önizləməsi mümkün olmadı. Yüklə düyməsindən istifadə edin.</div>`;
 else if(!p)body=`<div class="empty">Bu fayl üçün önizləmə mümkün deyil. Yüklə düyməsi ilə açın.</div>`;
 else if(p.sheets){const sh=p.sheets[dvPrev.si||0]||p.sheets[0]||{rows:[]};body=`${p.sheets.length>1?`<div class="tabs">${p.sheets.map((x,i)=>`<button class="tab ${i===(dvPrev.si||0)?"on":""}" data-dvsh="${i}">${esc(x.name)}</button>`).join("")}</div>`:""}<div class="scroll"><table class="kt2">${sh.rows.map((r,ri)=>`<tr>${r.map(c=>ri===0?`<th>${esc(c)}</th>`:`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>${sh.cut?`<small class="dvhint">Cədvəl qısaldılıb, tam versiya üçün faylı yükləyin.</small>`:""}`;}
 else if(p.blocks)body=p.blocks.map(b=>b.t==="p"?`<p>${esc(b.s)}</p>`:`<div class="scroll"><table class="kt2">${b.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`).join("");
 else body=(p.slides||[]).map((sl,i)=>`<div class="dvsl"><b>Slayd</b> <span>${i+1}</span>${sl.lines.map(l=>`<p>${esc(l)}</p>`).join("")}</div>`).join("");
 return `<div class="modal" id="dvmov"><div class="mb kmb"><div class="kmh"><div class="dvmt">${fx(m.ext)}<div><b>${esc(m.title)}</b><small>${esc(m.fname)}</small></div></div><div><button class="btn g" data-dvdl="${esc(m.id)}">Yüklə</button> <button class="btn g" id="dvx">Bağla</button></div></div>${m.desc?`<p class="dvdesc">${esc(m.desc)}</p>`:""}<div class="kmbody">${body}</div></div></div>`}
function dvpanel(){const old=list(me,"ves"),tail=`${dvForm?dvformh():""}${dvPrev?dvmodal():""}`;
 if(dvView!=="home"){const dp=dvView,n=DVS.filter(m=>m.dept===dp).length;
  return `<div class="dvw"><div><button class="btn g" data-dvback>← Dərs vəsaitləri</button></div><div class="dvhero ${dp}"><div><h2>${DVN[dp]} – Dərs vəsaitləri</h2><p><span>${n}</span> material</p></div><button class="btn" id="dvnew">+ Yeni dərs vəsaiti əlavə et</button></div>${dvctrl()}<div id="dvlist">${dvlist(dp)}</div>${tail}</div>`;}
 return `<div class="dvw"><div class="dvtop"><h2>Dərs vəsaitləri</h2><p>Təlimçilər üçün bütün dərs materialları bir yerdə</p></div>${dvctrl()}
 <h3 class="dvsec">Son əlavə olunan dərs vəsaitləri</h3><div id="dvlist">${dvlist(null)}</div>
 <h3 class="dvsec">Şöbələr üzrə kateqoriyalar</h3><div class="dvcats">${["dig","mis"].map(dp=>{const ms=DVS.filter(m=>m.dept===dp),last=ms.reduce((a,m)=>Math.max(a,m.ts||0),0);return `<button class="dvcat ${dp}" data-dvcat="${dp}"><b>${DVN[dp]} – Dərs vəsaitləri</b><span class="dvcn"><span>${ms.length}</span> material</span><small>${last?`Son əlavə: <span>${dvdate(last)}</span>`:"Hələ material yoxdur"}</small><span class="dvgo">Aç →</span></button>`}).join("")}</div>
 <div class="dvdrive"><div class="dvdi"><svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor" opacity=".9"/></svg></div><div class="dvdt"><b>Google Drive – Ümumi dərs vəsaitləri arxivi</b><p>Bütün şöbələrin ümumi dərs vəsaitləri bu Google Drive qovluğunda saxlanılır.</p><a class="dvlink" href="${DRIVE}" target="_blank" rel="noopener noreferrer">${DRIVE}</a></div><a class="btn" href="${DRIVE}" target="_blank" rel="noopener noreferrer">Drive qovluğunu aç</a></div>
 ${old.length?`<div class="panel" style="margin-top:16px"><h3 style="margin-top:0">Əvvəlki qeydlər</h3>${old.map(e=>`<div class="row"><div><b>${esc(e.ad||"")}</b><br><small>${fd(e.d1)}</small>${e.q?`<div>${esc(e.q)}</div>`:""}</div><button class="x" data-dvold="${esc(e.id)}" title="Sil">✕</button></div>`).join("")}</div>`:""}${tail}</div>`}
IC.edit=`<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>`;
IC.msg=`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`;
IC.users=`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>`;
const TN=["#0a84ff","#5e5ce6","#bf5af2","#ff375f","#ff9f0a","#30d158","#40c8e0","#ff6482","#ffd60a","#66d4cf","#ac8e68"];
const tn=id=>TN[Math.max(0,T.findIndex(t=>t[0]===id))%TN.length];
const DEFS={t1:{tot:true,stars:5},t2:{tot:true,stars:5},t9:{tot:true,stars:5}};
const stt=id=>(D(id).data||{}).status||DEFS[id]||{};
const STP='<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"';
const SST=f=>`<svg class="sti" viewBox="0 0 24 24">${STP} fill="${f?"#ffcc00":"none"}" stroke="${f?"#e0a800":"#b0b0b8"}" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const SB=id=>{const a=stt(id);return a.tot&&+a.stars===5?`<i class="sb"><svg viewBox="0 0 24 24">${STP} fill="#fff"/></svg></i>`:""};
function bdg(id){const a=stt(id),n=Math.max(0,Math.min(5,+a.stars||0)),full=a.tot&&n===5;
 return (a.tot?`<span class="tot">${ic("kat")}TOT sertifikatlı</span>`:"")+(n?`<span class="stars" title="${n} ulduz">${[1,2,3,4,5].map(i=>SST(i<=n)).join("")}</span>`:"")+(full?`<span class="stt">${ic("star")}Statuslu təlimçi</span>`:"")}
const isOn=id=>Date.now()-(P[id]||0)<75000;
const st=id=>{const o=isOn(id);return `<span class="st ${o?"on":"off"}"><svg class="si" viewBox="0 0 10 10"><circle cx="5" cy="5" r="${o?4.5:3.6}" fill="${o?"currentColor":"none"}" stroke="currentColor" stroke-width="1.6"/></svg>${o?"Onlayn":"Offline"}</span>`};
function setPres(v){if(!who)return;P[who]=v;if(db)try{db.doc("presence/"+who).set({ts:v}).catch(()=>{});}catch(e){}}
const loadRd=()=>{try{rd=JSON.parse(localStorage.getItem("rd_"+who)||"{}")}catch(e){rd={}}};
const markRd=()=>{rd[peer]=Date.now();try{localStorage.setItem("rd_"+who,JSON.stringify(rd))}catch(e){}};
const un=p=>MS.filter(m=>m.ts>(rd[p]||0)&&m.from!==who&&(p==="all"?m.to==="all":(m.from===p&&m.to===who))).length;
const unT=()=>["all",...T.map(t=>t[0]).filter(i=>i!==who)].reduce((n,p)=>n+un(p),0);
const tm=ts=>{const d=new Date(ts),p=n=>String(n).padStart(2,"0"),t=p(d.getHours())+":"+p(d.getMinutes());return d.toDateString()===new Date().toDateString()?t:p(d.getDate())+"."+p(d.getMonth()+1)+" "+t};
const chatBanner=()=>`<div class="rb" data-chat style="background:linear-gradient(120deg,#0b0f1f,#9d174d)"><div><b>${ic("msg")}Mesajlar</b><br><small>Təlimçilərlə yazışın və kimin onlayn olduğunu görün</small></div><span class="btn">Aç →</span></div>`;
function clist(){const ub=p=>{const n=un(p);return n?`<span class="ub">${n}</span>`:""};
 return `<button class="ci ${peer==="all"?"on":""}" data-peer="all"><div class="gi">${ic("users")}</div><span><b>Hamı</b><small style="color:var(--mu)">Ümumi söhbət</small></span>${ub("all")}</button>`+T.filter(t=>t[0]!==who).map(t=>`<button class="ci ${peer===t[0]?"on":""}" data-peer="${t[0]}">${avc(t[0],"width:42px;height:42px;margin:0;flex:none")}<span><b>${esc(t[1])}</b>${st(t[0])}</span>${ub(t[0])}</button>`).join("")}
function chead(){return peer==="all"?`<div class="gi">${ic("users")}</div><div><b>Hamı (ümumi söhbət)</b><br><small style="color:var(--mu)">Bütün təlimçilər görür</small></div>`:`${avc(peer,"width:46px;height:46px;margin:0;flex:none")}<div><b>${esc(info(peer)[1])}</b><br>${st(peer)}</div>`}
function thread(){const L=MS.filter(m=>peer==="all"?m.to==="all":((m.from===who&&m.to===peer)||(m.from===peer&&m.to===who))).sort((a,b)=>a.ts-b.ts);
 return L.length?L.map(m=>`<div class="bub ${m.from===who?"me":""}">${peer==="all"&&m.from!==who?`<div class="nm">${esc((info(m.from)||[])[1]||"")}</div>`:""}${esc(m.text)}<small>${tm(m.ts)}</small></div>`).join(""):`<div class="empty">Hələ mesaj yoxdur. İlk mesajı siz yazın.</div>`}
function chat(){return `<div class="wrap"><div class="top"><h2 style="display:flex;align-items:center">${ic("msg")}Mesajlar</h2><button class="btn g" id="back">← Kabinetə qayıt</button></div>
 <div class="chat"><div class="clist" id="clist">${clist()}</div><div class="cmain"><div class="chead" id="chead">${chead()}</div><div class="thread" id="thread">${thread()}</div><div class="cin"><input id="msg" maxlength="500" autocomplete="off" placeholder="Mesaj yazın..."><button class="btn" id="send">Göndər</button></div></div></div></div>`}
function refreshChat(){if(view!=="chat")return;markRd();const g=i=>document.getElementById(i);if(!g("thread")){render();return;}
 const th=g("thread"),near=th.scrollHeight-th.scrollTop-th.clientHeight<80;
 g("clist").innerHTML=clist();g("chead").innerHTML=chead();th.innerHTML=thread();applyLang(g("clist"));applyLang(g("chead"));applyLang(th);if(near)th.scrollTop=th.scrollHeight;}
function upd(){if(view==="chat")return refreshChat();if(!["INPUT","TEXTAREA","SELECT"].includes((document.activeElement||{}).tagName))render();}
let sig="";function pres(){const s=T.map(t=>isOn(t[0])?1:0).join("");if(s!==sig){sig=s;upd();}}
async function sendMsg(){const i=document.getElementById("msg");if(!i)return;const text=i.value.trim().slice(0,500);if(!text)return;i.value="";
 const m={from:who,to:peer,text,ts:Date.now()},id=m.ts.toString(36)+Math.random().toString(36).slice(2,6);
 MS=[...MS,{id,...m}];refreshChat();i.focus();
 try{if(db)await db.doc("messages/"+id).set(m);}catch(e){alert("Mesaj göndərilə bilmədi: "+(e.message||e));}}
function room(){
 const today=new Date().toISOString().slice(0,10);
 const L=meets.slice().sort((a,b)=>((a.date||"")+(a.time||"")).localeCompare((b.date||"")+(b.time||"")));
 const pl=(c,u,n)=>`<a class="pl ${c}" href="${u}" target="_blank" rel="noopener">${ic("cam")}<span><b>${n}</b><small>Dərhal yeni görüş başlat</small></span></a>`;
 return `<div class="wrap"><div class="top"><h2 style="display:flex;align-items:center">${ic("online")}Görüş otağı</h2><button class="btn g" id="back">← Kabinetə qayıt</button></div>
 <div class="dk"><div class="stage"><div class="live"><i></i>CANLI DƏRS OTAĞI</div>
 <div class="tiles">${T.map((t,i)=>`<div class="tile" style="animation-delay:${-i*1.2}s">${AV(t[0])}<span>${esc(t[1].split(" ")[0])}</span></div>`).join("")}</div>
 <div class="plats">${pl("zm","https://zoom.us/start/videomeeting","Zoom")}${pl("gm","https://meet.google.com/new","Google Meet")}${pl("tm","https://teams.microsoft.com","Microsoft Teams")}</div>
 <p class="note">Platformada görüş yaradın, linki kopyalayın və aşağıda dərsi planlaşdırıb təlimçilərlə paylaşın.</p></div>
 <div class="panel"><h3 style="margin-top:0">Online dərs planlaşdır</h3>
 <div class="form"><div><label>Dərsin mövzusu</label><input id="m_t"></div><div><label>Tarix</label>${DS("m_d",today)}</div><div><label>Saat</label><input id="m_h" type="time" value="10:00"></div>
 <div class="w" style="display:grid;grid-template-columns:1fr 2fr;gap:10px"><div><label>Platforma</label><select id="m_p"><option>Zoom</option><option>Google Meet</option><option>Microsoft Teams</option><option>Digər</option></select></div><div><label>Görüş linki</label><input id="m_l" placeholder="https://..."></div></div></div>
 <button class="btn" id="madd">Dərsi planlaşdır</button></div>
 <div class="panel"><h3 style="margin-top:0">Planlaşdırılmış dərslər</h3>${L.length?L.map(m=>`<div class="row">${avc(m.host,"width:44px;height:44px;margin:0;flex:none")}<div><b>${esc(m.title)}</b>${m.date===today?` <span class="badge">Bu gün</span>`:""}<br><small>${fd(m.date)} · ${esc(m.time)} · ${esc(m.plat)} · ${esc((info(m.host)||[])[1]||"")}</small></div><a class="btn" href="${esc(m.link)}" target="_blank" rel="noopener">Qoşul</a>${admin||m.host===me?`<button class="x" data-mdel="${esc(m.id)}" title="Sil">✕</button>`:""}</div>`).join(""):`<div class="empty">Hələ planlaşdırılmış dərs yoxdur.</div>`}</div></div></div>`;
}
function home(){
  return `<div class="hero"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
  ${FLT()}
  <svg class="scene" viewBox="0 0 800 70" aria-hidden="true"><rect x="20" y="6" width="150" height="46" rx="4" fill="#fff" opacity=".93"/><path d="M32 20h60M32 30h96M32 40h44" stroke="#c026d3" stroke-width="3" stroke-linecap="round"/><g><circle cx="200" cy="30" r="10" fill="#fde68a"/><path d="M184 70c0-16 6-28 16-28s16 12 16 28z" fill="#fff"/><path class="arm" d="M214 48l22-16" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g><g class="st"><circle cx="310" cy="40" r="9" fill="#fde68a"/><path d="M296 70c0-14 6-22 14-22s14 8 14 22z" fill="#fff"/></g><g class="st" style="animation-delay:-.4s"><circle cx="380" cy="40" r="9" fill="#fbcfe8"/><path d="M366 70c0-14 6-22 14-22s14 8 14 22z" fill="#fff"/></g><g class="st" style="animation-delay:-.8s"><circle cx="450" cy="40" r="9" fill="#bbf7d0"/><path d="M436 70c0-14 6-22 14-22s14 8 14 22z" fill="#fff"/></g><g class="st" style="animation-delay:-1.2s"><circle cx="520" cy="40" r="9" fill="#fed7aa"/><path d="M506 70c0-14 6-22 14-22s14 8 14 22z" fill="#fff"/><path class="hand" d="M528 50l8-22" stroke="#fed7aa" stroke-width="4" stroke-linecap="round"/></g><g class="st" style="animation-delay:-1.6s"><circle cx="590" cy="40" r="9" fill="#e9d5ff"/><path d="M576 70c0-14 6-22 14-22s14 8 14 22z" fill="#fff"/></g><g class="st" style="animation-delay:-2s"><circle cx="660" cy="40" r="9" fill="#fef08a"/><path d="M646 70c0-14 6-22 14-22s14 8 14 22z" fill="#fff"/></g></svg>
  <div class="lgq"><button class="fl${SET.lang==="az"?" on":""}" data-lang="az" title="Azərbaycan dili">${FLAZ}</button><button class="fl${SET.lang==="ru"?" on":""}" data-lang="ru" title="Русский">${FLRU}</button></div><h1><i data-i="h1a" style="font-style:normal">Təlimçi</i> <span data-i="h1b">Kabineti</span></h1>
  <p class="slogan"><b>Təlimlərə nəzarət et</b> və təlim keyfiyyətini yüksəlt</p></div>
  <div class="wrap"><div class="grid">${T.map(t=>`<div class="tc" data-login="${t[0]}" style="--tn:${tn(t[0])}">${avc(t[0])}<b>${esc(t[1])}</b><small>${esc(t[2])}</small><br>${st(t[0])}<div class="bgs">${bdg(t[0])}</div></div>`).join("")}</div>
  <p class="note" style="text-align:center">Kabinetə girmək üçün adınızın üzərinə klikləyin və PIN kodu daxil edin.</p></div>`;
}
function cab(){
  const id=me,t=info(id),s=S.find(x=>x[0]===sec),items=list(id,sec),E=ed&&list(id,sec).find(x=>x.id===ed)||null,TR=sec==="offline"||sec==="online",EZ=sec==="ezam",PV=pv&&list(id,sec).find(x=>x.id===pv)||null;
  return `<div class="wrap"><div class="top"><h2 class="ph" style="--tn:${tn(id)};display:flex;align-items:center;gap:12px">${avc(id,"margin:0;width:54px;height:54px;flex:none")}<span>${esc(t[1])}</span> <small style="color:var(--mu);font-size:14px">· kabinet</small><span style="font-size:14px;font-weight:400;margin-left:8px">${st(id)}</span><span class="bgs">${bdg(id)}</span></h2>
  <div><button class="btn g" data-room>${ic("online")}Görüş otağı</button> <button class="btn g" data-chat>${ic("msg")}Mesajlar${unT()?` <span class="ub">${unT()}</span>`:""}</button> <button class="btn g" id="pinb">PIN dəyiş</button> <button class="btn g" id="out">Çıxış</button></div></div>
  ${admin?`<div class="top"><button class="btn ${panel?"g":""}" id="pnl">${panel?"← Öz kabinetim":"İdarəetmə paneli"}</button>${me!==who?` <span class="st on" style="margin-left:10px">Admin rejimi: ${esc(t[1])} kabinetini redaktə edirsiniz</span>`:""}</div>`:""}
  ${panel&&admin?`<div class="adx"><h2 class="ah">Nəzarət mərkəzi</h2>${roomBanner()+chatBanner()+adminView()}</div>`:`<div class="lay"><nav class="side">${S.map(x=>`<button class="tab ${x[0]===sec?"on":""}" data-tab="${x[0]}"><span>${ic(x[0])}${x[1]}</span><i>${x[0]==="ves"?DVS.length:list(id,x[0]).length}</i></button>`).join("")}<div class="sdiv"></div>${SR.map(x=>`<button class="tab sp ${x[0]}${sec===x[0]?" on":""}" data-tab="${x[0]}"><span>${ic(x[2])}${x[1]}</span><i>${bnum(x[0])}</i></button>`).join("")}<div class="sdiv"></div><button class="tab${sec==="settings"?" on":""}" data-tab="settings"><span>${ic("gear")}Tənzimləmələr</span></button></nav>
  ${sec==="settings"?spanel():sec==="ves"?dvpanel():sec==="kat"?kpanel():sec==="vendor"?vpanel():sec==="rooms"||sec==="red"?rpanel(sec):PV?ipanel(PV):`<div class="panel"><h3 style="margin-top:0;display:flex;align-items:center">${ic(s[0])}${s[1]}</h3>
  <div class="form"><div><label>${s[3]}</label><input id="f_ad" value="${esc(E?E.ad:"")}"></div><div><label>Başlama tarixi</label>${DS("f_d1",E&&E.d1)}</div><div><label>Bitmə tarixi (istəyə bağlı)</label>${DS("f_d2",E&&E.d2)}</div>
  <div class="w"><label>Qeyd / nəticə</label><textarea id="f_q" rows="2">${esc(E?E.q:"")}</textarea></div></div>
  ${EZ?ezmap():""}<button class="btn" id="add">${E?"Yadda saxla":"+ Əlavə et"}</button>${E?` <button class="btn g" id="cancel">Ləğv et</button>`:""}
  <div style="margin-top:14px">${items.length?items.slice().reverse().map(e=>`<div class="row"><div><b>${esc(e.ad)}</b><br><small>${fd(e.d1)}${e.d2?" – "+fd(e.d2):""}</small>${e.q?`<div>${esc(e.q)}</div>`:""}${e.rays&&e.rays.length?`<div style="margin-top:6px">${e.rays.map(r=>`<span class="chp g">${esc(r)}</span>`).join(" ")}</div>`:""}${TR?`<button class="btn g" data-ist="${e.id}" style="padding:5px 12px;font-size:13px;margin-top:6px">${ic("users")}Təlim iştirakçıları (${(e.ist||[]).length})</button>`:""}</div><button class="x" data-edit="${e.id}" title="Redaktə et">${ic("edit")}</button><button class="x" data-del="${e.id}" title="Sil">✕</button></div>`).join(""):`<div class="empty">Hələ qeyd yoxdur. Yuxarıdakı formadan əlavə edin.</div>`}</div></div>`}</div>`}</div>`;
}
function adminView(){
  return `<div class="panel"><h3 style="margin-top:0">Bütün təlimçilər üzrə icmal</h3><div class="scroll"><table><tr><th>Təlimçi</th>${S.map(x=>`<th>${x[1]}</th>`).join("")}<th>Cəmi</th><th>Status</th><th>TOT</th><th>Reytinq</th><th>PIN</th></tr>
  ${T.map(t=>`<tr><td class="l" data-open="${t[0]}">${esc(t[1])}</td>${S.map(x=>`<td>${list(t[0],x[0]).length}</td>`).join("")}<td><b>${cnt(t[0])}</b></td><td>${st(t[0])}</td><td><button class="btn g" data-tot="${t[0]}" style="padding:4px 12px;font-size:13px">${stt(t[0]).tot?"Var":"Yoxdur"}</button></td><td><select data-star="${t[0]}" style="width:auto;padding:5px 8px">${[0,1,2,3,4,5].map(n=>`<option value="${n}"${(+stt(t[0]).stars||0)===n?" selected":""}>${n===0?"—":n+" ★"}</option>`).join("")}</select></td><td><button class="btn g" data-reset="${t[0]}" style="padding:4px 10px;font-size:13px">Sıfırla</button></td></tr>`).join("")}</table></div>
  <p class="note">Təlimçinin adına klikləyərək onun kabinetini aça və redaktə edə bilərsiniz.</p></div>`;
}
function render(){
  $.innerHTML=(dbs==="off"?`<div class="warn">Ortaq bazaya qoşulmaq mümkün olmadı. Mesajlar, təlim qeydləri və status yalnız bu cihazda qalır, başqalar görmür.</div>`:"")+(me?(view==="room"?room():view==="chat"?chat():cab()):home())+(loginFor?`<div class="modal" id="md"><div class="mb" style="--tn:${tn(loginFor)}">${avc(loginFor)}<b>${esc(info(loginFor)[1])}</b><input id="pin" type="password" inputmode="numeric" placeholder="PIN kod" autofocus><div class="err" id="err"></div><button class="btn" id="go">Daxil ol</button> <button class="btn g" id="cl">Bağla</button></div></div>`:"")+(dlg?`<div class="modal"><div class="mb"><p>${esc(dlg.msg)}</p>${dlg.input?(dlg.input==="text"?`<input id="dv" type="text" placeholder="Brendin adı" value="${esc(dlg.val||"")}" style="letter-spacing:normal">`:`<input id="dv" type="password" inputmode="numeric" placeholder="Yeni PIN">`):""}<div style="margin-top:14px"><button class="btn" id="yes">${dlg.input?"Yadda saxla":"Bəli"}</button> <button class="btn g" id="no">${dlg.input?"Ləğv et":"Xeyr"}</button></div></div></div>`:"");
  if(loginFor){const p=document.getElementById("pin");p&&p.focus();}
  const th=document.getElementById("thread");if(th)th.scrollTop=th.scrollHeight;
  if(fa){const el=document.querySelector('[data-r="'+fa[0]+'"][data-c="'+fa[1]+'"]');fa=null;if(el){el.focus();if(el.tagName==="INPUT")el.select();}}
  applyLang();
}
$.addEventListener("click",async e=>{
  const g=k=>e.target.closest("["+k+"]");
  let el;
  if(e.target.id==="yes"){const f=dlg.fn,v=dlg.input?(document.getElementById("dv")||{}).value:undefined;dlg=null;render();f(v);}
  else if(e.target.id==="no"){dlg=null;render();}
  else if(el=g("data-room")){view="room";render();}
  else if(el=g("data-chat")){view="chat";markRd();render();}
  else if(el=g("data-peer")){peer=el.dataset.peer;refreshChat();const mi=document.getElementById("msg");mi&&mi.focus();}
  else if(e.target.id==="send"){sendMsg();}
  else if(e.target.id==="back"){view="cab";render();}
  else if(e.target.id==="madd"){const v=i=>document.getElementById(i).value.trim();const title=v("m_t"),link=v("m_l");
    if(!title){document.getElementById("m_t").focus();return;}
    const md=GD("m_d");if(!md){alert("Zəhmət olmasa düzgün tarix seçin.");return;}
    if(!link.toLowerCase().startsWith("https://")){alert("Zəhmət olmasa https:// ilə başlayan düzgün görüş linki daxil edin.");return;}
    const m={title,date:md,time:v("m_h"),plat:v("m_p"),link,host:me},mid=Date.now().toString(36);
    meets=[...meets,{id:mid,...m}];render();
    try{if(db)await db.doc("meetings/"+mid).set(m);}catch(err){alert("Yadda saxlanmadı: "+(err.message||err));}}
  else if(el=g("data-mdel")){const mid=el.dataset.mdel;ask("Bu dərs silinsin?",async()=>{meets=meets.filter(x=>x.id!==mid);render();try{if(db)await db.doc("meetings/"+mid).delete();}catch(err){}});}
  else if(el=g("data-login")){loginFor=el.dataset.login;render();}
  else if(e.target.id==="cl"||e.target.id==="md"){loginFor=null;render();}
  else if(e.target.id==="go"){const v=document.getElementById("pin").value;
    const goBtn=e.target,errEl=document.getElementById("err");
    if(!fbAuth){errEl.textContent="Verilənlər bazasına qoşulmaq mümkün olmadı";return;}
    goBtn.disabled=true;errEl.textContent="";
    fbAuth.signInWithEmailAndPassword(fbEmail(loginFor),fbPass(v)).then(()=>{
      me=loginFor;who=me;peer="all";ed=null;pv=null;pe=null;dr=null;dirty=false;vs=null;ve=null;bk=null;loadRd();startDb();setPres(Date.now());admin=me==="t1";sec="offline";panel=false;view="cab";loginFor=null;render();
    }).catch(err=>{goBtn.disabled=false;const el=document.getElementById("err");if(el)el.textContent=(err&&(err.code==="auth/invalid-credential"||err.code==="auth/wrong-password"||err.code==="auth/user-not-found"||err.code==="auth/invalid-login-credentials"))?"PIN yanlışdır":"Giriş alınmadı: "+((err&&err.code)||err);});}
  else if(e.target.id==="out"){endSession();}
  else if(e.target.id==="pnl"){panel=!panel;if(!panel)me=who;ed=null;pv=null;dr=null;dirty=false;render();}
  else if(el=g("data-open")){me=el.dataset.open;panel=false;ed=null;pv=null;pe=null;dr=null;dirty=false;sel=[];vs=null;ve=null;bk=null;dvView="home";dvForm=null;dvFile=null;if(dvPrev)dvclose();render();}
  else if(el=g("data-edit")){ed=el.dataset.edit;{const en=list(me,sec).find(x=>x.id===ed);sel=[...((en&&en.rays)||[])];}render();window.scrollTo({top:0,behavior:"smooth"});}
  else if(el=g("data-ist")){pv=el.dataset.ist;pe=null;dr=null;dirty=false;render();window.scrollTo({top:0,behavior:"smooth"});}
  else if(e.target.id==="iback"){const out=()=>{pv=null;pe=null;dr=null;dirty=false;render();};if(dirty)ask("Saxlanmamış dəyişikliklər var. Yadda saxlamadan çıxılsın?",out);else out();}
  else if(el=g("data-rdel")){dr.splice(+el.dataset.rdel,1);if(!dr.length)dr.push(nr());dirty=true;render();}
  else if(el=g("data-radd")){const n=+el.dataset.radd,f=dr.length;for(let k=0;k<n;k++)addRow(n===1);dirty=true;fa=[f,0];render();}
  else if(e.target.id==="isave"){saveIst();}
  else if(e.target.id==="padd"){const v=i=>document.getElementById(i).value.trim(),pad=v("p_ad");
    if(!pad){document.getElementById("p_ad").focus();return;}
    const p={id:pe||Date.now().toString(36),ad:pad,mag:v("p_mag"),reg:v("p_reg"),yer:v("p_yer"),gr:v("p_gr")},data={...(D(me).data||{})};
    data[sec]=list(me,sec).map(x=>x.id===pv?{...x,ist:pe?(x.ist||[]).map(y=>y.id===pe?p:y):[...(x.ist||[]),p]}:x);pe=null;save(me,data);}
  else if(el=g("data-pedit")){pe=el.dataset.pedit;render();}
  else if(e.target.id==="pcancel"){pe=null;render();}
  else if(el=g("data-pdel")){const pid=el.dataset.pdel,m2=me,s2=sec,v2=pv;ask("Bu iştirakçı silinsin?",()=>{const data={...(D(m2).data||{})};data[s2]=list(m2,s2).map(x=>x.id===v2?{...x,ist:(x.ist||[]).filter(y=>y.id!==pid)}:x);save(m2,data);});}
  else if(el=g("data-lang")){SET.lang=el.dataset.lang;saveSet();document.documentElement.lang=SET.lang==="ru"?"ru":"az";render();}
  else if(el=g("data-th")){SET.theme=el.dataset.th;saveSet();applyTheme();render();}
  else if(el=g("data-sw")){const k=el.dataset.sw;SET[k]=!SET[k];saveSet();render();if(k==="snd"&&SET.snd)chime("msg");}
  else if(el=g("data-snd")){chime(el.dataset.snd);}
  else if(el=g("data-perm")){askPerm();}
  else if(el=g("data-tot")){const id=el.dataset.tot,data={...(D(id).data||{})};data.status={...stt(id),tot:!stt(id).tot};save(id,data);}
  else if(el=g("data-dvcat")){dvView=el.dataset.dvcat;dvq="";dvs="new";render();}
  else if(el=g("data-dvback")){dvView="home";dvq="";render();}
  else if(el=g("data-dvf")){dvf=el.dataset.dvf;render();}
  else if(e.target.id==="dvall"){dvAll=true;dvrefresh();}
  else if(e.target.id==="dvnew"){dvForm={dept:dvView,t:"",d:""};dvFile=null;render();}
  else if(e.target.id==="dvcancel"||e.target.id==="dvov"){if(!dvBusy){dvForm=null;dvFile=null;render();}}
  else if(e.target.id==="dvsave"){dvupload();}
  else if(el=g("data-dvo")){dvopen(el.dataset.dvo);}
  else if(e.target.id==="dvx"||e.target.id==="dvmov"){dvclose();}
  else if(el=g("data-dvsh")){if(dvPrev){dvPrev.si=+el.dataset.dvsh;render();}}
  else if(el=g("data-dvdl")){dvdl(el.dataset.dvdl);}
  else if(el=g("data-dvdel")){const id=el.dataset.dvdel;ask("Bu dərs vəsaiti silinsin?",async()=>{const m=DVS.find(x=>x.id===id);DVS=DVS.filter(x=>x.id!==id);if(dvPrev&&dvPrev.id===id)dvPrev=null;render();try{if(db&&m){await db.doc("vesdocs/"+id).delete();for(let i=0;i<(m.n||1);i++)await db.doc("veschunks/"+id+"_"+i).delete();}}catch(err){toast("Silinmə zamanı xəta: "+((err&&err.message)||err));}});}
  else if(el=g("data-dvold")){const id=el.dataset.dvold,m2=me;ask("Bu qeyd silinsin?",()=>{const data={...(D(m2).data||{})};data.ves=list(m2,"ves").filter(x=>x.id!==id);save(m2,data);});}
  else if(el=g("data-kview")){kPrev={id:el.dataset.kview,si:0};render();}
  else if(e.target.id==="kx"||e.target.id==="kov"){kPrev=null;render();}
  else if(el=g("data-ksh")){if(kPrev){kPrev.si=+el.dataset.ksh;render();}}
  else if(el=g("data-kdl")){kdl(el.dataset.kdl);}
  else if(el=g("data-kdel")){const id=el.dataset.kdel;ask("Bu fayl silinsin?",async()=>{const f=KF.find(x=>x.id===id);KF=KF.filter(x=>x.id!==id);render();try{if(db&&f){await db.doc("katfiles/"+id).delete();for(let i=0;i<(f.n||1);i++)await db.doc("katchunks/"+id+"_"+i).delete();}}catch(err){toast("Silinmə zamanı xəta: "+(err.message||err));}});}
  else if(el=g("data-kold")){const id=el.dataset.kold,m2=me;ask("Bu qeyd silinsin?",()=>{const data={...(D(m2).data||{})};data.kat=list(m2,"kat").filter(x=>x.id!==id);save(m2,data);});}
  else if(el=g("data-vd")){vs={dept:el.dataset.vd,brand:el.dataset.vbr};ve=null;render();window.scrollTo({top:0,behavior:"smooth"});}
  else if(e.target.id==="vback"){vs=null;ve=null;render();}
  else if(e.target.id==="vcancel"){ve=null;render();}
  else if(e.target.id==="vadd"){const d1=GD("v_d"),c=document.getElementById("v_c").value.trim();
    if(!d1){toast("Təlim gününü düzgün seçin.");return;}
    if(c===""||+c<0){toast("İştirakçı sayını yazın.");return;}
    const rec={id:ve||Date.now().toString(36),dept:vs.dept,brand:vs.brand,d1,say:Math.round(+c),q:document.getElementById("v_q").value.trim()};
    const data={...(D(me).data||{})};data.vendor=ve?list(me,"vendor").map(x=>x.id===ve?rec:x):[...list(me,"vendor"),rec];ve=null;save(me,data);}
  else if(el=g("data-vedit")){ve=el.dataset.vedit;render();}
  else if(el=g("data-vdel")){const vid=el.dataset.vdel,m2=me;ask("Bu qeyd silinsin?",()=>{const data={...(D(m2).data||{})};data.vendor=list(m2,"vendor").filter(x=>x.id!==vid);save(m2,data);});}
  else if(el=g("data-vbe")){const dp=el.dataset.vbe,b=el.dataset.vbn,m2=me;ask("Brendin yeni adı:",nm=>renameBrand(m2,dp,b,nm),"text",b);}
  else if(el=g("data-vbd")){const dp=el.dataset.vbd,b=el.dataset.vbn,m2=me,n=list(me,"vendor").filter(e=>e.dept===dp&&e.brand===b).length;ask(n?"Bu brend və ona aid təlim qeydləri silinsin?":"Bu brend silinsin?",()=>deleteBrand(m2,dp,b));}
  else if(el=g("data-vnew")){const dp=el.dataset.vnew,m2=me;ask("Yeni brendin adı:",nm=>{nm=(nm||"").trim();if(!nm)return;const data={...(D(m2).data||{})},mm=vbmat(data);if(mm[dp].some(x=>x.toLowerCase()===nm.toLowerCase())){toast("Bu adlı brend artıq var.");return;}mm[dp]=[...mm[dp],nm];data.vbl=mm;save(m2,data);},"text");}
  else if(el=g("data-book")){bk=el.dataset.book;render();}
  else if(e.target.id==="bkno"){bk=null;render();}
  else if(e.target.id==="bkok"){doBook();}
  else if(el=g("data-bdel")){const bid=el.dataset.bdel;ask("Bu bron ləğv edilsin?",async()=>{BK=BK.filter(x=>x.id!==bid);render();try{if(db)await db.doc("bookings/"+bid).delete();}catch(err){}});}
  else if(el=g("data-mz")){setZoom(+el.dataset.mz);}
  else if(el=g("data-rg")){const nm=ITEMS[+el.dataset.rg][0];sel=sel.includes(nm)?sel.filter(x=>x!==nm):[...sel,nm];updMap();}
  else if(e.target.id==="cancel"){ed=null;sel=[];render();}
  else if(el=g("data-reset")){const rid=el.dataset.reset;ask(info(rid)[1]+" üçün PIN ilkin dəyərə qaytarılsın?",()=>save(rid,D(rid).data||{},info(rid)[3]));}
  else if(el=g("data-tab")){sec=el.dataset.tab;ed=null;pv=null;pe=null;dr=null;dirty=false;sel=[];vs=null;ve=null;bk=null;dvView="home";dvForm=null;dvFile=null;if(dvPrev)dvclose();render();}
  else if(e.target.id==="pinb"){ask("Yeni PIN kod (ən azı 4 rəqəm):",n=>{if(n&&/^\d{4,}$/.test(n)){if(!fbAuth||!fbAuth.currentUser){toast("Sessiya bitib, yenidən daxil olun.");return;}fbAuth.currentUser.updatePassword(fbPass(n)).then(()=>toast("PIN dəyişdirildi")).catch(err=>toast(err&&err.code==="auth/requires-recent-login"?"Təhlükəsizlik üçün çıxıb yenidən daxil olun, sonra PIN dəyişin.":"PIN dəyişdirilmədi: "+((err&&err.message)||err)));}else toast("PIN yalnız rəqəmlərdən ibarət olmalı və ən azı 4 simvol olmalıdır.");},true);}
  else if(e.target.id==="add"){const ad=document.getElementById("f_ad").value.trim();
    if(!ad){document.getElementById("f_ad").focus();return;}
    if(GD("f_d1")===null||GD("f_d2")===null){alert("Tarix düzgün deyil (məsələn, 31 Fevral mövcud deyil).");return;}
    const data={...(D(me).data||{})};
    const old=ed?list(me,sec).find(x=>x.id===ed):null,TRs=sec==="offline"||sec==="online";
    const rec={id:ed||Date.now().toString(36),ad,d1:GD("f_d1"),d2:GD("f_d2"),q:document.getElementById("f_q").value.trim(),...(TRs?{ist:(old&&old.ist)||[]}:{}),...(sec==="ezam"?{rays:[...sel]}:{})};
    data[sec]=ed?list(me,sec).map(x=>x.id===ed?rec:x):[...list(me,sec),rec];ed=null;sel=[];
    save(me,data);}
  else if(el=g("data-del")){const did=el.dataset.del,m2=me,s2=sec;ask("Bu qeyd silinsin?",()=>{const data={...(D(m2).data||{})};data[s2]=list(m2,s2).filter(x=>x.id!==did);save(m2,data);});}
});
const markDirty=()=>{dirty=true;const d=document.getElementById("dirty");if(d)d.style.display="inline";};
$.addEventListener("input",e=>{const t=e.target;if(dr&&t.tagName==="INPUT"&&t.dataset&&t.dataset.r!==undefined){dr[+t.dataset.r][KEYS[+t.dataset.c]]=t.value;markDirty();}});
$.addEventListener("change",e=>{const t=e.target;if(t.closest&&t.closest("#b_dt")){const v=GD("b_dt");if(v){bd=v;updRooms();}return;}if(dr&&t.tagName==="SELECT"&&t.dataset&&t.dataset.r!==undefined){const r=+t.dataset.r,c=+t.dataset.c;dr[r][KEYS[c]]=t.value;markDirty();if(c===4){t.className="gs "+gcls(t.value);{const nc=t.closest("tr").children[1];nc.classList.toggle("nok",+t.value>=4);nc.classList.toggle("nbad",+t.value>=1&&+t.value<4);}}}});
$.addEventListener("paste",e=>{const t=e.target;if(!(dr&&t.dataset&&t.dataset.r!==undefined))return;const tx=(e.clipboardData||window.clipboardData).getData("text");if(!/[\t\n]/.test(tx))return;e.preventDefault();
 const rows=tx.split(/\r?\n/).filter(x=>x.trim()).map(x=>x.split("\t")),r0=+t.dataset.r,c0=+t.dataset.c;
 rows.forEach((cells,i)=>{while(dr.length<=r0+i)dr.push(nr());cells.forEach((v,j)=>{const k=KEYS[c0+j];if(!k)return;v=v.trim();const row=dr[r0+i];if(k==="reg")row.reg=/rayon/i.test(v)?"Rayon":"Bakı filialı";else if(k==="gr")row.gr=["1","2","3","4","5"].includes(v)?v:"";else row[k]=v;});});
 if((dr[dr.length-1].ad||"").trim())dr.push(nr());dirty=true;fa=[r0,c0];render();});
$.addEventListener("change",e=>{const t=e.target;if(t.dataset&&t.dataset.star!==undefined){const id=t.dataset.star,data={...(D(id).data||{})};data.status={...stt(id),stars:+t.value};save(id,data);}});
$.addEventListener("input",e=>{if(e.target.id==="vol"){SET.vol=+e.target.value;saveSet();const v=document.getElementById("volv");if(v)v.textContent=SET.vol+"%";}});
$.addEventListener("change",e=>{if(e.target.id==="vol")chime("msg");});
$.addEventListener("change",e=>{const t=e.target;if(t.dataset&&t.dataset.kf){const f=t.files&&t.files[0];t.value="";kupload(t.dataset.kf,f);}});
$.addEventListener("input",e=>{const t=e.target;if(t.id==="dvq"){dvq=t.value;dvAll=false;dvrefresh();}else if(t.id==="dv_t"&&dvForm)dvForm.t=t.value;else if(t.id==="dv_d"&&dvForm)dvForm.d=t.value;});
$.addEventListener("change",e=>{const t=e.target;if(t.id==="dvs"){dvs=t.value;dvrefresh();}else if(t.id==="dv_f"){dvFile=(t.files&&t.files[0])||null;const sp=document.getElementById("dv_fn");if(sp)sp.textContent=dvFile?dvFile.name+" · "+dvsize(dvFile.size):"Fayl seçin (PDF, Word, Excel, PowerPoint)";}});
$.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.id==="pin")document.getElementById("go").click();if(e.key==="Enter"&&e.target.id==="msg")sendMsg();
  const t=e.target;if(e.key==="Enter"&&dr&&t.tagName==="INPUT"&&t.dataset&&t.dataset.r!==undefined){e.preventDefault();const r=+t.dataset.r,c=+t.dataset.c;if(r>=dr.length-1)addRow(true);fa=[r+1,c];dirty=true;render();}});
render();
/* ===== Firebase data layer ===== */
let unsubs=[];
dbs=fbDb?"ok":"off";
function startDb(){
  if(!fbDb||db)return;
  db=fbDb;dbs="ok";
  const on=(col,fn)=>unsubs.push(db.collection(col).onSnapshot(fn,err=>console.warn("Firestore "+col+":",err&&err.code)));
  on("bookings",s=>{BK=s.docs.map(d=>({id:d.id,...d.data()}));onBks();if(me)upd();});
  on("messages",s=>{MS=s.docs.map(d=>({id:d.id,...d.data()}));onMsgs();if(me)upd();});
  on("presence",s=>{s.docs.forEach(d=>{if(d.id!==who||!P[who])P[d.id]=(d.data()||{}).ts||0;});pres();});
  on("meetings",s=>{meets=s.docs.map(d=>({id:d.id,...d.data()}));if(view==="room"&&!["INPUT","TEXTAREA","SELECT"].includes((document.activeElement||{}).tagName))render();});
  on("vesdocs",s=>{DVS=s.docs.map(d=>({id:d.id,...d.data()}));if(me&&view==="cab"&&sec==="ves"&&!dvBusy)upd();});
  on("katfiles",s=>{KF=s.docs.map(d=>({id:d.id,...d.data()}));if(me&&view==="cab"&&sec==="kat")upd();});
  on("trainers",s=>{
    s.docs.forEach(d=>{docs[d.id]=d.data()||{data:{}};});
    if(!document.activeElement||!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) render();
  });
}
function stopDb(){unsubs.forEach(f=>{try{f()}catch(e){}});unsubs=[];db=null;BK=[];MS=[];meets=[];DVS=[];KF=[];docs={};}
function endSession(){
  const done=()=>{stopDb();if(fbAuth)fbAuth.signOut().catch(()=>{});who=null;me=null;admin=false;view="cab";panel=false;render();};
  if(who&&db){db.doc("presence/"+who).set({ts:0}).catch(()=>{}).then(done);}else done();
}
setInterval(()=>{if(who)setPres(Date.now());pres();},30000);
document.addEventListener("visibilitychange",()=>{if(who&&!document.hidden)setPres(Date.now());});
addEventListener("beforeunload",()=>{if(who)setPres(0);});