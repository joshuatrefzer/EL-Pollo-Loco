class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -40;
    x = 2500;
    energy = 100;
    otherDirection = false;

    offset = {
        top: 0,
        left: 40,
        right: 40,
        bottom: 0
    };


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DIE = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImg(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DIE);
        this.x = 2000;
        this.animate();
    }

    /**
     * start animation for EB
     */
    animate() {
        let intervall = setInterval(() => this.playEndbossAnimations(intervall), 100);
    }

    /**
     * play different animations, for changing life-percentage
     * @param {id} intervall 
     */
    playEndbossAnimations(intervall) {
        if (this.energy == 100) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.energy <= 80 && this.energy > 60) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveAttack(3);
        } else if (this.energy <= 60 && this.energy > 0) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.moveAttack(8);
        } else if(this.energy <= 0){
            this.playAnimation(this.IMAGES_DIE);
            this.endBossDie(intervall);
        }
    }


    /**
     * stop animation wehen EB is dead.
     * @param {id} intervall 
     */
    endBossDie(intervall){
        setTimeout(() => {
            clearInterval(intervall);
        }, 1000);
    }


    /**
     * speed of EB changes, he get's angry
     * @param {number} speed 
     */
    moveAttack(speed){
        if(this.otherDirection){
            this.x += speed;
        } else {
            this.x -= speed;
        }
    }

}