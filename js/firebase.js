/* Firebase bootstrap (compat SDK loaded from CDN in index.html) */
const FB_DOMAIN="trainers.app";
const fbEmail=id=>id+"@"+FB_DOMAIN;
const fbPass=pin=>"tp-"+pin;           // Firebase needs >= 6 chars
let fbAuth=null,fbDb=null;
try{
  firebase.initializeApp(window.APP_CONFIG.FIREBASE);
  fbAuth=firebase.auth();
  fbDb=firebase.firestore();
  fbAuth.signOut().catch(()=>{});       // always start logged out (PIN screen is the entry point)
}catch(e){console.error("Firebase init failed",e);}

// Replacement for claude.use("downloads")
function saveFile(name,bytes){
  const a=document.createElement("a"),u=URL.createObjectURL(new Blob([bytes]));
  a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(u),4000);
}