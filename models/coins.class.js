class Coins extends DrawableObject {

    COINS_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    constructor() {
        super();
        this.loadImg(this.COINS_IMAGES[this.randomOneOrTwo()]);
        this.x = (Math.random() * 300) + (Math.random() * 2000); 
        this.y = 150 + (Math.random() * 30);
        this.width = 200;
        this.height = 200;
    } 

}