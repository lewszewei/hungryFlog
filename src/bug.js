var Bug = cc.Sprite.extend({
    alive: true,
    ctor: function() {
        this._super();
        var drawNode = cc.DrawNode.create();
        drawNode.drawCircle(cc.p(0,0),5,360,64);
        this.addChild(drawNode);
        this.fly();
    },
    fly: function(){
        if (this.alive) {
            var dir = cc.random0To1() > 0.5 ?  -1 : 1;
            var ranX = Math.floor((cc.random0To1() * 20) + 10) * dir;
            var ranY = -(Math.floor((cc.random0To1() * 20) + 10));
            var flyAction = new BugFly(1,cc.p(ranX,ranY));
            this.runAction(flyAction);
        }

    }
});

var BugFly = cc.MoveBy.extend({
    ctor: function(duration, deltaPos) {
        this._super(duration, deltaPos);
    },
    stop: function() {
        this.originalTarget.fly();
    }
});