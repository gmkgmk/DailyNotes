/**
 *1 利用Object.defineProperty监听数据
 *2 扫描节点，监听与数据关联的文本节点
 *3 数据变化更新节点
**/
const observe = (data) => {
  if (!data || typeof data !== 'object') {
    return;
  }
  // 取出所有属性遍历，监听所有属性
  for(let key in data) {
    defineReactive(data, key, data[key]);
  }
};

//利用Object.defineProperty监听数据变化
//一个defineReactive对应对象一个属性
const defineReactive = (data, key, val) => {
  //一个dep管理一个对象的属性
  //对象属性跟节点是一对多的关系
  var dep = new Dep();
  Object.defineProperty(data, key, {
    get: function() {
      if(target) {
        dep.addNode(target)
      }
      return val
    },
    set: function(newVal) {
      val = newVal;
      dep.notify();
    }
  });
}

//Dep是对象属性对节点的管理器
function Dep() {
  this.nodes = []
}

Dep.prototype = {
  addNode: function(node) {
    this.nodes.push(node)
  },
  notify: function() {
    //异步更新节点
    setTimeout(() => {
      this.nodes.map((node) => {
        node.update()
      })
    })
  }
}

//观察者
function Watcher(data, node) {
  //target的作用是只在new Watcher的时候建立关系
  //不然每次get都将节点压入dep
  target = this;
  //保存节点
  this.node = node;
  this.data = data;
  //保存text节点的值
  this.nodeValue = node.nodeValue;
  //将对象的每一个属性都访问一遍，建立对象属性跟节点的关系
  for(let key in data) {
    data[key]
  }
  target = null;
}

Watcher.prototype = {
  //模版解析
  execute: function(exp) {
    return new Function(...Object.keys(this.data), `return ${exp}`)(...Object.values(this.data))
  },
  //更新view
  update: function() {
    //匹配到{{}}
    const newValue = this.nodeValue.replace(/{{(.*?)}}/g, (exp) => {
      //去除{{,}}
      exp = exp.replace(/{{|}}/g, '')
      return this.execute(exp)
    })
    this.node.nodeValue = newValue;
  }
}

//监听所有text节点
const watchTextNode = (el, data) => {
  [...el.childNodes].forEach(child => { 
    if(!(child instanceof Text)) {
      watchTextNode(child, data)
    }
    //这里监听了所有的text节点，应该做一层判断，只监听包含对象属性的文本节点（可优化）
    else new Watcher(data, child)
  })
}

const bindViewToData = (root, data) => {
  //监听数据
  observe(data);
  //数据变化则更新对应的节点
  watchTextNode(root, data);
  //先触发数据变化，更新view
  for(let key in data) {
    data[key] = data[key]
    return
  }
}