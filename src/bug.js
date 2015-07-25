var Bug = cc.Sprite.extend({
    alive: true,
    direction: 1,
    stepX: 0,
    stepY: 0,
    ctor: function() {
        this._super();
        var drawNode = cc.DrawNode.create();
        drawNode.drawCircle(cc.p(0,0),5,360,64);
        this.addChild(drawNode);
        this.fly();
        this.schedule(this.fly,1);
        this.scheduleUpdate();
    },
    fly: function(){
        if (this.alive) {
            this.direction = cc.random0To1() > 0.5 ?  -1 : 1;
            this.stepX = (Math.floor((cc.random0To1() * 20) + 10) * this.direction)/60;
            this.stepY = (Math.floor((cc.random0To1() * 20) + 10))/60;
        }
    },
    update: function() {
        if (this.alive) {
            var size = cc.winSize;
            var preMoveX = this.x + this.stepX;
            if (preMoveX > size.width) {
                preMoveX = size.width;
            }
            if (preMoveX < 0) {
                preMoveX = 0;
            }
            var preMoveY = this.y -= this.stepY;
            this.x = preMoveX;
            this.y = preMoveY;

            if (this.y <= 100) {
                this._parent.removeBug(this);
            }
        }
    }
});