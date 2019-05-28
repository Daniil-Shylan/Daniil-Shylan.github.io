<?php 
/* Скрипт для удаления товаров из базы данных */

	$id = json_decode ($_POST['id']);
	echo json_encode ($id);

	/* подключение к базе данных */
	function connect()
	{
		$link = new mysqli('localhost', 'root', '', 'products') or die ('Не удалось соединиться: ' . mysqli_error());
		$link -> set_charset("utf8");
		return $link;
	}
	$product = connect ();
	$query = "DELETE FROM `products` WHERE `products`.`id`='$id'";
	$result = $product -> query ($query);

	/* если нет результата, вывести ошибку */
	if (!$result)
	{
		echo json_encode($product->error);
	}
?>