<?php
/* Скрипт для внесения изменений в товар */

    /* подключение к базе данных */
	function connect()
	{
		$link = new mysqli('localhost', 'root', '', 'products') or die ('Не удалось соединиться: ' . mysqli_error());
		$link->set_charset("utf8");
		return $link;
	}

	$id=$_POST['id'];
	$name=$_POST['name'];
	$price=$_POST['price'];
	$images=$_POST['images'];
	$about=$_POST['about'];
	$stock=$_POST['stock'];
	$product=connect();
	$query="UPDATE `products` SET `name`='$name',`images`='$images',`price`='$price',`about`='$about',`stock`='$stock' WHERE `products`.`id`='$id'";
	$result=$product->query($query);
    
    /* если нет результата, вывести ошибку */
	if (!$result)
	{
		echo $product->error;
	}
?>