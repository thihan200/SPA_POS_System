function Orders(oid, oDate, iCode, iName, price, qty , total) {
    var __oid = oid;
    var __iCode=iCode;
    var __iName=iName;
    var __price=price;
    var __qty=qty;
    var __total=total;

    this.getOid = function () {
        return __oid;
    }

    this.getICode = function () {
        return __iCode;
    }

    this.getItemName = function () {
        return __iName;
    }

    this.getPrice = function () {
        return __price;
    }

    this.getQty = function () {
        return __qty;
    }

    this.getTotal = function () {
        return __total;
    }

    this.setOid = function (newOid) {
        __oid=newOid;
    }

    this.setICode = function (newIcode) {
        __iCode=newIcode;
    }

    this.setItemName = function (newIname) {
        __iName=newIname;
    }

    this.setPrice = function (newPrice) {
        __price=newPrice;
    }

    this.setItemQty = function (newIqty) {
        __qty=newIqty;
    }

    this.setTotal = function (newTotal) {
        __total=newTotal;
    }



}