const section=document.querySelector(".arrow-section"),footer=document.querySelector(".footer"),cols=10,rows=6,arrows=[];function isCSSEnabled(){const e=document.createElement("div");e.style.display="none",document.body.appendChild(e);const t="none"===window.getComputedStyle(e).display;return document.body.removeChild(e),t}if(isCSSEnabled()&&section){for(let e=0;e<60;e++){const e=document.createElement("div");e.classList.add("arrow"),e.innerHTML="→",section.appendChild(e),arrows.push(e)}footer.addEventListener("mousemove",(e=>{const{clientX:t,clientY:o}=e;section.getBoundingClientRect();arrows.forEach((e=>{const n=e.getBoundingClientRect(),r=n.left+n.width/2,c=n.top+n.height/2,d=Math.atan2(o-c,t-r)*(180/Math.PI);e.style.transform=`rotate(${d}deg)`}))}))}const scrollToTopBtn=document.getElementById("scrollToTopBtn");scrollToTopBtn.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})})),document.addEventListener("scroll",(function(){const e=window.scrollY,t=document.querySelector(".parallax-img");t.style.transform=`translateY(${.2*e}px)`;let o=1-e/800;t.style.opacity=o>0?o:0})),window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.setAttribute("data-bs-theme","dark"):document.documentElement.setAttribute("data-bs-theme","light"),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>{document.documentElement.setAttribute("data-bs-theme",e.matches?"dark":"light")})),console.log("Hey there, inspector! 🕵️‍♂️ I’m just a non-developer trying my hand at creating my online portfolio 😅. Let me know if you’re taking a peek!");