const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const screens=$$('.screen');let idx=0,locked=false,musicOn=false;

function update(){
  screens.forEach((s,i)=>s.classList.toggle('active',i===idx));
  $('#counter').textContent=String(idx+1).padStart(2,'0')+' / '+String(screens.length).padStart(2,'0');
  $('#progress').style.width=((idx+1)/screens.length*100)+'%';
  $('#prevPage').disabled=idx===0;
  $('#nextPage').disabled=idx===screens.length-1;
  $('#navDots').innerHTML=screens.map((_,i)=>`<i class="${i===idx?'on':''}"></i>`).join('');
  if(idx===5)runTerminal();
  if(idx===10)renderQuiz();
}
function go(d){if(locked)return;const n=Math.max(0,Math.min(screens.length-1,idx+d));if(n===idx)return;locked=true;screens[idx].classList.add('out');idx=n;update();setTimeout(()=>{screens.forEach(s=>s.classList.remove('out'));locked=false},760)}
$('#prevPage').onclick=()=>go(-1);$('#nextPage').onclick=()=>go(1);

function music(){const a=$('#bgm');a.volume=.36;const p=a.play();if(p?.catch)p.catch(()=>{});musicOn=true;$('#musicBtn').innerHTML='♫ <span>music on</span>'}
$('#musicBtn').onclick=()=>{const a=$('#bgm');if(a.paused)music();else{a.pause();musicOn=false;$('#musicBtn').innerHTML='♫ <span>music off</span>'}};
document.addEventListener('pointerdown',e=>{if(!musicOn&&!e.target.closest('#musicBtn'))music()},{once:true});

const allowed=['beautiful','pretty','love','cutie','adu','pakhi'];
$('#unlock').onclick=()=>{const v=$('#password').value.trim().toLowerCase();if(allowed.includes(v)){ $('#error').textContent='';idx=2;update(); }else $('#error').textContent='Try again, love. ♡'};
$('#password').onkeydown=e=>{if(e.key==='Enter')$('#unlock').click()};

// Birthday candles: a staged blow-out with flame distortion, glow collapse and smoke.
$('#blow').onclick=()=>{
 const cake=$('#cake'); if(cake.classList.contains('blown'))return;
 cake.classList.add('blown');
 const candles=$$('.candles b');
 $('#wish').textContent='The flame is fighting back… blow again. ✨';
 candles.forEach((c,i)=>{setTimeout(()=>{c.classList.add('extinguished')},i*220)});
 setTimeout(()=>{$('#wish').textContent='The candles are out… look at the smoke carrying your wish. ♡'},900);
 setTimeout(()=>{$('#wish').textContent='Wish sent. I hope every part of it comes true. ✨'},2700);
 $('#blow').textContent='wish sent ♡';$('#blow').disabled=true;
};


let termTimer;
function runTerminal(){clearTimeout(termTimer);const box=$('#termText');box.innerHTML='';const lines=['booting boyfriend.exe …','loyalty.dll .......... OK','patience.sys .......... OK','hand-holding module ... OVERCLOCKED','future_plans.dat ...... FOUND','love.exe .............. RUNNING','final diagnosis ....... need hugs immediately 🫂'];lines.forEach((x,i)=>termTimer=setTimeout(()=>{const d=document.createElement('div');d.className='term '+(i>3?'ok':'');d.textContent='> '+x;box.appendChild(d)},i*300))}
$('#run').onclick=runTerminal;

const archiveFiles=[
 '01.webp',
 '02.webp',
 '03.webp',
 '04.webp',
 '05.webp',
 '06.webp',
 '07.webp',
 '08.webp',
 '09.webp',
 '10.webp'
];

const galleryFiles=[
 '11.webp',
 '12.webp',
 '13.webp',
 '14.webp',
 '15.webp',
 '16.webp',
 '17.webp',
 '18.webp',
 '19.webp',
 '20.webp',
 '21.webp',
 '22.webp',
 '23.webp',
 '24.webp',
 '25.webp',
 '26.webp',
 '27.webp',
 '28.webp',
 '29.webp',
 '30.webp'
];

// Love Archive = Adu's 10 solo photos. Each photo + reason changes together.
const reasons=[
 ['Your smile. Obviously.','That smile has a ridiculous ability to make everything around you feel warmer.'],
 ['The way you carry yourself.','There is something quietly beautiful about you that I notice even in the simplest moments.'],
 ['Your funny little faces.','The unfiltered, silly version of you is one of my favourite versions.'],
 ['How comfortable you feel.','You became my best friend before you became my girlfriend, and that makes being beside you feel so natural.'],
 ['Your little moments of elegance.','Whether you are dressed up or just being yourself, there is always something about you that catches my eye.'],
 ['The girl I can simply sit beside.','I do not need every moment to be exciting. Sometimes having you beside me is enough.'],
 ['Your warmth.','You have a way of making an ordinary moment feel softer, brighter, and more worth remembering.'],
 ['The gentle side of you.','Your care and the little things you do stay with me more than you probably realise.'],
 ['The real you.','Not a perfect version. Not a posed version. Just you — and that is the version I want.'],
 ['Simply… you.','After all the reasons, this is still the simplest answer: I love you because you are you. ♡']
];
let ai=0;
const photoCard=$('#photoCard'),img=$('#aimg');
function archiveRender(){const f=archiveFiles[ai];img.src='assets/photos/'+f;$('#anum').textContent=String(ai+1).padStart(2,'0')+' / 10';$('#rnum').textContent=String(ai+1).padStart(2,'0');$('#reasonTitle').textContent=reasons[ai][0];$('#reasonText').textContent=reasons[ai][1];$('#dots').innerHTML=reasons.map((_,i)=>`<i class="${i===ai?'on':''}"></i>`).join('');photoCard.classList.remove('shine');void photoCard.offsetWidth;photoCard.classList.add('shine')}
function archiveStep(d){ai=(ai+d+archiveFiles.length)%archiveFiles.length;archiveRender()}
$('#archivePrev').onclick=()=>archiveStep(-1);$('#archiveNext').onclick=()=>archiveStep(1);
let ax=0;const stage=$('#archiveStage');stage.addEventListener('touchstart',e=>ax=e.touches[0].clientX,{passive:true});stage.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-ax;if(Math.abs(d)>45)archiveStep(d<0?1:-1)},{passive:true});
archiveRender();

let wallBuilt=false;function buildWall(){if(wallBuilt)return;wallBuilt=true;const w=$('#wall');w.innerHTML='';galleryFiles.forEach((f,i)=>{const d=document.createElement('div');d.className='memory';d.innerHTML=`<img loading="lazy" src="assets/photos/${f}" alt="Us memory ${i+1}"><span>OUR MEMORY ${String(i+1).padStart(2,'0')}</span>`;w.appendChild(d)})}buildWall();

// Detective Adu — a case file built around Adu herself.
const detectiveCases=[
 {q:'PROFILE CLUE 01 · Before she became your girlfriend, what was Adu?',a:['Your best friend','Your detective partner','Your travel agent','A stranger'],ok:0,e:'CLUE UNLOCKED — Adu was your best friend first. That is why the case starts with history, not a random romance.'},
 {q:'PROFILE CLUE 02 · Which small thing from Adu means more than it looks?',a:['Her holding your hand','Her detective badge','Her secret passport','Her Wi‑Fi password'],ok:0,e:'CLUE UNLOCKED — Her hand in yours is one of the little things you specifically treasure.'},
 {q:'PROFILE CLUE 03 · What is one of Adu’s traits that you openly love?',a:['Her funny faces','Her ability to solve crimes','Her habit of disappearing','Her secret superpower'],ok:0,e:'CLUE UNLOCKED — Her funny faces made the profile. You love the playful, unfiltered version of her.'},
 {q:'PROFILE CLUE 04 · What everyday skill belongs in Adu’s case file?',a:['Her cooking','Her detective handwriting','Her airport navigation','Her secret coding skills'],ok:0,e:'CLUE UNLOCKED — Her cooking is one of the ordinary things you explicitly said you want in your life together.'},
 {q:'PROFILE CLUE 05 · What does Adu sometimes give you even when you know you don’t deserve it?',a:['Forgiveness','A detective license','A plane ticket','A lifetime pizza pass'],ok:0,e:'CLUE UNLOCKED — Her forgiveness is part of the reason you feel lucky to have her.'},
 {q:'FINAL CLUE · What does the complete Adu profile point to?',a:['A girl who feels like home','A mysterious stranger','A temporary chapter','A future detective boss'],ok:0,e:'FINAL EVIDENCE — Profile complete. Best friend. Caring. Funny. Cook. Forgiving. Home. The case was never really about finding Adu — it was about noticing how much of your favourite life is tied to her. ♡'}
];
let detectiveStep=0, detectiveScore=0;
function detectiveRender(){
 const q=detectiveCases[detectiveStep];
 $('#clueCount').textContent=String(detectiveStep+1).padStart(2,'0')+' / '+String(detectiveCases.length).padStart(2,'0');
 $('#detectiveQuestion').textContent=q.q;
 $('#detectiveChoices').innerHTML=q.a.map((a,i)=>`<button class="detective-answer" data-i="${i}">${String.fromCharCode(65+i)} · ${a}</button>`).join('');
 $('#detectiveHint').textContent='Choose the clue that best describes Adu. 🔎';
 $('#evidenceMeter').style.width=(detectiveStep/detectiveCases.length*100)+'%';
 $$('#detectiveChoices .detective-answer').forEach(b=>b.onclick=()=>detectiveAnswer(Number(b.dataset.i)));
}
function detectiveAnswer(choice){
 const q=detectiveCases[detectiveStep],buttons=$$('#detectiveChoices .detective-answer');buttons.forEach(b=>b.disabled=true);const chosen=buttons[choice];
 if(choice===q.ok){detectiveScore++;chosen.classList.add('correct');$('#detectiveHint').textContent='Clue confirmed. Adu gets another stamp. 💗'}
 else{chosen.classList.add('wrong');buttons[q.ok].classList.add('correct');$('#detectiveHint').textContent='Not quite. The case file says otherwise.'}
 $('#evidencePaper').innerHTML=`<div class="evidence-lock">${choice===q.ok?'🔓':'📎'}</div><b>${q.e}</b><p>Clue ${detectiveStep+1} of ${detectiveCases.length} recovered.</p>`;
 $('#evidenceMeter').style.width=((detectiveStep+1)/detectiveCases.length*100)+'%';
 setTimeout(()=>{detectiveStep++;if(detectiveStep<detectiveCases.length)detectiveRender();else{$('#detectiveQuestion').innerHTML='ADU PROFILE COMPLETE <span class="final-heart">♡</span>';$('#detectiveChoices').innerHTML='';$('#detectiveHint').textContent=`Adu profile score: ${detectiveScore}/${detectiveCases.length}.`;$('#evidencePaper').innerHTML='<div class="evidence-lock">💗</div><b>CASE FILE: ADU</b><p>Verdict: the evidence says she is caring, funny, forgiving, familiar, and completely irreplaceable.</p>';$('#detectiveResult').innerHTML='<span>CASE CLOSED</span><strong>Verdict: Adu is home. ♡</strong><p>The detective has officially documented the girl behind the memories.</p>';$('#detectiveResult').classList.add('show')}},850)
}
$$('.suspect').forEach(b=>b.onclick=()=>{$$('.suspect').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');$('#detectiveHint').textContent='Focus on Adu. Every clue in this case file is about her. 🔎'});
detectiveRender();

// One-question-per-page compatibility test — every question comes from details of Hossen + Adu's story.
const qdata=[
 ['Before she became your girlfriend, who was Adu in your life?',['Your best friend','Your detective partner','Your neighbour','A stranger'],0],
 ['Which little thing about Adu appears in your letter as something you treasure?',['Her hand in yours','Her passport','Her phone','Her shoes'],0],
 ['Which playful Adu trait do you specifically love?',['Her funny faces','Her detective skills','Her silent treatment','Her secret superpower'],0],
 ['Which everyday thing of Adu do you want in your ordinary days?',['Her cooking','Her office reports','Her gaming scores','Her travel checklist'],0],
 ['When you think about Adu’s care, which word fits what you wrote?',['Care','Competition','Mystery','Distance'],0],
 ['What does Adu give you that you explicitly appreciate?',['Forgiveness','A detective badge','A flight ticket','A trophy'],0],
 ['What kind of days do you want to keep having with Adu?',['Ordinary days together','Only expensive holidays','Only perfect days','Days apart'],0],
 ['Which place is part of the future you imagine with Adu?',['Japan','Mars','Paris only','A secret island'],0],
 ['Which future picture did you write for the two of you?',['A home and two little kids','A detective agency','A solo world tour','A life with no plans'],0],
 ['What did Adu become before the romance made things different?',['Your best friend','Your boss','Your teacher','Your neighbour'],0],
 ['What feeling describes loving Adu in your letter?',['Natural','Complicated and distant','Temporary','Unknown'],0],
 ['Final clue: after all the little details, who is the person at the centre of this whole website?',['Adu','Japan','The detective','The food'],0]
];
let quizIndex=0,answers=Array(qdata.length).fill(null),quizFinished=false;
function renderQuiz(){
 if(quizFinished)return;
 const q=qdata[quizIndex];$('#quizCount').textContent=String(quizIndex+1).padStart(2,'0')+' / '+String(qdata.length).padStart(2,'0');$('#quizProgress').style.width=((quizIndex+1)/qdata.length*100)+'%';
 $('#quiz').innerHTML=`<article class="quiz-card"><div class="question-tag">QUESTION ${String(quizIndex+1).padStart(2,'0')}</div><h3>${q[0]}</h3><div class="answers">${q[1].map((a,j)=>`<button class="ans ${answers[quizIndex]===j?'sel':''}" data-j="${j}"><span>${String.fromCharCode(65+j)}</span>${a}</button>`).join('')}</div></article>`;
 $$('.ans').forEach(b=>b.onclick=()=>{answers[quizIndex]=Number(b.dataset.j);renderQuiz()});
 $('#quizPrev').disabled=quizIndex===0;$('#quizNext').textContent=quizIndex===qdata.length-1?'see result ♡':'next →';$('#quizResult').textContent='';
}
$('#quizPrev').onclick=()=>{if(quizIndex>0){quizIndex--;renderQuiz()}};
$('#quizNext').onclick=()=>{
 if(answers[quizIndex]===null){$('#quizResult').textContent='Choose one, birthday girl. ♡';return}
 if(quizIndex<qdata.length-1){quizIndex++;renderQuiz();return}
 const score=answers.reduce((n,a,i)=>n+(a===qdata[i][2]?1:0),0);quizFinished=true;
 $('#quiz').innerHTML=`<div class="quiz-finished"><div class="question-tag">COMPATIBILITY REPORT</div><h3>${score}/${qdata.length}</h3><p>${score===qdata.length?'Perfect score. Either you know us ridiculously well, or you have been paying very close attention. ♡':'A very respectable score. The important part is that every answer still leads back to us. ♥'}</p></div>`;
 $('#quizCount').textContent='DONE';$('#quizNext').textContent='finished ♡';$('#quizNext').disabled=true;$('#quizResult').textContent='The profile department has officially approved: Adu. ♡';
};

// Envelope opening: the exact letter appears only after the seal is opened.
function openLetter(){
 const env=$('#letterEnvelope'),paper=$('#actualLetter'),hint=$('.envelope-hint');
 if(env.classList.contains('open'))return;
 env.classList.add('open');
 hint.innerHTML='Seal opened. <b>Your letter is waiting…</b>';
 setTimeout(()=>{paper.classList.add('revealed');paper.scrollIntoView({behavior:'smooth',block:'start'});hint.innerHTML='♡ Read it slowly. It was written only for you.'},850);
}
$('#letterEnvelope').onclick=openLetter;$('#letterEnvelope').onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openLetter()};

// Restart absolutely everything without refreshing the browser.
$('#restartBtn').onclick=()=>{
 idx=0;locked=false;update();
 ai=0;archiveRender();
 quizIndex=0;answers=Array(qdata.length).fill(null);quizFinished=false;renderQuiz();
 detectiveStep=0;detectiveScore=0;$('#detectiveResult').classList.remove('show');$('#evidenceMeter').style.width='0%';$('#evidencePaper').innerHTML='<div class="evidence-lock">🔒</div><b>Evidence is encrypted.</b><p>Get through the interrogation to unlock the file.</p>';detectiveRender();
 const cake=$('#cake');cake.classList.remove('blown');$$('.candles b').forEach(c=>c.classList.remove('extinguished'));$('#blow').disabled=false;$('#blow').textContent='blow the candles ✨';$('#wish').textContent='Take a breath… then make your wish.';
 const env=$('#letterEnvelope'),paper=$('#actualLetter');env.classList.remove('open');paper.classList.remove('revealed');paper.scrollTop=0;document.querySelector('.letter-screen').scrollTop=0;
};

update();
