// 虚拟dom的类
class Element{
    constructor(type,props,children){
        this.type=type
        this.props=props
        this.children=children
    }
}
//
function setAttr(node,key,value){
    switch(key){
        case 'value':
            if(node.tagName.toUpperCase==='INPUT'){
                node.value=value;
            }else{
                node.setAttribute(key,value);
            }
            break;
        case 'style':
            node.style.cssText=value;
            break;
        default:
            node.setAttribute(key,value);
            break;
    }
}
//返回虚拟节点的,返回object
function creatElement(type,props,children){
  return new Element(type,props,children)
};


//render 将vnode转化为真是的dom
function render(eleobj){
    let el = document.createElement(eleobj.type);
    Object.keys(eleobj.props).forEach(key => {
        setAttr(el,key,eleobj.props[key])
    })
    //遍历子代
    eleobj.children.forEach(child=>{
        child=(child instanceof Element)?render(child):document.createTextNode(child)
        el.appendChild(child)
    })
    return el;
}
//插入元素
function renderDom(el,target){
    target.appendChild(el)
}