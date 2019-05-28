<?php
/* Скрипт для добавления товаров в корзину */
	
	/* подключаем класс Bаsket */
	include 'Basket.php';

	/* сессия */
	session_start ();
 
	/* получаем данные: "id"-int,"name"-string,"price"-int,"many"-default 1 */
	$selector = $_POST;

	/* имя функции */
	$funcname = "add";

	/* вызываем нужную функции из класса */
	$_SESSION ['main'] -> $funcname ($selector); 
?>	