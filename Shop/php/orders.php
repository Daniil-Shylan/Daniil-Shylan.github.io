<?php
/* Скрипт для получения заказов. Получает данные: 
 * userName - string,
 * email - string, 
 * phone - string,
 * comment - string,
 * orders - array.
 */
    
    /* подключение к базе данных */
	function connect ()
	{
		$link = new mysqli ('localhost', 'root', '', 'products') or die ('Не удалось соединиться: ' . mysqli_error());
		$link -> set_charset("utf8");
		return $link;
	}

	/* получение данных в таблицу в базе данных */
	$userName = $_POST ['userName'];
	$phone = $_POST ['phone'];
	$email = $_POST ['email'];
	$comment = $_POST ['comment'];
	$orders = json_encode ($_POST ['orders']);
	$product = connect ();
	$query = "INSERT INTO `orders` (`userName`, `phone`, `email`, `comment`, `orders`) VALUES ('$userName', '$phone', '$email', '$comment', '$orders')";
	$result = $product -> query ($query);

	if (!$result)
	{
		echo $product -> error;
	}
?>