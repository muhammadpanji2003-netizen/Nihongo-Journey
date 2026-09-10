
import { kana, vocab, kanji, grammar, readings } from "./content.js";

const $ = s => document.querySelector(s);
const app = $("#app");
const KEY = "japaneseJourneyV2";

const defaultState = {
  xp:0, streak:0, lastStudy:null, currentLevel:"Beginner", currentLesson:"Hiragana • A-row",
  completed:[], wrong:[], favorites:[], notes:{}, mastery:{}, quizHistory:[]
};
let state = {...defaultState, ...(JSON.parse(localStorage.getItem(KEY)||"{}"))};

function save(){
  localStorage.setItem(KEY, JSON.stringify(state));
  $("#xpTop").textContent = `${state.xp} XP`;
}
save();

function speak(text, rate=1){
  if(!("speechSynthesis" in window)) return alert("Browser ini belum mendukung Text-to-Speech.");
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP"; u.rate = rate;
  speechSynthesis.speak(u);
}
window.speak = speak;

function addXP(n=5){
  state.xp += n;
  const today = new Date().toISOString().slice(0,10);
  if(state.lastStudy !== today){
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    state.streak = state.lastStudy === yesterday ? state.streak+1 : 1;
    state.lastStudy = today;
  }
  save();
}
function mastery(id){ return state.mastery[id] || 0; }
function bumpMastery(id, correct){
  const m = mastery(id);
  state.mastery[id] = Math.max(0, Math.min(100, m + (correct ? 14 : -7)));
  if(!correct && !state.wrong.includes(id)) state.wrong.push(id);
  if(correct && state.mastery[id] >= 70) state.wrong = state.wrong.filter(x=>x!==id);
  save();
}
function route(){ return location.hash.replace("#","") || "/home"; }
function navigate(path){ location.hash = path; }

const header = (eyebrow,title,sub="") => `<section class="section-head"><div><small class="eyebrow">${eyebrow}</small><h2>${title}</h2>${sub?`<p>${sub}</p>`:""}</div></section>`;

function home(){
  const learned = Object.values(state.mastery).filter(x=>x>=70).length;
  const accuracy = state.quizHistory.length ? Math.round(100*state.quizHistory.filter(x=>x.correct).length/state.quizHistory.length) : 0;
  app.innerHTML = `
  <section class="hero">
    <div class="hero-copy">
      <small class="eyebrow">JAPANESE LEARNING PLATFORM</small>
      <h1>Belajar bahasa Jepang dari <span class="accent">nol sampai N3.</span></h1>
      <p>Jalur belajar terarah untuk Kana, kosakata, Kanji, tata bahasa, reading, listening, latihan, review, dan progress.</p>
      <div class="btn-row"><button class="btn primary" id="continueHero">▶ Continue Learning</button><button class="btn secondary" onclick="location.hash='#/placement'">🎯 Find My Level</button></div>
    </div>
    <div class="hero-visual"><div class="floating-card"><div class="kana-card">あ</div><div class="kana-card k2">N3</div><div class="kana-card k3">日本</div></div></div>
  </section>
  <section class="stats-grid">
    <div class="stat-card"><small>🔥 Streak</small><strong>${state.streak} hari</strong></div>
    <div class="stat-card"><small>⭐ Total XP</small><strong>${state.xp} XP</strong></div>
    <div class="stat-card"><small>🎯 Akurasi</small><strong>${accuracy}%</strong></div>
    <div class="stat-card"><small>✅ Dikuasai</small><strong>${learned} item</strong></div>
  </section>
  <section class="section">
    ${header("CONTINUE LEARNING","Lanjutkan pelajaranmu","Satu rekomendasi utama agar kamu selalu tahu apa yang harus dipelajari berikutnya.")}
    <div class="continue-card">
      <div><span class="badge blue">${state.currentLevel}</span><h3 style="margin-top:10px">${state.currentLesson}</h3><p>Mulai dari fondasi yang kuat, lalu naik bertahap ke N5, N4, dan N3.</p><div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,Object.keys(state.mastery).length*2)}%"></div></div></div>
      <button class="btn primary" id="continueCard">Lanjut Belajar →</button>
    </div>
  </section>
  <section class="section grid two">
    <div class="card"><small class="eyebrow">今日の勉強</small><h2>Today's Study</h2><p>Target ringan ±20 menit.</p><div class="today-list">
      ${["Vocabulary — 10 kata","Kanji — 5 karakter","Grammar — 1 lesson","Listening — 1 latihan","Review — item sulit"].map((x,i)=>`<div class="study-item"><span class="check ${i<2&&state.xp>0?"done":""}">${i<2&&state.xp>0?"✓":""}</span><span>${x}</span></div>`).join("")}
    </div>
    <div class="card"><small class="eyebrow">REVIEW</small><h2>${state.wrong.length} item perlu diulang</h2><p>Jawaban yang salah akan masuk ke Smart Review dan muncul lebih cepat.</p><div class="btn-row"><button class="btn outline" onclick="location.hash='#/review'">Buka Review</button></div></div>
  </section>`;
  $("#continueHero").onclick = $("#continueCard").onclick = ()=>navigate("/learn/kana");
}

function learningPath(){
  const steps = [
    ["🌱","Beginner","Pronunciation, greetings, basic expressions","current"],
    ["あ","Hiragana","Basic, dakuten, handakuten, yōon",""],
    ["ア","Katakana","Basic & loanword combinations",""],
    ["🇯🇵","JLPT N5","Vocabulary, Kanji, Grammar, Reading",""],
    ["🇯🇵","JLPT N4","Elementary-intermediate Japanese","locked"],
    ["🇯🇵","JLPT N3","Intermediate Japanese & JLPT prep","locked"],
    ["🏆","N3 Master","Mock test & weak-area review","locked"]
  ];
  app.innerHTML = `${header("LEARNING PATH","Jalur Belajar","Ikuti roadmap dari nol sampai JLPT N3.")}
  <div class="roadmap">${steps.map((s,i)=>`<div class="road-step ${s[3]}"><div class="road-icon">${s[0]}</div><div><h3>${s[1]}</h3><p style="margin:0">${s[2]}</p></div><span class="badge ${i<2?"blue":i===0?"green":""}">${i===0?"In Progress":s[3]==="locked"?"🔒 Locked":"Not Started"}</span></div>`).join("")}</div>`;
}

function learn(){
 app.innerHTML = `${header("LEARN","Pilih fokus belajar","Materi dikelompokkan agar navigasi tetap sederhana.")}
 <div class="grid three">
 ${[
  ["🔤","Kana","Hiragana, Katakana, pronunciation, kombinasi bunyi.","#/learn/kana"],
  ["🈶","Kanji Library","Meaning, readings, stroke count, examples, level.","#/learn/kanji"],
  ["📖","Vocabulary","Kosakata terstruktur N5, N4, N3.","#/learn/vocab"],
  ["🧩","Grammar","Pattern, formation, explanation, examples, practice.","#/learn/grammar"],
  ["🎧","Listening","Latihan listening menggunakan Japanese TTS untuk versi awal.","#/learn/listening"],
  ["📚","Reading","Bacaan bertingkat N5–N3 dengan terjemahan dan dukungan kosakata.","#/learn/reading"]
 ].map(x=>`<a class="card hover module-card" href="${x[3]}"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></a>`).join("")}
 </div>
 <div class="notice section">Dataset linguistik pada versi ini adalah <strong>sample/development data</strong>. Struktur aplikasinya dipisahkan agar data terpercaya dalam jumlah besar dapat diimpor kemudian tanpa mengubah arsitektur utama.</div>`;
}

function kanaPage(){
 let type="hiragana", group="basic";
 const render=()=>{
   const items=kana.filter(k=>k.type===type&&(group==="all"||k.group===group));
   $("#kanaArea").innerHTML=items.map(k=>`<button class="kana-box" data-char="${k.character}"><div class="kana-char">${k.character}</div><div class="kana-romaji">${k.romaji}</div></button>`).join("");
   document.querySelectorAll(".kana-box").forEach(b=>b.onclick=()=>speak(b.dataset.char));
 };
 app.innerHTML=`${header("KANA","Hiragana & Katakana","Klik karakter untuk mendengar pelafalannya.")}
 <div class="tabs"><button class="tab active" data-type="hiragana">Hiragana</button><button class="tab" data-type="katakana">Katakana</button></div>
 <div class="tabs"><button class="tab active" data-group="basic">Basic</button><button class="tab" data-group="dakuten">Dakuten</button><button class="tab" data-group="handakuten">Handakuten</button><button class="tab" data-group="yoon">Yōon</button><button class="tab" data-group="all">Semua</button></div>
 <div id="kanaArea" class="kana-grid"></div>
 <div class="btn-row section"><a class="btn primary" href="#/practice/kana">✍️ Writing Practice</a><button class="btn outline" id="kanaQuiz">🧠 Kana Quiz</button></div>`;
 document.querySelectorAll("[data-type]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-type]").forEach(x=>x.classList.remove("active"));b.classList.add("active");type=b.dataset.type;group="basic";render()});
 document.querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-group]").forEach(x=>x.classList.remove("active"));b.classList.add("active");group=b.dataset.group;render()});
 $("#kanaQuiz").onclick=()=>startQuiz("kana");
 render();
}

function kanjiPage(){
 let level="ALL";
 const draw=()=>{
  const list=kanji.filter(k=>level==="ALL"||k.level===level);
  $("#kanjiList").innerHTML=list.map(k=>`<div class="list-card"><div class="road-icon jp" style="font-size:28px">${k.k}</div><div class="list-main"><strong>${k.meaning}</strong><small>${k.on} • ${k.kun} • ${k.strokes} strokes • ${k.radical}</small></div><span class="badge blue">${k.level}</span><button class="icon-btn" onclick="speak('${k.k}')">🔊</button></div>`).join("");
 };
 app.innerHTML=`${header("KANJI LIBRARY","Kanji Library","Sample data terstruktur N5–N3; siap dikembangkan untuk dataset besar.")}
 <div class="tabs">${["ALL","N5","N4","N3"].map((x,i)=>`<button class="tab ${i===0?"active":""}" data-level="${x}">${x}</button>`).join("")}</div>
 <div class="card"><div id="kanjiList"></div></div>
 <div class="btn-row"><a href="#/practice/kanji" class="btn primary">✍️ Kanji Writing</a></div>`;
 document.querySelectorAll("[data-level]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-level]").forEach(x=>x.classList.remove("active"));b.classList.add("active");level=b.dataset.level;draw()});draw();
}

function vocabPage(){
 app.innerHTML=`${header("VOCABULARY","Vocabulary N5 → N3","Sample vocabulary untuk development.")}
 <div class="grid three">${["N5","N4","N3"].map(level=>`<div class="card"><span class="badge blue">${level}</span><h2>${vocab.filter(v=>v.level===level).length} kata sample</h2>${vocab.filter(v=>v.level===level).map(v=>`<div class="list-card"><div class="list-main"><strong class="jp">${v.word} <small>${v.reading}</small></strong><small>${v.meaning} • ${v.category}</small></div><button class="icon-btn" onclick="speak('${v.word}')">🔊</button></div>`).join("")}</div>`).join("")}</div>`;
}
function grammarPage(){
 app.innerHTML=`${header("GRAMMAR","Grammar Lessons","Pattern → meaning → formation → examples → practice.")}
 <div class="grid two">${grammar.map(g=>`<div class="card"><span class="badge blue">${g.level}</span><h2 class="jp">${g.pattern}</h2><p><strong>Meaning:</strong> ${g.meaning}</p><p><strong>Formation:</strong> ${g.formation}</p><div class="card" style="padding:14px;background:#f8fbff"><strong class="jp">${g.example}</strong><small style="display:block;color:var(--muted);margin-top:5px">${g.translation}</small></div><div class="btn-row"><button class="btn outline" onclick="speak('${g.example}')">🔊 Listen</button><button class="btn primary" onclick="location.hash='#/practice'">Practice</button></div></div>`).join("")}</div>`;
}
function listeningPage(){
 const item=vocab[Math.floor(Math.random()*vocab.length)];
 app.innerHTML=`${header("LISTENING","Listening Lab","Versi awal menggunakan Japanese Text-to-Speech dari browser.")}
 <div class="card quiz-shell"><span class="badge blue">${item.level}</span><h2>Dengarkan lalu pilih artinya</h2><div style="text-align:center;margin:30px"><button class="btn primary" id="listenPlay">🔊 Putar Audio</button></div><div id="listenAnswers" class="answers"></div></div>`;
 $("#listenPlay").onclick=()=>speak(item.word,.9);
 const opts=[item,...vocab.filter(v=>v.word!==item.word).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);
 $("#listenAnswers").innerHTML=opts.map(o=>`<button class="answer">${o.meaning}</button>`).join("");
 document.querySelectorAll(".answer").forEach((b,i)=>b.onclick=()=>{const ok=opts[i].word===item.word;b.classList.add(ok?"correct":"wrong");b.textContent += ok?" ✓":" ✕";bumpMastery("v:"+item.word,ok);if(ok)addXP(8)});
}
function readingPage(){
 app.innerHTML=`${header("READING","Reading Library","Bacaan pendek bertingkat dari N5 sampai N3.")}
 <div class="grid three">${readings.map(r=>`<article class="card"><span class="badge blue">${r.level}</span><h3 style="margin-top:12px">${r.title}</h3><p class="jp" style="font-size:18px;color:var(--ink)">${r.text}</p><details><summary>Terjemahan</summary><p>${r.translation}</p></details><button class="btn outline" onclick="speak('${r.text}',.9)">🔊 Dengarkan</button></article>`).join("")}</div>`;
}

function practice(){
 app.innerHTML=`${header("PRACTICE","Practice Arena","Latihan interaktif untuk memperkuat materi yang sudah dipelajari.")}
 <div class="grid three">
 ${[
 ["🔤","Kana Quiz","Kana ↔ romaji","kana"],
 ["🈶","Kanji Quiz","Kanji → meaning","kanji"],
 ["📖","Vocabulary Quiz","Japanese → Indonesian","vocab"],
 ["🧩","Grammar Quiz","Kenali meaning/pattern","grammar"],
 ["🎧","Listening","Listen & choose","listening"],
 ["✍️","Writing","Canvas untuk Kana/Kanji","writing"]
 ].map(x=>`<button class="card hover module-card" data-practice="${x[3]}" style="text-align:left"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></button>`).join("")}</div>`;
 document.querySelectorAll("[data-practice]").forEach(b=>b.onclick=()=>{const x=b.dataset.practice;if(x==="writing")navigate("/practice/kana"); else if(x==="listening")navigate("/learn/listening"); else startQuiz(x)});
}

function startQuiz(mode){
 let pool, getQ;
 if(mode==="kana"){pool=kana.filter(k=>k.group==="basic");getQ=x=>({prompt:x.character,answer:x.romaji,options:shuffle([x.romaji,...shuffle(pool.filter(y=>y.romaji!==x.romaji)).slice(0,3).map(y=>y.romaji)]),id:"k:"+x.character})}
 if(mode==="vocab"){pool=vocab;getQ=x=>({prompt:x.word,answer:x.meaning,options:shuffle([x.meaning,...shuffle(pool.filter(y=>y.meaning!==x.meaning)).slice(0,3).map(y=>y.meaning)]),id:"v:"+x.word})}
 if(mode==="kanji"){pool=kanji;getQ=x=>({prompt:x.k,answer:x.meaning,options:shuffle([x.meaning,...shuffle(pool.filter(y=>y.meaning!==x.meaning)).slice(0,3).map(y=>y.meaning)]),id:"j:"+x.k})}
 if(mode==="grammar"){pool=grammar;getQ=x=>({prompt:x.pattern,answer:x.meaning,options:shuffle([x.meaning,...shuffle(pool.filter(y=>y.meaning!==x.meaning)).slice(0,3).map(y=>y.meaning)]),id:"g:"+x.pattern})}
 let count=0, correct=0, current;
 const next=()=>{
  current=getQ(pool[Math.floor(Math.random()*pool.length)]);
  app.innerHTML=`${header("QUIZ",`${mode.toUpperCase()} Practice`,`Soal ${count+1} / 10 • Benar ${correct}`)}
  <div class="card quiz-shell"><div class="quiz-question">${current.prompt}</div><div class="answers">${current.options.map(o=>`<button class="answer" data-a="${escapeHtml(o)}">${o}</button>`).join("")}</div><div id="feedback" style="margin-top:16px"></div></div>`;
  document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>answer(b,b.dataset.a));
 };
 const answer=(btn,a)=>{
   const ok=a===current.answer;
   document.querySelectorAll(".answer").forEach(b=>b.disabled=true);
   btn.classList.add(ok?"correct":"wrong");
   if(ok){correct++;addXP(5)}
   bumpMastery(current.id,ok);
   state.quizHistory.push({mode,correct:ok,date:Date.now()}); save();
   $("#feedback").innerHTML=`<div class="${ok?"":"notice"}"><strong>${ok?"✅ Benar!":"⚠️ Belum tepat."}</strong> Jawaban: <strong>${current.answer}</strong></div><div class="btn-row"><button id="nextQ" class="btn primary">${count===9?"Lihat Hasil":"Soal Berikutnya"} →</button></div>`;
   $("#nextQ").onclick=()=>{count++; if(count>=10) result(); else next();};
 };
 const result=()=>{
   const pct=Math.round(correct/10*100);
   app.innerHTML=`${header("RESULT","Hasil Latihan")}<div class="card quiz-shell" style="text-align:center"><div class="progress-circle" style="--pct:${pct}%;margin:20px auto"><strong>${pct}%</strong></div><h2>${correct} / 10 benar</h2><p>${pct>=80?"Bagus. Pertahankan dan lanjutkan materi berikutnya.":"Ulangi item yang masih sulit melalui Smart Review."}</p><div class="btn-row" style="justify-content:center"><button class="btn primary" id="again">Coba Lagi</button><a class="btn outline" href="#/review">Review</a></div></div>`;
   $("#again").onclick=()=>startQuiz(mode);
 };
 next();
}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function escapeHtml(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}

function writing(kind="kana"){
 const target = kind==="kanji" ? kanji[0].k : "あ";
 app.innerHTML=`${header("WRITING PRACTICE",kind==="kanji"?"Kanji Writing":"Kana Writing Practice","Gunakan mouse, touchscreen, atau stylus. Penilaian versi awal menggunakan heuristic sederhana.")}
 <div class="canvas-wrap">
  <div class="canvas-panel"><canvas id="writeCanvas" class="writing-canvas" width="700" height="700"></canvas><div class="btn-row"><button class="btn secondary" id="clearCanvas">Clear</button><button class="btn primary" id="checkCanvas">Check</button><button class="btn outline" id="nextCanvas">Next</button></div><div id="writeFeedback"></div></div>
  <aside class="card"><small class="eyebrow">TARGET</small><div id="targetBig" class="target-big">${target}</div><p class="stroke-hint">Mode: Free Writing. Trace/animated stroke guide memerlukan dataset stroke-order tervalidasi dan sengaja belum dipalsukan pada development build.</p><button class="btn outline" onclick="speak(document.querySelector('#targetBig').textContent)">🔊 Listen</button></aside>
 </div>`;
 const c=$("#writeCanvas"),ctx=c.getContext("2d");let drawing=false,points=0,last=null;
 ctx.lineWidth=16;ctx.lineCap="round";ctx.strokeStyle="#1d4ed8";
 const pos=e=>{const r=c.getBoundingClientRect(),t=e.touches?.[0]||e;return {x:(t.clientX-r.left)*c.width/r.width,y:(t.clientY-r.top)*c.height/r.height}};
 const start=e=>{e.preventDefault();drawing=true;last=pos(e);points++};
 const move=e=>{if(!drawing)return;e.preventDefault();const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;points++};
 const stop=()=>drawing=false;
 c.addEventListener("pointerdown",start);c.addEventListener("pointermove",move);window.addEventListener("pointerup",stop);
 $("#clearCanvas").onclick=()=>{ctx.clearRect(0,0,c.width,c.height);points=0;$("#writeFeedback").innerHTML=""};
 $("#checkCanvas").onclick=()=>{const score=Math.min(100,Math.round(points/2));const label=score>75?"⭐ Excellent":score>45?"✅ Good":"⚠️ Try Again";$("#writeFeedback").innerHTML=`<p><strong>${label}</strong> — heuristic engagement score ${score}%.</p>`;if(score>45)addXP(4)};
 $("#nextCanvas").onclick=()=>{const pool=kind==="kanji"?kanji.map(x=>x.k):kana.filter(x=>x.group==="basic").map(x=>x.character);$("#targetBig").textContent=pool[Math.floor(Math.random()*pool.length)];$("#clearCanvas").click()};
}

function review(){
 const items=state.wrong;
 app.innerHTML=`${header("SMART REVIEW","Review","Item yang salah atau mastery-nya masih rendah akan diprioritaskan.")}
 <div class="grid two">
  <div class="card"><h3>Due Today</h3><h2>${items.length} item</h2><p>Semakin sering salah, semakin cepat item muncul kembali.</p></div>
  <div class="card"><h3>Recently Learned</h3><h2>${Object.keys(state.mastery).length} item</h2><p>Mastery disimpan lokal pada browser.</p></div>
 </div>
 <div class="card section">${items.length?items.map(id=>`<div class="list-card"><div class="list-main"><strong>${id.replace(/^[a-z]:/,"")}</strong><small>Mastery ${mastery(id)}%</small></div><span class="badge amber">Review</span></div>`).join(""):`<div class="empty">Belum ada item untuk direview. Coba kerjakan quiz terlebih dahulu.</div>`}</div>
 <div class="btn-row"><button class="btn primary" id="reviewQuiz">Mulai Review</button></div>`;
 $("#reviewQuiz").onclick=()=>startQuiz("vocab");
}
function progress(){
 const hist=state.quizHistory, acc=hist.length?Math.round(hist.filter(x=>x.correct).length/hist.length*100):0;
 const mastered=Object.values(state.mastery).filter(x=>x>=70).length;
 app.innerHTML=`${header("PROGRESS","Your Progress","Pantau kemampuan, kebiasaan belajar, dan area yang perlu diperkuat.")}
 <div class="stats-grid"><div class="stat-card"><small>🔥 Daily Streak</small><strong>${state.streak} hari</strong></div><div class="stat-card"><small>⭐ XP</small><strong>${state.xp}</strong></div><div class="stat-card"><small>🎯 Quiz Accuracy</small><strong>${acc}%</strong></div><div class="stat-card"><small>✅ Mastered</small><strong>${mastered}</strong></div></div>
 <div class="grid three">
 ${["N5","N4","N3"].map((l,i)=>{const pct=Math.min(100,Math.max(0,Math.round((mastered-(i*8))*6)));return `<div class="card"><span class="badge blue">${l}</span><h2>${pct}%</h2><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div><p>${i===0?"Fondasi & kemampuan dasar":"Terbuka bertahap setelah mastery level sebelumnya cukup."}</p></div>`}).join("")}
 </div>
 <div class="card section"><small class="eyebrow">💡 RECOMMENDED FOR YOU</small><h2>${state.wrong.length?"Fokuskan Smart Review":"Lanjutkan jalur belajar"}</h2><p>${state.wrong.length?`Ada ${state.wrong.length} item yang perlu diperkuat.`:"Kerjakan quiz untuk membangun data mastery dan rekomendasi yang lebih personal."}</p><a class="btn primary" href="${state.wrong.length?"#/review":"#/learning-path"}">${state.wrong.length?"Practice Review":"Continue Learning"}</a></div>`;
}
function placement(){
 app.innerHTML=`${header("PLACEMENT TEST","Find My Level","Pilih titik awal yang paling sesuai.")}
 <div class="grid two">${[
 ["🌱","I'm completely new","Mulai dari Beginner dan Kana.","Beginner"],
 ["🔤","I know Hiragana & Katakana","Mulai dari dasar JLPT N5.","N5"],
 ["📚","I already know basic Japanese","Gunakan quiz diagnostic singkat.","TEST"],
 ["🎯","I want to prepare for N3","Gunakan diagnostic test sebelum N3.","TEST"]
 ].map(x=>`<button class="card hover" data-placement="${x[3]}" style="text-align:left"><div style="font-size:28px">${x[0]}</div><h3 style="margin-top:12px">${x[1]}</h3><p>${x[2]}</p></button>`).join("")}</div>`;
 document.querySelectorAll("[data-placement]").forEach(b=>b.onclick=()=>{if(b.dataset.placement==="TEST")startQuiz("vocab");else{state.currentLevel=b.dataset.placement;state.currentLesson=b.dataset.placement==="Beginner"?"Hiragana • A-row":"N5 • Vocabulary Basics";save();navigate("/home")}});
}
function profile(){
 app.innerHTML=`${header("PROFILE","Tentang Penyusun","Identitas pengembang platform.")}
 <div class="card profile-card"><div class="profile-photo">MP</div><div><span class="badge blue">Penyusun & Pengembang</span><h2 style="margin-top:12px">Muhamad Panji, S.Pd.</h2><p>Japanese Journey dikembangkan sebagai platform pembelajaran mandiri Bahasa Jepang yang terstruktur dari level pemula hingga persiapan JLPT N3.</p><p><strong>Prinsip:</strong> Learn → Practice → Master → Review → Progress → Next Lesson.</p></div></div>
 <div class="notice section">Versi ini merupakan development build. Data linguistik sample tidak diklaim sebagai daftar resmi JLPT. Arsitektur data dipisahkan agar dataset terpercaya dapat ditambahkan kemudian.</div>`;
}

function searchSetup(){
 const dlg=$("#searchDialog"), input=$("#globalSearch"), results=$("#searchResults");
 $("#searchBtn").onclick=()=>{dlg.showModal();setTimeout(()=>input.focus(),50)};
 input.oninput=()=>{
  const q=input.value.trim().toLowerCase();
  if(!q){results.innerHTML="";return}
  const hits=[
   ...kana.map(x=>({type:"Kana",title:x.character,sub:x.romaji})),
   ...vocab.map(x=>({type:x.level+" Vocabulary",title:x.word,sub:`${x.reading} • ${x.meaning}`})),
   ...kanji.map(x=>({type:x.level+" Kanji",title:x.k,sub:`${x.meaning} • ${x.on} • ${x.kun}`})),
   ...grammar.map(x=>({type:x.level+" Grammar",title:x.pattern,sub:x.meaning}))
  ].filter(x=>(x.title+" "+x.sub).toLowerCase().includes(q)).slice(0,30);
  results.innerHTML=hits.length?hits.map(x=>`<div class="list-card"><div class="list-main"><strong class="jp">${x.title}</strong><small>${x.type} • ${x.sub}</small></div></div>`).join(""):`<div class="empty">Tidak ditemukan.</div>`;
 };
}
searchSetup();

function render(){
 document.querySelectorAll(".desktop-nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+route()));
 const r=route();
 if(r==="/home"||r==="/") home();
 else if(r==="/learning-path") learningPath();
 else if(r==="/learn") learn();
 else if(r==="/learn/kana") kanaPage();
 else if(r==="/learn/kanji") kanjiPage();
 else if(r==="/learn/vocab") vocabPage();
 else if(r==="/learn/grammar") grammarPage();
 else if(r==="/learn/listening") listeningPage();
 else if(r==="/learn/reading") readingPage();
 else if(r==="/practice") practice();
 else if(r==="/practice/kana") writing("kana");
 else if(r==="/practice/kanji") writing("kanji");
 else if(r==="/review") review();
 else if(r==="/progress") progress();
 else if(r==="/placement") placement();
 else if(r==="/profile") profile();
 else home();
 window.scrollTo({top:0,behavior:"smooth"});
}
window.addEventListener("hashchange",render);render();
