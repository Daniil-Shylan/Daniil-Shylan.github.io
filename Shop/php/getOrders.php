<?php
/* Скрипт для получения заказов из базы данных */

    /* подключение к базе данных */
	function connect ()
	{
		$link = new mysqli ('localhost', 'root', '', 'products') or die ('Не удалось соединиться: ' . mysqli_error());
		$link -> set_charset ("utf8");
		return $link;
	}

	$product = connect ();
	$query = "SELECT * FROM `orders`";
	$result = $product -> query ($query);
	$arr = Array ();
	while ($myrow = $result -> fetch_array (MYSQLI_ASSOC))
	{
		array_push ($arr,$myrow);
	}
	echo json_encode ($arr);
?>