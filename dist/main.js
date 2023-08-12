try {!function(){var e,t,n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["January","February","March","April","May","June","July","August","September","October","November","December"];function r(e,t){if(t>3)throw new Error("numDigits must be <= 3");return("000"+e).slice(-t)}function o(){var e=new Date,t=0==e.getTimezoneOffset()?5:0;return e.setHours(e.getHours()-t),e}function c(e,t){e.innerText=function(e){var t=o(),n=t.getHours(),a=n>=12?" PM":" AM",c=r(n>12?n-12:n,2)+":"+r(t.getMinutes(),2);return e&&(c+=":"+r(t.getSeconds(),2)),c+a}(t);var n=1e3*(60-(new Date).getSeconds());setTimeout((function(){c(e,t)}),n)}function d(e,t){e.innerText=function(){var e=o();return r(e.getMonth()+1,2)+"/"+r(e.getDate(),2)+"/"+e.getFullYear().toString().slice(-2)}();var n=o(),a=864e5-1e3*(60*n.getHours()*60+60*n.getMinutes()+n.getSeconds());t&&(e.innerText+=" (Update in: "+(a/1e3/60/60).toFixed(2)+" hrs.)"),setTimeout((function(){d(e,t)}),a)}document.addEventListener("DOMContentLoaded",(function(){t=document.getElementById("consoleElem");try{(function(e){var t=document.createElement("div");t.className+=" clock",e.appendChild(t),c(t,!1);var n=document.createElement("div");n.className+=" date",e.appendChild(n),d(n,!1)})(e=document.getElementById("app")),function(e){var t=o(),r=document.createElement("table");r.className+=" calendar",r.setAttribute("cellspacing","0"),r.setAttribute("cellpadding","4"),e.appendChild(r);var c=document.createElement("thead");r.appendChild(c);var d=document.createElement("th");c.appendChild(d),d.setAttribute("colspan","7"),d.innerText=a[t.getMonth()]+" "+t.getFullYear();var i=document.createElement("tbody");r.appendChild(i);var u=document.createElement("tr");u.className+=" days",i.appendChild(u);for(var l=0;l<n.length;l++){var s=document.createElement("td");u.appendChild(s),s.innerText=n[l]}var m=t.getDate()-t.getDay(),g=new Date(t.getTime());for(g.setDate(m-7),l=0;l<4;l++){var p=document.createElement("tr");i.appendChild(p);for(var h=0;h<n.length;h++){s=document.createElement("td"),p.appendChild(s);var v=g.getDate();g<t&&(s.className+=" day-past"),g.getMonth()!=t.getMonth()&&(s.className+=" month-other"),g.getDate()==t.getDate()&&g.getMonth()==t.getMonth()&&(s.className+=" day-today"),s.innerText=v.toString(),g.setDate(v+1)}}}(e)}catch(e){t.innerText+=e}}))}();
} catch (err) {
  var _consoleElem = document.getElementById("_consoleElem");
  if(!_consoleElem) {
    _consoleElem = document.createElement("pre");
    _consoleElem.id = "consoleElem";
    document.body.appendChild(_consoleElem);
  }

  _consoleElem.innerText += "--------------\nError details:\n";
  for (var key in err) {
    _consoleElem.innerText += key + ": " + err[key] + "\n";
  }
  _consoleElem.innerText += "--------------\n";
}