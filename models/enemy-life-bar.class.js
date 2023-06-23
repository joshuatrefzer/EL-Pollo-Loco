class EnemyLifeBar extends Statusbar  {

    IMAGES_ENEMY_LIFE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    lifeInPercentEB = 100;
    

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENEMY_LIFE);
        this.x = 1000;
        this.y = 25;
        this.setPercentageLifeEB(100);
    }

    /**
     * get the right path for the fitting percentage in the img-array
     * @param {number} percentage 
     */
    setPercentageLifeEB(percentage) { 
        this.lifeInPercentEB = percentage;
        let path = this.IMAGES_ENEMY_LIFE[this.resolveImageIndex()];
        this.img = this.imageCache[path];   
    }

    /**
     * 
     * @returns right index for the Images- array.
     */
    resolveImageIndex() {
        if (this.lifeInPercentEB == 100) {
            return 5;
        } else if (this.lifeInPercentEB >= 80) {
            return 4;
        } else if (this.lifeInPercentEB >= 60) {
            return 3;
        } else if (this.lifeInPercentEB >= 40) {
            return 2;
        } else if (this.lifeInPercentEB >= 20) {
            return 1;
        } else {
            return 0;
        }
    };
}