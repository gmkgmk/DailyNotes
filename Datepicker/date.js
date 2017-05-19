(function () {
  var Datepicker = {};

  Datepicker.getMonthDate = function (year, month) {
    var ret = [],
      n;
    if (!year && !month) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    // 获取本月第一天以及是周几与上月最后一天的日期
    var fristDay = new Date(year, month - 1, 1);
    var fristDayWeekDay = fristDay.getDay();
    if (fristDayWeekDay === 0) fristDayWeekDay = 7;

    year = fristDay.getFullYear();
    month = fristDay.getMonth() + 1;

    var lastDayOfLastMonth = new Date(year, month - 1, 0);
    var lastDayWeekDay = lastDayOfLastMonth.getDate();

    // 显示上月需要显示的日期
    var preMonthDayCount = fristDayWeekDay - 1;
    // 显示本月最后一天
    var lastDay = new Date(year, month, 0);
    var lastDate = lastDay.getDate();

    // preMonthDayCount>4并且lastDate == 31表示需要显示36天，则需要6个周
    if (preMonthDayCount > 4 && lastDate == 31) n = 6
    else n = 5;

    for (var i = 0; i < 7 * n; i++) {
      var date = i + 1 - preMonthDayCount;
      var showDate = date;
      var thisMonth = month;

      if (date <= 0) {
        // 上个月
        thisMonth = month - 1;
        showDate = lastDayWeekDay + date;
      } else if (date > lastDate) {
        // 下个月
        thisMonth = month + 1;
        showDate = date - lastDate;
      }
      if (thisMonth === 0) thisMonth = 12;
      if (thisMonth === 13) thisMonth = 1;
      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      })
    }
    return {
      year: year,
      month: month,
      days: ret
    }
  }
  Datepicker.getMonth = function () {
    var ret = ["一月", "二月", "三月", "四月",
      "五月", "六月", "七月", "八月",
      "九月", "十月", "十一月", "十二月"
    ]
    
    return ret
  }

  window.Datepicker = Datepicker;
})()