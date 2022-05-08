function DoFirst(){

    let canvas = document.getElementById('canvas');   // 抓取畫布CANVAS 並獲取各按鈕ID
    let context = canvas.getContext('2d');
    let dress1 = document.getElementById('dress1');
    let dress2 = document.getElementById('dress2');
    let dress3 = document.getElementById('dress3');
    let clear = document.getElementById('clear');

    var eagleImg = new Image();                 // 這裡是讀取外部圖片語法, 需要先建立Image物件 並在頁面讀取完成時才載入
    eagleImg.src = './Clothes.jpg';
    eagleImg.onload = () => {
        context.drawImage(eagleImg, 0, 0, 500, 500);
     }

    var dress1img = new Image();
    dress1img.src = './dress1.png';

    var dress2img = new Image();
    dress2img.src = './dress2.png';
    
    var dress3img = new Image();
    dress3img.src = './dress3.png';

    dress1.addEventListener('click', function(){
        context.clearRect(0, 0, canvas.width, canvas.height);         // 換衣服過程
        context.drawImage(eagleImg, 0, 0, 500, 500);				// 1. 清除畫布   2. 載入光屁股老鷹底圖   3. 載入衣服
        context.drawImage(dress1img, 140, 250, 200, 150);
    });

    dress2.addEventListener('click', function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(eagleImg, 0, 0, 500, 500);
        context.drawImage(dress2img, 140, 250, 200, 150);
    });

    dress3.addEventListener('click', function(){
        let TimerX = 20;
        let changeClothes = function(){
            context.clearRect(0, 0, canvas.width, canvas.height);   // 這邊嘗試寫移動衣服，當衣服移動到指定座標停止計時器
            context.drawImage(eagleImg, 0, 0, 500, 500);
            context.drawImage(dress3img, TimerX, 250, 150, 150);
            TimerX ++;
            if(TimerX ==165){
                console.log('clear timer');
                clearInterval(ClothID);
            }
        }
        ClothID = setInterval(changeClothes, 1000/120);　// 換衣服沒有太過高速的變化，不會產生圖片閃爍


    });

    clear.addEventListener('click', function(){　　　　　　　　　　// 清除畫布 把光屁股老鷹圖載進來
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(eagleImg, 0, 0, 500, 500);
        console.log('clear');
    });

}

window.addEventListener('load', DoFirst);