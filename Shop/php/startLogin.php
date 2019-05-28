<?php
/* Скрипт для логирования */
    
    /* принимаем логин и пароль */
	$login = $_POST ['login'];
	$password = $_POST ['password'];

	/* подключаемся к базе данных */
	function connect ()
	{
		$link = new mysqli ('localhost', 'root', '', 'products') or die ('Не удалось соединиться: ' . mysqli_error());
		$link -> set_charset ("utf8");
		return $link;
	}
	$product = connect ();

	/* берем данные с базы данных */
	$query = "SELECT * FROM `userinfo` WHERE `userName`='$login'";
	$result = $product -> query ($query);
	$adminValue = 'admin';

	/* по дефолту зайти никак нельзя, без ввода пользователя */
	$isLogin = false;

	/*  */
	if (!$result)
	{
		echo $product -> error;
	}

	/* можно зайти только тогда, когда совпадет введеный пароль */
	if (isset ($result))
	{
		$arr = Array ();
		$myrow = $result -> fetch_array (MYSQLI_ASSOC);
		$isLogin = false;
		if ($password == $myrow ['password'])
		{
			$isLogin = true;
		}
		array_push ($arr, $isLogin, $login, $password);
	}

	/* сессия */
	session_start ();
	$_SESSION ['isLogin'] = $isLogin;
	echo json_encode ($arr);
?>