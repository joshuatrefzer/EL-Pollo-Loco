class CoinsBar extends Statusbar {

    coinsAmountInPercent = 1;
    percentageCoins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS_BAR);
        this.x = 20;
        this.y = 100;
        this.setPercentageCoins(0);
    }

    /**
     * updates the var coinsAmountInPercent after collecting coins
     */
    collect() {
        this.coinsAmountInPercent += 20;
        if (this.coinsAmountInPercent === 100) {
            this.coinsAmountInPercent = 100;
        } 
    }

    /**
     * 
     * @returns right index for the img array
     */
    resolveImageIndexCollectable() {
        if (this.percentageCoins == 101) {
            return 5;
        } else if (this.percentageCoins > 80) {
            return 4;
        } else if (this.percentageCoins > 60) {
            return 3;
        } else if (this.percentageCoins > 40) {
            return 2;
        } else if (this.percentageCoins > 20) {
            return 1;
        } else {
            return 0;
        }
    };

    /**
     * gets right img out of the array fitting with the percentage- var
     * @param {number} percentage 
     */
    setPercentageCoins(percentage) {
        this.percentageCoins = percentage;
        let path = this.IMAGES_COINS_BAR[this.resolveImageIndexCollectable()];
        this.img = this.imageCache[path]; 
    }   
}