// Trainer roster: [id, name, role]. Passwords live in Firebase Auth (see scripts/seed-firebase.ps1).
const T=[
  ["t1","Murad Əhmədəliyev","Admin"],
  ["t2","Kamal Məmmədov","Baş təlimçi"],
  ["t4","Xəyyam Adilov","Baş təlimçi"],
  ["t3","Zakir Əsədov","Təlimçi"],
  ["t5","Eldar Mustafayev","Təlimçi"],
  ["t6","İlkin Xəlilov","Təlimçi"],
  ["t7","Aynur Vəliyeva","Təlimçi"],
  ["t8","Kamran Əhmədzadə","Təlimçi"],
  ["t9","Elmir Vəliyev","Təlimçi"],
  ["t10","Aysel Məmmədova","Təlimçi"],
  ["t11","Emil Abbaszadə","Təlimçi"]
];

// Avatar presets (fallback SVG avatars)
const AC={t1:{b:["#fef3c7","#fbbf24"],skin:"#f5c9a0",hair:"#2b2118",suit:"#1f2a55",tie:"#f59e0b",hs:"short",ex:["glasses","badge"]},t2:{b:["#c4b5fd","#7c3aed"],skin:"#e8b48a",hair:"#1d1a1a",suit:"#374151",tie:"#a78bfa",hs:"swept",ex:["beard"]},t3:{b:["#99f6e4","#0d9488"],skin:"#f1c39b",hair:"#4a2f1b",suit:"#0f3d3a",tie:"#fbbf24",hs:"short",ex:["mustache"]},t4:{b:["#fecdd3","#e11d48"],skin:"#d9a07a",hair:"#1a1414",suit:"#4c1d2f",tie:"#ffffff",hs:"curly",ex:["headset"]},t5:{b:["#bbf7d0","#16a34a"],skin:"#efbf94",hair:"#5a4630",suit:"#14532d",tie:"#fde68a",hs:"bald",ex:["stubble"]},t6:{b:["#fde68a","#f59e0b"],skin:"#f1c39b",hair:"#2b2118",suit:"#1e3a5f",tie:"#e11d48",hs:"short",ex:[]},t7:{b:["#fbcfe8","#db2777"],skin:"#f5d0b0",hair:"#3b2314",suit:"#7c2d5b",tie:"#ffffff",hs:"long",ex:[]},t8:{b:["#a7f3d0","#059669"],skin:"#e8b48a",hair:"#1d1a1a",suit:"#064e3b",tie:"#fbbf24",hs:"swept",ex:["glasses"]},t9:{b:["#bfdbfe","#2563eb"],skin:"#d9a07a",hair:"#1a1414",suit:"#1e293b",tie:"#60a5fa",hs:"short",ex:["mustache"]},t10:{b:["#ddd6fe","#7c3aed"],skin:"#f1c39b",hair:"#5a3825",suit:"#4c1d95",tie:"#fef08a",hs:"long",ex:[]},t11:{b:["#fed7aa","#ea580c"],skin:"#efbf94",hair:"#3a2a1a",suit:"#7c2d12",tie:"#fde68a",hs:"curly",ex:["stubble"]}};

// Photo avatars
const PH={t11:"assets/images/trainers/t11.jpg",t8:"assets/images/trainers/t8.jpg",t6:"assets/images/trainers/t6.jpg",t10:"assets/images/trainers/t10.jpg",t7:"assets/images/trainers/t7.jpg",t9:"assets/images/trainers/t9.jpg",t5:"assets/images/trainers/t5.jpg",t2:"assets/images/trainers/t2.jpg",t4:"assets/images/trainers/t4.jpg",t1:"assets/images/trainers/t1.jpg",t3:"assets/images/trainers/t3.jpg"};

// Shared Google Drive folder (from .env)
const DRIVE=(window.APP_CONFIG&&window.APP_CONFIG.DRIVE_URL)||"";
