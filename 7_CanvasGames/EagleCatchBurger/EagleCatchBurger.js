function DoFirst(){

    let rightkey = document.getElementById('right');
    let leftkey = document.getElementById('left');
 
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    class Eagle{
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.width = 100;
            this.height = 100;
            this.speed = 5;
            
            rightkey.addEventListener('touchstart', ()=> {
                this.rightPressed = true;
            });
            rightkey.addEventListener('touchend', ()=> {
                this.rightPressed = false;
            });
            leftkey.addEventListener('touchstart', ()=> {
                this.leftPressed = true;
            });
            leftkey.addEventListener('touchend', ()=> {
                this.leftPressed = false;
            });

            document.addEventListener('keydown', this.keydown);
            document.addEventListener('keyup', this.keyup);
        }

        draw(context){
            this.move();

            let eagleImg = new Image();
            eagleImg.src = './eagle.svg';
            eagleImg.onload = () => {
                context.drawImage(eagleImg, this.x, this.y, 100, 100)
             }

            context.strokeRect(this.x, this.y, this.width, this.height);
            context.stroke(); // 外框 碰撞指示用
        }

        move(){  //下方一整串利用鍵盤是否按下, 判斷是否將老鷹物件座標增減 (產生移動)
            if(this.downPressed){
                this.y += this.speed;
            }
            if(this.upPressed){
                this.y -= this.speed;
            }
            if(this.leftPressed){
                if(this.x != 0 ){
                    this.x -= this.speed;  // 這邊去限制移動到畫布邊緣停止移動
                }else{
                    this.x = 0;
                }
            }
            if(this.rightPressed){
                if(this.x == canvas.width - this.width){
                    this.x = canvas.width - this.width;
                }else{
                    this.x += this.speed;
                }
            }
        }

        keydown = (e) => {
            if(e.code === 'ArrowUp'){
                this.upPressed = true;
            }
            if(e.code === 'ArrowDown'){
                this.downPressed = true;
            }
            if(e.code === 'ArrowLeft'){
                this.leftPressed = true;
            }
            if(e.code === 'ArrowRight'){
                this.rightPressed = true;
            }
    
        };
    
    
        keyup = (e) => {
            if(e.code === 'ArrowUp'){
                this.upPressed = false;
            }
            if(e.code === 'ArrowDown'){
                this.downPressed = false;
            }
            if(e.code === 'ArrowLeft'){
                this.leftPressed = false;
            }
            if(e.code === 'ArrowRight'){
                this.rightPressed = false;
            }

        };

    }

    class Burger{
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 30;
            this.speed = 5;
        }

        draw(context){
            this.y += this.speed;
            context.fillStyle='red';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.stroke(); // 外框 碰撞指示用
        }

        collidWith(sprite){  // 2D碰撞: XY座標互相重疊(在範圍內)
            if(this.x < sprite.x + sprite.width && 
                this.x + this.width > sprite.x &&
                this.y < sprite.y + sprite.height &&
                this.y + this.height > sprite.y){
                    return true;
                }
            return false;
        }

    }

    class BurgerController{
        BurgerList = [];
        
        constructor(canvas){
            this.canvas = canvas;
        }
    
        FallBurger(x, y){
            this.BurgerList.push(new Burger(x, y));
        }
    
    
    
        draw(context){         
            this.BurgerList.forEach( (burger) => {
                if(this.BurgerOffScreen(burger)){
                    const index = this.BurgerList.indexOf(burger);  // 若觸及邊界觸發處理程序
                    this.BurgerList.splice(index, 1);              // 刪除子彈陣列中的子彈
                    console.log('slice burger');
                }
    
                burger.draw(context);
            });
        }
    
    
        collidWith(sprite){  // some用於檢查陣列中任一元素符合條件
            return this.BurgerList.some(bullet=>{
                if(bullet.collidWith(sprite)){
                    this.BurgerList.splice(this.BurgerList.indexOf(bullet), 1);
                    return true;
                }
                return false;
            });
        }
    
    
    
        BurgerOffScreen(burger){
            return burger.y <= burger.height;  // 判斷是否觸及邊界 
        }
    }



    const eagleplayer = new Eagle(canvas.width*0.45, canvas.height*0.8);  //老鷹產生的起始位置 位於CANVAS下方與中央位置


    // const tBurger = new Burger(300,0);

    // const testburgers = [
    //     new Burger(50, -50),
    //     new Burger(150,-130),
    //     new Burger(200,-250),
    // ];

    const HBcontrol = new BurgerController( new Burger(50, -50), new Burger(150,-130), new Burger(200,-250))
    HBcontrol.FallBurger(50, -50);

    function gameLoop(){
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        eagleplayer.draw(context);
        HBcontrol.draw(context);
        // testburgers.forEach( (e)=> {
        //     e.draw(context);

        //     if (e.collidWith(eagleplayer)){
        //         context.font='50px sans-serif';
        //         context.fillText('collide', 200, 200, 100);
        //     }
            
        // });

        // if (tBurger.collidWith(eagleplayer)){
        //     context.font='50px sans-serif';
        //     context.fillText('collide', 200, 200, 100);
        // }

        context.fillStyle='blue'; //這個藍色方塊是用來檢查程式碼有沒有出包  如果連這色塊都跑不出來 代表程式碼問題大了
        context.fillRect(250,250, 50,50);

        if ( eagleplayer.x + eagleplayer.width > 250 &&
                eagleplayer.x <300 &&
                eagleplayer.y + eagleplayer.height > 250  &&
                eagleplayer.y < 300){

                context.font='50px sans-serif';
                context.fillText('collide', 200, 200, 100);
                context.fillStyle='pink';
                context.fillRect(250,250, 50,50);
        }


    }
    
    
    setInterval(gameLoop, 1000/30);



}

window.addEventListener('load', DoFirst);