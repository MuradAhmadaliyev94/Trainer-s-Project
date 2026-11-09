/* Page templates that do not depend on the rest of the app at load time:
   - loginHome(): the single entry page (username + password) for every role
   - studentView(): student portal
   Loaded BEFORE app.js; helpers (esc, avc, fx, dvdate, dvsize, SET, FLAZ ...) are resolved at render time. */

let lgU="",sQ="";

const EYE=`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>`;
const CAP=`<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11.5v4.5c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5"/><path d="M22 9v6"/></svg>`;

function loginHome(){
  return `<main class="lg">
  <div class="lg-bg" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="lg-lang"><button class="fl${SET.lang==="az"?" on":""}" data-lang="az" title="Azərbaycan dili" type="button">${FLAZ}</button><button class="fl${SET.lang==="ru"?" on":""}" data-lang="ru" title="Русский" type="button">${FLRU}</button></div>
  <section class="lg-card">
    <div class="lg-logo">${CAP}</div>
    <h1 class="lg-h">Təlimçi Kabineti</h1>
    <p class="lg-sub">Hesabınıza daxil olun</p>
    <form id="lgform" novalidate>
      <label for="lg_u">İstifadəçi adı</label>
      <input id="lg_u" name="username" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" inputmode="text" enterkeyhint="next" value="${esc(lgU)}">
      <label for="lg_p">Parol</label>
      <div class="lg-pw"><input id="lg_p" name="password" type="password" autocomplete="current-password" enterkeyhint="go"><button type="button" class="lg-eye" data-eye aria-label="Parolu göstər">${EYE}</button></div>
      <div class="err" id="lgerr" role="alert"></div>
      <button class="btn lg-go" id="lg_go" type="submit">Daxil ol</button>
    </form>
    <p class="lg-note">Giriş məlumatlarını administrator verir. Parolu unutmusunuzsa, administratora müraciət edin.</p>
  </section>
  </main>`;
}

function studentView(){
  const p=PROFILES[me]||{name:me},first=(p.name||me).split(" ")[0],q=sQ.trim().toLocaleLowerCase("az");
  const all=DVS.slice().sort((a,b)=>(b.ts||0)-(a.ts||0));
  const list=q?all.filter(m=>((m.title||"")+" "+(m.desc||"")).toLocaleLowerCase("az").includes(q)):all;
  return `<div class="sp">
  <header class="sp-bar"><div class="sp-who">${avc(me,"width:42px;height:42px;margin:0;flex:none")}<span><b>${esc(p.name||me)}</b><small>Tələbə</small></span></div>
   <div class="sp-act"><button class="btn g" id="pinb">Parolu dəyiş</button><button class="btn g" id="out">Çıxış</button></div></header>
  <main class="sp-main">
   <section class="sp-hero"><h2>Salam, ${esc(first)} 👋</h2><p>Dərs vəsaitləriniz burada toplanıb. Lazım olanı aça və ya yükləyə bilərsiniz.</p></section>
   <div class="sp-search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="sq" type="search" placeholder="Vəsaitlər arasında axtar" value="${esc(sQ)}"></div>
   <div class="sp-count">${list.length} vəsait</div>
   <div class="sp-grid">${list.length?list.map(m=>`<article class="sp-card">
      <div class="sp-top">${fx(m.ext)}<div class="sp-t"><b>${esc(m.title)}</b><small>${dvdate(m.ts)} · ${dvsize(m.size||0)}</small></div></div>
      ${m.desc?`<p>${esc(m.desc)}</p>`:""}
      <button class="btn" data-dvdl="${esc(m.id)}">Yüklə</button></article>`).join(""):`<div class="empty sp-empty">${all.length?"Axtarışa uyğun vəsait tapılmadı.":"Hələ dərs vəsaiti əlavə edilməyib."}</div>`}</div>
  </main></div>`;
}
