class monstreviolet extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monster-violet");
        this.body.allowGravity=true;

        this.setDisplaySize(64,64);
        this.setVelocityX(75);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
    }

    update(){
      if (this.body.velocity.x > 0){
        this.setFlip(true, false);
      }
      else {
        this.setFlip(false, false);
      }
    }

}
