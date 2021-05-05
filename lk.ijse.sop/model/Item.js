function Item(code, name, qty, unitPrice) {
    var __code=code;
    var __name=name;
    var __qty=qty;
    var __unitPrice= unitPrice;

    this.getItemCode = function () {
        return __code;
    }

    this.getItemName = function () {
        return __name;
    }

    this.getQty = function () {
        return __qty;
    }

    this.getUnitPrice = function () {
        return __unitPrice;
    }

    this.setItemCode = function (newCode) {
        __code=newCode;
    }

    this.setItemName = function (newName) {
        __name=newName;
    }

    this.setItemQty = function (newQty) {
        __qty=newQty;
    }

    this.setUnitPrice = function (newPrice) {
        __unitPrice=newPrice;
    }
}