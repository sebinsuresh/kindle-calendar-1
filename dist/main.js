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
  !function() {
    "use strict";
    var WeekDays = {
      Short: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
      Long: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
    }, Months = {
      Short: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      Long: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    };
    function getCurrentDate() {
      var now = new Date, offsetHours = 0 == now.getTimezoneOffset() ? 5 : 0;
      return now.setHours(now.getHours() - offsetHours), now;
    }
    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
          _defineProperty(target, key, source[key]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        }));
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      return (key = function _toPropertyKey(arg) {
        var key = function _toPrimitive(input, hint) {
          if ("object" !== _typeof(input) || null === input) return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if ("object" !== _typeof(res)) return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === hint ? String : Number)(input);
        }(arg, "string");
        return "symbol" === _typeof(key) ? key : String(key);
      }(key)) in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : obj[key] = value, obj;
    }
    var defaultConfig = {
      numRows: 4,
      startCurrWeekOnRow: 1,
      showUpdateInHrs: !1
    };
    function createDateCell() {
      var dayElem = document.createElement("td");
      return dayElem.innerText = "#", dayElem;
    }
    function createWeek() {
      for (var row = document.createElement("tr"), j = 0; j < WeekDays.Short.length; j++) {
        var dayElem = createDateCell();
        row.appendChild(dayElem);
      }
      return row;
    }
    function createCalendarBody(numWeeks) {
      var calendarBody = document.createElement("tbody"), daysHeader = function createCalendarDaysHeader() {
        var daysRow = document.createElement("tr");
        daysRow.className += " days";
        for (var i = 0; i < WeekDays.Short.length; i++) {
          var dayElem = document.createElement("td");
          daysRow.appendChild(dayElem), dayElem.innerText = WeekDays.Short[i];
        }
        return daysRow;
      }();
      calendarBody.appendChild(daysHeader);
      for (var i = 0; i < numWeeks; i++) {
        var row = createWeek();
        calendarBody.appendChild(row);
      }
      return calendarBody;
    }
    function setDateCell(cellDate, today, dayElem) {
      var iterDate = cellDate.getDate(), iterMonth = cellDate.getMonth();
      cellDate < today && (dayElem.className += " day-past"), iterMonth != today.getMonth() && (dayElem.className += " month-other"), 
      iterDate === today.getDate() && iterMonth === today.getMonth() && (dayElem.className += " day-today"), 
      dayElem.innerText = iterDate.toString();
    }
    function populateCalendar(calendarTable, showUpdateInHrs) {
      var now = getCurrentDate();
      !function setCalendarHeader(calendarTable, today) {
        var content = Months.Long[today.getMonth()] + " " + today.getFullYear();
        calendarTable.getElementsByTagName("th")[0].innerText = content;
      }(calendarTable, now), function setCalendarDays(calendarTable, today) {
        var _parseInt, _calendarTable$getAtt, _parseInt2, _calendarTable$getAtt2, rows = calendarTable.getElementsByTagName("tr"), numWeeks = null !== (_parseInt = parseInt(null !== (_calendarTable$getAtt = calendarTable.getAttribute("data-num-rows")) && void 0 !== _calendarTable$getAtt ? _calendarTable$getAtt : "")) && void 0 !== _parseInt ? _parseInt : defaultConfig.numRows, startCurrWeekOnRow = null !== (_parseInt2 = parseInt(null !== (_calendarTable$getAtt2 = calendarTable.getAttribute("data-start-curr-week-on-row")) && void 0 !== _calendarTable$getAtt2 ? _calendarTable$getAtt2 : "")) && void 0 !== _parseInt2 ? _parseInt2 : defaultConfig.startCurrWeekOnRow, startDateOfTodaysWeek = today.getDate() - today.getDay(), iterationDate = new Date(today.getTime());
        iterationDate.setDate(startDateOfTodaysWeek - 7 * startCurrWeekOnRow);
        for (var iterationWeekRow = rows[1], i = 0; i < WeekDays.Short.length * numWeeks; i++) setDateCell(iterationDate, today, iterationWeekRow.getElementsByTagName("td")[i % 7]), 
        iterationDate.setDate(iterationDate.getDate() + 1), numWeeks > 1 && i % 7 == 6 && (iterationWeekRow = rows[2 + ~~(i / 7)]);
      }(calendarTable, now);
      var updateInMs = 864e5 - 60 * now.getHours() * 60 * 1e3 - 60 * now.getMinutes() * 1e3 - 1e3 * now.getSeconds() - now.getMilliseconds();
      showUpdateInHrs && (calendarTable.getElementsByTagName("th")[0].innerText += " | Update in ".concat((updateInMs / 1e3 / 60 / 60).toFixed(2), " hours"));
      setTimeout((function() {
        populateCalendar(calendarTable, showUpdateInHrs);
      }), updateInMs);
    }
    var Calendar = {
      create: function createCalendar(config) {
        var _defaultConfig$config = _objectSpread(_objectSpread({}, defaultConfig), config), baseElem = _defaultConfig$config.baseElem, numRows = _defaultConfig$config.numRows, startCurrWeekOnRow = _defaultConfig$config.startCurrWeekOnRow, showUpdateInHrs = _defaultConfig$config.showUpdateInHrs, calendarElem = function CreateTable() {
          var calendarElem = document.createElement("table");
          return calendarElem.className += " calendar", calendarElem.setAttribute("cellspacing", "0"), 
          calendarElem.setAttribute("cellpadding", "4"), calendarElem;
        }();
        baseElem.appendChild(calendarElem), calendarElem.setAttribute("data-num-rows", numRows.toString()), 
        calendarElem.setAttribute("data-start-curr-week-on-row", startCurrWeekOnRow.toString());
        var calendarTHead = document.createElement("thead");
        calendarElem.appendChild(calendarTHead);
        var calendarTh = function createCalendarHeader() {
          var calendarTh = document.createElement("th");
          return calendarTh.setAttribute("colspan", "7"), calendarTh.innerText = "Month Year", 
          calendarTh;
        }();
        calendarTHead.appendChild(calendarTh);
        var calendarBody = createCalendarBody(numRows);
        calendarElem.appendChild(calendarBody), populateCalendar(calendarElem, showUpdateInHrs);
      }
    };
    function getLeftZeroedString(input, numDigits) {
      if (numDigits > 3) throw new Error("numDigits must be <= 3");
      return ("000" + input).slice(-numDigits);
    }
    function setTime(clockElem, showSeconds) {
      clockElem.innerText = function getTimeString(showSeconds) {
        var now = getCurrentDate(), hours = now.getHours(), amPm = hours >= 12 ? " PM" : " AM", hoursStr = getLeftZeroedString(hours > 12 ? hours - 12 : hours, 2), minsStr = getLeftZeroedString(now.getMinutes(), 2), toReturn = "".concat(hoursStr, ":").concat(minsStr);
        return showSeconds && (toReturn += ":" + getLeftZeroedString(now.getSeconds(), 2)), 
        toReturn + amPm;
      }(showSeconds);
      var updateInMs = 1e3 * (60 - (new Date).getSeconds());
      setTimeout((function() {
        setTime(clockElem, showSeconds);
      }), updateInMs);
    }
    var Clock = {
      create: function createClock(config) {
        var baseElem = config.baseElem, showSeconds = config.showSeconds, clockElem = document.createElement("div");
        clockElem.className += " clock", setTime(clockElem, null != showSeconds && showSeconds), 
        baseElem.appendChild(clockElem);
      }
    };
    function setDate(dateElem, showUpdateIn) {
      dateElem.innerText = function getDateString() {
        var now = getCurrentDate(), month = getLeftZeroedString(now.getMonth() + 1, 2), date = getLeftZeroedString(now.getDate(), 2), year = now.getFullYear().toString().slice(-2);
        return "".concat(month, "/").concat(date, "/").concat(year);
      }();
      var now = getCurrentDate(), updateInMs = 864e5 - 1e3 * (60 * now.getHours() * 60 + 60 * now.getMinutes() + now.getSeconds());
      if (showUpdateIn) {
        var updateInHours = (updateInMs / 1e3 / 60 / 60).toFixed(2);
        dateElem.innerText += " (Update in: ".concat(updateInHours, " hrs.)");
      }
      setTimeout((function() {
        setDate(dateElem, showUpdateIn);
      }), updateInMs);
    }
    var DateWidget = {
      create: function createDate(config) {
        var baseElem = config.baseElem, showUpdateIn = config.showUpdateIn, dateElem = document.createElement("div");
        dateElem.className += " date", setDate(dateElem, null != showUpdateIn && showUpdateIn), 
        baseElem.appendChild(dateElem);
      }
    };
    function logError(err) {
      var consoleElem = function getConsoleElem() {
        var consoleElem = document.getElementById("consoleElem");
        if (!consoleElem) throw new Error("Could not find Console element in page");
        return consoleElem;
      }();
      if (consoleElem.innerText += "--------------\nError details:\n", !(err instanceof Error)) return consoleElem.innerText += "  " + (null == err ? void 0 : err.toString()), 
      void (consoleElem.innerText += "--------------\n");
      for (var key in err) {
        var val = err[key];
        consoleElem.innerText += "  ".concat(key, ": ").concat(val, "\n");
      }
      console.error(err), consoleElem.innerText += "--------------\n";
    }
    document.addEventListener("DOMContentLoaded", function wrapTryCatch(fn) {
      return function() {
        try {
          fn();
        } catch (err) {
          logError(err);
        }
      };
    }((function handleOnLoad() {
      var appElem = document.getElementById("app");
      if (!appElem) throw new Error("Could not find app element in page");
      Clock.create({
        baseElem: appElem
      }), DateWidget.create({
        baseElem: appElem
      }), Calendar.create({
        baseElem: appElem
      });
    })));
  }();
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