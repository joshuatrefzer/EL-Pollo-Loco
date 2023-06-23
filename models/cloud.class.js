class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;

    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500; // Zahl zwischen 200 und 700 Math.random zwischen 0 und 1!!
        this.animate();
    }
    
    animate() {
       this.moveLeft();
    }

}