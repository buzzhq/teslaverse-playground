(function(){
const SUBS={tesla:[["overview","Overview"],["cars","Cars"],["energy","Energy"],["robotaxi","Robotaxi"],["optimus","Optimus"],["fsd","FSD"],["whatittakes","What it takes"],["trends","Trends"]],
 spacex:[["overview","Overview"],["starlink","Starlink"],["launch","Launch"],["xai","xAI"],["starship","Starship/other"]],
 nvidia:[["overview","Overview"],["dc","Data Center"],["edge","Edge/other"],["trends","Trends"]], sources:[], changes:[]};
const LEGACY={overview:"tesla/overview",cars:"tesla/cars",energy:"tesla/energy",robotaxi:"tesla/robotaxi",optimus:"tesla/optimus",fsd:"tesla/fsd",trends:"tesla/trends",spacex:"spacex/overview",nvidia:"nvidia/overview",beyond:"spacex/overview",assumptions:"tesla/overview"};
function show(){ let h=location.hash.slice(1)||"tesla/overview"; if(LEGACY[h]) h=LEGACY[h];
 let [co,sub]=h.split("/"); if(!SUBS[co]) {co="tesla";} if(co!=="sources"&&co!=="changes"&&!SUBS[co].some(s=>s[0]===sub)) sub="overview"; if(co==="sources"||co==="changes") sub="overview";
 document.querySelectorAll("#topbar a").forEach(a=>a.classList.toggle("on",a.dataset.co===co));
 const sb=document.getElementById("subbar"); sb.innerHTML=SUBS[co].map(s=>`<a href="#${co}/${s[0]}" class="${s[0]===sub?"on":""}">${s[1]}</a>`).join(""); sb.style.display=SUBS[co].length?"flex":"none";
 document.querySelectorAll(".panel").forEach(p=>p.style.display=(p.dataset.co===co&&p.dataset.sub===sub)?"":"none");
 const act=sb.querySelector(".on"); if(act) act.scrollIntoView({inline:"center",block:"nearest"});
 requestAnimationFrame(()=>Object.values(Chart.instances).forEach(c=>{ if(c.canvas.offsetParent){c.resize();c.update("none");} }));
 window.scrollTo(0,0);
}
window.addEventListener("hashchange",show); show();
})();
