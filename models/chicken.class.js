class Chicken extends MovableObject {
   y = 370;
   height = 80;
   width = 100;
   energy = 100;
   walkinterval;
   isChicken = true;
   otherDirection = false;


   offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
  };

   IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
   ];

   IMAGES_DIE = [
      'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
      'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
      'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
      'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
      'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
   ];



   constructor() {
      super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
      this.x = Math.floor(Math.random() * (2000 - 300 + 1)) + 300; // Zahl zwischen 200 und 700 Math.random zwischen 0 und 1!!
      this.speed = 0.15 + Math.random() * 0.7; //Mat Random ist immer eine zufällige Zahl zwischen 0 und 1
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DIE);
      this.animate();
   }


   /**
    * starts animation for dieing chicken
    */
   dieAnimation() {
      clearInterval(this.walkinterval);
      let interval = setInterval(() => {
         this.playAnimation(this.IMAGES_DIE);
      }, 200);
      setTimeout(() => {
         clearInterval(interval);
      }, 1000);
   }

   /**
    * starts animation for moving chicken
    */
   animate() {
      let interval = setInterval(() => this.chickenMoving(), 1000 / 60); //60 fps!!
      setInterval(() => this.chickenAnimations(interval), 200);
   }

   /**
    * 
    * @param {id} interval 
    */
   chickenAnimations(interval) {
      if (this.energy < 100) {
            this.playAnimation(this.IMAGES_DIE);
            clearInterval(interval);
         } else {
            this.playAnimation(this.IMAGES_WALKING);
         }
   }

   /**
    * asks for the chicken to move in the right direction
    */
   chickenMoving(){
      if(this.otherDirection) {
         this.moveright();
      } else {
         this.moveLeft();
      }
   }
}