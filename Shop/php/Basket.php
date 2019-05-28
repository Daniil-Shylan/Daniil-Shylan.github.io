<?php 
/*
 * Класс для Магазина, содержит методы:
 * - Подключиться к базе данных,
 * - Добавить элемент в корзину,
 * - Удалить элемент с корзины,
 * - Удалить все элементы с корзины,
 * - Получить корзину,
 * - Получить все товары.
 */

	class Busket 
	{
        /* храним информацию о товарах добавленных в корзину Array => {"id":int,"name":string,"price":int,"many":int}, {}... */
		public function __construct ()
		{
			$this -> basketData = Array (); 
		}
        
        /* узнаем количество разных товаров в корзине */
        public function getIcon () 
        {
        	$count = count ($this -> basketData);
        	echo json_encode ($count);
        }

        /* подключаемся к нашей базе данных */
		public function connect ()
		{
			$link = new mysqli ('localhost', 'root', '', 'products') or die ('Не удалось соединиться: ' . mysqli_error());
			$link -> set_charset ("utf8");
			return $link;
		}
        
       /**
        * Функция, где добавляем $selector в корзину в виде строки
        *
        * @param array $selector массив данных (товар, количество, цена, стоимость)
        */
		public function add ($selector)
		{ 
			$idNum = $selector ['id'];
			$check = 0;
			forEach ($this -> basketData as &$value)
			{
				if ($value ["id"] == $idNum)
				{
					$value ['many']++;
					$check = 1;
					break;
				}
			}
			if ($check==0)
			{
				array_push ($this -> basketData, $selector);
			}
		}

       /** 
        * Функция для удаления товаров с сохранением их нумерации 
        *
        * @param int $num номер товара в корзине
        */
		public function remove ($num)
		{ 
			array_splice ($this -> basketData, $num, 1);
		}

        /* функция для удаления всех товаров */
		public function removeAll ()
		{ 
			$this -> basketData = Array ();
		}
        
       /* Функция для получения данных, используеться в скрипте для получения информации о товарах, положенных в корзину */
		public function getBacket ()
		{ 
			$arr = Array();
			forEach ($this -> basketData as $value)
			{
				array_push ($arr, $value);
			}
			echo json_encode ($arr);
		}

        /* отображение главной */
		public function getAll ()
		{ 
			$product = $this -> connect ();
			$query = "SELECT * FROM `products`";
			$result = $product -> query ($query);
			$arr = Array ();
			while ($myrow = $result -> fetch_array (MYSQLI_ASSOC))
			{
				array_push ($arr, $myrow);
			}
			echo json_encode ($arr);
		}
	}
?>