class Compile{
    constructor(el,vm){
        this.el=this.isElementNode(el)?el:document.querySelector(el)
        this.vm=vm
        if(this.el){
            //如果这个元素能获取到，我们才开始
            //1.先把真实的dom移入到内存中 frament

            let fragment= this.node2fragment(this.el)

            //2.编译=> 提取想要的元素节点，v-model 文本节点

            this.compile(fragment)

            //吧编译好的fragment添回页面
            this.el.appendChild(fragment)
        }
    }
    //专门写一些辅助方法
    isElementNode(node){
        return node.nodeType===1;
    }
    isDirective(name){
        return name.includes('v-')
    }

    //核心方法
    compileElement(node){
        //带v-model
        let attrs = node.attributes;
        Array.from(attrs).forEach((attr)=>{
            //判断属性名字是不是V-
            let attrName=attr.name
            if(this.isDirective(attrName)){
                //取相应的值放到节点中
                let expr = attr.value
                //node this.vm.$data
                // todo ........
               let [,type] = attrName.split('-')
                CompileUtil[type](node,this.vm,expr)
            }
        })
    }

    compileText(node){
            //带{{}}
            let expr = node.textContent;
            let reg = /\{\{([^}]+)\}\}/g
            if(reg.test(expr)){
                  //node this.vm.$data text
                  //todo .......
                CompileUtil['text'](node,this.vm,expr)

            }
    }

    
    compile(fragment){
        //需要递归
        let childNodes = fragment.childNodes
        Array.from(childNodes).forEach(node=>{
            if(this.isElementNode(node)){
                // console.log('节点',node)

                //节点 还要继续检查处理
                //编译元素
                this.compileElement(node)
                this.compile(node)
            }else{
                //文本
                // console.log('文本',node)
                //编译文本
                this.compileText(node)

            }
        })
    }


    node2fragment(el){//需要将el中的内容放在内存中
        //文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild=el.firstChild){
            fragment.appendChild(firstChild)
        }
        return fragment //内存中的节点
        
    }

}


CompileUtil={
    getVal(vm,expr){
        expr= expr.split('.');
        return expr.reduce((prev,next)=>{ //vm.$data.a
            return prev[next]
        },vm.$data)
    },
    getTextVal(vm,expr){
        return expr.replace(/\{\{([^}]+)\}\}/g,(...arg)=>{
            return this.getVal(vm,arg[1]) 
        })
    },
    text(node,vm,expr){//文本
        let updateFn = this.updater['textUpdater']
        let value = this.getTextVal(vm,expr)
        
        //这里加一个监控数据变化。调用这个watch的callbaclk
        // {{a}} {{b}}
        expr.replace(/\{\{([^}]+)\}\}/g,(...arg)=>{
            new Watcher(vm,arg[1],(newValue)=>{
                //如果数据变化.文本节点需要重新获取依赖的属性
                updateFn && updateFn(node,this.getTextVal(vm,expr))
            })
        })
      
        //
        updateFn && updateFn(node,value)
    },

    setVal(vm,expr,value){ // [message,a]
        expr = expr.split('.');
        //收敛
        return expr.reduce((prev,next,currentIndex)=>{ 
            if(currentIndex===expr.length-1){
              return prev[next] =value
            }
            return prev[next]
        },vm.$data)


    },
    model(node,vm,expr){//输入框处理
        let updateFn = this.updater['modelUpdater']

        //这里加一个监控数据变化。调用这个watch的callbaclk

        new Watcher(vm,expr,(newValue)=>{

            //如果数据变化了，文本节点需要重新获取依赖的属性更新文本内容

             updateFn && updateFn(node,this.getVal(vm,expr))

        })
        //

        node.addEventListener('input',(e)=>{
            let newValue = e.target.value
            this.setVal(vm,expr,newValue)

        })
        updateFn && updateFn(node,this.getVal(vm,expr))
    },
    updater:{
        //文本更新
        textUpdater(node,value){
            node.textContent=value
        },
        //
        modelUpdater(node,value){
            node.value=value
        }
    }
}