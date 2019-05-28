var counter=document.getElementById('counter');	
var count=0;
//обращаемся к пхп-скрипту для получения длины массива товаров  вкорзине
function Count(){
	$.ajax({
		type:"POST",
		url:"php/counter.php",
		success:function(data,code){
			if(code==200){
				console.log(data);
			}else{
				console.log(code);
			}
			//ставим длину в счетчик	
			console.log(data);
			count=JSON.parse(data);
			//если счетчик равен 0, мы его скрываем
			if(count==0){
				counter.hidden=true;
			}
			//иначе он равен длине и виден на странице
			else {
				counter.hidden=false;
				counter.innerHTML=count;
			}
		}
	});
	
}
document.addEventListener('click',e=>
{

	$.ajax({
		type:"POST",
		url:"php/counter.php",
		success:function(data,code){
			if(code==200){
				console.log(data);
			}else{
				console.log(code);
			}
			//ставим длину в счетчик	
			console.log(data);
			count=JSON.parse(data);
			//если счетчик равен 0, мы его скрываем
			if(count==0){
				counter.hidden=true;
				
			}
			//иначе он равен длине и виден на странице
			else {
				counter.hidden=false;
				counter.innerHTML=count;
			}
		}
	});
	
});
document.addEventListener("DOMContentLoaded", Count());
