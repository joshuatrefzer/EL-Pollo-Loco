class MovableObject extends DrawableObject {
    otherDirection = false;
    speed = 0.15;
    speedY = 0;
    accelleration = 2.5;
    energy = 100;
    lastHit = 0;
    unhurtable = false;
    lastMove = 0;
    lastThrow = 0;
    isSleeping = false;
    canThrow = false;
    canHurtChicken = false;

    /**
     * gravity for bottles and jumping chracter
     */
    applyGravity() {
        setInterval(() => {
            if (this.isInAir() || this.speedY > 0) { // || = oder, aber 
                this.y -= this.speedY;
                this.speedY -= this.accelleration;
            }
        }, 1000 / 25);

    }

    /**
     * 
     * @returns value to function if character / bottle is in air.
     */
    isInAir() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    /**
     * 
     * @returns value, when character is jumping
     */
    jump() {
        return this.speedY = 30;
    }

    /**
     * character is hit, if unhurtable is false
     */
    hit() {
        if (!this.unhurtable) {
            this.energy -= 20;
            world.characterUnhurtable('ishurt');
            if (this.energy <= 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * 
     * @returns energy value -> 0
     */
    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms 
        timepassed = timepassed / 1000; // teilen durch 1000 -> Sekunden
        return timepassed < 1;
    }

    /**
     * get last move, to know, when character is sleeping 
     */
    getLastMove() {
        this.lastMove = new Date().getTime();
    }


    /**
     * check, if character is sleeping
     */
    isCharacterSleeping() {
        let timepassed = new Date().getTime() - this.lastMove; 
        timepassed = timepassed / 1000; // teilen durch 1000 -> Sekunden
        if(timepassed > 5) {
            this.isSleeping = true;
        } else {
            this.isSleeping = false;
        }
    }

    getLastThrow() {
        this.lastThrow = new Date().getTime();
    }


    /**
     * check, if character is sleeping
     */
    isReadyToThrow() {
        let timepassed = new Date().getTime() - this.lastThrow; 
        timepassed = timepassed / 1000; // teilen durch 1000 -> Sekunden
        if(timepassed > 1) {
            this.canThrow = true;
        } else {
            this.canThrow = false;
        }
    }
    
    /**
     * chicken and character moving right, by changing x value
     */
    moveright() {
        this.x += this.speed;
    }

     /**
     * chicken and character moving left, by changing x value
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * put images from array into another array -> imageCache
     * @param {Array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // Modulu = Der Mathematische Rest, Rechnen mit Ganzzahlen
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * mo = character, bottle or enemy 
     * => checks for collisions
     * @param {element} mo 
     * @returns colliding values
     */

    isColliding(mo) {
        const xCollide = Math.max(this.x + this.offset.left, mo.x + mo.offset.left) < Math.min(this.x + this.width - this.offset.right, mo.x + mo.width - mo.offset.right);
        const yCollide = Math.max(this.y + this.offset.top, mo.y + mo.offset.top) < Math.min(this.y + this.height, mo.y + mo.height);
        return xCollide && yCollide;
      }
      
    // isColliding(mo) {
    //     const xCollide = Math.max(this.x, mo.x) < Math.min(this.x + this.width - this.offset.right, mo.x + mo.width - mo.offset.right);
    //     const yCollide = Math.max(this.y + this.offset.top, mo.y + mo.offset.top) < Math.min(this.y + this.height, mo.y + mo.height);
    //     return xCollide && yCollide;
    //   }
}

