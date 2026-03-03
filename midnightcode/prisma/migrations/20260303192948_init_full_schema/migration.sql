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
