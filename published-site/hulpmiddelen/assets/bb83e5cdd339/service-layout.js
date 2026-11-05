import {motionPlans} from './service-motion.js';
// Preserve the original React disclosure/typing controller; enhance geometry only.
(() => {
  function initialise() {
    if (!document.documentElement.classList.contains('animations-ready')) return false;
    const grid = document.querySelector('.service-grid');
    if (!grid || grid.classList.contains('domi-service-layout')) return false;
    const shells = [...grid.querySelectorAll('.service-card-shell')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Map();
    const fullDetails = shells.map(shell => {
      const card = shell.querySelector('.service-card');
      const prefix = `${card.querySelector('h3').textContent}: ${card.querySelector('.service-summary').textContent} `;
      const label = card.querySelector('.service-expand-trigger').getAttribute('aria-label') || '';
      return label.startsWith(prefix) ? label.slice(prefix.length) : card.querySelector('.service-detail-visible').textContent;
    });
    let previous = null, active = -1, gridWidth = 0;
    let scrollFrame=0;
    function clearFloatingCollision() {
      const button=grid.querySelector('.service-card.active .service-more-button');
      const floating=document.querySelector('.whatsapp-float');
      let collision=false;
      if(button && floating && window.matchMedia('(max-width:680px)').matches){
        const a=button.getBoundingClientRect(),b=floating.getBoundingClientRect();
        collision=Math.min(a.right,b.right)>Math.max(a.left,b.left)&&Math.min(a.bottom,b.bottom)>Math.max(a.top,b.top);
      }
      document.body.classList.toggle('domi-service-cta-clear',collision);
    }
    window.addEventListener('scroll',()=>{
      if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;clearFloatingCollision();});
    },{passive:true});
    const positions = () => shells.map(shell => {const r=shell.getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width};});
    function remember() {
      previous = positions();
      animations.forEach(animation => animation.cancel());animations.clear();
    }
    function heightFor(shell, index) {
      const expanded = shell.classList.contains('active');
      const card = shell.querySelector('.service-card');
      const width = shell.getBoundingClientRect().width;
      const clone = card.cloneNode(true);
      clone.classList.remove('reveal-item','is-visible');
      clone.setAttribute('aria-hidden','true');clone.setAttribute('inert','');
      clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
      Object.assign(clone.style,{position:'absolute',left:'-10000px',right:'auto',top:'0',width:`${width}px`,height:'auto',minHeight:'0',visibility:'hidden',transform:'none',transition:'none'});
      const mobile = window.matchMedia('(max-width:680px)').matches;
      const textWidth = expanded && !mobile ? width*.56-44 : width-44;
      for (const child of clone.children) {
        if (!child.matches('.service-image,.service-expand-trigger,.service-more-button')) {
          child.style.width=`${textWidth}px`;child.style.transition='none';
        }
      }
      clone.querySelector('.service-detail-visible').textContent=fullDetails[index];
      clone.querySelector('.service-detail-visible').classList.remove('typing');
      document.body.append(clone);
      const top=clone.getBoundingClientRect().top;
      const bottom=clone.querySelector(expanded?'.service-detail':'.service-summary').getBoundingClientRect().bottom;
      const button=clone.querySelector('.service-more-button');
      const buttonSpace=expanded?button.getBoundingClientRect().height+parseFloat(getComputedStyle(button).bottom)+22:22;
      const height=Math.ceil(Math.max(mobile?(expanded?420:210):(expanded?310:224),bottom-top+buttonSpace+8));
      clone.remove();return height;
    }
    function resize() {
      shells.forEach((shell,index)=>shell.style.setProperty('--domi-card-height',`${heightFor(shell,index)}px`));
      clearFloatingCollision();
      window.setTimeout(clearFloatingCollision,520);
    }
    function animatePositions(before) {
      motionPlans(before,positions(),reduce.matches).forEach(({index,dx,dy,scale})=>{
        const shell=shells[index];
        if(typeof shell.animate!=='function')return;
        const animation=shell.animate([{transform:`translate(${dx}px,${dy}px) scaleX(${scale})`},{transform:'translate(0,0) scaleX(1)'}],{duration:480,easing:'cubic-bezier(.22,.8,.24,1)'});
        animations.set(shell,animation);
        animation.finished.then(()=>{if(animations.get(shell)===animation)animations.delete(shell);},()=>{});
      });
    }
    grid.classList.add('domi-service-layout');resize();
    grid.addEventListener('click',remember,true);
    grid.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')remember();},true);
    new MutationObserver(()=>{
      const next=shells.findIndex(shell=>shell.classList.contains('active'));
      if(next===active)return;
      active=next;resize();animatePositions(previous);previous=null;
    }).observe(grid,{attributes:true,attributeFilter:['class'],subtree:true});
    new ResizeObserver(()=>{
      const width=grid.getBoundingClientRect().width;
      if(Math.abs(width-gridWidth)<.5)return;
      gridWidth=width;animations.forEach(animation=>animation.cancel());animations.clear();resize();
    }).observe(grid);
    reduce.addEventListener('change',()=>{if(reduce.matches){animations.forEach(animation=>animation.cancel());animations.clear();}});
    document.fonts.ready.then(resize);
    return true;
  }
  const observer=new MutationObserver(()=>{if(initialise())observer.disconnect();});
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  if(initialise())observer.disconnect();
})();
