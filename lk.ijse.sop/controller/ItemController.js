$('#addItem').click(function (){
    saveItemToTable();
    getItemFromTable();
})



function saveItemToTable(){
    let itemCode = $('#icode').val();
    let itemName = $('#iname').val();
    let itemQty = $('#iqty').val();
    let unitPrice = $('#iunitPrice').val();
    alert("Do you want to add Item?")
    let save = saveItem(itemCode, itemName, itemQty, unitPrice);
    if (save){
        clearAllItemFields();
    }
}

function getItemFromTable(){
    $('#itemBody>tr').click(function () {
        var itemCode= $($(this).children().get(0)).text();
        var itemName = $($(this).children().get(1)).text();
        var itemQty= $($(this).children().get(2)).text();
        var unitPrice = $($(this).children().get(3)).text();
        console.log(itemCode,itemName,itemQty,unitPrice);

        $('#itemCode').val(itemCode)
        $('#itemName').val(itemName)
        $('#itemQty').val(itemQty)
        $('#unitPrice').val(unitPrice)

    })
}

$("#btnItemDelete").click(function () {
    let itemCode = $("#itemCode").val();
    let option=confirm(`Do you want to delete Code:${itemCode}`);
    if (option){
        let res=deleteItem(itemCode);
        if (res){
            alert("Item Deleted");
        } else{
            alert("Delete Failed")
        }

    }
    loadAllItemToTheTable();
    clearItemInputFields();
});

$("#btnItemUpdate").click(function () {
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let itemQty = $("#itemQty").val();
    let unitPrice = $("#unitPrice").val();

    let option=confirm(`Do you want to Update Item Code:${itemCode}`);
    if (option){
        let res= updateItem(itemCode, itemName, itemQty, unitPrice);
        if (res){
            alert("Item Updated");
        }else{
            alert("Update Failed");
        }
    }
    loadAllItemToTheTable();
    clearItemInputFields();
    getItemFromTable();

});


$("#itemCode").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        searchItemFromForm()
    }
});

function searchItemFromForm(){
    let item = searchItem($('#itemCode').val());
    if (item != null) {
        $("#itemCode").val(item.getItemCode());
        $("#itemName").val(item.getItemName());
        $("#itemQty").val(item.getQty());
        $("#unitPrice").val(item.getUnitPrice());
    } else {
        clearItemInputFields();
    }
}

$('#btnItemClear').click(function () {
    clearItemInputFields();
})

$('#clearItem').click(function () {
    clearAllItemFields();

})

$('#btnItemSearch').click(function () {
    searchItemFromForm();
})

//Functions - CRUD operations
// save item
function saveItem(code, name, qty , unitPrice) {
    let item = new Item(code, name, qty , unitPrice);
    itemTable.push(item);// item added

    // load the table
    loadAllItemToTheTable();
    return true;
}

//get all items
function getAllItems() {
    return itemTable;
}

//delete item
function deleteItem(code) {
    let item = searchItem(code);
    if (item != null) {
        let indexNumber = itemTable.indexOf(item);
        itemTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// search item
function searchItem(code) {
    for (let i in itemTable) {
        if (itemTable[i].getItemCode() == code) return itemTable[i];
    }
    return null;
}

//Update item
function updateItem(code, name, qty , unitPrice) {
    let item = searchItem(code);
    if (item != null) {
        item.setItemCode(code)
        item.setItemName(name);
        item.setItemQty(qty);
        item.setUnitPrice(unitPrice);
        return true;
    } else {
        return false;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////

//Other function
function loadAllItemToTheTable() {
    let allItems = getAllItems();
    $('#itemBody>tr').empty();// clear all the table before adding for avoid duplicate
    $('#selectItemCode').empty()
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let name = allItems[i].getItemName();
        let qty = allItems[i].getQty();
        let uPrice = allItems[i].getUnitPrice();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${uPrice}</td></tr>`;
        var comboItem = `<option>${code}</option`;
        $('#selectItemCode').append(comboItem);
        $('#itemTable').append(row);
    }
}

$('#icode').on('keyup', function (event) {
    if (event.key=='Enter'){
        $('#iname').focus();
    }

    var inputCode = $('#icode').val()
    if (itemcodeRegex.test(inputCode)){
        $('#lblitemcode').text('');
    }else {

        $('#lblitemcode').text("Item Code is a Required Field: Pattern I00-000");
    }
})

$('#iname').on('keyup', function (event) {
    if (event.key=='Enter'){
        $('#iqty').focus();
    }

    var inputName = $('#iname').val()
    if (itemnameRegex.test(inputName)){
        $('#lblitemname').text('');
    }else {
        $('#lblitemname').text("Item name is a required field: Min 4, Max 20, Spaces Allowed")
    }
})

$('#iqty').on('keyup', function (event) {
    if (event.key=='Enter'){
        $('#iunitPrice').focus();
    }

    var inputQty = $('#iqty').val()
    if (itemqtyRegex.test(inputQty)){
        $('#lblitemqty').text('');
    }else {
        $('#lblitemqty').text("Item Qty is a required field")
    }
})

$('#iunitPrice').on('keyup', function (event) {
    if (event.key=='Enter'){
        saveItemToTable();
        getItemFromTable()
        clearAllItemFields();
    }

    var inputPrice = $('#iunitPrice').val()
    if (unitpriceRegEx.test(inputPrice)){
        $('#lblitemprice').text('')
    }else {
        $('#lblitemprice').text("Unit Price is a required field")
    }
})

$('#icode, #iname, #iqty, #iunitPrice').on('keydown', function (event) {
    if (event.key=='Tab'){
        event.preventDefault();
    }
})

function clearAllItemFields(){
    $('#icode').val('');
    $('#iname').val('');
    $('#iqty').val('');
    $('#iunitPrice').val('');
    $('#icode').focus();
}

function clearItemInputFields(){
    $("#itemCode").val("");
    $("#itemName").val("");
    $("#itemQty").val("");
    $("#unitPrice").val("");
}

//Customer ID Validation
let itemcodeRegex = /^(I00-)[0-9]{3}$/;
let itemnameRegex = /^[A-z ]{3,20}$/;
let itemqtyRegex = /^[A-z0-9 ]{2,}$/;
let unitpriceRegEx = /^[0-9]{2,7}.[0-9]{2}$/;