class MVVM{
    constructor(options){
        //最开始，先把可用的东西挂载在实例上
        this.$el=options.el
        this.$data=options.data

        //如果有要编译的模板，就编译
        if(this.$el){
            //数据劫持，就是把对象的所有属性 改为get 和 set 
            new Observer(this.$data)
            this.pxoryData(this.$data)
            //用数据和元素进行编译
            new Compile(this.$el,this);
        }
    }
    pxoryData(data){
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                get(){
                    return data[key]
                },
                set(newValue){
                    data[key]=newValue
                }
            })
        })
    }
}