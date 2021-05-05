/*Generate Order ID*/
function generateOrderID() {
    try {
        let lastOrderId = orderTable[orderTable.length-1].getOid();
        let newOrderId = parseInt(lastOrderId.substring(1,4))+1;
        if (newOrderId < 10) {
            $("#txtOrderID").val("OID-00"+newOrderId);
        }else if (newOrderId < 100) {
            $("#txtOrderID").val("OID-0"+newOrderId);
        } else {
            $("#txtOrderID").val("OID-"+newOrderId);
        }
    } catch (e) {
        $("#txtOrderID").val("OID-001");
    }

}
generateOrderID();

function generateOrderDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    $('#txtDate').val(today);
}

generateOrderDate();



$('#selectCusID').click(function () {

    var id = $('#selectCusID option:selected').text();
    var customer = searchCustomer(id);
    if (customer != null) {
        $('#orderCustomerID').val(customer.getCustomerID());
        $('#orderCustomerName').val(customer.getCustomerName());
        $('#orderCustomerAddress').val(customer.getCustomerAddress());
        $('#orderCustomerSalary').val(customer.getCustomerSalary());
    } else {
        alert(" error");
    }
});

$('#selectItemCode').click(function () {
    var code = $('#selectItemCode option:selected').text();
    var item = searchItem(code);
    if (item != null) {
        $('#orderItemCode').val(item.getItemCode());
        $('#txtItemName').val(item.getItemName());
        $('#txtQTYOnHand').val(item.getQty());
        $('#txtItemPrice').val(item.getUnitPrice());
    } else {
        alert(" error");
    }
});


$('#btnAddToTable').click(function () {
    var price = $('#txtItemPrice').val()
    var orderQty = $('#txtQty').val()
    var total = (parseInt(price)*parseInt(orderQty));
    $('#total').text(total)
    var newTot = parseInt($('#total').text());
    var subTotal =0;
    subTotal +=newTot;
    $('#subtotal').text(subTotal)

    saveOrderToTable();
    loadAllOrdersToTheTable();

});

function saveOrderToTable(){
    let oid = $('#txtOrderID').val();
    let itemCode = $('#orderItemCode').val();
    let itemName = $('#txtItemName').val();
    let ItemPrice = $('#txtItemPrice').val();
    let qty = $('#txtQty').val();
    let total = $('#total').val()
    alert("Do you want to add ?")
    let save = saveOrder(oid, itemCode, itemName, ItemPrice,qty,total );
    if (save){
        //////
    }
}



// save Order
function saveOrder(oid, code, name, price, qty, total) {
    let order = new Orders(oid, code, name, price, qty, total);
    orderTable.push(order);// order added

    // load the table
    loadAllOrdersToTheTable();
    return true;
}


function getAllOrders() {
    return orderTable;
}

function loadAllOrdersToTheTable() {
    let allOrders = getAllOrders();
    $('#orderTable>tr').empty();// clear all the table before adding for avoid duplicate
    for (var i in allOrders) {
        let oid = allOrders[i].getOid();
        let icode = allOrders[i].getICode();
        let iname = allOrders[i].getItemName();
        let price = allOrders[i].getPrice();
        let qty = allOrders[i].getQty();
        let tot = allOrders[i].getTotal();

        var row = `<tr><td>${icode}</td><td>${iname}</td><td>${price}</td><td>${qty}</td><td>${tot}</td></tr>`;
        $('#tblOrder').append(row);
    }
}
