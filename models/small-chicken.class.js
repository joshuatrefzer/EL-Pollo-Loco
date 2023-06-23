class SmallChicken extends MovableObject {
    y = 400;
    height = 50;
    width = 70;
    isChicken = true;
    energy = 100;
    otherDirection = false;
    offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
  };

    IMAGES_DIE = [
      'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
      'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    IMAGES_WALKING = [
       'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
       'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
       'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
 
    
    constructor() {
       super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
       this.x = Math.floor(Math.random() * (2000 - 300 + 1)) + 300; 
       this.speed = 0.15 + Math.random() * 0.7; //Mat Random ist immer eine zufällige Zahl zwischen 0 und 1
       this.loadImages(this.IMAGES_WALKING);
       this.loadImages(this.IMAGES_DIE);
       this.animate();
    }
    
    /**
     * animate img's -> dieing 
     */
    dieAnimation() {
      let interval = setInterval(() => {
         this.playAnimation(this.IMAGES_DIE);
      }, 200);
      setTimeout(() => {
         clearInterval(interval);
      }, 1000);
   }

   /**
    * start animation- intervals
    */
   animate() {
      let interval = setInterval(() => this.smallChickenMoving(), 1000 / 60); //60 fps!!
      setInterval(() => this.smallChickenAnimation(interval), 200);
   }

   /**
    * stop interval if dead, play interval walking chickens
    * @param {id} interval 
    */
   smallChickenAnimation(interval) {
      if (this.energy < 100) {
         clearInterval(interval);
         this.playAnimation(this.IMAGES_DIE);
      } else {
         this.playAnimation(this.IMAGES_WALKING);
      }
   }

   /**
    * check if walking right or left
    */
   smallChickenMoving() {
      if(this.otherDirection) {
         this.moveright();
      } else {
         this.moveLeft();
      }
   }
 }