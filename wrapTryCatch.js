const fs = require('fs');

const beforeBody = `try {`;
const afterBody =
  `
} catch (err) {
  var _consoleElem = document.getElementById("_consoleElem");
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
