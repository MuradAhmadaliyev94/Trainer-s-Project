/* User management (admin dashboard), student login and student portal.
   Loaded after app.js; uses its globals: $, render, toast, esc, ask, avc, fd, db, role, admin, PROFILES, STU ... */

const ROLE_ORDER=["superadmin","admin","instructor","student"];
let uTab="all",uQ="",uF=null,uPin=null,uBusy=false,sLoginOpen=false;

const isSuper=()=>role==="superadmin";
/* Which roles may the current user create / assign? */
const assignable=()=>isSuper()?["admin","instructor","student"]:["instructor","student"];
/* May the current user modify this profile? */
const canManage=p=>{
  if(!p||p.id===me)return false;                        // never edit yourself here (use "PIN dəyiş")
  if(isSuper())return true;
  return role==="admin"&&(p.role==="instructor"||p.role==="student");
};
const uOk=v=>/^[a-z][a-z0-9_-]{2,19}$/.test(v);

/* ---------- Admin dashboard ---------- */
function usersView(){
  const all=Object.values(PROFILES).sort((a,b)=>ROLE_ORDER.indexOf(a.role)-ROLE_ORDER.indexOf(b.role)||((a.ord??1e9)-(b.ord??1e9))||(a.name||"").localeCompare(b.name||"","az"));
  const cnt=r=>all.filter(p=>r==="all"||p.role===r).length;
  const q=uQ.trim().toLocaleLowerCase("az");
  const rows=all.filter(p=>(uTab==="all"||p.role===uTab)&&(!q||(p.name||"").toLocaleLowerCase("az").includes(q)||p.id.includes(q)));
  const chip=(k,l)=>`<button class="tab${uTab===k?" on":""}" data-utab="${k}">${l}<i>${cnt(k)}</i></button>`;
  return `<div class="wrap"><div class="dvw">
  <div class="top"><div><h2 style="margin:0">İstifadəçilər</h2><small style="color:var(--mu)">${esc((PROFILES[me]||{}).name||"")} · ${ROLE_LABEL[role]}</small></div>
   <div class="dvbtns"><button class="btn g" data-uback>← Kabinetə qayıt</button><button class="btn" data-unew>+ Yeni istifadəçi</button></div></div>
  <div class="tabs">${chip("all","Hamısı")}${chip("superadmin","Super Admin")}${chip("admin","Admin")}${chip("instructor","Təlimçi")}${chip("student","Tələbə")}</div>
  <div class="dvc"><div class="dvsr"><svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="uq" placeholder="Ad və ya istifadəçi adı ilə axtar" value="${esc(uQ)}"></div></div>
  <div class="panel">${Object.keys(PROFILES).length?(rows.length?rows.map(uRow).join(""):`<div class="empty">Heç nə tapılmadı.</div>`):`<div class="empty">İstifadəçi bazası hələ yaradılmayıb. Super Admin kimi (Murad) daxil olduqda avtomatik yaradılır.</div>`}</div>
  </div></div>`;
}
function uRow(p){
  const m=canManage(p),off=p.active===false;
  return `<div class="row" style="${off?"opacity:.55":""}">${avc(p.id,"width:46px;height:46px;margin:0;flex:none")}
   <div><b>${esc(p.name||p.id)}</b> <span class="badge">${ROLE_LABEL[p.role]||esc(p.role)}</span>${off?` <span class="badge" style="background:rgba(255,59,48,.15);color:#ff3b30">Deaktiv</span>`:""}<br><small>@${esc(p.id)}${p.title&&p.title!==ROLE_LABEL[p.role]?" · "+esc(p.title):""}</small></div>
   ${m?`<div class="dvbtns" style="flex:none;flex-wrap:wrap;justify-content:flex-end"><button class="btn g" data-uedit="${esc(p.id)}">Redaktə</button><button class="btn g" data-ureset="${esc(p.id)}">PIN sıfırla</button><button class="btn g" data-utog="${esc(p.id)}">${off?"Aktiv et":"Deaktiv et"}</button>${isSuper()?`<button class="x" data-udel="${esc(p.id)}" title="Sil">✕</button>`:""}</div>`:`<small style="color:var(--mu)">${p.id===me?"Siz":"—"}</small>`}</div>`;
}

/* ---------- Modals (new/edit user, PIN reveal, student login) ---------- */
function extraModals(){
  let h="";
  if(me&&role!=="student"&&uF){
    const f=uF,isNew=f.mode==="new",ro=assignable();
    h+=`<div class="modal" id="umd"><div class="mb dvmb"><h3 style="margin-top:0">${isNew?"Yeni istifadəçi":"İstifadəçini redaktə et"}</h3>
      <label>Ad və soyad</label><input id="uf_name" value="${esc(f.name)}" placeholder="Ad Soyad">
      ${isNew?`<label>İstifadəçi adı (giriş üçün, kiçik hərf/rəqəm)</label><input id="uf_id" value="${esc(f.id)}" placeholder="məs: ali_aliyev" autocapitalize="none">`:`<label>İstifadəçi adı</label><input value="${esc(f.id)}" disabled>`}
      <label>Rol</label><select id="uf_role">${ro.map(r=>`<option value="${r}"${f.role===r?" selected":""}>${ROLE_LABEL[r]}</option>`).join("")}</select>
      <label>Vəzifə / başlıq (istəyə bağlı)</label><input id="uf_title" value="${esc(f.title)}" placeholder="məs: Baş təlimçi">
      ${isNew?`<label>PIN (ən azı 4 rəqəm)</label><div class="dvbtns"><input id="uf_pin" inputmode="numeric" value="${esc(f.pin)}" style="letter-spacing:2px"><button class="btn g" data-ugen type="button">Yarat</button></div>`:""}
      <div class="err" id="uerr">${esc(f.err||"")}</div>
      <div class="dvbtns" style="margin-top:8px"><button class="btn" data-usave${uBusy?" disabled":""}>${uBusy?"Gözləyin…":"Yadda saxla"}</button><button class="btn g" data-ucancel>Ləğv et</button></div></div></div>`;
  }
  if(me&&uPin){
    h+=`<div class="modal" id="upm"><div class="mb"><h3 style="margin-top:0">${esc(uPin.kind)}</h3>
      <p>${esc(uPin.name)} (@${esc(uPin.id)})</p>
      <div style="font-size:34px;font-weight:800;letter-spacing:6px;margin:10px 0">${esc(uPin.pin)}</div>
      <small style="color:var(--mu)">Bu PIN yalnız İNDİ göstərilir. İstifadəçiyə verin və ona girişdən sonra "PIN dəyiş" düyməsini istifadə etməyi deyin.</small>
      <div class="dvbtns" style="margin-top:14px;justify-content:center"><button class="btn g" data-ucopy>Kopyala</button><button class="btn" data-upclose>Bağla</button></div></div></div>`;
  }
  if(!me&&sLoginOpen){
    h+=`<div class="modal" id="slm"><div class="mb"><h3 style="margin-top:0">Tələbə girişi</h3>
      <input id="su" placeholder="İstifadəçi adı" autocapitalize="none" autocomplete="username" style="letter-spacing:normal;text-align:left">
      <input id="spin" type="password" inputmode="numeric" placeholder="PIN kod" style="margin-top:0">
      <div class="err" id="serr"></div><button class="btn" data-sgo>Daxil ol</button> <button class="btn g" data-sclose>Bağla</button></div></div>`;
  }
  return h;
}

/* ---------- Student portal ---------- */
function studentView(){
  const p=PROFILES[me]||{name:me},list=DVS.slice().sort((a,b)=>(b.ts||0)-(a.ts||0));
  return `<div class="wrap"><div class="dvw">
   <div class="top"><div class="ph" style="--tn:#0a84ff;display:flex;align-items:center;gap:10px">${avc(me,"width:46px;height:46px;margin:0;flex:none")}<span><b>${esc(p.name||me)}</b><br><small style="color:var(--mu)">Tələbə · @${esc(me)}</small></span></div>
    <div class="dvbtns"><button class="btn g" id="pinb">PIN dəyiş</button><button class="btn g" id="out">Çıxış</button></div></div>
   <div class="panel"><h3 style="margin-top:0;display:flex;align-items:center">${ic("ves")}Dərs vəsaitləri</h3>
   ${list.length?list.map(m=>`<div class="dvr"><div class="dvl">${typeof fx==="function"?fx(m.ext):""}</div><div class="dvm"><div class="dvt">${esc(m.title)}</div>${m.desc?`<div class="dvd">${esc(m.desc)}</div>`:""}<div class="dvx"><span>${typeof dvdate==="function"?dvdate(m.ts):""}</span><span>${typeof dvsize==="function"?dvsize(m.size||0):""}</span></div></div><div class="dva"><button class="btn g" data-dvdl="${esc(m.id)}">Yüklə</button></div></div>`).join(""):`<div class="empty">Hələ dərs vəsaiti əlavə edilməyib.</div>`}
   </div></div></div>`;
}

/* ---------- Actions ---------- */
const uSay=m=>{if(uF)uF.err=m;const el=document.getElementById("uerr");if(el)el.textContent=m;};
const uRead=()=>{if(!uF)return;const g=i=>{const e=document.getElementById(i);return e?e.value:undefined;};
  const n=g("uf_name"),i=g("uf_id"),r=g("uf_role"),t=g("uf_title"),p=g("uf_pin");
  if(n!==undefined)uF.name=n;if(i!==undefined)uF.id=i.trim().toLowerCase();if(r!==undefined)uF.role=r;if(t!==undefined)uF.title=t;if(p!==undefined)uF.pin=p.trim();};

async function uSave(){
  uRead();const f=uF;if(!f||uBusy)return;
  if(!f.name.trim())return uSay("Ad daxil edin");
  if(!assignable().includes(f.role))return uSay("Bu rolu təyin etmək icazəniz yoxdur");
  const data={name:f.name.trim(),role:f.role,title:f.title.trim()};
  uBusy=true;render();
  try{
    if(f.mode==="new"){
      if(!uOk(f.id)){uBusy=false;render();return uSay("İstifadəçi adı: 3–20 simvol, kiçik latın hərfi ilə başlamalı, yalnız a-z 0-9 _ -");}
      if(PROFILES[f.id]){uBusy=false;render();return uSay("Bu istifadəçi adı artıq mövcuddur");}
      if(!/^\d{4,}$/.test(f.pin)){uBusy=false;render();return uSay("PIN ən azı 4 rəqəm olmalıdır");}
      let ver;
      try{ver=await fbCreateAccount(f.id,f.pin);}
      catch(e){uBusy=false;render();return uSay(e&&e.code==="auth/email-already-in-use"?"Bu istifadəçi adı artıq mövcuddur":"Hesab yaradılmadı: "+((e&&e.code)||e));}
      await db.doc("profiles/"+f.id).set({...data,active:true,ver,createdAt:Date.now()});
      uPin={kind:"İstifadəçi yaradıldı",id:f.id,name:data.name,pin:f.pin};
    }else{
      await db.doc("profiles/"+f.id).update(data);
      toast("Yadda saxlanıldı");
    }
    uF=null;
  }catch(e){uBusy=false;render();return uSay("Xəta: "+((e&&e.code)||e));}
  uBusy=false;render();
}

async function uReset(id){
  const p=PROFILES[id];if(!canManage(p))return;
  const pin=randPin();
  try{
    const ver=await fbCreateAccount(id,pin);
    await db.doc("profiles/"+id).update({ver});
    uPin={kind:"Yeni PIN",id,name:p.name,pin};render();
  }catch(e){toast("PIN sıfırlanmadı: "+((e&&e.code)||e));}
}

$.addEventListener("click",e=>{
  const g=k=>e.target.closest("["+k+"]");let el;
  if(g("data-users")){view="users";uTab="all";uQ="";render();}
  else if(g("data-uback")){view="cab";render();}
  else if(g("data-unew")){uF={mode:"new",id:"",name:"",title:"",role:assignable().includes("instructor")?"instructor":assignable()[0],pin:randPin(),err:""};render();}
  else if(el=g("data-uedit")){const p=PROFILES[el.dataset.uedit];if(canManage(p)){uF={mode:"edit",id:p.id,name:p.name||"",title:p.title||"",role:p.role,err:""};render();}}
  else if(el=g("data-utab")){uTab=el.dataset.utab;render();}
  else if(g("data-ugen")){uRead();uF.pin=randPin();render();}
  else if(g("data-usave")){uSave();}
  else if(g("data-ucancel")||e.target.id==="umd"){uF=null;render();}
  else if(el=g("data-ureset")){const p=PROFILES[el.dataset.ureset];if(canManage(p))ask(`${p.name} üçün yeni PIN yaradılsın? Köhnə PIN işləməyəcək.`,()=>uReset(p.id));}
  else if(el=g("data-utog")){const p=PROFILES[el.dataset.utog];if(canManage(p))db.doc("profiles/"+p.id).update({active:p.active===false}).then(()=>toast(p.active===false?"Aktiv edildi":"Deaktiv edildi")).catch(err=>toast("Xəta: "+((err&&err.code)||err)));}
  else if(el=g("data-udel")){const p=PROFILES[el.dataset.udel];if(isSuper()&&canManage(p))ask(`${p.name} silinsin? Bu istifadəçinin kabinet məlumatları da silinəcək.`,async()=>{try{await db.doc("profiles/"+p.id).delete();await db.doc("trainers/"+p.id).delete().catch(()=>{});toast("Silindi");}catch(err){toast("Silinmədi: "+((err&&err.code)||err));}});}
  else if(g("data-ucopy")){if(uPin&&navigator.clipboard)navigator.clipboard.writeText(uPin.pin).then(()=>toast("Kopyalandı"),()=>{});}
  else if(g("data-upclose")||e.target.id==="upm"){uPin=null;render();}
  else if(g("data-slogin")){sLoginOpen=true;render();const u=document.getElementById("su");if(u)u.focus();}
  else if(g("data-sclose")||e.target.id==="slm"){sLoginOpen=false;render();}
  else if(g("data-sgo")){const u=(document.getElementById("su").value||"").trim().toLowerCase(),pn=document.getElementById("spin").value;loginWith(u,pn,g("data-sgo"),"serr");}
});
$.addEventListener("input",e=>{
  if(e.target.id==="uq"){uQ=e.target.value;const pos=e.target.selectionStart;render();const i=document.getElementById("uq");if(i){i.focus();try{i.setSelectionRange(pos,pos);}catch(x){}}}
});
$.addEventListener("keydown",e=>{
  if(e.key!=="Enter")return;
  if(e.target.id==="su"||e.target.id==="spin"){const b=document.querySelector("[data-sgo]");if(b)b.click();}
  else if(e.target.id&&e.target.id.startsWith("uf_")){uSave();}
});
