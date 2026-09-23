$(function(){
  'use strict';

  const $topbar=$('.topbar');
  const audio=document.getElementById('memoryAudio');
  const $play=$('#memoryPlay');
  const $sound=$('#soundBtn');

  $(window).on('scroll',function(){
    $topbar.toggleClass('scrolled',window.scrollY>18);
  }).trigger('scroll');

  $('.section-head,.memory-card,.family-quote,.family-facts,.letter,.closing > *').addClass('reveal');
  const revealTargets=$('.reveal');
  const revealInView=function(){
    revealTargets.each(function(){
      const rect=this.getBoundingClientRect();
      if(rect.top < window.innerHeight*0.88 && rect.bottom > 0){
        $(this).addClass('is-visible');
      }
    });
  };
  const observer=window.IntersectionObserver ? new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        $(entry.target).addClass('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  if(window.IntersectionObserver){
    revealTargets.each(function(){observer.observe(this);});
  }else{
    revealInView();
    $(window).on('scroll resize',revealInView);
  }

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
    if(typeof audio.play!=='function')return;
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
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioContextClass)return;
    if(!audioCtx)audioCtx=new AudioContextClass();
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

  /* Letter-by-letter memorial reveal: words/content are untouched.
     Characters are revealed only when their section enters the viewport. */
  function prepareTypewriter(selector){
    $(selector).each(function(){
      const root=this;
      if(root.dataset.typePrepared==='1') return;
      root.dataset.typePrepared='1';

      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
      const nodes=[];
      let node;
      while((node=walker.nextNode())) nodes.push(node);

      nodes.forEach(function(textNode){
        if(!textNode.nodeValue.trim()) return;
        const frag=document.createDocumentFragment();
        Array.from(textNode.nodeValue).forEach(function(ch){
          if(ch===' ' || ch==='\n' || ch==='\t'){
            frag.appendChild(document.createTextNode(ch));
          }else{
            const span=document.createElement('span');
            span.className='type-char';
            span.textContent=ch;
            frag.appendChild(span);
          }
        });
        textNode.parentNode.replaceChild(frag,textNode);
      });
    });
  }

  function startTypewriter(el){
    if(el.dataset.typeStarted==='1') return;
    el.dataset.typeStarted='1';
    const chars=el.querySelectorAll('.type-char');
    chars.forEach(function(ch,i){
      setTimeout(function(){ ch.classList.add('typed'); }, Math.min(i*18, 4200));
    });
  }

  const typeTargets=$(
    '.section-head h2,'+
    '.memory-card h3,.memory-card p,'+
    '.family-quote p,'+
    '.letter p,.signature,'+
    '.closing h2,.closing-copy,.closing blockquote'
  );

  prepareTypewriter(typeTargets);

  if(window.IntersectionObserver){
    const typeObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          startTypewriter(entry.target);
          typeObserver.unobserve(entry.target);
        }
      });
    },{threshold:.10,rootMargin:'0px 0px -6% 0px'});
    typeTargets.each(function(){typeObserver.observe(this);});
  }else{
    typeTargets.each(function(){startTypewriter(this);});
  }

});