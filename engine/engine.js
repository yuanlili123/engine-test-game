var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var engine;
(function (engine) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    engine.Point = Point;
    var Rectangle = (function () {
        function Rectangle(_x, _y, _width, _height) {
            this.x = 0;
            this.y = 0;
            this.width = 1;
            this.height = 1;
            this.x = _x;
            this.y = _y;
            this.width = _width;
            this.height = _height;
        }
        Rectangle.prototype.isPointInRectangle = function (point) {
            var rect = this;
            if (point.x < rect.width + rect.x &&
                point.y < rect.height + rect.y &&
                point.x > rect.x &&
                point.y > rect.y) {
                return true;
            }
        };
        return Rectangle;
    }());
    engine.Rectangle = Rectangle;
    function pointAppendMatrix(point, m) {
        var x = m.a * point.x + m.c * point.y + m.tx;
        var y = m.b * point.x + m.d * point.y + m.ty;
        return new Point(x, y);
    }
    engine.pointAppendMatrix = pointAppendMatrix;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m) {
        var a = m.a;
        var b = m.b;
        var c = m.c;
        var d = m.d;
        var tx = m.tx;
        var ty = m.ty;
        var determinant = a * d - b * c;
        var result = new Matrix(1, 0, 0, 1, 0, 0);
        if (determinant == 0) {
            throw new Error("no invert");
        }
        determinant = 1 / determinant;
        var k = result.a = d * determinant;
        b = result.b = -b * determinant;
        c = result.c = -c * determinant;
        d = result.d = a * determinant;
        result.tx = -(k * tx + c * ty);
        result.ty = -(b * tx + d * ty);
        return result;
    }
    engine.invertMatrix = invertMatrix;
    function matrixAppendMatrix(m1, m2) {
        var result = new Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
    }
    engine.matrixAppendMatrix = matrixAppendMatrix;
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    var Matrix = (function () {
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        Matrix.prototype.updateFromDisplayObject = function (x, y, scaleX, scaleY, rotation) {
            this.tx = x;
            this.ty = y;
            var skewX, skewY;
            skewX = skewY = rotation / 180 * Math.PI;
            var u = Math.cos(skewX);
            var v = Math.sin(skewX);
            this.a = Math.cos(skewY) * scaleX;
            this.b = Math.sin(skewY) * scaleX;
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        Matrix.prototype.updateSkewMatrix = function (b, c) {
            this.b = b;
            this.c = c;
        };
        return Matrix;
    }());
    engine.Matrix = Matrix;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Ticker = (function () {
        function Ticker() {
            this.listeners = [];
        }
        Ticker.getInstance = function () {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        };
        Ticker.prototype.register = function (listener) {
            this.listeners.push(listener);
        };
        Ticker.prototype.unregister = function (listener) {
        };
        Ticker.prototype.notify = function (deltaTime) {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(deltaTime);
            }
        };
        return Ticker;
    }());
    engine.Ticker = Ticker;
    /*
    export var timeStamp = 0;
    export function startTick (callBack: (timeStamp: number) => boolean, thisObject: any): void{
        setInterval(()=>{
            callBack(timeStamp);
            timeStamp+=16;

        },16)

    }
    */
})(engine || (engine = {}));
var engine;
(function (engine) {
    var res;
    (function (res) {
        var __cache = {};
        var __imageConfig = {
            "images": [
                { name: "wander-icon.jpg", width: 180, height: 180 },
                { name: "S_Watcher.png", width: 190, height: 190 },
            ]
        };
        function loadConfig() {
            var length = __imageConfig.images.length;
            __imageConfig.images.forEach(function (config) {
                //生成的texture只有宽高信息，没有data信息
            });
        }
        res.loadConfig = loadConfig;
        function loadRes(name) {
            var resource = getRes(name);
            resource.load();
        }
        res.loadRes = loadRes;
        function getRes(name) {
            if (__cache[name]) {
                console.log("same cache !");
                return __cache[name];
            }
            else {
                __cache[name] = new ImageResource(name);
                return __cache[name];
            }
        }
        res.getRes = getRes;
        var ImageResource = (function () {
            function ImageResource(name) {
                this.bitmapData = document.createElement("img");
                this.bitmapData.src = "Close_s.png";
                this.url = name;
            }
            ImageResource.prototype.load = function () {
                var _this = this;
                var realResource = document.createElement("img");
                realResource.src = this.url;
                realResource.onload = function () {
                    _this.bitmapData = realResource;
                    console.log(realResource.src + "Has Loaded");
                };
            };
            return ImageResource;
        }());
        res.ImageResource = ImageResource;
    })(res = engine.res || (engine.res = {}));
})(engine || (engine = {}));
var engine;
(function (engine) {
    var DisplayObject = (function () {
        function DisplayObject(_type) {
            this.type = "DisplayObject";
            this.x = 0;
            this.globalX = 0;
            this.y = 0;
            this.globalY = 0;
            this.width = 0;
            this.height = 0;
            this.scaleX = 1;
            this.globalscaleX = 1;
            this.scaleY = 1;
            this.globalscaleY = 1;
            this.alpha = 1;
            this.globalAlpha = 1;
            this.globalrotation = 0;
            this.rotation = 0;
            this.skewX = 0;
            this.skewY = 0;
            /*  1.MouseMove
                2.MouseClick
                3.MouseClick
             */
            this.touchEnabled = false;
            this.visible = true;
            this.type = _type;
            this.localMatrix = new engine.Matrix();
            this.globalMatrix = new engine.Matrix();
            this.skewMatrix = new engine.Matrix();
            this.eventList = [];
        }
        DisplayObject.prototype.setWidth = function (_width) {
            this.width = _width;
        };
        DisplayObject.prototype.setHeight = function (_height) {
            this.height = _height;
        };
        DisplayObject.prototype.setOffSetY = function (_y) {
            this.y = _y;
        };
        DisplayObject.prototype.setSkewX = function (_skewX) {
            this.skewX = _skewX;
        };
        DisplayObject.prototype.setSkewY = function (_skewY) {
            this.skewY = _skewY;
        };
        DisplayObject.prototype.setTouchEnabled = function (_isEnalbe) {
            this.touchEnabled = _isEnalbe;
        };
        DisplayObject.prototype.addEventListener = function (_type, _func, _isCapture, _target) {
            var event = new engine.MyEvent(_type, _func, _isCapture, _target);
            this.eventList.push(event);
        };
        //模板方法模式
        DisplayObject.prototype.update = function () {
            this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            if (this.parent) {
                this.globalMatrix = engine.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
            }
            else {
                this.globalMatrix = this.localMatrix;
            }
            if (this.parent) {
                this.globalAlpha = this.parent.globalAlpha * this.alpha;
            }
            else {
                this.globalAlpha = this.alpha;
            }
        };
        return DisplayObject;
    }());
    engine.DisplayObject = DisplayObject;
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            var _this = _super.call(this, "TextField") || this;
            _this.text = "";
            _this.textColor = "#000000";
            _this.nextLine = 78;
            _this.font_family = "normal";
            _this.size = 15;
            _this.isbold = false;
            _this.isitalic = false;
            return _this;
        }
        TextField.prototype.hitTest = function (_relativeX, _relativeY) {
            if (this.touchEnabled) {
                var testRect = new engine.Rectangle(0, 0, 10 * this.text.length, 20);
                var checkPoint = new engine.Point(_relativeX, _relativeY);
                if (testRect.isPointInRectangle(checkPoint)) {
                    var manageList = engine.TouchEventService.getInstance().manageList;
                    if (this.eventList.length != 0) {
                        manageList.push(this);
                    }
                    console.log(this.name);
                    console.log(true);
                    return this;
                }
                else {
                    alert(false);
                    return null;
                }
            }
        };
        return TextField;
    }(DisplayObject));
    engine.TextField = TextField;
    var BitMap = (function (_super) {
        __extends(BitMap, _super);
        function BitMap() {
            return _super.call(this, "Bitmap") || this;
        }
        BitMap.prototype.hitTest = function (_relativeX, _relativeY) {
            if (this.touchEnabled) {
                var testRect = new engine.Rectangle(0, 0, this.width, this.height);
                var checkPoint = new engine.Point(_relativeX, _relativeY);
                if (testRect.isPointInRectangle(checkPoint)) {
                    console.log("reaction " + this.name);
                    //alert(true);
                    var manageList = engine.TouchEventService.getInstance().manageList;
                    if (this.eventList.length != 0) {
                        manageList.push(this);
                    }
                    return this;
                }
                else {
                    //alert(false);
                    console.log("no reaction " + this.name);
                    return null;
                }
            }
        };
        return BitMap;
    }(DisplayObject));
    engine.BitMap = BitMap;
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            var _this = _super.call(this, "DisplayObjectContainer") || this;
            _this.array = new Array();
            return _this;
        }
        DisplayObjectContainer.prototype.addChild = function (_child) {
            _child.parent = this;
            this.array.push(_child);
        };
        DisplayObjectContainer.prototype.removeChild = function (_child) {
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i] == _child) {
                    this.array.splice(i, 1);
                    break;
                }
            }
        };
        DisplayObjectContainer.prototype.update = function () {
            if (this.visible) {
                _super.prototype.update.call(this);
                for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
                    var child = _a[_i];
                    child.update();
                }
            }
        };
        DisplayObjectContainer.prototype.hitTest = function (_relativeX, _relativeY) {
            var manageList = engine.TouchEventService.getInstance().manageList;
            if (this.eventList.length != 0) {
                manageList.push(this);
            }
            for (var i = this.array.length - 1; i >= 0; i--) {
                var child = this.array[i];
                var invertMatrix_1 = engine.invertMatrix(child.localMatrix);
                var tempPoint = new engine.Point(_relativeX, _relativeY);
                //
                //没有计算过他的相对矩阵,计算一个矩阵的相对矩阵
                //inv this.array[i].selfMatrix
                var relativePoint = engine.pointAppendMatrix(tempPoint, invertMatrix_1);
                console.log(relativePoint.x, relativePoint.y);
                //   _relativepoint * inv
                //  resule
                var result = child.hitTest(relativePoint.x, relativePoint.y);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        return DisplayObjectContainer;
    }(DisplayObject));
    engine.DisplayObjectContainer = DisplayObjectContainer;
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(data) {
            var _this = _super.call(this) || this;
            _this.advancedTime = 0;
            _this.ticker = function (deltaTime) {
                // this.removeChild();
                _this.advancedTime += deltaTime;
                if (_this.advancedTime >= MovieClip.FRAME_TIME * MovieClip.TOTAL_FRAME) {
                    _this.advancedTime -= MovieClip.FRAME_TIME * MovieClip.TOTAL_FRAME;
                }
                _this.currentFrameIndex = Math.floor(_this.advancedTime / MovieClip.FRAME_TIME);
                var data = _this.data;
                var frameData = data.frames[_this.currentFrameIndex];
                var url = frameData.image;
            };
            _this.setMovieClipData(data);
            _this.play();
            return _this;
        }
        MovieClip.prototype.play = function () {
            engine.Ticker.getInstance().register(this.ticker);
        };
        MovieClip.prototype.stop = function () {
            engine.Ticker.getInstance().unregister(this.ticker);
        };
        MovieClip.prototype.setMovieClipData = function (data) {
            this.data = data;
            this.currentFrameIndex = 0;
            // 创建 / 更新 
        };
        return MovieClip;
    }(BitMap));
    MovieClip.FRAME_TIME = 20;
    MovieClip.TOTAL_FRAME = 10;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var TouchEventType;
    (function (TouchEventType) {
        TouchEventType[TouchEventType["MOUSEDOWN"] = 0] = "MOUSEDOWN";
        TouchEventType[TouchEventType["MOUSEUP"] = 1] = "MOUSEUP";
        TouchEventType[TouchEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
        TouchEventType[TouchEventType["CLICK"] = 2] = "CLICK";
    })(TouchEventType = engine.TouchEventType || (engine.TouchEventType = {}));
    /*
    class MyEvent {
        x: number;
        y: number;
        type: number;
        target
        currentTarget
        constructor(x: number, y: number, type: number) {
            this.x = x;
            this.y = y;
            this.type = type;
        }
    
    }
    */
    var MyEvent = (function () {
        function MyEvent(_type, _func, _isCapture, _target) {
            this.isCapture = false;
            this.type = _type;
            this.func = _func;
            this.isCapture = _isCapture;
            this.target = _target;
        }
        return MyEvent;
    }());
    engine.MyEvent = MyEvent;
    var TouchEventService = (function () {
        function TouchEventService() {
            // TouchEventService.count++;
            // if (TouchEventService.count > 1) {
            //     throw 'singleton!!';
            // }
        }
        TouchEventService.getInstance = function () {
            if (TouchEventService.touchEventService == null) {
                TouchEventService.touchEventService = new TouchEventService();
                TouchEventService.touchEventService.manageList = new Array();
                return TouchEventService.touchEventService;
            }
            else {
                return TouchEventService.touchEventService;
            }
        };
        return TouchEventService;
    }());
    engine.TouchEventService = TouchEventService;
})(engine || (engine = {}));
var engine;
(function (engine) {
    engine.run = function (canvas) {
        var stage = new engine.DisplayObjectContainer();
        var context2D = canvas.getContext("2d");
        var lastNow = Date.now();
        var renderer = new CanvasRenderer(stage, context2D);
        var frameHandler = function () {
            var now = Date.now();
            var deltaTime = now - lastNow;
            engine.Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 400, 400);
            context2D.save();
            stage.update();
            renderer.render();
            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        };
        window.requestAnimationFrame(frameHandler);
        var hitResult;
        var currentX;
        var currentY;
        var lastX;
        var lastY;
        var isMouseDown = false;
        window.onmousedown = function (e) {
            isMouseDown = true;
            var manageList = engine.TouchEventService.getInstance().manageList;
            manageList.splice(0, manageList.length);
            hitResult = stage.hitTest(e.offsetX, e.offsetY);
            currentX = e.offsetX;
            currentY = e.offsetY;
        };
        window.onmousemove = function (e) {
            var manageList = engine.TouchEventService.getInstance().manageList;
            lastX = currentX;
            lastY = currentY;
            currentX = e.offsetX;
            currentY = e.offsetY;
            if (isMouseDown) {
                for (var i = 0; i < manageList.length; i++) {
                    for (var _i = 0, _a = manageList[i].eventList; _i < _a.length; _i++) {
                        var x = _a[_i];
                        if (x.type == engine.TouchEventType.MOUSEMOVE &&
                            x.isCapture == true) {
                            x.func(e);
                        }
                    }
                }
                for (var i = manageList.length - 1; i >= 0; i--) {
                    for (var _b = 0, _c = manageList[i].eventList; _b < _c.length; _b++) {
                        var x = _c[_b];
                        if (x.type == engine.TouchEventType.MOUSEMOVE &&
                            x.isCapture == false) {
                            x.func(e);
                        }
                    }
                }
            }
        };
        window.onmouseup = function (e) {
            isMouseDown = false;
            var manageList = engine.TouchEventService.getInstance().manageList;
            manageList.splice(0, manageList.length);
            var newHitRusult = stage.hitTest(e.offsetX, e.offsetY);
            for (var i = 0; i < manageList.length; i++) {
                for (var _i = 0, _a = manageList[i].eventList; _i < _a.length; _i++) {
                    var x = _a[_i];
                    if (x.type == engine.TouchEventType.CLICK &&
                        newHitRusult == hitResult &&
                        x.isCapture == true) {
                        x.func(e);
                    }
                }
            }
            for (var i = manageList.length - 1; i >= 0; i--) {
                for (var _b = 0, _c = manageList[i].eventList; _b < _c.length; _b++) {
                    var x = _c[_b];
                    if (x.type == engine.TouchEventType.CLICK &&
                        newHitRusult == hitResult &&
                        x.isCapture == false) {
                        x.func(e);
                    }
                }
            }
        };
        return stage;
    };
    var CanvasRenderer = (function () {
        function CanvasRenderer(stage, context2D) {
            this.stage = stage;
            this.context2D = context2D;
        }
        CanvasRenderer.prototype.render = function () {
            var stage = this.stage;
            var context2D = this.context2D;
            this.renderContainer(stage);
        };
        CanvasRenderer.prototype.renderContainer = function (container) {
            for (var _i = 0, _a = container.array; _i < _a.length; _i++) {
                var child = _a[_i];
                var context2D = this.context2D;
                context2D.globalAlpha = child.globalAlpha;
                var m = child.globalMatrix;
                context2D.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                if (child.type == "Bitmap") {
                    this.renderBitmap(child);
                }
                else if (child.type == "TextField") {
                    this.renderTextField(child);
                }
                else if (child.type == "DisplayObjectContainer") {
                    this.renderContainer(child);
                }
            }
        };
        CanvasRenderer.prototype.renderBitmap = function (bitmap) {
            // this.context2D.drawImage(bitmap.image, 0, 0);
            if (bitmap.visible) {
                bitmap.texture.load();
                /*
                if (bitmap.bitmap_cache == null) {
                    var image = new Image();
                    image.src = bitmap.src;


                    image.onload = () => {
                        this.context2D.drawImage(image, 0, 0);
                        bitmap.bitmap_cache = image;
                        console.log(bitmap.bitmap_cache.width, bitmap.bitmap_cache.height);
                        bitmap.width = image.width;
                        bitmap.height = image.height;

                    }
                }
                else {

                    this.context2D.drawImage(bitmap.bitmap_cache, 0, 0);
                }
                */
                this.context2D.drawImage(bitmap.texture.bitmapData, 0, 0);
            }
        };
        CanvasRenderer.prototype.renderTextField = function (textField) {
            function draw_long_text(longtext, cxt, begin_width, begin_height) {
                var linelenght = 20;
                var text = "";
                var count = 0;
                var begin_width = begin_width;
                var begin_height = begin_height;
                var stringLenght = longtext.length;
                var newtext = longtext.split("");
                var context = cxt;
                context.textAlign = 'left';
                for (var i = 0; i <= stringLenght; i++) {
                    if (count == textField.nextLine) {
                        context.fillText(text, begin_width, begin_height);
                        begin_height = begin_height + 25;
                        text = "";
                        count = 0;
                    }
                    if (i == stringLenght) {
                        context.fillText(text, begin_width, begin_height);
                    }
                    var text = text + newtext[0];
                    count++;
                    newtext.shift();
                }
            }
            if (textField.visible) {
                if (textField.isitalic) {
                    textField.font_Style = "italic ";
                }
                else {
                    textField.font_Style = "normal ";
                }
                if (textField.isbold) {
                    this.context2D.font = textField.font_Style + "bold " + textField.size + "px " + textField.font_family;
                }
                else {
                    this.context2D.font = textField.font_Style + textField.size + "px " + textField.font_family;
                }
                this.context2D.fillStyle = textField.textColor;
                // this.context2D.fillText(this.text, 0, 0 + 15,550);
                draw_long_text(textField.text, this.context2D, 0, 30);
            }
        };
        return CanvasRenderer;
    }());
})(engine || (engine = {}));
