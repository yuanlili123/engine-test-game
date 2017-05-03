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
var config = [
    { x: 0, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 1, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 2, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 3, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 4, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 7, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 8, walkable: true, image: "assets/tile_2.png" },
    { x: 0, y: 9, walkable: true, image: "assets/tile_2.png" },
    { x: 1, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 1, y: 1, walkable: true, image: "assets/tile_2.png" },
    { x: 1, y: 2, walkable: false, image: "assets/tile_1.png" },
    { x: 1, y: 3, walkable: true, image: "assets/tile_2.png" },
    { x: 1, y: 4, walkable: true, image: "assets/tile_2.png" },
    { x: 1, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 1, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 1, y: 7, walkable: false, image: "assets/tile_1.png" },
    { x: 1, y: 8, walkable: true, image: "assets/tile_2.png" },
    { x: 1, y: 9, walkable: true, image: "assets/tile_2.png" },
    { x: 2, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 2, y: 1, walkable: false, image: "assets/tile_1.png" },
    { x: 2, y: 2, walkable: false, image: "assets/tile_1.png" },
    { x: 2, y: 3, walkable: false, image: "assets/tile_1.png" },
    { x: 2, y: 4, walkable: false, image: "assets/tile_1.png" },
    { x: 2, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 2, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 2, y: 7, walkable: false, image: "assets/tile_1.png" },
    { x: 2, y: 8, walkable: false, image: "assets/tile_1.png" },
    { x: 2, y: 9, walkable: true, image: "assets/tile_2.png" },
    { x: 3, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 3, y: 1, walkable: true, image: "assets/tile_2.png" },
    { x: 3, y: 2, walkable: false, image: "assets/tile_1.png" },
    { x: 3, y: 3, walkable: true, image: "assets/tile_2.png" },
    { x: 3, y: 4, walkable: true, image: "assets/tile_2.png" },
    { x: 3, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 3, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 3, y: 7, walkable: true, image: "assets/tile_2.png" },
    { x: 3, y: 8, walkable: false, image: "assets/tile_1.png" },
    { x: 3, y: 9, walkable: false, image: "assets/tile_1.png" },
    { x: 4, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 4, y: 1, walkable: true, image: "assets/tile_2.png" },
    { x: 4, y: 2, walkable: false, image: "assets/tile_1.png" },
    { x: 4, y: 3, walkable: false, image: "assets/tile_1.png" },
    { x: 4, y: 4, walkable: false, image: "assets/tile_1.png" },
    { x: 4, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 4, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 4, y: 7, walkable: true, image: "assets/tile_2.png" },
    { x: 4, y: 8, walkable: false, image: "assets/tile_1.png" },
    { x: 4, y: 9, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 1, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 2, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 3, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 4, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 7, walkable: true, image: "assets/tile_2.png" },
    { x: 5, y: 8, walkable: false, image: "assets/tile_1.png" },
    { x: 5, y: 9, walkable: true, image: "assets/tile_2.png" },
    { x: 6, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 6, y: 1, walkable: false, image: "assets/tile_1.png" },
    { x: 6, y: 2, walkable: false, image: "assets/tile_1.png" },
    { x: 6, y: 3, walkable: false, image: "assets/tile_1.png" },
    { x: 6, y: 4, walkable: false, image: "assets/tile_1.png" },
    { x: 6, y: 5, walkable: false, image: "assets/tile_1.png" },
    { x: 6, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 6, y: 7, walkable: true, image: "assets/tile_2.png" },
    { x: 6, y: 8, walkable: true, image: "assets/tile_2.png" },
    { x: 6, y: 9, walkable: true, image: "assets/tile_2.png" },
    { x: 7, y: 0, walkable: false, image: "assets/tile_1.png" },
    { x: 7, y: 1, walkable: false, image: "assets/tile_1.png" },
    { x: 7, y: 2, walkable: true, image: "assets/tile_2.png" },
    { x: 7, y: 3, walkable: true, image: "assets/tile_2.png" },
    { x: 7, y: 4, walkable: true, image: "assets/tile_2.png" },
    { x: 7, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 7, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 7, y: 7, walkable: true, image: "assets/tile_2.png" },
    { x: 7, y: 8, walkable: false, image: "assets/tile_1.png" },
    { x: 7, y: 9, walkable: true, image: "assets/tile_2.png" },
    { x: 8, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 8, y: 1, walkable: false, image: "assets/tile_1.png" },
    { x: 8, y: 2, walkable: true, image: "assets/tile_2.png" },
    { x: 8, y: 3, walkable: true, image: "assets/tile_2.png" },
    { x: 8, y: 4, walkable: true, image: "assets/tile_2.png" },
    { x: 8, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 8, y: 6, walkable: false, image: "assets/tile_1.png" },
    { x: 8, y: 7, walkable: false, image: "assets/tile_1.png" },
    { x: 8, y: 8, walkable: true, image: "assets/tile_2.png" },
    { x: 8, y: 9, walkable: false, image: "assets/tile_1.png" },
    { x: 9, y: 0, walkable: true, image: "assets/tile_2.png" },
    { x: 9, y: 1, walkable: true, image: "assets/tile_2.png" },
    { x: 9, y: 2, walkable: true, image: "assets/tile_2.png" },
    { x: 9, y: 3, walkable: true, image: "assets/tile_2.png" },
    { x: 9, y: 4, walkable: false, image: "assets/tile_1.png" },
    { x: 9, y: 5, walkable: true, image: "assets/tile_2.png" },
    { x: 9, y: 6, walkable: true, image: "assets/tile_2.png" },
    { x: 9, y: 7, walkable: true, image: "assets/tile_2.png" },
    { x: 9, y: 8, walkable: true, image: "assets/tile_2.png" },
    { x: 9, y: 9, walkable: true, image: "assets/tile_2.png" },
];
var TileMap = (function (_super) {
    __extends(TileMap, _super);
    function TileMap(grid) {
        var _this = _super.call(this) || this;
        _this.init();
        _this.grid = grid;
        _this.loadWalkable();
        return _this;
    }
    TileMap.prototype.init = function () {
        for (var i = 0; i < config.length; i++) {
            var data = config[i];
            var tile = new Tile(data);
            tile.setWidth(64);
            tile.setHeight(64);
            this.addChild(tile);
        }
        this.touchEnabled = true;
        //-Test
        this.addEventListener(engine.TouchEventType.CLICK, function (evt) {
            var gridX = Math.floor(evt.offsetX / TileMap.TileSize);
            var gridY = Math.floor(evt.offsetY / TileMap.TileSize);
            console.log("tap_grid " + gridX + "," + gridY);
        }, false, this);
    };
    TileMap.prototype.findPath = function () {
        var astar = new Astar();
        if (astar.findPath(this.grid)) {
            return astar._path;
        }
    };
    TileMap.prototype.loadWalkable = function () {
        for (var i = 0; i < config.length; i++) {
            this.grid.setWalkable(config[i].x, config[i].y, config[i].walkable);
        }
    };
    return TileMap;
}(engine.DisplayObjectContainer));
TileMap.TileSize = 64;
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        var bitmap = new engine.BitMap();
        bitmap.src = data.image;
        _this.addChild(bitmap);
        //Test --  bitmap.texture = RES.getRes(data.image);////////////////////
        //Test 
        //
        _this.x = data.x * TileMap.TileSize;
        _this.y = data.y * TileMap.TileSize;
        return _this;
    }
    return Tile;
}(engine.DisplayObjectContainer));
