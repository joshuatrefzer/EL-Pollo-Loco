class BottlesBar extends Statusbar {

    bottlesAmountInPercent = 1;
    percentageBottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BOTTLES);
        this.x = 20;
        this.y = 50;
        this.setPercentageBottles(0);
    }

    /**
     * if character collects a bottle, updates the progress bar.
     */
    collect() {
        this.bottlesAmountInPercent += 20;
        if (this.bottlesAmountInPercent === 100) {
            this.bottlesAmountInPercent = 100;
        }
    }

    /**
     * 
     * @returns right index for the Images- array.
     */
    resolveImageIndexCollectable() {
        if (this.percentageBottles == 101) {
            return 5;
        } else if (this.percentageBottles > 80) {
            return 4;
        } else if (this.percentageBottles > 60) {
            return 3;
        } else if (this.percentageBottles > 40) {
            return 2;
        } else if (this.percentageBottles > 20) {
            return 1;
        } else {
            return 0;
        }
    };

    /**
     * get the right path for the fitting percentage in the img-array
     * @param {number} percentage 
     */
    setPercentageBottles(percentage) {
        this.percentageBottles = percentage;
        let path = this.IMAGES_STATUS_BOTTLES[this.resolveImageIndexCollectable()];
        this.img = this.imageCache[path];
    }
}