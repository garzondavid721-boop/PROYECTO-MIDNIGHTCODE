/*
  Warnings:

  - You are about to alter the column `hora_entrada` on the `Horario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time`.
  - You are about to alter the column `hora_salida` on the `Horario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time`.
  - You are about to alter the column `nombre_rol` on the `Rol` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `descrip_rol` on the `Rol` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `nombre_usu` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `telefono_usu` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.
  - You are about to alter the column `correo_usu` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Horario` MODIFY `hora_entrada` TIME NOT NULL,
    MODIFY `hora_salida` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Rol` MODIFY `nombre_rol` VARCHAR(50) NOT NULL,
    MODIFY `descrip_rol` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `nombre_usu` VARCHAR(100) NOT NULL,
    MODIFY `telefono_usu` VARCHAR(15) NULL,
    MODIFY `correo_usu` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `Mesa` (
    `cod_mesa` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_mesa` INTEGER NOT NULL,
    `tipo_mesa` ENUM('Normal', 'VIP') NOT NULL,
    `capacidad_mesa` INTEGER NOT NULL,
    `estado_mesa` BOOLEAN NOT NULL DEFAULT true,
    `precio_reserva` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`cod_mesa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parqueadero` (
    `cod_parqueadero` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_par` INTEGER NOT NULL,
    `estado_par` BOOLEAN NOT NULL DEFAULT true,
    `precio_parqueadero` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`cod_parqueadero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id_reserva` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_identidad` INTEGER NOT NULL,
    `cod_mesa` INTEGER NOT NULL,
    `cod_parqueadero` INTEGER NULL,
    `fecha_reserva` DATE NOT NULL,
    `hora_reserva` TIME NOT NULL,
    `cantidad_personas` INTEGER NOT NULL,
    `incluye_cover` BOOLEAN NOT NULL DEFAULT true,
    `estado` ENUM('Pendiente', 'Confirmada', 'Cancelada') NOT NULL DEFAULT 'Pendiente',

    INDEX `Reserva_doc_identidad_idx`(`doc_identidad`),
    INDEX `Reserva_cod_mesa_idx`(`cod_mesa`),
    PRIMARY KEY (`id_reserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetodoPago` (
    `cod_metodopago` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`cod_metodopago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `cod_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_produc` VARCHAR(100) NOT NULL,
    `presentacion_produc` VARCHAR(50) NOT NULL,
    `precio_produc` DECIMAL(10, 2) NOT NULL,
    `estado_produc` BOOLEAN NOT NULL DEFAULT true,
    `stock` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`cod_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venta` (
    `id_venta` INTEGER NOT NULL AUTO_INCREMENT,
    `reserva_id` INTEGER NULL,
    `doc_identidad` INTEGER NOT NULL,
    `cod_metodopago` INTEGER NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DECIMAL(10, 2) NOT NULL,
    `estado` ENUM('Pendiente', 'Pagada', 'Anulada') NOT NULL DEFAULT 'Pendiente',

    INDEX `Venta_doc_identidad_idx`(`doc_identidad`),
    PRIMARY KEY (`id_venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleVenta` (
    `id_detalleventa` INTEGER NOT NULL AUTO_INCREMENT,
    `id_venta` INTEGER NOT NULL,
    `cod_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_produc` DECIMAL(10, 2) NOT NULL,

    INDEX `DetalleVenta_id_venta_idx`(`id_venta`),
    INDEX `DetalleVenta_cod_producto_idx`(`cod_producto`),
    PRIMARY KEY (`id_detalleventa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movimiento` (
    `id_movimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `cod_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo_movimiento` ENUM('Entrada', 'Salida', 'Novedad') NOT NULL,
    `descrip_movimineto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_movimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cancion` (
    `id_cancion` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_identidad` INTEGER NOT NULL,
    `nombre_can` VARCHAR(191) NOT NULL,
    `Link_can` VARCHAR(191) NOT NULL,
    `numero_fila` INTEGER NOT NULL,

    PRIMARY KEY (`id_cancion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria` (
    `id_auditoria` INTEGER NOT NULL AUTO_INCREMENT,
    `tabla_afectada` VARCHAR(191) NULL,
    `accion` ENUM('INSERT', 'UPDATE', 'DELETE') NULL,
    `usuario_afectado` INTEGER NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id_auditoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_doc_identidad_fkey` FOREIGN KEY (`doc_identidad`) REFERENCES `Usuario`(`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_cod_mesa_fkey` FOREIGN KEY (`cod_mesa`) REFERENCES `Mesa`(`cod_mesa`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_cod_parqueadero_fkey` FOREIGN KEY (`cod_parqueadero`) REFERENCES `Parqueadero`(`cod_parqueadero`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_doc_identidad_fkey` FOREIGN KEY (`doc_identidad`) REFERENCES `Usuario`(`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_cod_metodopago_fkey` FOREIGN KEY (`cod_metodopago`) REFERENCES `MetodoPago`(`cod_metodopago`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_reserva_id_fkey` FOREIGN KEY (`reserva_id`) REFERENCES `Reserva`(`id_reserva`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_id_venta_fkey` FOREIGN KEY (`id_venta`) REFERENCES `Venta`(`id_venta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_cod_producto_fkey` FOREIGN KEY (`cod_producto`) REFERENCES `Producto`(`cod_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimiento` ADD CONSTRAINT `Movimiento_cod_producto_fkey` FOREIGN KEY (`cod_producto`) REFERENCES `Producto`(`cod_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancion` ADD CONSTRAINT `Cancion_doc_identidad_fkey` FOREIGN KEY (`doc_identidad`) REFERENCES `Usuario`(`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Usuario` RENAME INDEX `Usuario_cod_rol_fkey` TO `Usuario_cod_rol_idx`;

DROP PROCEDURE IF EXISTS sp_cancelar_reserva;
CREATE PROCEDURE sp_cancelar_reserva(IN p_reserva INT)
BEGIN
    UPDATE Reserva
    SET estado = 'Cancelada'
    WHERE id_reserva = p_reserva;
END;

DROP PROCEDURE IF EXISTS sp_confirmar_reserva;
CREATE PROCEDURE sp_confirmar_reserva(IN p_reserva INT)
BEGIN
    UPDATE Reserva
    SET estado = 'Confirmada'
    WHERE id_reserva = p_reserva;
END;

DROP PROCEDURE IF EXISTS sp_registrar_venta;
CREATE PROCEDURE sp_registrar_venta(IN p_doc INT, IN p_metodo INT)
BEGIN
    INSERT INTO Venta(
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
END;
DROP TRIGGER IF EXISTS trg_validar_stock;
CREATE TRIGGER trg_validar_stock
BEFORE INSERT ON DetalleVenta
FOR EACH ROW
BEGIN
    DECLARE v_stock INT;

    SELECT stock INTO v_stock
    FROM Producto
    WHERE cod_producto = NEW.cod_producto;

    IF v_stock < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente';
    END IF;
END;

DROP TRIGGER IF EXISTS trg_descontar_stock;
CREATE TRIGGER trg_descontar_stock
AFTER INSERT ON DetalleVenta
FOR EACH ROW
BEGIN
    UPDATE Producto
    SET stock = stock - NEW.cantidad
    WHERE cod_producto = NEW.cod_producto;

    INSERT INTO Movimiento(
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
END;

DROP TRIGGER IF EXISTS trg_actualizar_total;
CREATE TRIGGER trg_actualizar_total
AFTER INSERT ON DetalleVenta
FOR EACH ROW
BEGIN
    UPDATE Venta
    SET total = (
        SELECT SUM(cantidad * precio_produc)
        FROM DetalleVenta
        WHERE id_venta = NEW.id_venta
    )
    WHERE id_venta = NEW.id_venta;
END;
DROP TRIGGER IF EXISTS trg_validar_reserva_unica;
CREATE TRIGGER trg_validar_reserva_unica
BEFORE INSERT ON Reserva
FOR EACH ROW
BEGIN
    DECLARE v_count INT;

    SELECT COUNT(*) INTO v_count
    FROM Reserva
    WHERE cod_mesa = NEW.cod_mesa
    AND fecha_reserva = NEW.fecha_reserva
    AND hora_reserva = NEW.hora_reserva
    AND estado != 'Cancelada';

    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La mesa ya está reservada en ese horario';
    END IF;
END;

DROP TRIGGER IF EXISTS trg_ocupar_mesa;
CREATE TRIGGER trg_ocupar_mesa
AFTER UPDATE ON Reserva
FOR EACH ROW
BEGIN
    IF NEW.estado = 'Confirmada' THEN
        UPDATE Mesa
        SET estado_mesa = 0
        WHERE cod_mesa = NEW.cod_mesa;
    END IF;
END;

DROP TRIGGER IF EXISTS trg_liberar_mesa;
CREATE TRIGGER trg_liberar_mesa
AFTER UPDATE ON Reserva
FOR EACH ROW
BEGIN
    IF NEW.estado = 'Cancelada' THEN
        UPDATE Mesa
        SET estado_mesa = 1
        WHERE cod_mesa = NEW.cod_mesa;
    END IF;
END;

DROP TRIGGER IF EXISTS trg_ocupar_parqueadero;
CREATE TRIGGER trg_ocupar_parqueadero
AFTER UPDATE ON Reserva
FOR EACH ROW
BEGIN
    IF NEW.estado = 'Confirmada' AND NEW.cod_parqueadero IS NOT NULL THEN
        UPDATE Parqueadero
        SET estado_par = 0
        WHERE cod_parqueadero = NEW.cod_parqueadero;
    END IF;
END;

DROP TRIGGER IF EXISTS trg_liberar_parqueadero;
CREATE TRIGGER trg_liberar_parqueadero
AFTER UPDATE ON Reserva
FOR EACH ROW
BEGIN
    IF NEW.estado = 'Cancelada' AND OLD.cod_parqueadero IS NOT NULL THEN
        UPDATE Parqueadero
        SET estado_par = 1
        WHERE cod_parqueadero = OLD.cod_parqueadero;
    END IF;
END;

DROP TRIGGER IF EXISTS trg_auditoria_reserva;
CREATE TRIGGER trg_auditoria_reserva
AFTER UPDATE ON Reserva
FOR EACH ROW
BEGIN
    INSERT INTO Auditoria(tabla_afectada, accion, usuario_afectado, descripcion)
    VALUES(
        'reserva',
        'UPDATE',
        NEW.doc_identidad,
        CONCAT('Reserva ', NEW.id_reserva, ' cambió estado a ', NEW.estado)
    );
END;
DROP TRIGGER IF EXISTS trg_auditoria_venta;
CREATE TRIGGER trg_auditoria_venta
AFTER INSERT ON Venta
FOR EACH ROW
BEGIN
    INSERT INTO Auditoria(tabla_afectada, accion, usuario_afectado, descripcion)
    VALUES(
        'venta',
        'INSERT',
        NEW.doc_identidad,
        CONCAT('Venta creada con ID: ', NEW.id_venta)
    );
END;
CREATE OR REPLACE VIEW vista_inventario AS
SELECT 
    cod_producto,
    nombre_produc,
    presentacion_produc,
    stock,
    precio_produc,
    estado_produc
FROM Producto;

CREATE OR REPLACE VIEW vista_movimientos AS
SELECT 
    m.id_movimiento,
    p.nombre_produc,
    m.cantidad,
    m.tipo_movimiento,
    m.fecha_registro,
    m.descrip_movimineto
FROM Movimiento m
JOIN Producto p ON m.cod_producto = p.cod_producto;

CREATE OR REPLACE VIEW vista_productos_top AS
SELECT 
    p.nombre_produc,
    SUM(d.cantidad) AS total_vendido
FROM DetalleVenta d
JOIN Producto p ON d.cod_producto = p.cod_producto
GROUP BY p.cod_producto
ORDER BY total_vendido DESC;

CREATE OR REPLACE VIEW vista_reporte_mensual AS
SELECT 
    YEAR(fecha) AS año,
    MONTH(fecha) AS mes,
    COUNT(id_venta) AS total_ventas,
    SUM(total) AS ingresos_totales
FROM Venta
WHERE estado = 'Pagada'
GROUP BY YEAR(fecha), MONTH(fecha);

CREATE OR REPLACE VIEW vista_reservas_completas AS
SELECT 
    r.id_reserva,
    u.nombre_usu AS cliente,
    u.telefono_usu,
    m.numero_mesa,
    m.tipo_mesa,
    p.numero_par AS parqueadero,
    r.fecha_reserva,
    r.hora_reserva,
    r.cantidad_personas,
    r.estado
FROM Reserva r
JOIN Usuario u ON r.doc_identidad = u.doc_identidad
JOIN Mesa m ON r.cod_mesa = m.cod_mesa
LEFT JOIN Parqueadero p ON r.cod_parqueadero = p.cod_parqueadero;

CREATE OR REPLACE VIEW vista_ventas_detalladas AS
SELECT 
    v.id_venta,
    u.nombre_usu AS cliente,
    mp.nombre AS metodo_pago,
    v.fecha,
    v.total,
    v.estado
FROM Venta v
JOIN Usuario u ON v.doc_identidad = u.doc_identidad
LEFT JOIN MetodoPago mp ON v.cod_metodopago = mp.cod_metodopago;

CREATE OR REPLACE VIEW vista_factura AS
SELECT 
    v.id_venta,
    u.nombre_usu,
    p.nombre_produc,
    d.cantidad,
    d.precio_produc,
    (d.cantidad * d.precio_produc) AS subtotal,
    v.total,
    v.fecha
FROM Venta v
JOIN Usuario u ON v.doc_identidad = u.doc_identidad
JOIN DetalleVenta d ON v.id_venta = d.id_venta
JOIN Producto p ON d.cod_producto = p.cod_producto;