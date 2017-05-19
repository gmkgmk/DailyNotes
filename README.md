1.侧边栏:
new 的时候传入三个参数,box, data, config;
通过字符串模板生成字符串,可以根据需要修改.

2.模态组件:

使用
`
 let boundBox = new Widget;
 boundBox.alert({config})
 boundBox.confirm({config})
 boundBox.prompt({config})
 boundBox.common({config})
`采用自定义事件,通过连缀语法添加事件,on(name,fn)

3.Datepicker
分为获取数组和设置数据格式,完成了基础功能的实现..
<input type="text" class="datepicker">
  Datepicker.init(document.querySelector('.datepicker'));

4.es6数组方法
网上练习的数组方法.

5.es6模糊搜索
使用es6的includes方法查找是否包含word,然后map渲染..比较简陋..


个人积累..
