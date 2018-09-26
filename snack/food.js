/*
** Create by liaozhi on 2018/8/5
*/
(function( w ) {
    function Food ( width,height,color ) {
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || 'red';
    }
    var list = [];
//错误：给原型添加方法，用表达式方式
    Food.prototype.render = function(map){
        removeFood(map);
        this.x = Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
        this.y = Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
        var div1 = document.createElement('div');
        div1.style.width = this.width+'px';
        div1.style.height = this.height+'px';
        div1.style.backgroundColor = this.color;
        div1.style.position = 'absolute'
        div1.style.left = this.x+'px';
        div1.style.top = this.y+'px';
        //错误：把创建的元素添加入map
        map.appendChild(div1);
        list.push(div1);
    }
    function removeFood(map){
        for(var i = 0;i<list.length;i++){
            map.removeChild(list[i]);
            list.pop(list[i]);
        }
    }

w.Food = Food;
})(window)