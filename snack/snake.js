/*
** Create by liaozhi on 2018/8/5
*/
//错误：自调用函数要带括号
(function( w ) {
    function Snake(width,height,direction){
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        this.body = [
            {x:3,y:1,color:'green'},
            {x:2,y:1,color:'yellow'},
            {x:1,y:1,color:'blue'}
        ]
    }
    //声明一个空数组，存放添加的div代码
    var list = [];
    Snake.prototype.render = function(map){
        removeSnake(map);
        for(var i = 0;i<this.body.length;i++){
            var div1 = document.createElement('div');
            div1.style.width = this.width+'px';
            div1.style.height = this.height+'px';
            // div1.style.direction = this.direction;
            //错误：颜色需要传给div1
            div1.style.backgroundColor = this.body[i].color;
            div1.style.position = 'absolute';
            div1.style.left = this.body[i].x*this.width+'px';
            div1.style.top = this.body[i].y*this.height+'px';
            map.appendChild(div1);
            list.push(div1);
        }
    }
    function removeSnake(map){
        for(var i = 0;i<list.length;i++){
            map.removeChild(list[i]);
        }
        list.length = 0;
    }
    Snake.prototype.move = function(food,map){
        //蛇身移动
        for(var i = this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        //蛇头移动
        switch ( this.direction ){
            case 'left':
                this.body[0].x--;
                break;
            case 'right':
                this.body[0].x++;
                break;
            case 'top':
                this.body[0].y--;
                break;
            case 'bottom':
                this.body[0].y++;
                break;
        }
        //吃食物：长身体/新生成食物
        if(food.x==this.body[0].x*this.width&&food.y==this.body[0].y*this.height){
            //添加一节身体
            // var x = this.body[this.body.length-1].x;
            // var y = this.body[this.body.length-1].y;
            // this.body.push({x:x,y:y,color:'blue'});
            this.body.push({x:this.body[this.body.length-1].x,y:this.body[this.body.length-1].y,color:colors[Math.floor(Math.random()*8)]});
            food.render(map);
        }
    }
    //存放颜色的数组
    var colors = ["skyblue","pink","hotpink","yellowgreen","greenyellow","purple","orange","blue"];


    w.Snake = Snake;
})(window)