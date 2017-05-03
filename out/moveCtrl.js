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
var SIZE1 = 1;
var SIZE32 = 32;
var SIZE48 = 48;
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = 0;
        this._y = 0;
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: true,
        configurable: true
    });
    return Vector2;
}());
var Vector2_pixel = (function (_super) {
    __extends(Vector2_pixel, _super);
    function Vector2_pixel(x, y, size) {
        var _this = _super.call(this, x, y) || this;
        _this.size = 1;
        _this.size = size;
        _this.x = x * _this.size;
        _this.y = y * _this.size;
        return _this;
    }
    Object.defineProperty(Vector2_pixel.prototype, "ix", {
        get: function () {
            return this.x / this.size;
        },
        set: function (value) {
            this.x = value * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2_pixel.prototype, "iy", {
        get: function () {
            return this.y / this.size;
        },
        set: function (value) {
            this.y = value * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2_pixel.prototype, "iPos", {
        get: function () {
            return new Vector2(this.ix, this.iy);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2_pixel.prototype, "Pos", {
        get: function () {
            return new Vector2(this.x, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Vector2_pixel.PixelToReal = function (value) {
        return value * SIZE1;
    };
    Vector2_pixel.RealToPixel = function (value) {
        return value / SIZE1;
    };
    return Vector2_pixel;
}(Vector2));
var Vector2_p32 = (function (_super) {
    __extends(Vector2_p32, _super);
    //this.size = 32; error
    function Vector2_p32(x, y) {
        //this.size=SIZE32; error
        return _super.call(this, x, y, SIZE32) || this;
    }
    Vector2_p32.PixelToReal = function (value) {
        return value * SIZE32;
    };
    Vector2_p32.RealToPixel = function (value) {
        return value / SIZE32;
    };
    return Vector2_p32;
}(Vector2_pixel));
var Vector2_p48 = (function (_super) {
    __extends(Vector2_p48, _super);
    function Vector2_p48(x, y) {
        return _super.call(this, x, y, SIZE48) || this;
    }
    Vector2_p48.PixelToReal = function (value) {
        return value * SIZE48;
    };
    Vector2_p48.RealToPixel = function (value) {
        return value / SIZE48;
    };
    return Vector2_p48;
}(Vector2_pixel));
