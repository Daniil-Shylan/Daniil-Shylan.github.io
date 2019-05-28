<?php
/* Скрипт для добавления новых товаров */

    /* подключение к базе данных */
	function connect ()
	{
		$link = new mysqli('localhost', 'root', '', 'products') or die('Не удалось соединиться: ' . mysqli_error());
		$link -> set_charset("utf8");
		return $link;
	}

	/* из POST мы получаем 'name','images','about','stock' - string, 'price' - int */
	$name = $_POST ['name'];
	$price = $_POST ['price'];
	$images = $_POST ['images'];
	$about = $_POST ['about'];
	$stock = $_POST ['stock'];
	$product = connect ();
	$query = "INSERT INTO `products` (`name`,`price`,`stock`,`images`,`about`) VALUES ('$name','$price','$stock','$images','$about')";
	$result = $product -> query ($query);

	/* если нет результата, вывести ошибку */
	if (!$result)
	{
		echo $product -> error;
	}
?>