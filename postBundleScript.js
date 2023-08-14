const fs = require('fs');

const polyFills = [
  `if (!Object.defineProperty) {
    Object.defineProperty = function defineProperty(object, property, descriptor) {
      object[property] = descriptor;
      return object;
    }
  };`,
  `// From https://gist.github.com/jonfalcon/4715325
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
  };`,
];

const tryStart = '\ntry {\n';

const beforeBody = polyFills.map((p) => p.replace(/\n  /g, '\n')).join('\n') + tryStart;

const afterBody = `
} catch (err) {
  var _consoleElem = document.getElementById("consoleElem");
  if(!_consoleElem) {
    _consoleElem = document.createElement("pre");
    _consoleElem.id = "consoleElem";
    document.body.appendChild(_consoleElem);
  }

  _consoleElem.innerText += "--------------\\nError details:\\n";
  for (var key in err) {
    _consoleElem.innerText += key + ": " + err[key] + "\\n";
  }
  _consoleElem.innerText += "--------------\\n";
}`;

let main = fs.readFileSync('./dist/main.js', 'utf8');
main = beforeBody + main + afterBody;
fs.writeFileSync('./dist/main.js', main, 'utf8');
