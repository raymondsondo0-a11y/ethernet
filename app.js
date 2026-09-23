$(function(){
  const $topbar=$('.topbar');
  const audio=document.getElementById('memoryAudio');
  const $play=$('#memoryPlay');
  const $sound=$('#soundBtn');

  $(window).on('scroll',function(){
    $topbar.toggleClass('scrolled',window.scrollY>18);
  }).trigger('scroll');

  $('.section-head,.memory-card,.family-quote,.family-facts,.letter,.closing > *').addClass('reveal');
  const observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        $(entry.target).addClass('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  $('.reveal').each(function(){observer.observe(this);});

  if(window.matchMedia('(pointer:fine)').matches){
    $('.hero').on('mousemove',function(e){
      const x=(e.clientX/window.innerWidth-.5)*7;
      const y=(e.clientY/window.innerHeight-.5)*5;
      $('.hero-orbit').css('margin-left',x+'px').css('margin-top',y+'px');
      $('.candle').css('transform','translate('+(-x*.3)+'px,'+(-y*.3)+'px)');
    }).on('mouseleave',function(){
      $('.hero-orbit').css({marginLeft:'',marginTop:''});
      $('.candle').css('transform','');
    });
  }

  $play.on('click',function(){
    if(!audio)return;
    if(audio.paused){
      audio.play().then(function(){
        $play.text('❚❚').addClass('playing');
      }).catch(function(){
        $play.text('▶').removeClass('playing');
      });
    }else{
      audio.pause();
      $play.text('▶').removeClass('playing');
    }
  });

  $(audio).on('ended',function(){
    $play.text('▶').removeClass('playing');
  });

  let audioCtx=null;
  $sound.on('click',function(){
    if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended')audioCtx.resume();
    const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
    osc.type='sine';
    osc.frequency.value=432;
    gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.035,audioCtx.currentTime+.08);
    gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+2.2);
    osc.connect(gain);gain.connect(audioCtx.destination);
    osc.start();osc.stop(audioCtx.currentTime+2.3);
    $sound.text('♪');
    setTimeout(function(){$sound.text('♫');},2500);
  });

  $('a[href^="#"]').on('click',function(e){
    const target=$(this.getAttribute('href'));
    if(target.length){
      e.preventDefault();
      $('html,body').animate({scrollTop:target.offset().top-78},650);
    }
  });
});