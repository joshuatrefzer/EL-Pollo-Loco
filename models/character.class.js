class Character extends MovableObject {
    height = 300;
    width = 150;
    speed = 10;
    y = 50;
    timeoutid;
    world;
    isjumped = 0;
    deadSound = new Audio('audio/dieing.mp3');
    walkingSound = new Audio('audio/walking.mp3');
    hurt_audio = new Audio('audio/hurt.wav');
    characterDead = false;
    

    offset = {
        top: 0,
        left: 60,
        right: 60,
        bottom: 20
    };


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];


    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png'); //super nur ein mal, danach reicht "this."
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
        this.getLastMove();
    }

    /**
     * when character is x > 1500 the life bar from EB gets visible
     */
    checkForEnemyLifeBar() {
        if (this.x > 1500) {
            this.world.enemyLife['x'] = 500;
            this.world.backgroundSound.pause();
            this.world.endbossSound.play();
        }
    }

    /**
     * character is thrown away, if EB hurts him
     */
    getsHurtFromEndboss() {
        if (!this.world.endBoss.otherDirection) {
            this.x -= 2;
        } else {
            this.x += 2;
        }

    }

    canThrowAgain() {
        this.canTrow = true;
        let iv = setTimeout(() => {
            this.canTrow = false;
            clearInterval(iv);
        }, 700);
    }


    /**
     * starts animations for character
     */
    animate() {
        setInterval(() => this.characterMoveAndJump(), 1000 / 60);
        this.checkAnimations();
    }

    /**
     * check which animation should be played
     */
    checkAnimations() {
        setInterval(() => {
            this.checkForEndBoss();
            if (this.isDead()) {
                this.characterDead = true;
                this.characterIsDead()
            } else if (this.isHurt()) {
                this.characterIsHurt();
            } else if (this.isInAir()) {
                this.characterIsJumping();
            } else {
                this.walkingAndStanding();
            }
        }, 100);
    }

    // ANIMATIONS: ***************************
    characterIsJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.getLastMove();
    }


    walkingAndStanding() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.characterIsWalking();
        } else {
            this.characterIsStanding();
            if (this.isSleeping) {
                this.playAnimation(this.IMAGES_SLEEPING);
                this.world.snoring.play();
            }
        }
    }

    characterIsStanding() {
        this.playAnimation(this.IMAGES_STANDING);
        this.isCharacterSleeping();
    }

    characterIsWalking() {
        this.getLastMove();
        this.playAnimation(this.IMAGES_WALKING);
        this.world.snoring.pause();
    }


    characterIsHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_audio.play();
        this.isSleeping = false;
        this.getLastMove();
        this.world.snoring.pause();
    }

    characterIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.deadSound.play();
        setTimeout(() => {
            this.world.endGame();
        }, 1000);
    }

    characterMoveAndJump() {
        this.walkingSound.pause();
        if (!this.characterDead) {
            if (this.canMoveRight()) {
                this.characterMoveRight();
            }
            if (this.canMoveLeft()) {
                this.characterMoveLeft();
            }
            if (this.canJump()) {
                this.checkForJumpOnChicken();
                this.canHurtChicken = false;
                this.jump();
                this.world.snoring.pause();
                this.getLastMove();
            }
        }
        this.world.camera_x = -this.x + 100; // -   => Gegenteil 
    }


    checkForJumpOnChicken() {
        setTimeout(() => {
            this.canHurtChicken = true;
        }, 200);
    }

    characterMoveLeft() {
        this.moveLeft();
        this.walkingSound.play();
        this.otherDirection = true;
    }

    characterMoveRight() {
        this.moveright();
        this.walkingSound.play();
        this.otherDirection = false;
        this.checkForEnemyLifeBar();
    }

    // Return validations for the right animations *********

    canJump() {
        return this.world.keyboard.SPACE && !this.isInAir();
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }



    /**
     * check for the EB to get the right direction to attack character
     */
    checkForEndBoss() {
        this.world.enemies.forEach((enemy) => {
            if (this.x > enemy.x) {
                enemy.otherDirection = true;
            } else if ((this.x < enemy.x)) {
                enemy.otherDirection = false;
            }
        });
    }

}