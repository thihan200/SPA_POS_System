
$('#addCustomer').click(function (){
    saveCustomerToTable();
    getCustomerFromTable();
})



function saveCustomerToTable(){
    let customerId = $('#customerID').val();
    let customerName = $('#customerName').val();
    let customerAddress = $('#customerAddress').val();
    let customerSalary = $('#customerSalary').val();
    alert("Do you want to add ?")
    let save = saveCustomer(customerId, customerName, customerAddress, customerSalary);
    if (save){
        clearAllCustomerFields();
    }
}

function getCustomerFromTable(){
    $('#cusBody>tr').click(function () {
        var id= $($(this).children().get(0)).text();
        var name = $($(this).children().get(1)).text();
        var address= $($(this).children().get(2)).text();
        var salary = $($(this).children().get(3)).text();
        console.log(id,name,address,salary);

        $('#floatingInput').val(id)
        $('#floatingInput1').val(name)
        $('#floatingInput2').val(address)
        $('#floatingInput4').val(salary)

    })
}

$("#btnDelete").click(function () {
    let cusID = $("#floatingInput").val();
    let option=confirm(`Do you want to delete ID:${cusID}`);
    if (option){
        let res=deleteCustomer(cusID);
        if (res){
            alert("Customer Deleted");
        } else{
            alert("Delete Failed")
        }

    }
    loadAllCustomerToTheTable();
    clearCustomerInputFields();
});

$("#btnUpdate").click(function () {
    let cusID = $("#floatingInput").val();
    let cusName = $("#floatingInput1").val();
    let cusAddress = $("#floatingInput2").val();
    let cusSalary = $("#floatingInput4").val();

    let option=confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option){
        let res= updateCustomer(cusID, cusName, cusAddress, cusSalary);
        if (res){
            alert("Customer Updated");
        }else{
            alert("Update Failed");
        }
    }
    loadAllCustomerToTheTable();
    clearCustomerInputFields();
    getCustomerFromTable();

});


$("#floatingInput").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
       searchCustomerFromForm()
    }
});

function searchCustomerFromForm(){
    let customer = searchCustomer($('#floatingInput').val());
    if (customer != null) {
        $("#floatingInput").val(customer.getCustomerID());
        $("#floatingInput1").val(customer.getCustomerName());
        $("#floatingInput2").val(customer.getCustomerAddress());
        $("#floatingInput4").val(customer.getCustomerSalary());
    } else {
        clearCustomerInputFields();
    }
}

$('#btnClear').click(function () {
   clearCustomerInputFields();
})

$('#clearCustomer').click(function () {
    clearAllCustomerFields();

})

$('#btnSearch').click(function () {
   searchCustomerFromForm();
})

//Functions - CRUD operations
// save customer
function saveCustomer(id, name, address, salary) {
    let customer = new Customer(id, name, address, salary);
    customerTable.push(customer);// customer added

    // load the table
    loadAllCustomerToTheTable();
    return true;
}

//get all customers
function getAllCustomers() {
    return customerTable;
}

//delete customer
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// search customer
function searchCustomer(id) {
    for (let i in customerTable) {
        if (customerTable[i].getCustomerID() == id) return customerTable[i];
    }
    return null;
}

//Update Customer
function updateCustomer(id, name, address, salary) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name);
        customer.setCustomerAddress(address);
        customer.setCustomerSalary(salary);
        return true;
    } else {
        return false;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////

//Other function
function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
   $('#cusBody>tr').empty();// clear all the table before adding for avoid duplicate
    $('#selectCusID').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        var combo = `<option>${id}</option>`;
        $('#selectCusID').append(combo);
        $('#customerTable').append(row);
    }
}

$('#customerID').on('keyup', function (event) {
    if (event.key=='Enter'){
        $('#customerName').focus();
    }

    var inputID = $('#customerID').val()
    if (customeridRegex.test(inputID)){
        $('#lblcusid').text('');
    }else {

        $('#lblcusid').text("Customer ID is a Required Field: Pattern C00-000");
    }
})

$('#customerName').on('keyup', function (event) {
    if (event.key=='Enter'){
        $('#customerAddress').focus();
    }

    var inputName = $('#customerName').val()
    if (customernameRegex.test(inputName)){
        $('#lblcusname').text('');
    }else {
        $('#lblcusname').text("Customer name is a required field: Min 5, Max 20, Spaces Allowed")
    }
})

$('#customerAddress').on('keyup', function (event) {
    if (event.key=='Enter'){
        $('#customerSalary').focus();
    }

    var inputAddress = $('#customerAddress').val()
    if (customerAddressRegex.test(inputAddress)){
        $('#lblcusaddress').text('');
    }else {
        $('#lblcusaddress').text("Customer Address is a required field")
    }
})

$('#customerSalary').on('keyup', function (event) {
    if (event.key=='Enter'){
        saveCustomerToTable();
        getCustomerFromTable();
    }

    var inputSalary = $('#customerSalary').val()
    if (customerSalaryRegEx.test(inputSalary)){
        $('#lblcussalary').text('')
    }else {
        $('#lblcussalary').text("Customer Salary is a required field")
    }
})

$('#customerID, #customerName, #customerAddress, #customerSalary').on('keydown', function (event) {
    if (event.key=='Tab'){
        event.preventDefault();
    }
})

function clearAllCustomerFields(){
    $('#customerID').val('');
    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#customerSalary').val('');
    $('#customerID').focus();
}

function clearCustomerInputFields(){
    $("#floatingInput").val("");
    $("#floatingInput1").val("");
    $("#floatingInput2").val("");
    $("#floatingInput4").val("");
}

//Customer ID Validation
let customeridRegex = /^(C00-)[0-9]{3}$/;
let customernameRegex = /^[A-z ]{5,20}$/;
let customerAddressRegex = /^[A-z0-9 ]{2,}$/;
let customerSalaryRegEx = /^[0-9]{3,7}.[0-9]{2}$/;
