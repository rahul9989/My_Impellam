var dates = new Array();
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

function fetchVal(date) {
  var formatDate;
  var year = date
    .getYear()
    .toString()
    .substring(1);

  // months and days are inserted into the array in the form, e.g "01/01/2009", but here the format is "1/1/2009"

  var mon = month[date.getMonth()];
  // var month = padNumber(date.getMonth() + 1);
  var day = date.getDate();

  var n = weekday[date.getDay()];

  formatDate = n + ", " + day + " " + mon + " " + year;
  return formatDate;
}
function findDay(params) {
  var today = new Date();
  var yesteday = new Date();
  var lastweek = new Date();
  var inputValue;
  switch (params) {
    case "yesterday":
      yesteday.setDate(yesteday.getDate() - 1);
      inputValue = fetchVal(yesteday);
      break;
    case "lastweek":
      lastweek.setDate(lastweek.getDate() - 7);
      inputValue = fetchVal(lastweek) + " - " + fetchVal(today);
      break;
    case "lastmonth":
      lastweek.setDate(lastweek.getDate() - 30);
      inputValue = fetchVal(lastweek) + " - " + fetchVal(today);
      break;
    case "lasttwomonth":
      lastweek.setDate(lastweek.getDate() - 60);
      inputValue = fetchVal(lastweek) + " - " + fetchVal(today);
      break;
    case "tomorrow":
      yesteday.setDate(yesteday.getDate() + 1);
      inputValue = fetchVal(yesteday);
      break;
    case "nextweek":
      lastweek.setDate(lastweek.getDate() + 7);
      inputValue = fetchVal(today) + " - " + fetchVal(lastweek);
      break;
    case "nextmonth":
      lastweek.setDate(lastweek.getDate() + 30);
      inputValue = fetchVal(today) + " - " + fetchVal(lastweek);
      break;
    case "nexttwomonth":
      lastweek.setDate(lastweek.getDate() + 60);
      inputValue = fetchVal(today) + " - " + fetchVal(lastweek);
      break;

    default:
      inputValue = fetchVal(today);
      break;
  }

  // input updates with string value
  updateInput(inputValue);
}

function addDate(date) {
  if (jQuery.inArray(date, dates) < 0) {
    dates.push(date);
  }

  dates.sort(function(a, b) {
    var dateA = new Date(a.split(",")[1]);
    var dateB = new Date(b.split(",")[1]);
    return dateA - dateB;
  });
}

function removeDate(index) {
  dates.splice(index, 1);
}

function printArray() {
  var printArr = new String();
  dates.forEach(function(val, index) {
    var i = index === 1 ? " - " : "";
    printArr = printArr + i + val;
  });
  updateInput(printArr);
  $("#print-array").html(printArr);
}
// Adds a date if we don't have it yet, else remove it
function addOrRemoveDate(date) {
  var index = jQuery.inArray(date, dates);
  if (index >= 0) removeDate(index);
  else addDate(date);

  printArray();
}

// Takes a 1-digit number and inserts a zero before it
function padNumber(number) {
  var ret = new String(number);
  if (ret.length == 1) ret = "0" + ret;
  return ret;
}
var dateCalander;
function datePickerInit() {
  dateCalander = $("#datepicker").datepicker({
    numberOfMonths: 2,
    autoSize: true,
    dateFormat: "D, d M y",
    defaultDate: 0,

    onSelect: function(dateText, inst) {
      // console.log(inst, dateText);
      addOrRemoveDate(dateText);
      // select for range control bar "range" link
      $(".control-bar ul li").removeAttr("class");
      $("#range").addClass("active");
    },
    beforeShowDay: function(date) {
      // var year = date.getFullYear();
      var year = date
        .getYear()
        .toString()
        .substring(1);

      // months and days are inserted into the array in the form, e.g "01/01/2009", but here the format is "1/1/2009"

      var mon = month[date.getMonth()];
      // var month = padNumber(date.getMonth() + 1);
      var day = date.getDate();

      var n = weekday[date.getDay()];

      // This depends on the datepicker's date format
      var dateString = n + ", " + day + " " + mon + " " + year;

      // console.log(dateString);
      var gotDate = jQuery.inArray(dateString, dates);

      // console.log(dates.length);
      if (gotDate >= 0) {
        // Enable date so it can be deselected. Set style to be highlighted
        return [true, "ui-state-selected"];
      }
      // Dates not in the array are left enabled, but with no extra style

      if (dates.length < 2) {
        return [true, ""];
      } else {
        var dateAmin = new Date(dates[0]);
        var dateBmax = new Date(dates[1]);
        var value = new Date(dateString.split(",")[1]);
        if (value > dateAmin && value < dateBmax) {
          // console.log(value);
          return [true, "ui-state-error ui-state-disabled"];
        } else {
          return [true, "ui-state-disabled"];
        }
      }
    }
  });
}
function datePickerReInit() {
  $("#datepicker").datepicker("destroy");
  dateCalander = null;
  // init datepicker
  datePickerInit();
}

function updateInput(value) {
  $("#timePeriod").val(value);
}

$(document).ready(function() {
  if ($(".calendar-pop").length > 0) {
    // findDay('lastweek');
    // init datepicker
    datePickerInit();
    //   control-bar
    $(document).on("click", ".control-bar ul li a", function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(".control-bar ul li").removeAttr("class");
      $(this)
        .parent()
        .addClass("active");
      var x = $(this)
        .parent()
        .attr("id");
      switch (x) {
        case "today":
        case "yesterday":
        case "lastweek":
        case "lastmonth":
        case "lasttwomonth":
        case "tomorrow":
        case "nextweek":
        case "nextmonth":
        case "nexttwomonth":
          findDay(x);
          $(".calendar-pop").slideUp();
          break;
        case "range":
          datePickerReInit();
          printArray();
          break;
      }
    });

    $(document).on("click", "#timePeriod", function(e) {
      e.stopPropagation();
      var inputTop = $("#timePeriod").offset().top - $('.search-section').offset().top + $('#timePeriod').outerHeight(true);

      $(".calendar-pop").css({"top":inputTop}).slideToggle();
    });

    // close the calendar pop click outside
    $(document).click(function(event) {
      if (!$(event.target).closest(".calendar-pop").length) {
        if ($(".calendar-pop").is(":visible")) {
          if (!$(event.target).hasClass('ui-corner-all') && !$(event.target).hasClass('ui-icon')) {
              $(".calendar-pop").slideUp();
          }
        }
      }
    });
  }
});
