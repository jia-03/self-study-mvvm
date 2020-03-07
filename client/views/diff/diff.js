function diff(oldTree, newTree) {
    let patches = {};
    let index = 0;
    //递归树,比较后的v结果放在补丁包
    walk(oldTree, newTree, index, patches);
    return patches;
}
function diffAttr(oldAttrs, newAttrs) {
    let path = {};
    //判断新老属性的关系
    for (const key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            path[key] = newAttrs[key];
        }
    }
    for (const key in newAttrs) {
        //老节点没有新的节点属性
        if (!oldAttrs.hasOwnProperty(key)) {
            path[key] = newAttrs[key];
        }
    }
    return path;
}
let Index=0
function diffChildren(oldChildren, newChildren, index, patches) {
    //比较老的和新的第一个
    oldChildren.forEach((child, idx) => {
        //索引不应该是index.....
        // index 每次传递给walk时,index是递增的,所有都基于一个实现
        walk(child, newChildren[idx], ++Index, patches);
    })
}
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}
const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
function walk(oldNode, newNode, index, patches) {
    let currentPatch = [];//每个元素都有补丁对象
    if(!newNode){//没有新节点
        currentPatch.push({ type: REMOVE, text: newNode });
    }else if (isString(oldNode) && isString(newNode)) {//判断文本是否一样
        if (oldNode !== newNode) {
            currentPatch.push({ type: TEXT, text: newNode });
        }

    } else if (oldNode.type === newNode.type) {
        //比较属性是否有变化
        let attrs = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs });
        }
        //如果有子节点,遍历
        diffChildren(oldNode.children, newNode.children, index, patches);
    }else{
        //节点被替换
       currentPatch.push({type:REPLACE,newNode});
    }
    if (currentPatch.length > 0) {
        patches[index] = currentPatch;
    }
}