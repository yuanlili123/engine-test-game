var Point = (function () {
    function Point(x, y) {
        this.Walkable = true;
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Astar = (function () {
    function Astar() {
        this._straghtCost = 1.0;
        this._diagCost = Math.SQRT2;
        this._heuristic = this.euclidian;
    }
    Astar.prototype.findPath = function (gird) {
        this._grid = gird;
        this._open = new Array();
        this._closed = new Array();
        this._StartPoint = this._grid.StartPoint;
        this._EndPoint = this._grid.EndPoint;
        this._StartPoint.g = 0;
        this._StartPoint.h = this._heuristic(this._StartPoint);
        this._StartPoint.f = this._StartPoint.h + this._StartPoint.g;
        return this.search();
    };
    Astar.prototype.sortF = function (a, b) {
        return b.f - a.f;
    };
    Astar.prototype.search = function () {
        var point = this._StartPoint;
        while (point != this._EndPoint) {
            var startX = Math.max(0, point.x - 1);
            var endX = Math.min(this._grid._numCols - 1, point.x + 1);
            var startY = Math.max(0, point.y - 1);
            var endY = Math.min(this._grid._numRow - 1, point.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid.getPoint(i, j);
                    if (test == point || !test.Walkable ||
                        !this._grid.getPoint(point.x, test.y).Walkable ||
                        !this._grid.getPoint(test.x, point.y).Walkable)
                        continue;
                    var cost = this._straghtCost;
                    if (!((point.x == test.x) || (point.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g = point.g + cost;
                    var h = this._heuristic(test);
                    var f = h + g;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = point;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = point;
                        this._open.push(test);
                    }
                }
            }
            this._closed.push(point);
            if (this._open.length == 0) {
                console.log("no path found");
                return false;
            }
            //this._open.sortOn("f",Array.NUMERIC);/////////////////
            this._open.sort(this.sortF);
            point = this._open.shift();
        }
        this.buildPath();
        console.log("pathbulid");
        for (var i = 0; i < this._path.length; i++) {
            console.log("Node:" + this._path[i].x + "," + this._path[i].y);
        }
        return true;
    };
    Astar.prototype.buildPath = function () {
        this._path = new Array();
        var point = this._EndPoint;
        this._path.push(point);
        while (point != this._StartPoint) {
            point = point.parent;
            this._path.unshift(point);
        }
    };
    Astar.prototype.get_path = function () {
        return this._path;
    };
    Astar.prototype.isOpen = function (point) {
        for (var i = 0; i < this._open.length; i++) {
            if (this._open[i] == point) {
                return true;
            }
        }
        return false;
    };
    Astar.prototype.isClosed = function (point) {
        for (var i = 0; i < this._closed.length; i++) {
            if (this._closed[i] == point) {
                return true;
            }
        }
        return false;
    };
    Astar.prototype.euclidian = function (point) {
        var dx = point.x - this._EndPoint.x;
        var dy = point.y - this._EndPoint.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straghtCost;
    };
    Astar.prototype.manhattan = function (point) {
        return Math.abs(point.x - this._EndPoint.x) * this._straghtCost +
            Math.abs(point.y + this._EndPoint.y) * this._straghtCost;
    };
    Astar.prototype.diagonal = function (point) {
        var dx = Math.abs(point.x - this._EndPoint.x);
        var dy = Math.abs(point.y - this._EndPoint.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straghtCost * (straight - 2 * diag);
    };
    return Astar;
}());
