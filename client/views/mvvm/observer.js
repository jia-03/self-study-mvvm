class Observer{
    constructor(data){
        this.observer(data)
    }   
    observer(data){
        //对data将之前的属性改为get 和 set 的形式
        if(!data || typeof data!== 'object'){
            return
        }
        //要将数据 一一 劫持，先获取到data的key和 value
        Object.keys(data).forEach(key=>{
            //劫持
            this.definReactive(data,key,data[key])
            this.observer(data[key]) //深度递归劫持
        })
    }

    //定义响应式
    definReactive(obj,key,value){
        let that = this
        let dep = new Dep() //每个变化的数据，都会对应一个数组，这个数组是存放所有更新的操作
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set(newValue){ //当给data属性中设置值。更改获取属性的值
                if(newValue!=value){
                    //这里的this不是实例
                    that.observer(newValue) //如果是对象继续劫持

                    value=newValue


                    dep.notify() //通知所有人 数据更新了
                }
            },
        })
    }
}

class Dep{
    constructor(){
        //订阅的数组
        this.subs=[]
    }

    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(watcher=>{
            
            watcher.update()
        })
    }
}