/* Firebase bootstrap (compat SDK loaded from CDN in index.html) */
const FB_DOMAIN="trainers.app";
// ver = random token set when a PIN is reset by an admin (see docs/ROLES.md). Legacy accounts have none.
const fbEmail=(id,ver)=>ver?id+"."+ver+"@"+FB_DOMAIN:id+"@"+FB_DOMAIN;
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
// Creates a Firebase Auth account WITHOUT logging the current admin out (uses a second app instance).
// Returns the random token ("ver") that must be stored in profiles/{id}.ver.
async function fbCreateAccount(id,pin){
  const b=new Uint8Array(8);crypto.getRandomValues(b);
  const ver="v"+Array.from(b,x=>(x%36).toString(36)).join("");
  const app2=firebase.apps.find(a=>a.name==="sec")||firebase.initializeApp(window.APP_CONFIG.FIREBASE,"sec");
  const a2=app2.auth();
  await a2.createUserWithEmailAndPassword(fbEmail(id,ver),fbPass(pin));
  await a2.signOut();
  return ver;
}
const randPin=()=>{const b=new Uint32Array(1);crypto.getRandomValues(b);return String(100000+b[0]%900000);};