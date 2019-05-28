-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Май 28 2019 г., 15:10
-- Версия сервера: 5.6.41
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `products`
--

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userName` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `comment` text,
  `orders` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `userName`, `phone`, `email`, `comment`, `orders`) VALUES
(2, 'Дударь', '012324154135', 'dudar@mail.ru', 'QEdeQD', '[{\"id\":\"1\",\"name\":\"u041du043eu0443u0442u0431u0443u043a Lenovo IdeaPad 320S-13IKB (81AK00ALRA) Mineral Grey\",\"price\":\"20999\",\"many\":\"1\"},{\"id\":\"2\",\"name\":\"u041du043eu0443u0442u0431u0443u043a HP 250 G6 (4QW21ES) Dark Ash\",\"price\":\"8199\",\"many\":\"2\"}]'),
(3, 'Тарас', '012324154135', 'ivan@mail.ru', 'ВВФФЫ', '[{\"id\":\"1\",\"name\":\"u041du043eu0443u0442u0431u0443u043a Lenovo IdeaPad 320S-13IKB (81AK00ALRA) Mineral Grey\",\"price\":\"20999\",\"many\":\"2\"},{\"id\":\"2\",\"name\":\"u041du043eu0443u0442u0431u0443u043a HP 250 G6 (4QW21ES) Dark Ash\",\"price\":\"8199\",\"many\":\"1\"}]'),
(4, 'Мирошниченко Тарас Юрьевич', '06664124312', 'melnik@mail.ua', 'Можно бесплатно?\n', '[{\"id\":\"6\",\"name\":\"u0412u0438u0434u0435u043eu043au0430u0440u0442u0430 MSI PCI-Ex GeForce GTX 1050 Ti GAMING X 4GB (128bit) (1354/7008)\",\"price\":\"6227\",\"many\":\"1\"},{\"id\":\"7\",\"name\":\"SSD Samsung 860 Evo-Series 500GB 2.5\" (MZ-76E500BW)\",\"price\":\"2999\",\"many\":\"1\"}]'),
(5, 'Гена', '06664124312', 'dudar@mail.ua', 'вфа', '[{\"id\":\"1\",\"name\":\"u041du043eu0443u0442u0431u0443u043a Lenovo IdeaPad 320S-13IKB (81AK00ALRA) Mineral Grey\",\"price\":\"20999\",\"many\":\"1\"}]'),
(6, 'Иван ', '06664124312', 'melnik@mail.ua', 'ВФЫА', '[{\"id\":\"1\",\"name\":\"u041du043eu0443u0442u0431u0443u043a Lenovo IdeaPad 320S-13IKB (81AK00ALRA) Mineral Grey\",\"price\":\"20999\",\"many\":\"1\"},{\"id\":\"2\",\"name\":\"u041du043eu0443u0442u0431u0443u043a HP 250 G6 (4QW21ES) Dark Ash\",\"price\":\"8199\",\"many\":\"1\"}]'),
(7, 'Иван', '06664124312', 'melnik@mail.u', '', '[{\"id\":\"1\",\"name\":\"u041du043eu0443u0442u0431u0443u043a Lenovo IdeaPad 320S-13IKB (81AK00ALRA) Mineral Grey\",\"price\":\"20999\",\"many\":\"2\"}]');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `images` text,
  `price` int(11) NOT NULL,
  `about` text,
  `stock` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `images`, `price`, `about`, `stock`) VALUES
(1, 'Ноутбук Lenovo IdeaPad 320S-13IKB (81AK00ALRA) Mineral Grey', 'images/lenovo.png', 20999, 'Экран 13.3\" IPS (1920x1080) Full HD, матовый / Intel Core i5-8250U (1.6 - 3.4 ГГц) / RAM 8 ГБ / SSD 256 ГБ / nVidia GeForce MX150, 2 ГБ / без ОД / Wi-Fi / Bluetooth / веб-камера / DOS / 1.2 кг / серый. Гарантия: 24 месяца.', 'Нет в наличии'),
(2, 'Ноутбук HP 250 G6 (4QW21ES) Dark Ash', 'images/HP.png', 8199, 'Экран 15.6” (1366x768) HD, матовый / Intel Pentium Silver N5000 (1.1 - 2.7 ГГц) / RAM 4 ГБ / HDD 500 ГБ / Intel UHD Graphics 605 / без ОД / LAN / Wi-Fi / Bluetooth / веб-камера / DOS / 1.86 кг / черный. Гарантия: 18 месяцев.', 'Есть в наличии'),
(3, 'Игровая мышка Razer DeathAdder 3500 (AS 582058)', 'images/mouse.png', 1998, 'Тип датчика: Оптический. Интерфейс: USB. Цвет: Черный. Страна-производитель товара: Китай. Гарантия: 6 месяцев.', 'Нет в наличии'),
(4, 'Клавиатура проводная HyperX Alloy Elite Cherry MX (HX-KB2BL1-RU/R1)', 'images/keyboard.png', 2399, 'Количество кнопок: 111. Интерфейс: USB. Тип упаковки: Retail. Цвет: Черный. Особенности: Встроенный USB-порт. Совместимость с ОС: Microsoft Windows. Страна регистрации бренда: США. Гарантия: 12 месяцев.', 'Нет в наличии'),
(5, 'Процессор Intel Core i5-8400 2.8GHz/8GT/s/9MB (BX80684I58400)', 'images/intel.png', 7005, 'Семейство процессора: Intel Core i5. Тип разъема: Socket 1151. Поколение процессора Intel: Coffee Lake (восьмое). Количество ядер: 6. Интегрированная графика: Intel UHD Graphics 630. Внутренняя тактовая частота: 2800 МГц. Объем кэш памяти 3 уровня: 9 МБ. Страна регистрации бренда: США. Гарантия: 36 месяцев.', 'Нет в наличии'),
(6, 'Видеокарта MSI PCI-Ex GeForce GTX 1050 Ti GAMING X 4GB (128bit) (1354/7008)', 'images/videocard.png', 6227, 'Графический чип: GeForce GTX 1050 Ti. Объем памяти: 4 ГБ. Разрядность шины памяти: 128 бит. Тип памяти: GDDR5. Тип системы охлаждения: Активная. Страна регистрации бренда: Тайвань. Гарантия: 36 месяцев.', 'Нет в наличии'),
(7, 'SSD Samsung 860 Evo-Series 500GB 2.5\" (MZ-76E500BW)', 'images/SSD.png', 2999, 'Объем: 500 ГБ. Формфактор: 2.5\". Интерфейс: SATAIII. Страна регистрации бренда: Корея. Гарантия: 36 месяцев.', 'Есть в наличии'),
(8, 'Оперативная память HyperX DDR4-3200 16384MB PC4-25600 (Kit of 2x8192) Fury Black (HX432C18FB2K2/16)', 'images/RAM.png', 4290, 'Объем памяти: 16 ГБ. Тип памяти: DDR4 SDRAM. Частота памяти: 3200 МГц. Назначение: Для настольных ПК. Количество планок: 2. Страна регистрации бренда: США. Гарантия: 60 месяцев.', 'Есть в наличии'),
(9, 'Блок питания Chieftec GPS-600A8 600W', 'images/BlockPower.png', 1316, 'Мощность: 600 Вт. Охлаждение: Вентилятор 120 мм. Тип разъема подключения к материнской плате: ATX 20+4pin. Гарантия: 24 месяца.', 'Есть в наличии'),
(10, 'Процессор AMD Ryzen 3 2200G 3.5GHz/4MB (YD2200C5FBBOX) sAM4 BOX', 'images/Ryzen.png', 3065, 'Семейство процессора: AMD Ryzen 3. Тип разъема: Socket AM4. Количество ядер: 4. Интегрированная графика: AMD Radeon Vega 8. Внутренняя тактовая частота: 3500 МГц. Объем кэш памяти 3 уровня: 4 МБ. Страна регистрации бренда: США. Гарантия: 36 месяцев.', 'Есть в наличии'),
(11, 'Корпус QUBE Mirror Black (QBM97_FCNU3)', 'images/Box.png', 2496, 'Форм-фактор материнской платы: ATX, microATX,  Mini-ITX. Тип корпуса: Miditower. Страна регистрации бренда: Украина. Гарантия: 12 месяцев.', 'Есть в наличии'),
(12, 'Жесткий диск Western Digital Blue 1TB 7200rpm 64MB (WD10EZEX)', 'images/ROM.png', 1255, 'Емкость накопителя: 1 ТБ. Тип жесткого диска: Внутренний. Форм-фактор: 3.5\". Интерфейс: SATAIII. Скорость вращения шпинделя: 7200 об/мин. Страна регистрации бренда: США. Гарантия: 24 месяца.', 'Есть в наличии');

-- --------------------------------------------------------

--
-- Структура таблицы `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL,
  `userName` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `userinfo`
--

INSERT INTO `userinfo` (`id`, `userName`, `password`) VALUES
(1, 'admin', 'admin');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
