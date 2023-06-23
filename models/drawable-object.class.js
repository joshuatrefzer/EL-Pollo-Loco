class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * 
     * @param {number} randomOneOrTwo 
     * @returns 1 or 0 for random imgs. (coins & bottles)
     */
    randomOneOrTwo(randomOneOrTwo) {
        randomOneOrTwo = Math.random();
        if (randomOneOrTwo < 0.5) {
            return 0;
        } else {
            return 1;
        }
    }

    /**
     * loads new Image, with the right path. this () => is called in constructors.
     * @param {'string'} path 
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * try & catch, calling the drawImage method.
     * @param {Context} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Error loading Image', e);
            console.log ('Could not load image', this.img);
        }
    }

        /**
         * draws rectangle to see the collissions 
         * @param {Context} ctx 
         */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken|| this instanceof SmallChicken|| this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = 0;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * loads imgs from array.
     * @param {*} arr ['img/image1.png', ... ]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


}