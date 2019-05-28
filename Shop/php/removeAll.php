<?php
/* Скрипт для удаления всех товаров из корзины */
	
	/* подключаем класс Bаsket */
	include 'Basket.php';

	/* сессия */
	session_start ();

	/* имя функции */
	$funcname="removeAll";

	/* вызываем нужную функции из класса */
	$_SESSION ['main'] -> $funcname ();	
?>