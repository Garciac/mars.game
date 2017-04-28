/* global game */

// TODO
game.PlayerEntity = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "astronaut1",
                spritewidth: "48",
                spriteheight: "48",
                width: 48,
                height: 48,
                getShape: function () {
                    return (new me.Rect(0, 0, 48, 48)).toPolygon();
                }
            }]);
        //makes character walk and frame and []inside this tells which frame to use
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("smallWalk", [0, 0, 0], 80);

        this.renderable.setCurrentAnimation("idle");

        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    update: function (delta) {
        if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;

        } else {
            this.body.vel.x = 0;
        }

        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        this._super(me.Entity, "update", [delta]);
        return true;
    },

    collideHandler: function (response) {

    }

});

game.LevelTrigger = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },

    onCollision: function () {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }

});

//game.BadGuy = me.Entity.extend({
  //  init: function (x, y, settings) {
    //    this._super(me.Entity, 'init', [x, y, {
      //          image: "asteroid",
        //        spritewidth: "173",
          //      spriteheight: "132",
            //    width: 173,
              //  height: 132,
                //getShape: function () {
                  //  return (new me.Rect(0, 0, 173, 132)).toPolygon();
              //  }
           // }]);

   // },

   // update: function (delta) {

   // }

// });

