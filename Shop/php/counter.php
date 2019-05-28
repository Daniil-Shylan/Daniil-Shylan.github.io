<?php
/* Скрипт для иконки количества товаров в корзине */

	sleep(1);

	/* подключаем класс Bаsket */
	include 'Basket.php';	

	/* сессия */
	session_start ();

    /* при несозданной сессии создаем обьект класс и помешаем его в сессию */
	if (isset ($_SESSION ['main']))
	{	
	} 
	else
	{
		$main = new Busket;
		$_SESSION['main'] = $main;
	}

	/* вызываем нужную функцию из класса */
	$_SESSION ['main'] -> getIcon ();	
?>