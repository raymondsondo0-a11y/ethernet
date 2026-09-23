const soundBtn=document.getElementById('soundBtn');
let audioCtx=null;
soundBtn.addEventListener('click',()=>{
  if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') audioCtx.resume();
  const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
  osc.type='sine'; osc.frequency.value=432; gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.035,audioCtx.currentTime+.08);
  gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+2.2);
  osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime+2.3);
  soundBtn.textContent='♪';
  setTimeout(()=>soundBtn.textContent='♫',2500);
});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href')); if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
}));