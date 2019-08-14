-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 14-08-2019 a las 17:42:44
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eyewallet`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card_request`
--

CREATE TABLE `card_request` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `price_btc` decimal(10,0) NOT NULL,
  `price_usd` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control_access`
--

CREATE TABLE `control_access` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login` tinyint(4) DEFAULT NULL,
  `recovery` tinyint(4) DEFAULT NULL,
  `ip` varchar(45) NOT NULL,
  `agent` text NOT NULL,
  `state` tinyint(4) NOT NULL COMMENT '1 hizo login 0 no hizo login',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `short_name` varchar(45) NOT NULL,
  `flag` varchar(250) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `currency`
--

INSERT INTO `currency` (`id`, `name`, `short_name`, `flag`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'BITCOIN', 'BTC', 'https://0fa1e61c.ngrok.io', 1, '2019-07-19 02:13:57', NULL),
(2, 'LITECOIN', 'LTC', 'https://0fa1e61c.ngrok.io', 1, '2019-07-19 02:13:57', NULL),
(3, 'ETHEREUM', 'ETH', 'https://0fa1e61c.ngrok.io', 0, '2019-07-19 02:13:57', '2019-08-13 20:04:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exchange_request`
--

CREATE TABLE `exchange_request` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_from` varchar(250) NOT NULL,
  `address_to` varchar(250) NOT NULL,
  `currency_id_from` int(11) NOT NULL,
  `currency_id_to` int(11) NOT NULL,
  `currency_short_name_from` varchar(10) NOT NULL,
  `currency_short_name_to` varchar(10) NOT NULL,
  `amount` decimal(11,8) NOT NULL,
  `amount_received` decimal(11,8) NOT NULL,
  `fee` decimal(11,8) NOT NULL,
  `data` text NOT NULL,
  `priority` varchar(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 - rechazado - 1 solicitado - 2 aprobado  - 3 transaccion realizada (tabla transaction)',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `file`
--

CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `model` varchar(250) DEFAULT NULL,
  `model_id` int(11) DEFAULT NULL,
  `url_file` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pin` varchar(250) DEFAULT NULL,
  `phone` varchar(45) NOT NULL,
  `country` varchar(45) DEFAULT NULL,
  `iso` varchar(250) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `identification` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `address1` varchar(250) DEFAULT NULL,
  `address2` varchar(250) DEFAULT NULL,
  `device` text DEFAULT NULL,
  `avatar` varchar(250) DEFAULT 'uploads/avatar/nophoto.png',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 es eyewallet 1 es eyewallet pro',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `user_id_from` int(11) DEFAULT NULL,
  `user_id_to` int(11) DEFAULT NULL,
  `address_from` varchar(250) DEFAULT NULL,
  `address_to` varchar(250) DEFAULT NULL,
  `amount` decimal(11,8) NOT NULL,
  `fee` decimal(11,8) NOT NULL,
  `amount_finally` decimal(11,8) NOT NULL,
  `balance_before` decimal(11,8) NOT NULL,
  `balance_after` decimal(11,8) NOT NULL,
  `priority` varchar(45) DEFAULT NULL,
  `type` int(11) NOT NULL COMMENT 'el tipo de transacción  1 enviado.  0 recibido',
  `confirmation` int(11) NOT NULL,
  `hash` varchar(250) NOT NULL,
  `currency_id` int(11) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `date_transaction` datetime NOT NULL,
  `exchange` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 no es exchange - 1 es exchange',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `transaction`
--

INSERT INTO `transaction` (`id`, `user_id_from`, `user_id_to`, `address_from`, `address_to`, `amount`, `fee`, `amount_finally`, `balance_before`, `balance_after`, `priority`, `type`, `confirmation`, `hash`, `currency_id`, `description`, `date_transaction`, `exchange`, `createdAt`, `updatedAt`) VALUES
(2, 2, NULL, '2NDHVTav3bj7mCJGVrBaK1xVfL2DiLs8oDS', 'BILLETERA EXCHANGE', '0.00010000', '0.00006180', '0.00016180', '0.01154978', '0.01171158', 'low', 0, 1, 'f3d10c79d577214881d9299f51f7d55abf41a2a8791ca630205586db2ebec887', 1, NULL, '2019-08-05 00:00:00', 1, '2019-08-05 20:54:58', '2019-08-05 20:55:57'),
(3, NULL, 2, 'BILLETERA EXCHANGE', '2NCt6kH9jVHVryRB98p99Zcb2DHrFZEKgcY', '0.01200342', '0.00004120', '0.01204462', '0.01266106', '0.02466448', 'low', 1, 5, '43a1dccabbb15dfbff63d7d9fa20bd1b6953b5abdff4f06412fe72011ec036ac', 2, NULL, '2019-08-05 00:00:00', 1, '2019-08-05 20:54:59', '2019-08-05 20:58:27'),
(10, 2, NULL, '0x860227c08BB9e479f2370e17BeD816B985E71968', '0x9e9729e70CDee40D7aC358587C55672b2d60C708', '0.00010000', '0.00000000', '0.00000000', '0.00000000', '0.00000000', 'low', 1, 3, '0x1daed3f3c7668a144e2bdef149ff49c8859d2622c4f0f38d7d0bd49de904be27', 1, 'por que si', '2019-08-06 00:00:00', 0, '2019-08-06 21:07:44', NULL),
(11, 2, 2, '0x860227c08BB9e479f2370e17BeD816B985E71968', '0xBd4c7064EF54a6f29Ccaa3cEaBa988157b959bD6', '0.00001000', '0.00000000', '0.00000000', '0.00000000', '0.00000000', 'low', 1, 3, '0xf80cf792ba1896dbb724793fde87539e6e166c2e0f982dea3c55682e47bff8f2', 1, 'por que si', '2019-08-06 00:00:00', 0, '2019-08-06 21:12:33', '2019-08-13 19:43:03'),
(12, NULL, 2, 'BILLETETA EXTERNA', '2NDHVTav3bj7mCJGVrBaK1xVfL2DiLs8oDS', '0.00010000', '0.00000000', '0.00010000', '0.01148798', '0.01158798', 'low', 0, 3, '58c0b513997c684af02d3bd855e09442eeb16d690917deed40cf6b790d577615', 1, NULL, '2019-08-08 00:00:00', 0, '2019-08-08 15:06:03', '2019-08-08 15:23:57'),
(13, NULL, 2, 'BILLETETA EXTERNA', '2NDHVTav3bj7mCJGVrBaK1xVfL2DiLs8oDS', '0.00010000', '0.00000000', '0.00010000', '0.01138798', '0.01148798', 'low', 0, 3, '366472c2cc037f20e5d025542b9b00323c4c863c488d48df7bcb783ab1318108', 1, NULL, '2019-08-08 00:00:00', 0, '2019-08-08 15:11:00', '2019-08-08 15:23:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `two_factor` tinyint(4) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 sin verificar. 1 verificado. 2 bloqueado. 3 eliminado',
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_verification`
--

CREATE TABLE `user_verification` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL,
  `identification` text NOT NULL,
  `identification2` text DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_wallet`
--

CREATE TABLE `user_wallet` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `currency_id` int(11) NOT NULL,
  `address` varchar(250) NOT NULL,
  `private_key` varchar(250) DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL COMMENT '1 activa 0 inactiva',
  `balance` decimal(11,8) NOT NULL DEFAULT 0.00000000,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vault`
--

CREATE TABLE `vault` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hash` varchar(250) NOT NULL,
  `wallet_id` int(11) NOT NULL,
  `amount` decimal(11,8) NOT NULL,
  `percent` int(11) NOT NULL,
  `profit` decimal(11,8) NOT NULL,
  `date_begin` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `date_cancelation` datetime DEFAULT NULL,
  `status` int(1) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `card_request`
--
ALTER TABLE `card_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_card_request_user1_idx` (`user_id`);

--
-- Indices de la tabla `control_access`
--
ALTER TABLE `control_access`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_control_access_user1_idx` (`user_id`);

--
-- Indices de la tabla `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `exchange_request`
--
ALTER TABLE `exchange_request`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_transaction_user1_idx` (`user_id_from`),
  ADD KEY `fk_transaction_user2_idx` (`user_id_to`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_verification`
--
ALTER TABLE `user_verification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_verification_user1_idx` (`user_id`);

--
-- Indices de la tabla `user_wallet`
--
ALTER TABLE `user_wallet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_wallet_user1_idx` (`user_id`),
  ADD KEY `fk_user_wallet_currency1_idx` (`currency_id`);

--
-- Indices de la tabla `vault`
--
ALTER TABLE `vault`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `card_request`
--
ALTER TABLE `card_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `control_access`
--
ALTER TABLE `control_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `exchange_request`
--
ALTER TABLE `exchange_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_verification`
--
ALTER TABLE `user_verification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_wallet`
--
ALTER TABLE `user_wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vault`
--
ALTER TABLE `vault`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
