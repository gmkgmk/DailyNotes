(function () {

  var Datepicker = window.Datepicker;

  var monthData,
    $wapper;

  Datepicker.buildUi = function (year, month) {
    monthData = Datepicker.getMonthDate(year, month);

    var html =
      '<header class="datepicker-header">' +
      '<a href="#" class="datepicker-btn datepicker-prev-btn">&lt;</a>' +
      '<a href="#" class="datepicker-btn datepicker-next-btn">&gt;</a>' +
      '<span class="datepicker-tag">' + monthData.year + '-' + monthData.month + '</span>' +
      '</header>' +
      '<section class="datepicker-body">' +
      '<table>' +
      '  <thead>' +
      '    <tr>' +
      '      <th>一</th>' +
      '      <th>二</th>' +
      '      <th>三</th>' +
      '      <th>四</th>' +
      '      <th>五</th>' +
      '      <th>六</th>' +
      '      <th>日</th>' +
      '    </tr>' +
      '  </thead>' +
      '  <tbody>'
    // '    <tr>'+
    // '      <td>29</td>'+
    // '      <td>30</td>'+
    // '      <td>1</td>'+
    // '      <td>2</td>'+
    // '      <td>3</td>'+
    // '      <td>4</td>'+
    // '      <td>5</td>'+
    // '    </tr>'+
    for (var i = 0; i < monthData.days.length; i++) {
      var date = monthData.days[i];

      if (i % 7 === 0) {
        html += '<tr>';
      }

      if (date.showDate == Datepicker.chooseToday().showDate && date.month == Datepicker.chooseToday().month) {
        html += '<td class="today" data-date=' + date.date + '>' + date.showDate + '</td>';
      } else if (date.month !== monthData.month) {
        html += '<td class="old" data-date=' + date.date + '>' + date.showDate + '</td>';
      } else {
        html += '<td  data-date=' + date.date + '>' + date.showDate + '</td>';
      }

      if (i % 7 === 6) {
        html += '</tr>';
      }
    }

    html +=
      '  </tbody>' +
      '</table>' +
      '</section> ';
    return html;
  };

  Datepicker.buildMonth = function () {
    monthData = Datepicker.getMonth();

    var year = new Date().getFullYear();

    var html =
      '<header class="datepicker-header">' +
      '<a href="#" class="datepicker-btn datepicker-prev-btn">&lt;</a>' +
      '<a href="#" class="datepicker-btn datepicker-next-btn">&gt;</a>' +
      '<span class="datepicker-tag">' + year + '</span>' +
      '</header>' +
      '<section class="datepicker-body">' +
      '<table>' +
      '  <tbody>'
    for (var i = 0; i < 12; i++) {

      if (i % 4 === 0) {
        html += '<tr>';
      }

      html += '<td class="month">' + monthData[i] + '</td>';

      if (i % 4 === 3) {
        html += '</tr>';
      }
    }

    '  </tbody>' +
    '</table>' +
    '</section> ';
    return html;
  };

  // 渲染函数
  Datepicker.render = function (direction) {
    // 获取当前年月
    var year, month;
    // 最开始year和Month没有  
    if (monthData) {
      year = monthData.year;
      month = monthData.month;
    }
    // 根据传入的点击事件设置月份加减,如果没有点击事件则不会触发    
    if (direction === 'prev') month--;
    if (direction === 'next') month++;

    if (!isNaN(direction)) {
      month = direction
    }
    var html = Datepicker.buildUi(year, month);
    if (!$wapper) {
      $wapper = document.createElement('main');
      $wapper.className = "datepicker-wapper";

      document.body.appendChild($wapper)
    }
    $wapper.innerHTML = html;
  };

  // 初始化函数
  Datepicker.init = function ($input) {
    Datepicker.$input = $input;

    $input.value = format(new Date());
    Datepicker.render();
    // 点击input事件
    var flag = false;
    $input.addEventListener('click', function () {
      // 获取元素的位置
      var input = $input.getBoundingClientRect();

      // 控制打开或者关闭Detepicker
      if (flag) Datepicker.close();
      else Datepicker.open(input);
      flag = !flag;

    }, false)

    // 点击上下切换按钮事件
    $wapper.addEventListener('click', function (e) {
      var $target = e.target;
      if (!$target.classList.contains('datepicker-btn')) return;

      if ($target.classList.contains('datepicker-prev-btn')) {
        Datepicker.render("prev")
      } else if ($target.classList.contains('datepicker-next-btn')) {
        Datepicker.render("next")
      }
    }, false)
    
    // 点击时间事件
    $wapper.addEventListener('click', function (e) {
      var $target = e.target;

      if ($target.tagName.toLowerCase() !== 'td') return;

      var td = document.querySelectorAll('td')
      for (var i = 0; i < td.length; i++) {
        if (td[i].className == "today") {
          td[i].classList.remove("today")
        }
      }

      // 点击td,显示日期在input上,并且控制类
      var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
      $input.value = format(date)
      $target.classList.add("today");
      Datepicker.close();
      flag = !flag;

      // 选择的不是本月的时候，重新生成html
      var chooseMonth = +(format(date).split("-")[1]);
      if (chooseMonth !== monthData.month) Datepicker.render(chooseMonth);
    }, false)
  };

  // 控制打开
  Datepicker.open = function (input) {
    // 每次打开的时候都设置位置,避免改变文档结构后错乱
    $wapper.classList.add('datepicker-wapper-show');
    var left = input.left;
    var top = input.top;
    var height = input.height;

    $wapper.style.top = top + height + 2 + 'px'
    $wapper.style.left = left + 'px'
  };

  // 控制关闭
  Datepicker.close = function () {
    $wapper.classList.remove('datepicker-wapper-show');
  };

  Datepicker.chooseToday = function () {
    input = Datepicker.$input.value.split("-")
    var ret = {
      month: input[1],
      showDate: input[2]
    }
    return ret
  }

  function format(date) {
    ret = "";

    var padding = function (num) {
      return num >= 10 ? num : "0" + num;
    }

    ret += date.getFullYear() + '-';
    ret += padding(date.getMonth() + 1) + '-';
    ret += padding(date.getDate());

    return ret
  }
})();