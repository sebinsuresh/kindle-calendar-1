var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

/** @type {HTMLElement} */
var appElem;
/** @type {HTMLElement} */
var consoleElem;

/**
 * @param {number} input 
 * @param {number} numDigits
 * @returns {string}
 */
function getLeftZeroedString(input, numDigits) {
  if (numDigits > 3) throw new Error("numDigits must be <= 3");
  return ("000" + input).slice(-numDigits);
}

/** @returns {Date} */
function getCurrentDate() {
  var now = new Date();
  var cdtOffsetHours = 5;
  var offsetHours = now.getTimezoneOffset() == 0 ? cdtOffsetHours : 0;
  now.setHours(now.getHours() - offsetHours);
  return now;
}

/**
 * @param {boolean} showSeconds
 * @returns {string}
 * */
function getTimeString(showSeconds) {
  var now = getCurrentDate();

  var hours = now.getHours();
  var amPmHours = hours > 12 ? hours - 12 : hours;
  var amPm = (hours >= 12 ? " PM" : " AM");

  var hoursStr = getLeftZeroedString(amPmHours, 2);
  var minsStr = getLeftZeroedString(now.getMinutes(), 2);

  var toReturn = hoursStr + ":" + minsStr;
  if (showSeconds) {
    toReturn += ":" + getLeftZeroedString(now.getSeconds(), 2);
  }
  toReturn += amPm;

  return toReturn;
}

/** @returns {string} */
function getDateString() {
  var now = getCurrentDate();
  return getLeftZeroedString(now.getMonth() + 1, 2) + "/" +
    getLeftZeroedString((now.getDate()), 2) + "/" +
    (now.getFullYear()).toString().slice(-2);
}

/**
 * @param {HTMLElement} clockElem
 * @param {boolean} showSeconds
 * */
function setTime(clockElem, showSeconds) {
  clockElem.innerText = getTimeString(showSeconds);

  // Round to the start of next minute
  var updateInMs = (60 - new Date().getSeconds()) * 1000;
  setTimeout(function () {
    setTime(clockElem, showSeconds);
  }, updateInMs);
}

/** 
 * @param {HTMLElement} dateElem
 * @param {boolean} showUpdateIn
 * */
function setDate(dateElem, showUpdateIn) {
  dateElem.innerText = getDateString();

  // Round to the start of next day
  var now = getCurrentDate();
  var updateInMs =
    (24 * 60 * 60 * 1000) -
    ((now.getHours() * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds()) * 1000;

  if (showUpdateIn) {
    dateElem.innerText += " (Update in: " + (updateInMs / 1000 / 60 / 60).toFixed(2) + " hrs.)";
  }
  setTimeout(function () {
    setDate(dateElem, showUpdateIn);
  }, updateInMs);
}

/** @param {HTMLElement} baseElem */
function createClock(baseElem) {
  var clockElem = document.createElement("div");
  clockElem.className += " clock";
  baseElem.appendChild(clockElem);
  setTime(clockElem, false);

  var dateElem = document.createElement("div");
  dateElem.className += " date";
  baseElem.appendChild(dateElem);
  setDate(dateElem, false);
}

/** @param {HTMLElement} baseElem */
function createCalendar(baseElem) {
  var now = getCurrentDate();

  var calendarElem = document.createElement("table");
  calendarElem.className += " calendar";
  calendarElem.setAttribute("cellspacing", "0");
  calendarElem.setAttribute("cellpadding", "4");
  // calendarElem.setAttribute("border", "0");
  // calendarElem.setAttribute("border-collapse", "collapse");
  baseElem.appendChild(calendarElem);

  var calendarHeaderElem = document.createElement("thead");
  calendarElem.appendChild(calendarHeaderElem);
  var calendarHeaderRowElem = document.createElement("th");
  calendarHeaderElem.appendChild(calendarHeaderRowElem);
  calendarHeaderRowElem.setAttribute("colspan", "7");
  calendarHeaderRowElem.innerText = months[now.getMonth()] + " " + now.getFullYear();

  var calendarBodyElem = document.createElement("tbody");
  calendarElem.appendChild(calendarBodyElem);

  var daysRow = document.createElement("tr");
  daysRow.className += " days";
  calendarBodyElem.appendChild(daysRow);
  for (var i = 0; i < days.length; i++) {
    var dayElem = document.createElement("td");
    daysRow.appendChild(dayElem);
    dayElem.innerText = days[i];
  }

  var numRows = 4;
  var startCurrWeekOnRow = 1;

  var startDateOfCurrentWeek = now.getDate() - now.getDay();
  var pointerDate = new Date(now);
  pointerDate.setDate(startDateOfCurrentWeek - (startCurrWeekOnRow * 7));
  // var startDateOfCalendar = calendarStartDate.getDate();

  for (var i = 0; i < numRows; i++) {
    var row = document.createElement("tr");
    calendarBodyElem.appendChild(row);

    for (var j = 0; j < days.length; j++) {
      var dayElem = document.createElement("td");
      row.appendChild(dayElem);

      var iterDate = pointerDate.getDate();

      if (pointerDate < now) dayElem.className += " day-past";
      if (pointerDate.getMonth() != now.getMonth()) dayElem.className += " month-other";
      if ((pointerDate.getDate() == now.getDate()) && (pointerDate.getMonth() == now.getMonth())) dayElem.className += " day-today";

      dayElem.innerText = iterDate.toString();
      pointerDate.setDate(iterDate + 1);
    }
  }
}

function handleOnLoad() {
  consoleElem = document.getElementById("consoleElem");
  try {
    appElem = document.getElementById("app");
    createClock(appElem);
    createCalendar(appElem);
  } catch (error) {
    consoleElem.innerText += error;
  }
}

document.addEventListener("DOMContentLoaded", handleOnLoad);
