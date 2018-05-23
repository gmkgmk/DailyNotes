---
title: 暂未整理,只做备份(深入浅出React和Redux学习笔记)
date: 2018-4-13
tags: react
---
connet函数的作用
connet作为容器组件:
1,把store上的状态转化为内层傻瓜组件的props,
2.把内层傻瓜组件中的用户动作转化为派送给Store的动作
一个是内层傻瓜对象的输入,一个是内层傻瓜对象的输出.
这两个工作的套路也很明显,吧Store上的状态转化为内层组件的props,其实就是一个映关系,去掉框架,最后就是一个mapStateToProps函数该做的事情,

mapStateToProps和mapDispatchToProps都可以包含第二个参数,代表ownProps,也就是直接传递给外层容器组件的props
<!--more-->


redux按功能组织:
*actionTypes.js定义action到类型;
*action.js定义action构造函数,决定了这个功能模块可以接受的动作;
*views目录,包含这个功能模块中所有的React组件,包括傻瓜组件和容器组件;
*index.js这个文件把左右的角色导入,然后统一导出.


redux开发辅助工具
redux-immutable-state-invariant包,检查reducer是否违反纯函数

createStore第三个参数(storeEnhaners)
这个参数能够让createStore函数产生的sTore对象具有更多更强的功能;
如果有多个,可以通过compose将多个组合在一起;


resele库:提高数据获取性能

代理方式的高阶组件场景:
1,操作prop;
2.访问ref;
3.抽取状态;  ---如connet函数
4.包装组件;

代理方式和继承方式最大的区别,是使用被包裹组件的方式.

在继承方式下,render函数中渲染被包裹组件的代码: return super.render()

代理方式下WrappedComponent经历了一个完整的生命周期,但在继承方式下super.render()只是一个生命周期中的一个函数;
在代理方式下产生的新组建和参数组件是两个不同的组件,一次渲染,两个组件都要经历各自的生命周期,在继承方式下两者合二为一,只有一个生命周期

继承方式的高级组件场景:
1.操纵prop;
2.操纵生命周期函数;

redux流程:
驱动Redux流程的是action对象,每一个action对象被派发到Store 上之后,同步地被分配给所有的reducer函数,
每个reducer都是纯函数,纯函数不产生任何副作用,自然是完成数据操纵之后立刻同步返回;
reducer返回的结果又被同步地拿去更新store上的状态数据,
更新状态数据的操作会立刻被同步给监听Store状态改变的函数
从而引发作为试图的React组件更新过程.



thunk->辅助调用另一个子程序的子程序
如:const f = (x) => {
    return x() + 5;    
}
const g = () => {
    return 3 + 4;
}

f(g);

上述代码g就是一个thunk,这样使用的好处是g的执行只有在f实际执行时才执行,可以起到延迟执行的作用.

在Redux架构下,一个action对象再通过store.dispatch派发,在调用reducer函数之前,会先经过一个中间件的环节,这就是产生异步操作的机会,
实际上redux-thunk提供的就是一个Redux中间件,我们需要在创建Store时用上这中间件.


异步的action对象不是一个普通的js对象,而是一个函数,

如果没有redux-thunk中间件的存在,这样一个函数类型的action对象被派发出来会一路发送到各个reducer函数,
reducer函数从这些实际上是函数的action对象上是无法获取type字段的,所以也做不了什么实质的处理.
有了redux-thunk中间件之后会直接被中间件拦截
redux-thunk的工作室检查action对象是不是函数,如果不是函数就放行,完成普通action对象的生命周期,
而如果发现action对象是函数,那就执行这个函数,并把Store的dispath函数和getState函数作为参数传递到函数中去,处理过程到此为止,不会让这个异步action对象继续往前派发到reducer函数



使用中间件方法:
第一种方法是用Redux提供的appliMiddleware来包装createStore产生一个新的创建Store的函数.
中间件通过applyMiddleware包装后产生一个新的函数,新产生的函数是一个Store Enhancer.
然后这个函数又将Redux的createStore作为参数,产生了一个加强版的创造store函数,一般命名为configureStore
利用configureStore创造的Store将具有thunkMiddleware中间件的功能;

第二种方法是吧applyMiddleware的结果当做Store Enhancer,和其他的Enhancer混合之后作为createStore参数传入--利用compose函数,将多个Store Enhancer串接成一个;
使用这种方法一定把appliMiddleware的结果作为compose到第一个参数,因为增强器的顺序就是它们处理action对象的顺序



Store Enhancer:
Redux提供的创建Store的函数叫createStore,这个函数除了可以接受reducer和初始状态参数,还可以接受一个Store Enhancer作为参数
Store Enhancer是一个函数,这个函数接受一个createStore模样的函数为参数,返回一个新的createStore函数.

一个什么都不做的 Store Enhancer长的这个样子:
const doNothingEnhancer = (createStore) => (reducer, preloadedState, enhancer) =>{
    const store = createStoe(reducer, preloadedState, enhancer);
    return store;
}

实现一个Store Enhancer,功夫全在于如何定制生产的store对象.
一个store 对象中包含下列接口:
dispatch,
subscribe
getState
replaceReducer
每一个接口都可以被修改,但是不论怎么修改,往往还是要调用原有对应的函数


