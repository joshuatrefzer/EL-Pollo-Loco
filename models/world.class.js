class World {
    character = new Character();
    clouds = level1.clouds;
    enemies = level1.enemies;
    endBoss = level1['enemies'][(level1['enemies'].length) - 1];
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    win = false;
    camera_x = -100;
    level = level1;
    enbossActive = false;
    

    statusBar = new Statusbar();
    coinsBar = new CoinsBar();
    bottleBar = new BottlesBar();
    enemyLife = new EnemyLifeBar();
    

    bottle = [];
    coins = [];
    collectedBottles = [];
    collectedCoins = [];
    throwableObjects = [];


    snoring = new Audio('audio/snoring.mp3');
    gameOver = new Audio('audio/game-over.mp3');
    winSound = new Audio('audio/win.mp3');
    enoughBottles = new Audio('audio/enough.mp3');
    throwSound = new Audio('audio/throw.mp3');
    takeBottleSound = new Audio('audio/take_bottle.mp3');
    takeCoinsSound = new Audio('audio/coins.mp3');
    backgroundSound = new Audio('audio/western_sound.mp3');
    endbossSound = new Audio('audio/endboss-music.mp3');
    chickenDieSound = new Audio('audio/chicken-die.mp3');
    breakingBottle = new Audio('audio/breaking_bottle.mp3');

    audioArray = [
        this.enoughBottles,
        this.throwSound,
        this.takeBottleSound,
        this.takeCoinsSound,
        this.backgroundSound,
        this.endbossSound,
        this.chickenDieSound,
        this.character.deadSound,
        this.character.walkingSound,
        this.character.hurt_audio,
        this.endbossSound,
        this.winSound,
        this.gameOver,
        this.breakingBottle,
        this.snoring
    ];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.getBottles();
        this.getCoins();
        this.draw();
        this.setWorld();
        this.run();
        this.backgroundSound.play();
    }


    /**
     * get amount of existing bottles
     */
    getBottles() {
        for (let i = 0; i < 8; i++) {
            this.bottle.push(new Bottle());
        }
    }


    /**
    * get amount of existing coins
    */
    getCoins() {
        for (let i = 0; i < 5; i++) {
            this.coins.push(new Coins());
        }
    }


    /**
     * draw everything 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Wird jedes mal gelöscht (clear container)
        this.ctx.translate(this.camera_x, 0); //camera back
        this.addingFixedObjects();
        this.ctx.translate(-this.camera_x, 0);//camera forwards
        this.addLifeBars();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * adding fixed objects to map
     */
    addingFixedObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.bottle);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

    }

    /**
     * adding life bars
     */
    addLifeBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.enemyLife);
    }


    setWorld() {
        this.character.world = this;
    }

    /**
     * Adding all elements from array to map
     * @param {Array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * 
     * @param {object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * check 100x p/s collisions with all things
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkforCollectableBottles();
            this.checkforCollectableCoins();
            this.checkThrowableObjects();
        }, 100);
    }


    /**
     * check collisions between enemies and character 
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isInAir()) {
                this.character.hit();
                if (!enemy.isChicken) {
                    let intv = setInterval(() => {
                        this.character.getsHurtFromEndboss();
                    }, 5);
                    setTimeout(() => {
                        clearInterval(intv);
                    }, 700);
                }
                this.statusBar.setPercentageLife(this.character.energy);
            } else if (this.character.isInAir() && this.character.isColliding(enemy) && this.character.canHurtChicken) {
                this.killChicken(enemy);
                this.characterUnhurtable(enemy);
            };
        })
    }


    /**
     * when EB hurts character // interval -> character get thow away
     */
    hurtfromendboss() {
        let intv = setInterval(() => {
            this.character.getsHurtFromEndboss();
        }, 5);
        setTimeout(() => {
            clearInterval(intv);
        }, 700);
    }

    /**
     * when character jumps on chicken, character is unhurtable for a short time
     * @param {object} enemy 
     */
    characterUnhurtable(enemy) {
        if (enemy.isChicken || enemy == 'ishurt') {
            this.character.unhurtable = true;
            let iv = setTimeout(() => {
                this.character.unhurtable = false;
                clearInterval(iv);
            }, 1000);
        }
    }



    /**
     * check collisions with collectable Bottles
     */
    checkforCollectableBottles() {
        this.bottle.forEach((object) => {
            if (this.character.isColliding(object)) {
                if (this.collectedBottles.length < 5) {
                    this.takeBottleSound.play();
                    this.collectedBottles.push(this.bottle.indexOf(object));
                    this.updateBottleBar(20);
                    this.bottle.splice(this.bottle.indexOf(object), 1);//remove bottle from map 
                } else {
                    this.enoughBottles.play();
                }
            };
        })
    }

    /**
     * If character collides with coins -> collect them 
     */
    checkforCollectableCoins() {
        this.coins.forEach((object) => {
            if (this.character.isColliding(object)) {
                this.updateCollectedCoins(object);
            };
        })
    }

    /**
     * splice coins from map, when character collect them
     * @param {coin} object 
     */
    updateCollectedCoins(object) {
        if (this.collectedCoins.length < 5) {
            this.takeCoinsSound.play();
            this.collectedCoins.push(this.coins.indexOf(object));
            this.updateCoinsBar(20);
            this.coins.splice(this.coins.indexOf(object), 1);//remove  Coins from map 
        }
    }


    /**
     * Update bottles- percentage
     * @param {number} minusOrPlus 
     */
    updateBottleBar(minusOrPlus) {
        this.bottleBar.bottlesAmountInPercent = this.bottleBar.bottlesAmountInPercent + minusOrPlus;
        this.bottleBar.setPercentageBottles(this.bottleBar.bottlesAmountInPercent);
    }

    /**
     * update Coins -percentage
     * @param {number} minusOrPlus 
     */
    updateCoinsBar(minusOrPlus) {
        this.coinsBar.coinsAmountInPercent = this.coinsBar.coinsAmountInPercent + minusOrPlus;
        this.coinsBar.setPercentageCoins(this.coinsBar.coinsAmountInPercent);
    }


    /**
     * when D is pressed on keyboard, character throw bottle
     */
    checkThrowableObjects() {
        if (!this.character.characterDead) {
            this.character.isReadyToThrow();
            this.throwBottle();
        }
    }


    throwBottle() {
        if (this.isPossibleToThrow()) {
            this.character.getLastThrow();
            this.updateBottleBar(-20);
            let thrownBottle;
            if (this.character.otherDirection) {
                thrownBottle = new ThrowableObject(this.character.x, this.character.y + 100, true);
            } else {
                thrownBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, false);
            }
            this.updateAfterThrow(thrownBottle)
        }
    }


    isPossibleToThrow() {
        return this.keyboard.D && this.collectedBottles.length > 0 && this.character.canThrow;
    }

    /**
     * after bottle is thrown, the statusbar of the bottles gets updated & 
     * @param {object} thrownBottle 
     */
    updateAfterThrow(thrownBottle) {
        this.throwableObjects.push(thrownBottle);
        this.collectedBottles.pop();
        this.throwSound.play();
        let intervalID = setInterval(() => {
            this.throwableObjects.forEach((btl) => {
                this.checkCollisionswithBottle(btl, intervalID);
            });
        }, 100);
        setTimeout(() => {
            clearInterval(intervalID);
        }, 3000);
    }

    /**
     * check, if enemies are colliding with bottle
     * @param {object} btl 
     * @param {id} intervalID 
     */
    checkCollisionswithBottle(btl, intervalID) {
        level1.enemies.forEach((enemy) => {
            if (enemy.isColliding(btl)) {
                enemy.energy = enemy.energy - 20;
                this.updateEnemiesAfterCollision(enemy);
                btl['bottleHits'] = true;
                clearInterval(intervalID);
                this.spliceBottle(btl, 300);
            }
        });
    }


    spliceBottle(btl , timeout) {
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(btl) , 1);
        }, timeout);
    }

    /**
     * if enemy is hurt with bottle -> update life bar EB || chicken die
     * @param {object} enemy 
     */
    updateEnemiesAfterCollision(enemy) {
        if (enemy.isChicken) {
            this.killChicken(enemy);
        } else {
            this.enemyLife.setPercentageLifeEB(enemy.energy);
            if (enemy.energy <= 0) {
                this.killChicken(enemy);
            }
        }
    }

    /**
     * chicken dieing
     * @param {object} enemy 
     */
    killChicken(enemy) {
        if (enemy.isChicken || this.endBoss.energy <= 0) {
            enemy.energy = enemy.energy - 20;
            this.chickenDieSound.play();
            this.dieChickenTimeout(enemy);
        }
    }

    /**
     * timeout -> dieing chicken, before get spliced from map
     * @param {object} enemy 
     */
    dieChickenTimeout(enemy) {
        setTimeout(() => {
            if (this.enemies.indexOf(enemy) !== -1) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
                if (this.endBoss.energy <= 0) {
                    this.win = true;
                    this.endGame();
                }
            }
        }, 1000);
    }


    /**
     * Mirror objects on y axis / when walking in other direction f.e.
     * @param {object} mo 
     */
    flipImage(mo) {
        this.ctx.save(); //Status vom Kontext speichern 
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1); //An der Y Achse spiegeln 
        mo.x = mo.x * -1;
    }


    /**
     * restore the contect ctx. -> flip image back
     * @param {object} mo 
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    /**
     * when endboss is beaten || character dead.
     */
    endGame() {
        gameIsStarted = false;
        this.audioArray.forEach((sound) => {
            sound.pause();
        })
        if (this.win) {
            this.winSound.play();
        } else {
            this.gameOver.play();
        }
        document.getElementById('endscreen-loose').classList.remove('d-none');
        this.clearAllIntervals();
        getMobileButtons();
    }

    /**
     * clearing all intervals in the game
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}