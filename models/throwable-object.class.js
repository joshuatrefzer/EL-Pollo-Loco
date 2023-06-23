class ThrowableObject extends MovableObject {
    otherDirection = false;


    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    bottleHits = false;


    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };


    constructor(x, y, otherDirection) {
        super().loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.otherDirection  = otherDirection;
        if(otherDirection){
            this.x = this.x-200;
        }
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 70;
        this.throw();
    }


    /**
     * check for bottle- animations
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        let intervalID = setInterval(() => {
            if (this.y > 280 || this.bottleHits) { 
                clearInterval(intervalID);
                this.splashBottle();
            } else {
                this.playAnimation(this.IMAGES);
                if (!this.otherDirection) {
                    this.x += 15;
                } else {
                    this.x -= 15;
                }
            }
        }, 50);
    }


    /**
     * if bottle hits ground or enemy, the bottle splashes
     */
    splashBottle() {
        let id = setInterval(() => {
            world.breakingBottle.play();
            this.playAnimation(this.IMAGES_SPLASH);
        }, 100);
        setTimeout(() => {
            clearInterval(id);
        }, 100);
    }
}





