
let vertualDom1 = creatElement('ul',{class:'list'},[
    creatElement('li',{class:"item"},['a']),
    creatElement('li',{class:"item"},['b']),
    creatElement('li',{class:"item"},['c']),
]);
let vertualDom2 = creatElement('ul',{class:'list-test'},[
    creatElement('li',{class:"item"},['1']),
    creatElement('li',{class:"item"},['2']),
    creatElement('div',{class:"item"},['1']),
]);


//将虚拟dom转为真实dom
let el = render(vertualDom1)
renderDom(el,window.document.getElementById('diff'))
let patches= diff(vertualDom1,vertualDom2)
// console.log(paths)
//差异计算.先序深度优先
//dom diff作用,根据两个虚拟对象创建出补丁,描述改变的内容,将这个补丁用来更新dom


//给元素打补丁,重新更新视图
patch(el,patches);