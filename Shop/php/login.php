<?php
/* Скрипт для поддержания сессии, т.е. если мы вошли и потом переключились на другую вкладку и обратно вернулись во вкладку Вход, не надо будет повторно авторизовываться */

	session_start ();
	$arr = Array ();
	if ( isset ($_SESSION ['isLogin']))
	{
		if ($_SESSION ['isLogin'] == true)
		{
			array_push ($arr, true);
		} 
		else
		{
			array_push ($arr, false);
		}
	} 
	else
	{
		array_push ($arr,false);
	}
	echo json_encode ($arr);
?>