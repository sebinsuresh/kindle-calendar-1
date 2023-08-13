if (!Object.defineProperty) {
  Object.defineProperty = function defineProperty(object, property, descriptor) {
    object[property] = descriptor;
    return object;
  }
};
try {
  // @ts-ignore
!function(){"use strict";var e={Short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},t=["January","February","March","April","May","June","July","August","September","October","November","December"];function n(){var e=new Date,t=0==e.getTimezoneOffset()?5:0;return e.setHours(e.getHours()-t),e}var a=function(a){var r=n(),o=function(){var e=document.createElement("table");return e.className+=" calendar",e.setAttribute("cellspacing","0"),e.setAttribute("cellpadding","4"),e}();a.appendChild(o);var c=document.createElement("thead");o.appendChild(c);var d=document.createElement("th");d.setAttribute("colspan","7"),d.innerText=t[r.getMonth()]+" "+r.getFullYear(),c.appendChild(d);var u=document.createElement("tbody");o.appendChild(u);var i=document.createElement("tr");i.className+=" days",u.appendChild(i);for(var l=0;l<e.Short.length;l++){var s=document.createElement("td");i.appendChild(s),s.innerText=e.Short[l]}var m=r.getDate()-r.getDay(),g=new Date(r.getTime());g.setDate(m-7);for(var h=0;h<4;h++){var p=document.createElement("tr");u.appendChild(p);for(var v=0;v<e.Short.length;v++){var f=document.createElement("td");p.appendChild(f);var E=g.getDate();g<r&&(f.className+=" day-past"),g.getMonth()!=r.getMonth()&&(f.className+=" month-other"),g.getDate()==r.getDate()&&g.getMonth()==r.getMonth()&&(f.className+=" day-today"),f.innerText=E.toString(),g.setDate(E+1)}}};function r(e,t){if(t>3)throw new Error("numDigits must be <= 3");return("000"+e).slice(-t)}function o(e,t){e.innerText=function(e){var t=n(),a=t.getHours(),o=a>=12?" PM":" AM",c=r(a>12?a-12:a,2),d=r(t.getMinutes(),2),u="".concat(c,":").concat(d);return e&&(u+=":"+r(t.getSeconds(),2)),u+o}(t);var a=1e3*(60-(new Date).getSeconds());setTimeout((function(){o(e,t)}),a)}var c=function(e){var t=e.baseElem,n=e.showSeconds,a=document.createElement("div");a.className+=" clock",o(a,null!=n&&n),t.appendChild(a)};function d(e,t){e.innerText=function(){var e=n(),t=r(e.getMonth()+1,2),a=r(e.getDate(),2),o=e.getFullYear().toString().slice(-2);return"".concat(t,"/").concat(a,"/").concat(o)}();var a=n(),o=864e5-1e3*(60*a.getHours()*60+60*a.getMinutes()+a.getSeconds());if(t){var c=(o/1e3/60/60).toFixed(2);e.innerText+=" (Update in: ".concat(c," hrs.)")}setTimeout((function(){d(e,t)}),o)}var u=function(e){var t=e.baseElem,n=e.showUpdateIn,a=document.createElement("div");a.className+=" date",d(a,null!=n&&n),t.appendChild(a)};document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("consoleElem"),t=document.getElementById("app");if(!e||!t)throw new Error("Could not find Console or App elements in page");c({baseElem:t}),u({baseElem:t}),a(t)}))}();
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