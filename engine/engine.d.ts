declare namespace engine {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(_x: number, _y: number, _width: number, _height: number);
        isPointInRectangle(point: Point): boolean;
    }
    function pointAppendMatrix(point: Point, m: Matrix): Point;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m: Matrix): Matrix;
    function matrixAppendMatrix(m1: Matrix, m2: Matrix): Matrix;
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        toString(): string;
        updateFromDisplayObject(x: number, y: number, scaleX: number, scaleY: number, rotation: number): void;
        updateSkewMatrix(b: number, c: number): void;
    }
}
declare namespace engine {
    type Ticker_Listener_Type = (deltaTime: number) => void;
    class Ticker {
        private static instance;
        static getInstance(): Ticker;
        listeners: Ticker_Listener_Type[];
        register(listener: Ticker_Listener_Type): void;
        unregister(listener: Ticker_Listener_Type): void;
        notify(deltaTime: number): void;
    }
}
declare namespace engine.res {
    function loadConfig(): void;
    function loadRes(name: any): void;
    function getRes(name: string): any;
    class ImageResource {
        private url;
        bitmapData: HTMLImageElement;
        width: number;
        height: number;
        constructor(name: string);
        load(): void;
    }
}
declare namespace engine {
    interface Drawable {
        update(): any;
    }
    abstract class DisplayObject implements Drawable {
        type: string;
        name: string;
        x: number;
        globalX: number;
        y: number;
        globalY: number;
        localMatrix: engine.Matrix;
        globalMatrix: engine.Matrix;
        skewMatrix: engine.Matrix;
        width: number;
        height: number;
        scaleX: number;
        globalscaleX: number;
        scaleY: number;
        globalscaleY: number;
        alpha: number;
        globalAlpha: number;
        globalrotation: number;
        rotation: number;
        skewX: number;
        skewY: number;
        parent: DisplayObjectContainer;
        eventList: MyEvent[];
        touchEnabled: boolean;
        visible: boolean;
        constructor(_type: string);
        setWidth(_width: number): void;
        setHeight(_height: number): void;
        setOffSetY(_y: number): void;
        setSkewX(_skewX: number): void;
        setSkewY(_skewY: number): void;
        setTouchEnabled(_isEnalbe: boolean): void;
        addEventListener(_type: number, _func: Function, _isCapture: boolean, _target: DisplayObject): void;
        update(): void;
        abstract hitTest(relativeX: number, relativeY: number): any;
    }
    class TextField extends DisplayObject {
        text: string;
        textColor: string;
        nextLine: number;
        font_family: string;
        size: number;
        isbold: boolean;
        isitalic: boolean;
        font_Style: string;
        constructor();
        hitTest(_relativeX: number, _relativeY: number): this;
    }
    class BitMap extends DisplayObject {
        src: string;
        bitmap_cache: HTMLImageElement;
        image: HTMLImageElement;
        texture: engine.res.ImageResource;
        private w;
        private h;
        constructor();
        hitTest(_relativeX: number, _relativeY: number): this;
    }
    class DisplayObjectContainer extends DisplayObject {
        array: DisplayObject[];
        constructor();
        addChild(_child: DisplayObject): void;
        removeChild(_child: DisplayObject): void;
        update(): void;
        hitTest(_relativeX: number, _relativeY: number): any;
    }
}
declare namespace engine {
    enum TouchEventType {
        MOUSEDOWN = 0,
        MOUSEUP = 1,
        MOUSEMOVE = 3,
        CLICK = 2,
    }
    class MyEvent {
        type: number;
        target: DisplayObject;
        func: Function;
        isCapture: boolean;
        constructor(_type: number, _func: Function, _isCapture: boolean, _target: engine.DisplayObject);
    }
    class TouchEventService {
        manageList: DisplayObject[];
        static touchEventService: TouchEventService;
        constructor();
        static getInstance(): TouchEventService;
    }
}
declare namespace engine {
    let run: (canvas: HTMLCanvasElement) => DisplayObjectContainer;
}
