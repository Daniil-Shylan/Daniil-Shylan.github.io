<?php
/* Cкрипт для получения информации о товарах положенных в корзину */
	
	/* подключаем класс Bаsket */
	include 'Basket.php';

	/* сессия */
	session_start ();

	/* при несозданной сессии создаем обьект класс и помешаем его в сессию */
	if (isset ($_SESSION ['main']) )
	{	
	}
	else
	{
		$main = new Busket;
		$_SESSION ['main'] = $main;
	}

	/* имя функции */
	$funcname="getBacket";

	/* вызываем нужную функцию из класса */
	$_SESSION ['main'] -> $funcname ();	
?>	