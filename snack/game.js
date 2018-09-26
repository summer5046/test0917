/*
** Create by liaozhi on 2018/8/5
*/
(function ( w ) {
    //声明一个全局变量，存放游戏控制器的this
    var that = null;
    function Game (map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function(){
        this.food.render(this.map);
        this.snake.render(this.map);
        moveAuto();
        bindKey();

    }
     function moveAuto(){
        //错误：因为定时器的调用者是window，所以setinterval中this指向window，
         // 要用bind方法使this指向游戏控制器。
         var timerID = setInterval(function (  ) {
             this.snake.move(this.food,this.map);
             this.snake.render(this.map);
             //错误：注意snake的x是指下标
             //错误：边界检测要放在定时器中
             if(this.snake.body[0].x*this.snake.width<0||this.snake.body[0].y*this.snake.height<0||this.snake.body[0].x*this.snake.width>=this.map.offsetWidth||this.snake.body[0].y*this.snake.height>=this.map.offsetHeight){
                 alert('Game over!');
                 clearInterval(timerID);
             }
         }.bind(that),200);


     }
     function bindKey(){
        window.onkeydown = function(e){
            switch ( e.keyCode ) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that)
     }
    w.Game = Game;
})(window)