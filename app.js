
import { kana, vocab, kanji, grammar, readings } from "./content.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "./config.js";

const supabaseReady = Boolean(
  SUPABASE_URL &&
  SUPABASE_PUBLISHABLE_KEY &&
  !SUPABASE_URL.includes("YOUR_PROJECT") &&
  !SUPABASE_PUBLISHABLE_KEY.includes("YOUR_PUBLISHABLE")
);
const supabase = supabaseReady ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;
let authUser = null;
let remoteSyncTimer = null;

const $ = s => document.querySelector(s);
const app = $("#app");
const KEY = "japaneseJourneyV2";

const defaultState = {
  xp:0, streak:0, lastStudy:null, currentLevel:"Beginner", currentLesson:"Hiragana • A-row",
  completed:[], wrong:[], favorites:[], notes:{}, mastery:{}, quizHistory:[],
  account:null
};
let state = {...defaultState, ...(JSON.parse(localStorage.getItem(KEY)||"{}"))};

function save(){
  localStorage.setItem(KEY, JSON.stringify(state));
  const xpTop = $("#xpTop");
  if(xpTop) xpTop.textContent = `${state.xp} XP`;
  if(authUser && supabaseReady) queueRemoteSync();
}

function queueRemoteSync(){
  clearTimeout(remoteSyncTimer);
  remoteSyncTimer=setTimeout(()=>syncProgressToCloud(),500);
}

async function syncProgressToCloud(){
  if(!authUser || !supabase) return;
  const payload={
    user_id:authUser.id,
    xp:state.xp,
    streak:state.streak,
    last_study:state.lastStudy,
    current_level:state.currentLevel,
    current_lesson:state.currentLesson,
    completed:state.completed,
    wrong:state.wrong,
    favorites:state.favorites,
    notes:state.notes,
    mastery:state.mastery,
    quiz_history:state.quizHistory,
    updated_at:new Date().toISOString()
  };
  const {error}=await supabase.from("learning_progress").upsert(payload,{onConflict:"user_id"});
  if(error) console.warn("Cloud sync:",error.message);
}

async function loadProgressFromCloud(){
  if(!authUser || !supabase) return;
  const {data,error}=await supabase.from("learning_progress").select("*").eq("user_id",authUser.id).maybeSingle();
  if(error){ console.warn("Load progress:",error.message); return; }
  if(!data){ await syncProgressToCloud(); return; }
  state={
    ...state,
    xp:data.xp ?? state.xp,
    streak:data.streak ?? state.streak,
    lastStudy:data.last_study ?? state.lastStudy,
    currentLevel:data.current_level ?? state.currentLevel,
    currentLesson:data.current_lesson ?? state.currentLesson,
    completed:data.completed ?? state.completed,
    wrong:data.wrong ?? state.wrong,
    favorites:data.favorites ?? state.favorites,
    notes:data.notes ?? state.notes,
    mastery:data.mastery ?? state.mastery,
    quizHistory:data.quiz_history ?? state.quizHistory
  };
  localStorage.setItem(KEY,JSON.stringify(state));
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
  const displayName = authUser?.user_metadata?.full_name || authUser?.email || ""; 
  const learner = displayName ? `, ${escapeHtml(displayName.split(" ")[0])}` : "";
  app.innerHTML = `
  <section class="hero">
    <div class="hero-copy">
      <small class="eyebrow">JAPANESE LEARNING PLATFORM</small>
      <h1>Belajar bahasa Jepang dari <span class="accent">nol sampai N3.</span></h1>
      <p>Belajar bertahap: pelajari materi, kerjakan kuis, latihan tanpa batas, review kesalahan, lalu lanjut ke tahap berikutnya.</p>
      <div class="btn-row"><button class="btn primary" id="continueHero">▶ Mulai Belajar${learner}</button><a class="btn secondary" href="#/profile">👤 Profil Belajar</a></div>
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
    ${header("CONTINUE LEARNING","Lanjutkan pembelajaran","Materi, latihan, kuis, dan review berada dalam satu alur belajar.")}
    <div class="continue-card">
      <div><span class="badge blue">${state.currentLevel}</span><h3 style="margin-top:10px">${state.currentLesson}</h3><p>Mulai dari Hiragana dan Katakana, kemudian naik bertahap menuju N5, N4, dan N3.</p><div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,Object.keys(state.mastery).length*2)}%"></div></div></div>
      <button class="btn primary" id="continueCard">Buka Belajar →</button>
    </div>
  </section>`;
  $("#continueHero").onclick = $("#continueCard").onclick = ()=>navigate("/learn");
}

function learningPath(){
  const steps = [
    ["🌱","Beginner","Pengenalan dan placement awal","#/placement","Mulai"],
    ["あ","Hiragana","Basic, dakuten, handakuten, dan yōon","#/learn/kana","Buka"],
    ["ア","Katakana","Basic, dakuten, handakuten, dan yōon","#/learn/kana","Buka"],
    ["🇯🇵","JLPT N5","Vocabulary, Kanji, Grammar, Listening, Reading","#/learn/vocab","Buka"],
    ["🇯🇵","JLPT N4","Vocabulary, Kanji, Grammar, Listening, Reading","#/learn/vocab","Buka"],
    ["🇯🇵","JLPT N3","Vocabulary, Kanji, Grammar, Listening, Reading","#/learn/vocab","Buka"],
    ["🏆","N3 Master","Review dan persiapan mock test","#/progress","Progres"]
  ];
  app.innerHTML = `${header("LEARNING PATH","Jalur Belajar","Semua tahap dapat dibuka tanpa login. Login hanya untuk menyimpan progres online.")}
  <div class="roadmap">${steps.map(s=>`<a class="road-step path-link" href="${s[3]}"><div class="road-icon">${s[0]}</div><div><h3>${s[1]}</h3><p style="margin:0">${s[2]}</p></div><span class="badge blue">${s[4]} →</span></a>`).join("")}</div>`;
}

function pathHref(title){ return ({ "Beginner":"#/placement","Hiragana":"#/learn/kana","Katakana":"#/learn/kana","JLPT N5":"#/learn/vocab","JLPT N4":"#/learn/grammar","JLPT N3":"#/learn/reading","N3 Master":"#/progress" })[title] || "#/learn"; }

function learn(){
  const steps = [
    ["🌱","Beginner","Dasar pelafalan dan pengenalan bahasa Jepang","current"],
    ["あ","Hiragana","Belajar huruf → kuis 50 soal → latihan random tanpa batas",""],
    ["ア","Katakana","Belajar huruf → kuis 50 soal → latihan random tanpa batas",""],
    ["🇯🇵","JLPT N5","Vocabulary, Kanji, Grammar, Listening, Reading",""],
    ["🇯🇵","JLPT N4","Materi tingkat dasar-menengah","locked"],
    ["🇯🇵","JLPT N3","Materi menengah & persiapan JLPT","locked"],
    ["🏆","N3 Master","Mock test dan penguatan area lemah","locked"]
  ];
  app.innerHTML = `${header("BELAJAR","Learning Path","Jalur belajar dan seluruh materi sekarang berada dalam satu menu.")}
  <div class="roadmap compact-roadmap">
    ${steps.map((s,i)=>`<div class="road-step ${s[3]}"><div class="road-icon">${s[0]}</div><div><h3>${s[1]}</h3><p style="margin:0">${s[2]}</p></div><span class="badge ${i<3?"blue":""}">${i===0?"Mulai":s[3]==="locked"?"🔒 Bertahap":"Tersedia"}</span></div>`).join("")}
  </div>
  <section class="section">
    ${header("MATERI","Pilih materi","Setiap materi nantinya mengikuti alur Belajar → Latihan → Kuis → Review.")}
    <div class="grid three">
    ${[
      ["🔤","Kana","Hiragana dan Katakana lengkap dengan kuis serta latihan random.","#/learn/kana"],
      ["🈶","Kanji","Meaning, readings, stroke count, examples, dan level.","#/learn/kanji"],
      ["📖","Vocabulary","Kosakata bertahap untuk N5, N4, dan N3.","#/learn/vocab"],
      ["🧩","Grammar","Pola, penjelasan, contoh, dan latihan.","#/learn/grammar"],
      ["🎧","Listening","Latihan mendengar bahasa Jepang.","#/learn/listening"],
      ["📚","Reading","Bacaan bertingkat dari N5 sampai N3.","#/learn/reading"]
    ].map(x=>`<a class="card hover module-card" href="${x[3]}"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></a>`).join("")}
    </div>
  </section>
  ${state.wrong.length ? `<section class="section"><div class="card review-inline"><div><small class="eyebrow">REVIEW SAAT BELAJAR</small><h2>${state.wrong.length} item perlu diulang</h2><p>Item yang salah akan muncul sebagai review di dalam alur pembelajaran, bukan sebagai menu terpisah.</p></div><button class="btn primary" id="inlineReview">Mulai Review</button></div></section>` : ""}`;
  if($("#inlineReview")) $("#inlineReview").onclick=()=>review();
}

function kanaPage(){
 let type="hiragana", group="basic";
 const label=()=>type==="hiragana"?"Hiragana":"Katakana";
 const render=()=>{
   const items=kana.filter(k=>k.type===type&&(group==="all"||k.group===group));
   $("#kanaArea").innerHTML=items.map(k=>`<button class="kana-box" data-char="${k.character}"><div class="kana-char">${k.character}</div><div class="kana-romaji">${k.romaji}</div></button>`).join("");
   document.querySelectorAll(".kana-box").forEach(b=>b.onclick=()=>speak(b.dataset.char));
   $("#quizTitle").textContent=`Kuis ${label()} — 50 Soal`;
   $("#randomTitle").textContent=`Tebak ${label()} — Tanpa Batas`;
   $("#quizDesc").textContent=`Setelah menghafal ${label()}, uji kemampuan dengan 50 soal acak.`;
   $("#randomDesc").textContent=`Huruf ${label()} akan terus diacak sampai kamu memilih selesai belajar.`;
 };
 app.innerHTML=`${header("KANA","Hiragana & Katakana","Pelajari huruf terlebih dahulu, kemudian langsung lanjut ke kuis dan latihan.")}
 <div class="tabs"><button class="tab active" data-type="hiragana">Hiragana</button><button class="tab" data-type="katakana">Katakana</button></div>
 <div class="tabs"><button class="tab active" data-group="basic">Basic</button><button class="tab" data-group="dakuten">Dakuten</button><button class="tab" data-group="handakuten">Handakuten</button><button class="tab" data-group="yoon">Yōon</button><button class="tab" data-group="all">Semua</button></div>
 <div id="kanaArea" class="kana-grid"></div>
 <section class="section">
   ${header("SETELAH MENGHAFAL","Langsung latihan","Tidak perlu berpindah ke menu Practice.")}
   <div class="grid three">
     <button class="card hover practice-card" id="integratedQuiz"><span class="badge blue">50 Soal</span><h3 id="quizTitle"></h3><p id="quizDesc"></p></button>
     <button class="card hover practice-card" id="integratedRandom"><span class="badge blue">♾ Endless</span><h3 id="randomTitle"></h3><p id="randomDesc"></p></button>
     <a class="card hover practice-card" href="#/practice/kana"><span class="badge blue">Writing</span><h3>✍️ Latihan Menulis Kana</h3><p>Latih bentuk huruf menggunakan canvas.</p></a>
   </div>
 </section>
 ${state.wrong.length ? `<section class="section"><div class="card review-inline"><div><small class="eyebrow">REVIEW</small><h3>${state.wrong.length} item perlu diulang</h3><p>Review muncul langsung di area belajar berdasarkan jawaban yang masih salah.</p></div><button class="btn outline" id="kanaReview">Buka Review</button></div></section>`:""}`;
 document.querySelectorAll("[data-type]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-type]").forEach(x=>x.classList.remove("active"));b.classList.add("active");type=b.dataset.type;group="basic";document.querySelectorAll("[data-group]").forEach((x,i)=>x.classList.toggle("active",i===0));render()});
 document.querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-group]").forEach(x=>x.classList.remove("active"));b.classList.add("active");group=b.dataset.group;render()});
 $("#integratedQuiz").onclick=()=>kanaQuiz(type);
 $("#integratedRandom").onclick=()=>kanaEndless(type);
 if($("#kanaReview")) $("#kanaReview").onclick=()=>review();
 render();
}

function kanjiPage(){
 let level="ALL";
 const draw=()=>{
  const list=kanji.filter(k=>level==="ALL"||k.level===level);
  $("#kanjiList").innerHTML=list.map(k=>`<div class="list-card"><div class="road-icon jp" style="font-size:28px">${k.k}</div><div class="list-main"><strong>${k.meaning}</strong><small>${k.on} • ${k.kun} • ${k.strokes} strokes • ${k.radical}</small></div><span class="badge blue">${k.level}</span><button class="icon-btn" onclick="speak('${k.k}')">🔊</button></div>`).join("");
 };
 app.innerHTML=`${header("KANJI LIBRARY","Kanji Library","Koleksi Kanji terstruktur N5–N3 untuk kurikulum pengembangan.")}
 <div class="tabs">${["ALL","N5","N4","N3"].map((x,i)=>`<button class="tab ${i===0?"active":""}" data-level="${x}">${x}</button>`).join("")}</div>
 <div class="card"><div id="kanjiList"></div></div>
 <div class="btn-row"><a href="#/practice/kanji" class="btn primary">✍️ Kanji Writing</a></div>`;
 document.querySelectorAll("[data-level]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-level]").forEach(x=>x.classList.remove("active"));b.classList.add("active");level=b.dataset.level;draw()});draw();
}

function vocabPage(){
 app.innerHTML=`${header("VOCABULARY","Vocabulary N5 → N3","Kosakata bertahap N5–N3 untuk kurikulum pengembangan.")}
 <div class="grid three">${["N5","N4","N3"].map(level=>`<div class="card"><span class="badge blue">${level}</span><h2>${vocab.filter(v=>v.level===level).length} kata</h2>${vocab.filter(v=>v.level===level).map(v=>`<div class="list-card"><div class="list-main"><strong class="jp">${v.word} <small>${v.reading}</small></strong><small>${v.meaning} • ${v.category}</small></div><button class="icon-btn" onclick="speak('${v.word}')">🔊</button></div>`).join("")}</div>`).join("")}</div>`;
}
function grammarPage(){
 app.innerHTML=`${header("GRAMMAR","Grammar Lessons","Pattern → meaning → formation → examples → practice.")}
 <div class="grid two">${grammar.map(g=>`<div class="card"><span class="badge blue">${g.level}</span><h2 class="jp">${g.pattern}</h2><p><strong>Meaning:</strong> ${g.meaning}</p><p><strong>Formation:</strong> ${g.formation}</p><div class="card" style="padding:14px;background:#f8fbff"><strong class="jp">${g.example}</strong><small style="display:block;color:var(--muted);margin-top:5px">${g.translation}</small></div><div class="btn-row"><button class="btn outline" onclick="speak('${g.example}')">🔊 Listen</button><button class="btn primary" onclick="startQuiz('grammar')">Practice</button></div></div>`).join("")}</div>`;
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
 app.innerHTML=`${header("PRACTICE","Latihan","Pilih latihan sesuai materi yang ingin kamu kuasai.")}
 <div class="grid two">
   <a class="card hover" href="#/practice/hiragana-quiz"><span class="badge blue">50 Soal</span><h3>あ Hiragana Quiz</h3><p>Kuis khusus Hiragana sebanyak 50 soal acak.</p></a>
   <a class="card hover" href="#/practice/katakana-quiz"><span class="badge blue">50 Soal</span><h3>ア Katakana Quiz</h3><p>Kuis khusus Katakana sebanyak 50 soal acak.</p></a>
   <a class="card hover" href="#/practice/hiragana-random"><span class="badge blue">♾ Endless</span><h3>Hiragana Random</h3><p>Tebak huruf Hiragana secara acak tanpa batas sampai kamu memilih selesai.</p></a>
   <a class="card hover" href="#/practice/katakana-random"><span class="badge blue">♾ Endless</span><h3>Katakana Random</h3><p>Tebak huruf Katakana secara acak tanpa batas sampai kamu memilih selesai.</p></a>
   <a class="card hover" href="#/practice/kana"><h3>✎ Kana Writing</h3><p>Latihan menulis Kana menggunakan canvas.</p></a>
   <a class="card hover" href="#/practice/kanji"><h3>漢 Kanji Writing</h3><p>Latihan menulis Kanji menggunakan canvas.</p></a>
 </div>`;
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


function kanaQuiz(mode="hiragana"){
  const pool = kana.filter(x => x.type === mode);
  if(!pool.length){
    app.innerHTML = `${header("KANA QUIZ","Data belum tersedia","Tambahkan data Kana untuk memulai kuis.")}`;
    return;
  }
  const questions = Array.from({length:50}, (_,i)=>{
    const correct = pool[Math.floor(Math.random()*pool.length)];
    const distractors = [...pool].filter(x=>x.character!==correct.character)
      .sort(()=>Math.random()-.5).slice(0,3);
    return {no:i+1, correct, options:[correct,...distractors].sort(()=>Math.random()-.5)};
  });
  let idx=0, score=0, locked=false;
  const renderQ=()=>{
    const q=questions[idx];
    app.innerHTML = `${header(mode==="hiragana"?"HIRAGANA QUIZ":"KATAKANA QUIZ",`Soal ${idx+1} dari 50`,"Pilih romaji yang sesuai dengan huruf yang ditampilkan.")}
      <div class="quiz-shell card">
        <div class="quiz-top"><span class="badge blue">${mode==="hiragana"?"Hiragana":"Katakana"}</span><strong>${score} benar</strong></div>
        <div class="quiz-progress"><div style="width:${((idx+1)/50)*100}%"></div></div>
        <div class="kana-question jp">${q.correct.character}</div>
        <div class="answers kana-answers">
          ${q.options.map((o,n)=>`<button class="answer-btn" data-romaji="${o.romaji}">${String.fromCharCode(65+n)}. ${o.romaji}</button>`).join("")}
        </div>
        <div id="kanaFeedback" class="quiz-feedback" aria-live="polite"></div>
      </div>`;
    document.querySelectorAll(".answer-btn").forEach(btn=>btn.onclick=()=>{
      if(locked) return;
      locked=true;
      const ok=btn.dataset.romaji===q.correct.romaji;
      if(ok){score++; addXP(2);}
      btn.classList.add(ok?"correct":"wrong");
      document.querySelectorAll(".answer-btn").forEach(b=>{
        if(b.dataset.romaji===q.correct.romaji) b.classList.add("correct");
        b.disabled=true;
      });
      $("#kanaFeedback").innerHTML=`<strong>${ok?"Benar!":"Belum tepat."}</strong> ${q.correct.character} = ${q.correct.romaji}
        <button class="btn primary" id="nextKana">${idx===49?"Lihat Hasil":"Soal Berikutnya →"}</button>`;
      $("#nextKana").onclick=()=>{
        if(idx===49){
          const pct=Math.round(score/50*100);
          app.innerHTML=`${header(mode==="hiragana"?"HIRAGANA QUIZ":"KATAKANA QUIZ","Kuis selesai",`Kamu menjawab ${score} dari 50 soal dengan benar.`)}
          <div class="card result-card"><div class="result-score">${pct}%</div><h2>${score}/50 benar</h2>
          <div class="btn-row"><button class="btn primary" id="retryKana">Ulangi 50 Soal</button><a class="btn secondary" href="#/learn/kana">Kembali ke Kana</a></div></div>`;
          $("#retryKana").onclick=()=>kanaQuiz(mode);
        } else {idx++; locked=false; renderQ();}
      };
    });
  };
  renderQ();
}

function kanaEndless(mode="hiragana"){
  const pool = kana.filter(x => x.type === mode);
  if(!pool.length){
    app.innerHTML = `${header("RANDOM KANA","Data belum tersedia","Tambahkan data Kana untuk memulai latihan.")}`;
    return;
  }
  let total=0, correctCount=0, current=null, locked=false;
  const next=()=>{
    locked=false;
    let candidate;
    do { candidate=pool[Math.floor(Math.random()*pool.length)]; }
    while(pool.length>1 && current && candidate.character===current.character);
    current=candidate;
    const distractors=[...pool].filter(x=>x.character!==current.character)
      .sort(()=>Math.random()-.5).slice(0,3);
    const options=[current,...distractors].sort(()=>Math.random()-.5);
    app.innerHTML=`${header("ENDLESS RANDOM",mode==="hiragana"?"Tebak Hiragana":"Tebak Katakana","Huruf akan terus diacak. Berhenti kapan saja saat kamu sudah selesai belajar.")}
      <div class="quiz-shell card">
        <div class="quiz-top"><span class="badge blue">♾ Endless</span><strong>${correctCount}/${total} benar</strong></div>
        <div class="kana-question jp">${current.character}</div>
        <p class="center-muted">Huruf ini dibaca apa?</p>
        <div class="answers kana-answers">
          ${options.map((o,n)=>`<button class="answer-btn" data-romaji="${o.romaji}">${String.fromCharCode(65+n)}. ${o.romaji}</button>`).join("")}
        </div>
        <div id="kanaFeedback" class="quiz-feedback" aria-live="polite"></div>
        <div class="endless-actions"><a class="btn secondary" href="#/practice">Selesai Belajar</a></div>
      </div>`;
    document.querySelectorAll(".answer-btn").forEach(btn=>btn.onclick=()=>{
      if(locked) return;
      locked=true; total++;
      const ok=btn.dataset.romaji===current.romaji;
      if(ok){correctCount++; addXP(1);}
      btn.classList.add(ok?"correct":"wrong");
      document.querySelectorAll(".answer-btn").forEach(b=>{
        if(b.dataset.romaji===current.romaji) b.classList.add("correct");
        b.disabled=true;
      });
      $("#kanaFeedback").innerHTML=`<strong>${ok?"Benar!":"Belum tepat."}</strong> ${current.character} = ${current.romaji}
        <button class="btn primary" id="nextRandom">Huruf Berikutnya →</button>`;
      $("#nextRandom").onclick=next;
    });
  };
  next();
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

function progress(){
  const history=state.quizHistory || [];
  const correct=history.filter(x=>x.correct).length;
  const accuracy=history.length ? Math.round(correct/history.length*100) : 0;
  const masteryVals=Object.values(state.mastery || {});
  const mastered=masteryVals.filter(x=>Number(x)>=70).length;

  const kanaItems=(type)=>kana.filter(x=>x.type===type);
  const kanaDone=(type)=>kanaItems(type).filter(x=>{
    const keys=[`${type}:${x.character}`,x.character,`${type}-${x.character}`];
    return keys.some(k=>Number(state.mastery?.[k]||0)>=70) || (state.completed||[]).some(v=>String(v).includes(x.character));
  }).length;

  const hTotal=kanaItems("hiragana").length, kTotal=kanaItems("katakana").length;
  const hDone=kanaDone("hiragana"), kDone=kanaDone("katakana");
  const pct=(a,b)=>b?Math.min(100,Math.round(a/b*100)):0;

  const levelProgress=level=>{
    const items=[
      ...vocab.filter(x=>x.level===level).map(x=>x.word),
      ...kanji.filter(x=>x.level===level).map(x=>x.k),
      ...grammar.filter(x=>x.level===level).map(x=>x.pattern)
    ];
    const done=items.filter(item=>{
      return Number(state.mastery?.[item]||0)>=70 ||
        (state.completed||[]).some(v=>String(v).includes(item));
    }).length;
    return {done,total:items.length,percent:pct(done,items.length)};
  };

  const n5=levelProgress("N5"), n4=levelProgress("N4"), n3=levelProgress("N3");
  const quizScores=history.map(x=>Number(x.score)).filter(Number.isFinite);
  const lastScore=quizScores.length?quizScores.at(-1):null;
  const bestScore=quizScores.length?Math.max(...quizScores):null;
  const wrongCount=(state.wrong||[]).length;

  const bar=(label,done,total,percent)=>`
    <div class="progress-row">
      <div class="progress-label"><strong>${label}</strong><span>${done}/${total} • ${percent}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
    </div>`;

  app.innerHTML=`${header("PROGRES","Progres Belajar","Pantau perkembangan belajar dari Kana hingga N3. Progres tersimpan ke akun saat kamu login.")}
  <div class="stats-grid">
    <div class="stat-card"><small>🔥 Streak</small><strong>${state.streak} hari</strong></div>
    <div class="stat-card"><small>⭐ Total XP</small><strong>${state.xp}</strong></div>
    <div class="stat-card"><small>🎯 Akurasi</small><strong>${accuracy}%</strong></div>
    <div class="stat-card"><small>✅ Dikuasai</small><strong>${mastered}</strong></div>
  </div>

  <div class="card section">
    <div class="section-head"><div><span class="eyebrow">KANA</span><h2>Hiragana & Katakana</h2></div></div>
    ${bar("Hiragana",hDone,hTotal,pct(hDone,hTotal))}
    ${bar("Katakana",kDone,kTotal,pct(kDone,kTotal))}
  </div>

  <div class="card section">
    <div class="section-head"><div><span class="eyebrow">JLPT PATH</span><h2>Perkembangan N5 → N3</h2></div></div>
    ${bar("N5",n5.done,n5.total,n5.percent)}
    ${bar("N4",n4.done,n4.total,n4.percent)}
    ${bar("N3",n3.done,n3.total,n3.percent)}
    <p class="muted progress-note">Persentase dihitung dari materi kurikulum yang tersedia di Japanese Journey saat ini.</p>
  </div>

  <div class="progress-two section">
    <div class="card">
      <span class="eyebrow">KUIS</span><h2>Performa Latihan</h2>
      <div class="mini-stats">
        <div><small>Riwayat jawaban</small><strong>${history.length}</strong></div>
        <div><small>Benar</small><strong>${correct}</strong></div>
        <div><small>Perlu review</small><strong>${wrongCount}</strong></div>
        <div><small>Skor terbaik</small><strong>${bestScore===null?"—":bestScore+"%"}</strong></div>
      </div>
      <p class="muted">Skor terakhir: <strong>${lastScore===null?"belum ada":lastScore+"%"}</strong></p>
    </div>
    <div class="card">
      <span class="eyebrow">REKOMENDASI</span><h2>Langkah Berikutnya</h2>
      <p>${wrongCount>0?`Ada <strong>${wrongCount}</strong> item yang perlu diulang. Review akan muncul di dalam alur belajar.`:"Belum ada item yang perlu direview. Lanjutkan materi berikutnya."}</p>
      <a class="btn primary" href="#/learn">Lanjut Belajar</a>
    </div>
  </div>`;
}

function profile(){
 const hist=state.quizHistory;
 const acc=hist.length?Math.round(hist.filter(x=>x.correct).length/hist.length*100):0;
 const mastered=Object.values(state.mastery).filter(x=>x>=70).length;

 if(!supabaseReady){
   app.innerHTML=`${header("PROFIL","Aktifkan Login Online","Frontend sudah siap untuk akun sungguhan. Hubungkan project Supabase melalui config.js.")}
   <div class="card login-card">
     <span class="badge amber">Setup diperlukan</span>
     <h2>Login online belum dihubungkan</h2>
     <p>Isi <strong>SUPABASE_URL</strong> dan <strong>SUPABASE_PUBLISHABLE_KEY</strong> pada file <strong>config.js</strong>, kemudian jalankan <strong>supabase-setup.sql</strong> di Supabase SQL Editor.</p>
   </div>
   <div class="card profile-card section">
     <img class="profile-photo profile-photo-img" src="profile.jpg" alt="Foto Muhamad Panji, S.Pd.">
     <div><span class="badge blue">Penyusun</span><h2 style="margin-top:12px">Muhamad Panji, S.Pd.</h2><p><strong>Pendidikan</strong><br>Pendidikan Teknik Mesin<br>FPTK — Universitas Pendidikan Indonesia</p></div>
   </div>`;
   return;
 }

 if(!authUser){
   app.innerHTML=`${header("PROFIL","Akun Peserta Belajar","Daftar atau masuk agar progres tersimpan online dan dapat digunakan di perangkat lain.")}
   <div class="profile-layout">
     <div class="card login-card">
       <div class="auth-tabs"><button class="tab active" id="loginTab">Masuk</button><button class="tab" id="registerTab">Daftar</button></div>
       <div id="authMessage" class="auth-message" aria-live="polite"></div>

       <form id="loginForm" class="login-form">
         <label>Email<input id="loginEmail" type="email" required autocomplete="email" placeholder="nama@email.com"></label>
         <label>Password<input id="loginPassword" type="password" required minlength="6" autocomplete="current-password" placeholder="Minimal 6 karakter"></label>
         <button class="btn primary" type="submit">Masuk</button>
       </form>

       <form id="registerForm" class="login-form hidden">
         <label>Nama peserta<input id="registerName" required minlength="2" autocomplete="name" placeholder="Nama lengkap"></label>
         <label>Email<input id="registerEmail" type="email" required autocomplete="email" placeholder="nama@email.com"></label>
         <label>Password<input id="registerPassword" type="password" required minlength="6" autocomplete="new-password" placeholder="Minimal 6 karakter"></label>
         <button class="btn primary" type="submit">Buat Akun</button>
       </form>
     </div>
     <div class="card profile-card">
       <img class="profile-photo profile-photo-img" src="profile.jpg" alt="Foto Muhamad Panji, S.Pd.">
       <div><span class="badge blue">Penyusun</span><h2 style="margin-top:12px">Muhamad Panji, S.Pd.</h2><p><strong>Pendidikan</strong><br>Pendidikan Teknik Mesin<br>FPTK — Universitas Pendidikan Indonesia</p></div>
     </div>
   </div>`;

   const loginForm=$("#loginForm"), registerForm=$("#registerForm"), msg=$("#authMessage");
   const setMode=mode=>{
     const login=mode==="login";
     $("#loginTab").classList.toggle("active",login);
     $("#registerTab").classList.toggle("active",!login);
     loginForm.classList.toggle("hidden",!login);
     registerForm.classList.toggle("hidden",login);
     msg.textContent="";
   };
   $("#loginTab").onclick=()=>setMode("login");
   $("#registerTab").onclick=()=>setMode("register");

   loginForm.onsubmit=async e=>{
     e.preventDefault();
     msg.textContent="Sedang masuk...";
     const {data,error}=await supabase.auth.signInWithPassword({
       email:$("#loginEmail").value.trim(),
       password:$("#loginPassword").value
     });
     if(error){msg.textContent=error.message;return;}
     authUser=data.user;
     await loadProgressFromCloud();
     profile();
   };

   registerForm.onsubmit=async e=>{
     e.preventDefault();
     msg.textContent="Membuat akun...";
     const name=$("#registerName").value.trim();
     const email=$("#registerEmail").value.trim();
     const password=$("#registerPassword").value;
     const {data,error}=await supabase.auth.signUp({
       email,password,
       options:{
         data:{full_name:name},
         emailRedirectTo:location.origin + location.pathname + "#/profile"
       }
     });
     if(error){msg.textContent=error.message;return;}
     if(data.session){
       authUser=data.user;
       await supabase.from("profiles").upsert({id:data.user.id,full_name:name,email});
       await syncProgressToCloud();
       profile();
     }else{
       msg.innerHTML="<strong>Akun dibuat.</strong> Cek email untuk verifikasi, lalu kembali dan masuk.";
     }
   };
 }else{
   const name=authUser.user_metadata?.full_name || "Peserta Belajar";
   app.innerHTML=`${header("PROFIL","Profil Belajar","Akun aktif dan progres belajar tersimpan online.")}
   <div class="card learner-profile">
     <div class="learner-avatar">${escapeHtml(name.trim().charAt(0).toUpperCase() || "P")}</div>
     <div><span class="badge green">● Online</span><h2>${escapeHtml(name)}</h2><p>${escapeHtml(authUser.email || "")}</p><small>Progress tersinkron ke akun ini.</small></div>
     <button class="btn outline" id="logoutBtn">Keluar</button>
   </div>
   <div class="stats-grid section">
     <div class="stat-card"><small>🔥 Streak</small><strong>${state.streak} hari</strong></div>
     <div class="stat-card"><small>⭐ XP</small><strong>${state.xp}</strong></div>
     <div class="stat-card"><small>🎯 Akurasi</small><strong>${acc}%</strong></div>
     <div class="stat-card"><small>✅ Dikuasai</small><strong>${mastered}</strong></div>
   </div>
   <div class="card profile-card section">
     <img class="profile-photo profile-photo-img" src="profile.jpg" alt="Foto Muhamad Panji, S.Pd.">
     <div><span class="badge blue">Penyusun</span><h2 style="margin-top:12px">Muhamad Panji, S.Pd.</h2><p><strong>Pendidikan</strong><br>Pendidikan Teknik Mesin<br>FPTK — Universitas Pendidikan Indonesia</p></div>
   </div>`;
   $("#logoutBtn").onclick=async()=>{
     await syncProgressToCloud();
     await supabase.auth.signOut();
     authUser=null;
     profile();
   };
 }
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
 document.querySelectorAll(".desktop-nav a,.mobile-nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+route()));
 const r=route();
 if(r==="/home"||r==="/") home();
 else if(r==="/learning-path"||r==="/learn") learn();
 else if(r==="/learn/kana") kanaPage();
 else if(r==="/learn/kanji") kanjiPage();
 else if(r==="/learn/vocab") vocabPage();
 else if(r==="/learn/grammar") grammarPage();
 else if(r==="/learn/listening") listeningPage();
 else if(r==="/learn/reading") readingPage();
 else if(r==="/practice/kana") writing("kana");
 else if(r==="/practice/kanji") writing("kanji");
 else if(r==="/practice/hiragana-quiz") kanaQuiz("hiragana");
 else if(r==="/practice/katakana-quiz") kanaQuiz("katakana");
 else if(r==="/practice/hiragana-random") kanaEndless("hiragana");
 else if(r==="/practice/katakana-random") kanaEndless("katakana");
 else if(r==="/review") review();
 else if(r==="/progress") progress();
 else if(r==="/placement") placement();
 else if(r==="/profile") profile();
 else home();
 window.scrollTo({top:0,behavior:"smooth"});
}
window.addEventListener("hashchange",render);

async function initApp(){
  if(supabaseReady){
    const {data}=await supabase.auth.getSession();
    authUser=data.session?.user || null;
    if(authUser) await loadProgressFromCloud();
    supabase.auth.onAuthStateChange(async (_event,session)=>{
      authUser=session?.user || null;
      if(authUser) await loadProgressFromCloud();
      render();
    });
  }
  render();
}
initApp();
