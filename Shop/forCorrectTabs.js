var products=document.getElementById('products');
var productsShow=document.getElementById('productsShow');
var orders=document.getElementById('orders');
var ordersShow=document.getElementById('ordersShow');
products.onclick=function(){
	productsShow.hidden=false;
	ordersShow.hidden=true;
}
orders.onclick=function(){
	ordersShow.hidden=false;
	productShow.hidden=true;
}