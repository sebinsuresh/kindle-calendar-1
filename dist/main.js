if (!Object.defineProperty) {
  Object.defineProperty = function defineProperty(object, property, descriptor) {
    object[property] = descriptor;
    return object;
  }
};
// From https://gist.github.com/jonfalcon/4715325
if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString"),
      dontEnums = [
        "toString", "toLocaleString", "valueOf", "hasOwnProperty",
        "isPrototypeOf", "propertyIsEnumerable", "constructor",
      ],
      dontEnumsLength = dontEnums.length;

    return function (obj) {
      if ((typeof obj !== "object" && typeof obj !== "function") || obj === null)
        throw new TypeError("Object.keys called on non-object");
      var result = [];
      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }
      if (hasDontEnumBug) {
        for (var i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    };
  })();
};
try {
  // @ts-ignore
!function(){"use strict";var e={Short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},t=["January","February","March","April","May","June","July","August","September","October","November","December"];function n(){var e=new Date,t=0==e.getTimezoneOffset()?5:0;return e.setHours(e.getHours()-t),e}function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===r(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={numRows:4,startCurrWeekOnRow:1};function u(e,t){var n=document.createElement("td"),r=e.getDate(),o=e.getMonth();return e<t&&(n.className+=" day-past"),o!=t.getMonth()&&(n.className+=" month-other"),r==t.getDate()&&o==t.getMonth()&&(n.className+=" day-today"),n.innerText=r.toString(),n}function l(t,n){for(var r=document.createElement("tr"),o=0;o<e.Short.length;o++){var a=u(t,n);r.appendChild(a),t.setDate(t.getDate()+1)}return r}var s=function(r){var o=a(a({},c),r),i=o.baseElem,u=o.numRows,s=o.startCurrWeekOnRow,d=n(),m=function(){var e=document.createElement("table");return e.className+=" calendar",e.setAttribute("cellspacing","0"),e.setAttribute("cellpadding","4"),e}();i.appendChild(m);var f=document.createElement("thead");m.appendChild(f);var p=function(e){var n=document.createElement("th");return n.setAttribute("colspan","7"),n.innerText=t[e.getMonth()]+" "+e.getFullYear(),n}(d);f.appendChild(p);var v=function(t,n,r){var o=document.createElement("tbody"),a=function(){var t=document.createElement("tr");t.className+=" days";for(var n=0;n<e.Short.length;n++){var r=document.createElement("td");t.appendChild(r),r.innerText=e.Short[n]}return t}();o.appendChild(a);var i=t.getDate()-t.getDay(),c=new Date(t.getTime());c.setDate(i-7*n);for(var u=0;u<r;u++){var s=l(new Date(c.getTime()),t);o.appendChild(s),c.setDate(c.getDate()+7)}return o}(d,s,u);m.appendChild(v)};function d(e,t){if(t>3)throw new Error("numDigits must be <= 3");return("000"+e).slice(-t)}function m(e,t){e.innerText=function(e){var t=n(),r=t.getHours(),o=r>=12?" PM":" AM",a=d(r>12?r-12:r,2),i=d(t.getMinutes(),2),c="".concat(a,":").concat(i);return e&&(c+=":"+d(t.getSeconds(),2)),c+o}(t);var r=1e3*(60-(new Date).getSeconds());setTimeout((function(){m(e,t)}),r)}var f=function(e){var t=e.baseElem,n=e.showSeconds,r=document.createElement("div");r.className+=" clock",m(r,null!=n&&n),t.appendChild(r)};function p(e,t){e.innerText=function(){var e=n(),t=d(e.getMonth()+1,2),r=d(e.getDate(),2),o=e.getFullYear().toString().slice(-2);return"".concat(t,"/").concat(r,"/").concat(o)}();var r=n(),o=864e5-1e3*(60*r.getHours()*60+60*r.getMinutes()+r.getSeconds());if(t){var a=(o/1e3/60/60).toFixed(2);e.innerText+=" (Update in: ".concat(a," hrs.)")}setTimeout((function(){p(e,t)}),o)}var v=function(e){var t=e.baseElem,n=e.showUpdateIn,r=document.createElement("div");r.className+=" date",p(r,null!=n&&n),t.appendChild(r)};document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("consoleElem");if(!e)throw new Error("Could not find Console element in page");try{var t=document.getElementById("app");if(!t)throw new Error("Could not find app element in page");f({baseElem:t}),v({baseElem:t}),s({baseElem:t})}catch(t){!function(e,t){var n="--------------\n";if(e.innerText+="--------------\nError details:\n",!(t instanceof Error))return e.innerText+="  "+(null==t?void 0:t.toString()),void(e.innerText+=n);for(var r in t){var o=t[r];e.innerText+="  ".concat(r,": ").concat(o,"\n")}e.innerText+=n}(e,t)}}))}();
} catch (err) {
  var _consoleElem = document.getElementById("consoleElem");
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