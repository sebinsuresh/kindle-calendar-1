if (!Object.defineProperty) {
  Object.defineProperty = function defineProperty(object, property, descriptor) {
    object[property] = descriptor;
    return object;
  }
};
try {
  // @ts-ignore
!function(){"use strict";function e(){var e=new Date,t=0==e.getTimezoneOffset()?5:0;return e.setHours(e.getHours()-t),e}var t={Short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},n=["January","February","March","April","May","June","July","August","September","October","November","December"],a=function(a){var r=e(),o=document.createElement("table");o.className+=" calendar",o.setAttribute("cellspacing","0"),o.setAttribute("cellpadding","4"),a.appendChild(o);var c=document.createElement("thead");o.appendChild(c);var d=document.createElement("th");c.appendChild(d),d.setAttribute("colspan","7"),d.innerText=n[r.getMonth()]+" "+r.getFullYear();var u=document.createElement("tbody");o.appendChild(u);var i=document.createElement("tr");i.className+=" days",u.appendChild(i);for(var l=0;l<t.Short.length;l++){var s=document.createElement("td");i.appendChild(s),s.innerText=t.Short[l]}var m=r.getDate()-r.getDay(),g=new Date(r.getTime());g.setDate(m-7);for(var h=0;h<4;h++){var p=document.createElement("tr");u.appendChild(p);for(var v=0;v<t.Short.length;v++){var f=document.createElement("td");p.appendChild(f);var y=g.getDate();g<r&&(f.className+=" day-past"),g.getMonth()!=r.getMonth()&&(f.className+=" month-other"),g.getDate()==r.getDate()&&g.getMonth()==r.getMonth()&&(f.className+=" day-today"),f.innerText=y.toString(),g.setDate(y+1)}}};function r(e,t){if(t>3)throw new Error("numDigits must be <= 3");return("000"+e).slice(-t)}function o(t,n){t.innerText=function(t){var n=e(),a=n.getHours(),o=a>=12?" PM":" AM",c=r(a>12?a-12:a,2),d=r(n.getMinutes(),2),u="".concat(c,":").concat(d);return t&&(u+=":"+r(n.getSeconds(),2)),u+o}(n);var a=1e3*(60-(new Date).getSeconds());setTimeout((function(){o(t,n)}),a)}var c=function(e){var t=document.createElement("div");t.className+=" clock",e.appendChild(t),o(t,!1)};function d(t,n){t.innerText=function(){var t=e(),n=r(t.getMonth()+1,2),a=r(t.getDate(),2),o=t.getFullYear().toString().slice(-2);return"".concat(n,"/").concat(a,"/").concat(o)}();var a=e(),o=864e5-1e3*(60*a.getHours()*60+60*a.getMinutes()+a.getSeconds());if(n){var c=(o/1e3/60/60).toFixed(2);t.innerText+=" (Update in: ".concat(c," hrs.)")}setTimeout((function(){d(t,n)}),o)}var u,i=function(e){var t=document.createElement("div");t.className+=" date",e.appendChild(t),d(t,!1)};document.addEventListener("DOMContentLoaded",(function(){document.getElementById("consoleElem"),u=document.getElementById("app"),c(u),i(u),a(u)}))}();
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