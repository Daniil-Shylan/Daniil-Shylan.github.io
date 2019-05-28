<?php
/* Скрипт для получения данных из Базы данных */
	
	/* подключаем класс Basket */
	include 'Basket.php';

	/* сессия */
	session_start();

	/* при несозданной сессии создаем обьект класс и помещаем его в сессию */
	if (isset ($_SESSION ['main']) )
	{	
	} 
	else
	{
		$main = new Busket;
		$_SESSION ['main'] = $main;
	}

	/* имя функции */
	$funcname="getAll";

	/* вызываем нужную функцию из класса */
	$_SESSION ['main'] -> $funcname ();	

	/* закрываем сессию */
	session_write_close (); 
?>