var Flog = cc.Sprite.extend({
    head: null,
    body: null,
    accelX: 0,
    fakeMouseX: 0,
    ctor: function() {
        this._super();
        this.head = new FlogHead();
        this.body = new FlogBody();
        this.body.setPosition(cc.p(0, this.body.preHeight/2));
        this.head.setPosition(0, this.body.preHeight);
        var size = cc.winSize;
        this.fakeMouseX = size.width/2;
        this.addChild(this.head);
        this.addChild(this.body);
        if (cc.sys.capabilities.hasOwnProperty('mouse')) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event){
                    var size = cc.winSize;
                    var locationX = event.getLocationX();
                    var center = size.width/2;
                    var diff = center-locationX;
                    var radius = 90/center * diff;
                    event.getCurrentTarget().head.rotation = -radius;
                }
            }, this)
        }

        if (cc.sys.capabilities.hasOwnProperty('accelerometer')) {
            cc.inputManager.setAccelerometerInterval( 1 / 10 );
            cc.inputManager.setAccelerometerEnabled(true);
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function(event)
                {
                    var FilteringFactor = 0.75;
                    var flog = event.getCurrentTarget();
                    flog.accelX = event.x * FilteringFactor + flog.accelX * (1.0 - FilteringFactor);
                    var radius = flog.accelX * 90;
                    radius = radius > 90 ? 90 : radius;
                    radius = radius < -90 ? -90 : radius;
                    flog.head.rotation = -radius;
                    cc.log('Accel X: ' + event.x + ' Y: ' + event.y + ' Z: ' + event.z);
                }
            }, this);
        }
    }
});

var FlogHead = cc.Sprite.extend({
    preWidth: 50,
    preHeight: 50,
    ctor: function() {
        this._super();
        var drawNote = cc.DrawNode.create();
        drawNote.drawRect(cc.p(-this.preWidth/2,-this.preHeight/2),cc.p(this.preWidth/2,this.preHeight/2));
        this.addChild(drawNote);
    }
});

var FlogBody = cc.Sprite.extend({
    preWidth: 100,
    preHeight: 50,
    ctor: function() {
        this._super();
        var drawNote = cc.DrawNode.create();
        drawNote.drawRect(cc.p(-this.preWidth/2,-this.preHeight/2),cc.p(this.preWidth/2,this.preHeight/2));
        this.addChild(drawNote);
    }
});