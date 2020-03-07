let allPathes;
let index = 0;

function patch(node, patches) {
    allPathes = patches;
    pathcWalk(node);
    //给摸个元素打补丁

}
function pathcWalk(node) {
    let currentPath = allPathes[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => pathcWalk(child));
    console.log(currentPath,node, currentPath)
    if (currentPath) {
        doPath(node,currentPath);
    }
}

function doPath(node, patches) {
    console.log(patches)
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                for (const key in patch.attrs) {
                    if (patch.attrs.hasOwnProperty(key)) {
                        let value = patch.attrs[key];
                        if(value){
                            setAttr(node,key,value)
                        }else{
                            node.removeAttribute(key)
                        }
                    }
                }
                break;
            case 'TEXT':
                console.log(patch)
                node.textContent=patch.text;
                break;
            case 'REPLACE':
                let newNode= (patch.newNode instanceof Element)?render(patch.newNode):document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode,node)
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
            default:
                break
        }

    })
}   