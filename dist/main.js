// @ts-ignore
try {!function(){var e,t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=["January","February","March","April","May","June","July","August","September","October","November","December"];function a(e,t){if(t>3)throw new Error("numDigits must be <= 3");return("000"+e).slice(-t)}function r(){var e=new Date,t=0==e.getTimezoneOffset()?5:0;return e.setHours(e.getHours()-t),e}function c(e,t){e.innerText=function(e){var t=r(),n=t.getHours(),c=n>=12?" PM":" AM",o=a(n>12?n-12:n,2),d=a(t.getMinutes(),2),i="".concat(o,":").concat(d);return e&&(i+=":"+a(t.getSeconds(),2)),i+c}(t);var n=1e3*(60-(new Date).getSeconds());setTimeout((function(){c(e,t)}),n)}function o(e,t){e.innerText=function(){var e=r(),t=a(e.getMonth()+1,2),n=a(e.getDate(),2),c=e.getFullYear().toString().slice(-2);return"".concat(t,"/").concat(n,"/").concat(c)}();var n=r(),c=864e5-1e3*(60*n.getHours()*60+60*n.getMinutes()+n.getSeconds());if(t){var d=(c/1e3/60/60).toFixed(2);e.innerText+=" (Update in: ".concat(d," hrs.)")}setTimeout((function(){o(e,t)}),c)}document.addEventListener("DOMContentLoaded",(function(){document.getElementById("consoleElem"),function(e){var t=document.createElement("div");t.className+=" clock",e.appendChild(t),c(t,!1);var n=document.createElement("div");n.className+=" date",e.appendChild(n),o(n,!1)}(e=document.getElementById("app")),function(e){var a=r(),c=document.createElement("table");c.className+=" calendar",c.setAttribute("cellspacing","0"),c.setAttribute("cellpadding","4"),e.appendChild(c);var o=document.createElement("thead");c.appendChild(o);var d=document.createElement("th");o.appendChild(d),d.setAttribute("colspan","7"),d.innerText=n[a.getMonth()]+" "+a.getFullYear();var i=document.createElement("tbody");c.appendChild(i);var u=document.createElement("tr");u.className+=" days",i.appendChild(u);for(var l=0;l<t.length;l++){var s=document.createElement("td");u.appendChild(s),s.innerText=t[l]}var m=a.getDate()-a.getDay(),g=new Date(a.getTime());g.setDate(m-7);for(var p=0;p<4;p++){var h=document.createElement("tr");i.appendChild(h);for(var v=0;v<t.length;v++){var f=document.createElement("td");h.appendChild(f);var E=g.getDate();g<a&&(f.className+=" day-past"),g.getMonth()!=a.getMonth()&&(f.className+=" month-other"),g.getDate()==a.getDate()&&g.getMonth()==a.getMonth()&&(f.className+=" day-today"),f.innerText=E.toString(),g.setDate(E+1)}}}(e)}))}();
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