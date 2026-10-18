"use strict";
const $=s=>document.querySelector(s),mk=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const THEMES=[["Crimson","#ff2020"],["Ember","#ff6a1f"],["Rose","#ff3d7f"],["Amber","#ffb020"],["Ice","#3db8ff"]];
const ACC=["8 Bit Royal Crown","Fiery Horns of the Netherworld","Frozen Horns of the Frigid Planes","Poisoned Horns of the Toxic Wasteland","8 Bit Tabby Cat","8 Bit HP Bar","Winter Fairy","Silver King of the Night","Lord of the Federation","Heart Shades Bobux Cloud","Hovering UFO","Arcane Fedora","8-Bit Fedora"];
// [judul, subjudul, baris[ [nama, deskripsi, tipe, nilai] ]] tipe: t=switch, v=nilai, c=warna
const TABS=[
["Overview","Dashboard",[["Versi","Application version","v","v1.2.0"],["Status","Script aktif di Evade","v","Online"]]],
["Karakter","Korblox & Headless",[["Korblox","Otomatis R6 dan R15","t",1],["Headless","Hilangkan kepala dan wajah","t",0],["Reset Karakter","Matikan Korblox & Headless","v","Reset"]]],
["Aksesoris","Aksesoris & Ukuran",[["8 Bit Royal Crown","Mahkota pixel + efek kilau","t",1],["Hovering UFO","UFO melayang","t",0],["Winter Fairy","Peri musim dingin","t",0],["Hapus Custom","Hapus semua aksesoris Custom ID","v","Hapus"]]],
["Teman","Target",[["Target","Pilih pemain lain","v","Pilih"],["Korblox Teman","Terlihat di layarmu","t",0],["Reset Teman","Normalkan karakter teman","v","Reset"]]],
["Copy Ava","Copy Avatar",[["Salin Avatar","Visual lokal, hanya di layarmu","v","Salin"],["Reset Visual","Kembalikan avatar asli","v","Reset"]]],
["Katalog","Katalog Visual",[["Katalog Visual","Telusuri item katalog","v","Buka"]]],
["Scripts","Loader",[["Loader","Jalankan script lewat link raw","v","Jalankan"]]],
["Changer","Emote & Unusual",[["Emote Changer","Nyala = terapkan, mati = kembalikan","t",1],["Terapkan Ulang","Setelah ubah isi slot","v","Terapkan"]]],
["Settings","Preferences",[["Warna Aksen","Pilih warna tema","c"],["Efek Aksesori","Partikel & cahaya horns/crown","t",1],["Jaga Terus","Pasang ulang tiap frame","t",1],["Parent ke Kamera","Kalau item dihapus oleh map","t",0]]]];
let cur=0,theme=0;
function setTheme(i){theme=i;document.documentElement.style.setProperty("--a",THEMES[i][1]);document.querySelectorAll(".cols").forEach(c=>[...c.children].forEach((b,n)=>b.classList.toggle("on",n===i)));try{localStorage.setItem("dzt",i)}catch{}}
function pick(i){cur=i;[...$("#tabs").children].forEach((b,n)=>b.classList.toggle("on",n===i));const T=TABS[i];$("#pt").textContent=T[0];$("#ps").textContent=T[1];
 const r=$("#rows");r.replaceChildren();r.style.animation="none";void r.offsetWidth;r.style.animation="";
 T[2].forEach(([n,d,t,v])=>{const row=mk("label","row"),tx=mk("span",null,n);tx.append(mk("small",null,d));row.append(tx);
  if(t==="t"){const i=mk("input");i.type="checkbox";i.checked=!!v;row.append(i,mk("i","sw"))}
  else if(t==="v"){row.classList.add("nc");row.append(mk("span","val",v))}
  else{row.classList.add("nc");const c=mk("div","cols");THEMES.forEach((h,k)=>{const b=mk("button");b.type="button";b.title=h[0];b.setAttribute("aria-label",h[0]);b.style.background=h[1];b.onclick=()=>setTheme(k);c.append(b)});row.append(c)}
  r.append(row)});setTheme(theme)}
TABS.forEach((t,i)=>{const b=mk("button",null,t[0]);b.type="button";b.onclick=()=>pick(i);$("#tabs").append(b)});
try{const s=+localStorage.getItem("dzt");if(s>=0&&s<5)theme=s}catch{}
pick(8);
const mq=$("#mq");[...ACC,...ACC].forEach(n=>mq.append(mk("span",null,n)));
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(pointer:fine)").matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach((e,i)=>{e.style.transitionDelay=Math.min(i%4,3)*.08+"s";io.observe(e)});
document.querySelectorAll("[data-n]").forEach(e=>{const n=+e.dataset.n;if(rm)return e.textContent=n;let k=0;const t=setInterval(()=>{e.textContent=++k;if(k>=n)clearInterval(t)},1400/n)});
if(fine&&!rm){const g=$("#cur");addEventListener("pointermove",e=>{g.style.opacity=1;g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
 const m=$("[data-tilt]");m.addEventListener("pointermove",e=>{const r=m.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;m.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg)`});
 m.addEventListener("pointerleave",()=>m.style.transform="")}
