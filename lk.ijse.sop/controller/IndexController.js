var home = document.getElementById('pictures')
home.style.display='block';

var customer = document.getElementById('customer');
customer.style.display='none';

var item = document.getElementById('item');
item.style.display='none';

var employee= document.getElementById('employee');
employee.style.display='none';

var order= document.getElementById('orders');
order.style.display='none';

var orderDetail= document.getElementById('orderDetails');
orderDetail.style.display='none';

var btnHome = document.getElementById('btnHome');
btnHome.addEventListener('click', function () {
    home.style.display='block';
    customer.style.display='none';
    item.style.display='none';
    employee.style.display='none';
    order.style.display='none';
    orderDetail.style.display='none';

});

var btnCustomer = document.getElementById('btnCustomer');
btnCustomer.addEventListener('click', function () {
    home.style.display='none';
    customer.style.display='block';
    item.style.display='none';
    employee.style.display='none';
    order.style.display='none';
    orderDetail.style.display='none';
});

var btnItem = document.getElementById('btnItem');
btnItem.addEventListener('click', function () {
    home.style.display='none';
    customer.style.display='none';
    item.style.display='block';
    employee.style.display='none';
    order.style.display='none';
    orderDetail.style.display='none';

});

var btnEmployee = document.getElementById('btnEmployee');
btnEmployee.addEventListener('click', function () {
    home.style.display='none';
    customer.style.display='none';
    item.style.display='none';
    employee.style.display='block';
    order.style.display='none';
    orderDetail.style.display='none';

});

var btnOrder = document.getElementById('btnOrder');
btnOrder.addEventListener('click', function () {
    home.style.display='none';
    customer.style.display='none';
    item.style.display='none';
    employee.style.display='none'
    order.style.display='block';
    orderDetail.style.display='none';

});

var btnOrderDetail = document.getElementById('btnOrderDetail');
btnOrderDetail.addEventListener('click', function () {
    home.style.display='none';
    customer.style.display='none';
    item.style.display='none';
    employee.style.display='none';
    order.style.display='none';
    orderDetail.style.display='block';
});
