var GameLayer = cc.Layer.extend({
    flog:null,
    size:null,
    Bugs: [],
    ctor:function () {
        this._super();
        this.size = cc.winSize;
        this.flog = new Flog();
        this.flog.setPosition(this.size.width/2,0);
        this.addChild(this.flog);
        this.schedule(this.addBug, 2);
    },
    addBug: function() {
        var bug = new Bug();
        var ranX = Math.floor(cc.random0To1() * this.size.width);
        var ranY = this.size.height;
        bug.setPosition(ranX, ranY);
        this.addChild(bug);
    },
    removeBug: function(bug) {
        this.removeChild(bug)
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var game = new GameLayer();
        this.addChild(game);
    }
});

