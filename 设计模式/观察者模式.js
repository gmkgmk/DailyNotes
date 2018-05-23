/*
*被观察者：维护一组观察者， 提供用于增加和移除观察者的方法。
*观察者：提供一个更新接口，用于当被观察者状态变化时，得到通知。
*具体的被观察者：状态变化时广播通知给观察者，保持具体的观察者的信息。
*具体的观察者：保持一个指向具体被观察者的引用，实现一个更新接口，用于观察，以便保证自身状态总是和被观察者状态一致的。
*/
function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.Add = function(obj) {
  return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function() {
  this.observerList = [];
};

ObserverList.prototype.Count = function() {
  return this.observerList.length;
};

ObserverList.prototype.Get = function(index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
};

ObserverList.prototype.Insert = function(obj, index) {
  var pointer = -1;

  if (index === 0) {
    this.observerList.unshift(obj);
    pointer = index;
  } else if (index === this.observerList.length) {
    this.observerList.push(obj);
    pointer = index;
  }

  return pointer;
};

ObserverList.prototype.IndexOf = function(obj, startIndex) {
  var i = startIndex,
    pointer = -1;

  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      pointer = i;
    }
    i++;
  }

  return pointer;
};

ObserverList.prototype.RemoveAt = function(index) {
  if (index === 0) {
    this.observerList.shift();
  } else if (index === this.observerList.length - 1) {
    this.observerList.pop();
  }
};

// Extend an object with an extension
function extend(extension, obj) {
  for (var key in extension) {
    obj[key] = extension[key];
  }
}

function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer) {
  this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function(observer) {
  this.observers.RemoveAt(this.observers.IndexOf(observer, 0));
};

Subject.prototype.Notify = function(context) {
  var observerCount = this.observers.Count();
  for (var i = 0; i < observerCount; i++) {
    this.observers.Get(i).Update(context);
  }
};

/**
 * 优势
 *观察者和发布/订阅模式鼓励人们认真考虑应用不同部分之间的关系，同时帮助我们找出这样的层，该层中包含有直接的关系，这些关系可以通过一些列的观察者和被观察者来
 *替换掉。这中方式可以有效地将一个应用程序切割成小块，这些小块耦合度低，从而改善代码的管理，以及用于潜在的代码复用。
 *使用观察者模式更深层次的动机是，当我们需要维护相关对象的一致性的时候，我们可以避免对象之间的紧密耦合。例如，一个对象可以通知另外一个对象，而不需要知道这
 *个对象的信息。
 *两种模式下，观察者和被观察者之间都可以存在动态关系。这提供很好的灵活性，而当我们的应用中不同的部分之间紧密耦合的时候，是很难实现这种灵活性的。
 *尽管这些模式并不是万能的灵丹妙药，这些模式仍然是作为最好的设计松耦合系统的工具之一，因此在任何的JavaScript 开发者的工具箱里面，都应该有这样一个重要的工
 *具。
 *
 *缺点
 *事实上，这些模式的一些问题实际上正是来自于它们所带来的一些好处。在发布/订阅模式中，将发布者共订阅者上解耦，将会在一些情况下，导致很难确保我们应用中的特定
 *部分按照我们预期的那样正常工作。
 *例如，发布者可以假设有一个或者多个订阅者正在监听它们。比如我们基于这样的假设，在某些应用处理过程中来记录或者输出错误日志。如果订阅者执行日志功能崩溃了
 *（或者因为某些原因不能正常工作），因为系统本身的解耦本质，发布者没有办法感知到这些事情。
 */
