class Statusbar extends DrawableObject {
    IMAGES_LIFE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    IMAGES_COINS_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];


    IMAGES_STATUS_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];


    percentageLife = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFE);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentageLife(100);
    }

     /**
     * get the right path for the fitting percentage in the img-array
     * @param {number} percentage 
     */
    setPercentageLife(percentage) { 
        this.percentageLife = percentage;
        let path = this.IMAGES_LIFE[this.resolveImageIndex()];
        this.img = this.imageCache[path];   
    }


     /**
     * 
     * @returns right index for the Images- array.
     */
    resolveImageIndex() {
        if (this.percentageLife == 100) {
            return 5;
        } else if (this.percentageLife >= 80) {
            return 4;
        } else if (this.percentageLife >= 60) {
            return 3;
        } else if (this.percentageLife >= 40) {
            return 2;
        } else if (this.percentageLife >= 20) {
            return 1;
        } else {
            return 0;
        }
    };

}