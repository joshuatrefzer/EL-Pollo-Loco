class Bottle extends DrawableObject {

    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    constructor() {
        super();
        this.loadImg(this.BOTTLE_IMAGES[this.randomOneOrTwo()]);
        this.x = (Math.random() * 300) + (Math.random() * 2000)+ Math.random() * 20; 
        this.y = 340 + (Math.random() * 10);
        this.width = 100;
        this.height = 100;
    } 


}