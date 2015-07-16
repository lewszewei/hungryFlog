var Tongue = cc.Sprite.extend({
    head: null,
    bodys: [],
    bodyPerFrame: 4,
    ctor: function() {
        this._super();
    },
    show: function() {
        this.head = new TongueHead();
        this.body = new TongueBody();
    }
});

var TongueHead = cc.Sprite.extend({
    preWidth: 5,
    preHeight: 5,
    ctor: function() {
        this._super();
        var drawNote = cc.DrawNode.create();
        drawNote.drawRect(cc.p(-this.preWidth/2,-this.preHeight/2),cc.p(this.preWidth/2,this.preHeight/2));
        this.addChild(drawNote);
    }
});

var TongueBody = cc.Sprite.extend({
    preWidth: 5,
    preHeight: 2,
    ctor: function() {
        this._super();
        var drawNote = cc.DrawNode.create();
        drawNote.drawRect(cc.p(-this.preWidth/2,-this.preHeight/2),cc.p(this.preWidth/2,this.preHeight/2));
        this.addChild(drawNote);
    }
});