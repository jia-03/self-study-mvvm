//观察者 的目的就是给需要观察的元素天机一个观察这，当数据变化后执行相对应的方法
class Watcher{
    constructor(vm,expr,cb){
        this.vm=vm
        this.expr=expr
        this.cb=cb;
        //先获取一下老的值
        this.value  = this.get();
    }

    getVal(vm,expr){ //获取实例上对应的数据
        expr= expr.split('.');
        return expr.reduce((prev,next)=>{ //vm.$data.a
            return prev[next]
        },vm.$data)
    }
    get (){

        //
        Dep.target=this //妈的比单词拼错.瑞特吗
        
        //
        let value= this.getVal(this.vm,this.expr);


        // Dep.tatget=null

        return value
    }
    //对外暴露的方法
    update(){
        let newValue = this.getVal(this.vm,this.expr);
        let oldValue = this.value;
        if(newValue!=oldValue){
            console.log(newValue,oldValue)
            this.cb(newValue); //调用watch的callback
        }
    }
}

//用新值和老值对比，如果变化就调用更新方法