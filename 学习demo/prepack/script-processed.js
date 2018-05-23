var validataFunc, Validator, strategies;
(function () {
  var _$0 = this;

  function _1(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  }

  function _2(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  }

  function _3(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }

  function _4() {
    this.cache = [];
  }

  var _5 = _4.prototype;

  function _6(dom, rules) {
    var self = this;

    for (var i = 0, rule; rule = rules[i++];) {
      (function (rule) {
        var strategyAry = rule.strategy.split(':');
        var errorMsg = rule.errorMsg;
        self.cache.push(function () {
          var strategy = strategyAry.shift();

          _$0.console.log(strategyAry);

          strategyAry.unshift(dom.value);
          strategyAry.push(errorMsg);

          _$0.console.log(dom, strategyAry);

          _$0.console.log(_$0.strategies);

          return _$0.strategies[strategy].apply(dom, strategyAry);
        });
      })(rule);
    }
  }

  function _7() {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      var errorMsg = validatorFunc();

      if (errorMsg) {
        return errorMsg;
      }
    }
  }

  function _8() {
    var validator = new _$0.Validator();
    validator.add(registerForm.userName, [{
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空'
    }, {
      strategy: 'minLength:6',
      errorMsg: '用户名长度不能小于 10 位'
    }]);
    validator.add(registerForm.password, [{
      strategy: 'minLength:6',
      errorMsg: '密码长度不能小于 6 位'
    }]);
    validator.add(registerForm.phoneNumber, [{
      strategy: 'isMobile',
      errorMsg: '手机号码格式不正确'
    }]);
    var errorMsg = validator.start();
    return errorMsg;
  }

  validataFunc = void 0;
  Validator = void 0;
  strategies = void 0;
  strategies = {
    isNonEmpty: _1,
    minLength: _2,
    isMobile: _3
  };
  _5.start = _7;
  _5.add = _6;
  Validator = _4;
  validataFunc = _8;
}).call(this);