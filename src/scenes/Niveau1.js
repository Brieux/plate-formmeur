class Niveau1 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/ennemi2.png');
        this.load.image('monstre2', 'assets/ennemi.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('first', 'assets/poteau.png');
        this.load.image('sol', 'assets/quai1.png');
        this.load.image('train', 'assets/train.png');
        this.load.image('fond', 'assets/quai2.png');
        this.load.video('intro', 'assets/intro.mp4','loadeddata', false, true);
    }

    create() {
        super.create();

        vid = this.add.video(448, 224, 'intro');
        vid.setDisplaySize(896,448);
        vid.play(true);
        vid.setDepth(40);
        vid.setLoop(false);
        vid.setCurrentTime(vid.getDuration());

        /////////////////////////////////////////////// La BASE DU NIVEAU /////////////////////////////////////

        //on définit la taille du tableau
        let largeurDuTableau=2000;
        let hauteurDuTableau=450; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.physics.add.collider(this.player,this.platforms);


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'fond'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra

        this.sky3=this.add.tileSprite(
          0,
          65,
          this.sys.canvas.width,
          this.sys.canvas.height,
          'train'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);
        this.sky3.alpha=1;
        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sol'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=1;

        this.foreground=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'first'
        );
        this.foreground.setScrollFactor(0);
        this.foreground.setOrigin(0,0);
        this.foreground.alpha=1;
        this.foreground.setDepth(20);


        this.player.setDepth(10);




        //des étoiles
        this.star1=this.physics.add.sprite(1900,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(1);


        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);


        this.physics.add.collider(this.player,this.platforms);

        //Monstres
        cafard = new monstre2(this,400,100);

        criquet = new monstreviolet(this,450,200);

        //plateformes
        let plate = this.physics.add.staticGroup();
        plate.create(0, 300, 'ground');
        plate.create(130 , 250, 'ground');
        plate.create(200, 200, 'ground');
        plate.create(410, 140, 'ground');
        plate.create(670, 400, 'ground');
        plate.create(820, 350, 'ground');
        plate.create(1000, 250, 'ground');
        plate.create(1250, 250, 'ground');
        plate.create(1500, 180, 'ground');
        plate.create(1750, 210, 'ground');
        plate.create(1820, 100, 'ground');
        plate.children.iterate(function (child) {
            child.setDisplaySize(100,50);
            child.setOrigin(0,0);
            child.refreshBody();});
        this.physics.add.collider(this.player, plate);
        this.physics.add.collider(this.star1, plate);
        this.physics.add.collider(cafard, plate);
        this.physics.add.collider(criquet, plate);






    }

    update(time, delta){
        super.update();
        this.player.powerUp(this, time, delta);
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.foreground.tilePositionX=this.cameras.main.scrollX*1.2;
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.6;

        this.sky3.tilePositionX = this.cameras.main.scrollX*0.3+500;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky.tilePositionX=this.cameras.main.scrollX*0.3+500;
        if (vid.getCurrentTime() == vid.getDuration()){
          vid.alpha -= 0.1;
        }
        if (vid.getCurrentTime() != vid.getDuration()){
          this.player.stop();
        }
        cafard.update();
        criquet.update();
        //console.log(cafard);

    }



}
