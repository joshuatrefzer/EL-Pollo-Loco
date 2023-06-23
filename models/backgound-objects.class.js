class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * 
     * @param {'string'} imagePath 
     * @param {x- coordinate} x 
     * @param {y-coordinate} y 
     */
    constructor(imagePath, x, y) {
        super().loadImg(imagePath);
        this.x = x;
        this.y = 480 - this.height; // 480 (Höhe Canvas) - 400
    }
}