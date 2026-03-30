-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 03-03-2026 a las 19:25:28
-- Versión del servidor: 8.0.45
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `1`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`%` PROCEDURE `sp_cancelar_reserva` (IN `p_reserva` INT)   BEGIN
    UPDATE reserva
    SET estado = 'Cancelada'
    WHERE id_reserva = p_reserva;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `sp_confirmar_reserva` (IN `p_reserva` INT)   BEGIN
    UPDATE reserva
    SET estado = 'Confirmada'
    WHERE id_reserva = p_reserva;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `sp_registrar_venta` (IN `p_doc` INT, IN `p_metodo` INT)   BEGIN
    INSERT INTO venta(
        reserva_id,
        doc_identidad,
        cod_metodopago,
        total,
        estado
    )
    VALUES (
        NULL,
        p_doc,
        p_metodo,
        0,
        'Pagada'
    );
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria`
--

CREATE TABLE `auditoria` (
  `id_auditoria` int NOT NULL,
  `tabla_afectada` varchar(50) DEFAULT NULL,
  `accion` enum('INSERT','UPDATE','DELETE') DEFAULT NULL,
  `usuario_afectado` int DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancion`
--

CREATE TABLE `cancion` (
  `id_cancion` int NOT NULL,
  `doc_identidad` int NOT NULL,
  `nombre_can` text COLLATE utf8mb4_general_ci NOT NULL,
  `Link_can` text COLLATE utf8mb4_general_ci NOT NULL,
  `numero_fila` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_detalleventa` int NOT NULL,
  `id_venta` int NOT NULL,
  `cod_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_produc` decimal(10,2) NOT NULL
) ;

--
-- Disparadores `detalle_venta`
--
DELIMITER $$
CREATE TRIGGER `trg_actualizar_total` AFTER INSERT ON `detalle_venta` FOR EACH ROW BEGIN
    UPDATE venta
    SET total = (
        SELECT SUM(cantidad * precio_produc)
        FROM detalle_venta
        WHERE id_venta = NEW.id_venta
    )
    WHERE id_venta = NEW.id_venta;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_descontar_stock` AFTER INSERT ON `detalle_venta` FOR EACH ROW BEGIN
    UPDATE producto
    SET stock = stock - NEW.cantidad
    WHERE cod_producto = NEW.cod_producto;

    INSERT INTO movimiento(
        cod_producto,
        cantidad,
        tipo_movimiento,
        descrip_movimineto
    )
    VALUES(
        NEW.cod_producto,
        NEW.cantidad,
        'Salida',
        'Venta realizada'
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_validar_stock` BEFORE INSERT ON `detalle_venta` FOR EACH ROW BEGIN
    DECLARE v_stock INT;

    SELECT stock INTO v_stock
    FROM producto
    WHERE cod_producto = NEW.cod_producto;

    IF v_stock < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id_horario` int NOT NULL,
  `doc_identidad` int NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo') COLLATE utf8mb4_general_ci NOT NULL,
  `hora_entrada` time NOT NULL,
  `hora_salida` time NOT NULL,
  `estado` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa`
--

CREATE TABLE `mesa` (
  `cod_mesa` int NOT NULL,
  `numero_mesa` int NOT NULL,
  `tipo_mesa` enum('Normal','VIP') COLLATE utf8mb4_general_ci NOT NULL,
  `capacidad_mesa` int NOT NULL,
  `estado_mesa` tinyint(1) DEFAULT '1',
  `precio_reserva` decimal(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `cod_metodopago` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `id_movimiento` int NOT NULL,
  `cod_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `tipo_movimiento` enum('Entrada','Salida','Novedad') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descrip_movimineto` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parqueadero`
--

CREATE TABLE `parqueadero` (
  `cod_parqueadero` int NOT NULL,
  `numero_par` int NOT NULL,
  `estado_par` tinyint(1) DEFAULT '1',
  `precio_parqueadero` decimal(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `cod_producto` int NOT NULL,
  `nombre_produc` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `presentacion_produc` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `precio_produc` decimal(10,2) NOT NULL,
  `estado_produc` tinyint(1) DEFAULT '1',
  `stock` int NOT NULL,
  `cantidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int NOT NULL,
  `doc_identidad` int NOT NULL,
  `cod_mesa` int NOT NULL,
  `cod_parqueadero` int DEFAULT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_reserva` time NOT NULL,
  `cantidad_personas` int NOT NULL,
  `incluye_cover` tinyint(1) DEFAULT '1',
  `estado` enum('Pendiente','Confirmada','Cancelada') COLLATE utf8mb4_general_ci DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `reserva`
--
DELIMITER $$
CREATE TRIGGER `trg_auditoria_reserva` AFTER UPDATE ON `reserva` FOR EACH ROW BEGIN
    INSERT INTO auditoria(tabla_afectada, accion, usuario_afectado, descripcion)
    VALUES(
        'reserva',
        'UPDATE',
        NEW.doc_identidad,
        CONCAT('Reserva ', NEW.id_reserva, ' cambió estado a ', NEW.estado)
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_liberar_mesa` AFTER UPDATE ON `reserva` FOR EACH ROW BEGIN
    IF NEW.estado = 'Cancelada' THEN
        UPDATE mesa
        SET estado_mesa = 1
        WHERE cod_mesa = NEW.cod_mesa;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_liberar_parqueadero` AFTER UPDATE ON `reserva` FOR EACH ROW BEGIN
    IF NEW.estado = 'Cancelada' AND OLD.cod_parqueadero IS NOT NULL THEN
        UPDATE parqueadero
        SET estado_par = 1
        WHERE cod_parqueadero = OLD.cod_parqueadero;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_ocupar_mesa` AFTER UPDATE ON `reserva` FOR EACH ROW BEGIN
    IF NEW.estado = 'Confirmada' THEN
        UPDATE mesa
        SET estado_mesa = 0
        WHERE cod_mesa = NEW.cod_mesa;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_ocupar_parqueadero` AFTER UPDATE ON `reserva` FOR EACH ROW BEGIN
    IF NEW.estado = 'Confirmada' AND NEW.cod_parqueadero IS NOT NULL THEN
        UPDATE parqueadero
        SET estado_par = 0
        WHERE cod_parqueadero = NEW.cod_parqueadero;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_validar_reserva_unica` BEFORE INSERT ON `reserva` FOR EACH ROW BEGIN
    DECLARE v_count INT;

    SELECT COUNT(*) INTO v_count
    FROM reserva
    WHERE cod_mesa = NEW.cod_mesa
    AND fecha_reserva = NEW.fecha_reserva
    AND hora_reserva = NEW.hora_reserva
    AND estado != 'Cancelada';

    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La mesa ya está reservada en ese horario';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `cod_rol` int NOT NULL,
  `nombre_rol` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `descrip_rol` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `doc_identidad` int NOT NULL,
  `cod_rol` int NOT NULL,
  `nombre_usu` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono_usu` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `correo_usu` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password_usu` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id_venta` int NOT NULL,
  `reserva_id` int DEFAULT NULL,
  `doc_identidad` int NOT NULL,
  `cod_metodopago` int DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('Pendiente','Pagada','Anulada') COLLATE utf8mb4_general_ci DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `venta`
--
DELIMITER $$
CREATE TRIGGER `trg_auditoria_venta` AFTER INSERT ON `venta` FOR EACH ROW BEGIN
    INSERT INTO auditoria(tabla_afectada, accion, usuario_afectado, descripcion)
    VALUES(
        'venta',
        'INSERT',
        NEW.doc_identidad,
        CONCAT('Venta creada con ID: ', NEW.id_venta)
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_factura`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_factura` (
`cantidad` int
,`fecha` datetime
,`id_venta` int
,`nombre_produc` varchar(100)
,`nombre_usu` varchar(100)
,`precio_produc` decimal(10,2)
,`subtotal` decimal(20,2)
,`total` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_inventario`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_inventario` (
`cod_producto` int
,`estado_produc` tinyint(1)
,`nombre_produc` varchar(100)
,`precio_produc` decimal(10,2)
,`presentacion_produc` varchar(50)
,`stock` int
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_movimientos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_movimientos` (
`cantidad` int
,`descrip_movimineto` text
,`fecha_registro` datetime
,`id_movimiento` int
,`nombre_produc` varchar(100)
,`tipo_movimiento` enum('Entrada','Salida','Novedad')
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_productos_top`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_productos_top` (
`nombre_produc` varchar(100)
,`total_vendido` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_reporte_mensual`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_reporte_mensual` (
`año` int
,`ingresos_totales` decimal(32,2)
,`mes` int
,`total_ventas` bigint
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_reservas_completas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_reservas_completas` (
`cantidad_personas` int
,`cliente` varchar(100)
,`estado` enum('Pendiente','Confirmada','Cancelada')
,`fecha_reserva` date
,`hora_reserva` time
,`id_reserva` int
,`numero_mesa` int
,`parqueadero` int
,`telefono_usu` varchar(15)
,`tipo_mesa` enum('Normal','VIP')
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_ventas_detalladas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_ventas_detalladas` (
`cliente` varchar(100)
,`estado` enum('Pendiente','Pagada','Anulada')
,`fecha` datetime
,`id_venta` int
,`metodo_pago` varchar(50)
,`total` decimal(10,2)
);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auditoria`
--
ALTER TABLE `auditoria`
  ADD PRIMARY KEY (`id_auditoria`);

--
-- Indices de la tabla `cancion`
--
ALTER TABLE `cancion`
  ADD PRIMARY KEY (`id_cancion`),
  ADD KEY `cancion_usuario` (`doc_identidad`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalleventa`),
  ADD KEY `detalleventa_producto` (`cod_producto`),
  ADD KEY `detalleventa_venta` (`id_venta`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `horario_usuario` (`doc_identidad`);

--
-- Indices de la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD PRIMARY KEY (`cod_mesa`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`cod_metodopago`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `movimiento_producto` (`cod_producto`);

--
-- Indices de la tabla `parqueadero`
--
ALTER TABLE `parqueadero`
  ADD PRIMARY KEY (`cod_parqueadero`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`cod_producto`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `reserva_usuario` (`doc_identidad`),
  ADD KEY `reserva_mesa` (`cod_mesa`),
  ADD KEY `reserva_parqueadero` (`cod_parqueadero`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`cod_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`doc_identidad`),
  ADD KEY `Usuario_Rol` (`cod_rol`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `venta_usuario` (`doc_identidad`),
  ADD KEY `venta_metodopago` (`cod_metodopago`),
  ADD KEY `venta_reserva` (`reserva_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auditoria`
--
ALTER TABLE `auditoria`
  MODIFY `id_auditoria` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cancion`
--
ALTER TABLE `cancion`
  MODIFY `id_cancion` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_detalleventa` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id_horario` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `id_movimiento` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id_venta` int NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_factura`
--
DROP TABLE IF EXISTS `vista_factura`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_factura`  AS SELECT `v`.`id_venta` AS `id_venta`, `u`.`nombre_usu` AS `nombre_usu`, `p`.`nombre_produc` AS `nombre_produc`, `d`.`cantidad` AS `cantidad`, `d`.`precio_produc` AS `precio_produc`, (`d`.`cantidad` * `d`.`precio_produc`) AS `subtotal`, `v`.`total` AS `total`, `v`.`fecha` AS `fecha` FROM (((`venta` `v` join `usuario` `u` on((`v`.`doc_identidad` = `u`.`doc_identidad`))) join `detalle_venta` `d` on((`v`.`id_venta` = `d`.`id_venta`))) join `producto` `p` on((`d`.`cod_producto` = `p`.`cod_producto`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_inventario`
--
DROP TABLE IF EXISTS `vista_inventario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_inventario`  AS SELECT `producto`.`cod_producto` AS `cod_producto`, `producto`.`nombre_produc` AS `nombre_produc`, `producto`.`presentacion_produc` AS `presentacion_produc`, `producto`.`stock` AS `stock`, `producto`.`precio_produc` AS `precio_produc`, `producto`.`estado_produc` AS `estado_produc` FROM `producto` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_movimientos`
--
DROP TABLE IF EXISTS `vista_movimientos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_movimientos`  AS SELECT `m`.`id_movimiento` AS `id_movimiento`, `p`.`nombre_produc` AS `nombre_produc`, `m`.`cantidad` AS `cantidad`, `m`.`tipo_movimiento` AS `tipo_movimiento`, `m`.`fecha_registro` AS `fecha_registro`, `m`.`descrip_movimineto` AS `descrip_movimineto` FROM (`movimiento` `m` join `producto` `p` on((`m`.`cod_producto` = `p`.`cod_producto`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_productos_top`
--
DROP TABLE IF EXISTS `vista_productos_top`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_productos_top`  AS SELECT `p`.`nombre_produc` AS `nombre_produc`, sum(`d`.`cantidad`) AS `total_vendido` FROM (`detalle_venta` `d` join `producto` `p` on((`d`.`cod_producto` = `p`.`cod_producto`))) GROUP BY `p`.`cod_producto` ORDER BY `total_vendido` DESC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_reporte_mensual`
--
DROP TABLE IF EXISTS `vista_reporte_mensual`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_reporte_mensual`  AS SELECT year(`venta`.`fecha`) AS `año`, month(`venta`.`fecha`) AS `mes`, count(`venta`.`id_venta`) AS `total_ventas`, sum(`venta`.`total`) AS `ingresos_totales` FROM `venta` WHERE (`venta`.`estado` = 'Pagada') GROUP BY year(`venta`.`fecha`), month(`venta`.`fecha`) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_reservas_completas`
--
DROP TABLE IF EXISTS `vista_reservas_completas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_reservas_completas`  AS SELECT `r`.`id_reserva` AS `id_reserva`, `u`.`nombre_usu` AS `cliente`, `u`.`telefono_usu` AS `telefono_usu`, `m`.`numero_mesa` AS `numero_mesa`, `m`.`tipo_mesa` AS `tipo_mesa`, `p`.`numero_par` AS `parqueadero`, `r`.`fecha_reserva` AS `fecha_reserva`, `r`.`hora_reserva` AS `hora_reserva`, `r`.`cantidad_personas` AS `cantidad_personas`, `r`.`estado` AS `estado` FROM (((`reserva` `r` join `usuario` `u` on((`r`.`doc_identidad` = `u`.`doc_identidad`))) join `mesa` `m` on((`r`.`cod_mesa` = `m`.`cod_mesa`))) left join `parqueadero` `p` on((`r`.`cod_parqueadero` = `p`.`cod_parqueadero`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_ventas_detalladas`
--
DROP TABLE IF EXISTS `vista_ventas_detalladas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_ventas_detalladas`  AS SELECT `v`.`id_venta` AS `id_venta`, `u`.`nombre_usu` AS `cliente`, `mp`.`nombre` AS `metodo_pago`, `v`.`fecha` AS `fecha`, `v`.`total` AS `total`, `v`.`estado` AS `estado` FROM ((`venta` `v` join `usuario` `u` on((`v`.`doc_identidad` = `u`.`doc_identidad`))) left join `metodo_pago` `mp` on((`v`.`cod_metodopago` = `mp`.`cod_metodopago`))) ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cancion`
--
ALTER TABLE `cancion`
  ADD CONSTRAINT `cancion_usuario` FOREIGN KEY (`doc_identidad`) REFERENCES `usuario` (`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalleventa_producto` FOREIGN KEY (`cod_producto`) REFERENCES `producto` (`cod_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalleventa_venta` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_usuario` FOREIGN KEY (`doc_identidad`) REFERENCES `usuario` (`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `movimiento_producto` FOREIGN KEY (`cod_producto`) REFERENCES `producto` (`cod_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_mesa` FOREIGN KEY (`cod_mesa`) REFERENCES `mesa` (`cod_mesa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_parqueadero` FOREIGN KEY (`cod_parqueadero`) REFERENCES `parqueadero` (`cod_parqueadero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_usuario` FOREIGN KEY (`doc_identidad`) REFERENCES `usuario` (`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `Usuario_Rol` FOREIGN KEY (`cod_rol`) REFERENCES `rol` (`cod_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_metodopago` FOREIGN KEY (`cod_metodopago`) REFERENCES `metodo_pago` (`cod_metodopago`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `venta_reserva` FOREIGN KEY (`reserva_id`) REFERENCES `reserva` (`id_reserva`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `venta_usuario` FOREIGN KEY (`doc_identidad`) REFERENCES `usuario` (`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
