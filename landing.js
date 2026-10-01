(() => {
 const area=document.querySelector('.orbit-area'), ring=document.querySelector('.orbit-ring');
 if(!area||!ring)return;
 const cards=[...ring.children], button=area.querySelector('.orbit-pause');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let angle=0, last=0, paused=false, hovering=false, visible=true;
 function render(){
  ring.style.transform=`rotateY(${angle}deg)`;
  cards.forEach((card,i)=>{const facing=Math.cos((angle+i*360/14)*Math.PI/180);card.style.filter=`brightness(${.65+.35*Math.max(0,facing)})`;});
 }
 function frame(now){if(last&&!paused&&!hovering&&visible&&!document.hidden&&!reduced.matches){angle=(angle+Math.min(now-last,50)*.006)%360;render();}last=now;requestAnimationFrame(frame);}
 area.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hovering=true;});
 area.addEventListener('pointerleave',()=>hovering=false);
 area.addEventListener('focusin',()=>hovering=true);
 area.addEventListener('focusout',e=>{if(!area.contains(e.relatedTarget))hovering=false;});
 button.addEventListener('click',()=>{paused=!paused;button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Продолжить вращение':'Приостановить вращение');button.textContent=paused?'▶':'Ⅱ';});
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;}).observe(area);
 render();requestAnimationFrame(frame);
})();
