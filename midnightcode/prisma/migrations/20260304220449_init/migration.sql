/*
  Warnings:

  - The primary key for the `DetalleVenta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DetalleVenta` table. All the data in the column will be lost.
  - You are about to drop the column `precioUnit` on the `DetalleVenta` table. All the data in the column will be lost.
  - You are about to drop the column `productoId` on the `DetalleVenta` table. All the data in the column will be lost.
  - You are about to drop the column `ventaId` on the `DetalleVenta` table. All the data in the column will be lost.
  - The primary key for the `Horario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fecha` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `horaFin` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `horaInicio` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Horario` table. All the data in the column will be lost.
  - The primary key for the `Mesa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `capacidad` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `Mesa` table. All the data in the column will be lost.
  - The primary key for the `MetodoPago` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MetodoPago` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `MetodoPago` table. All the data in the column will be lost.
  - The primary key for the `Movimiento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Movimiento` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Movimiento` table. All the data in the column will be lost.
  - You are about to drop the column `productoId` on the `Movimiento` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Movimiento` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Movimiento` table. All the data in the column will be lost.
  - The primary key for the `Producto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Producto` table. All the data in the column will be lost.
  - The primary key for the `Reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `fechaReserva` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `mesaId` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `parquaderoId` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Reserva` table. All the data in the column will be lost.
  - You are about to alter the column `estado` on the `Reserva` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.
  - The primary key for the `Rol` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Rol` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `apellido` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `correo` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rolId` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Usuario` table. All the data in the column will be lost.
  - The primary key for the `Venta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `metodoPagoId` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Venta` table. All the data in the column will be lost.
  - You are about to alter the column `estado` on the `Venta` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(4))`.
  - You are about to drop the `Parquadero` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[correo_usu]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cod_producto` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_detalleventa` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_venta` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio_produc` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dia_semana` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doc_identidad` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_entrada` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_salida` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_horario` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacidad_mesa` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_mesa` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_mesa` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_mesa` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_metodopago` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_producto` to the `Movimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descrip_movimineto` to the `Movimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_movimiento` to the `Movimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_producto` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre_produc` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio_produc` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presentacion_produc` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad_personas` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_mesa` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doc_identidad` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_reserva` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_reserva` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_reserva` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_rol` to the `Rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre_rol` to the `Rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_rol` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo_usu` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doc_identidad` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre_usu` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_usu` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doc_identidad` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_venta` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `DetalleVenta` DROP FOREIGN KEY `DetalleVenta_productoId_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleVenta` DROP FOREIGN KEY `DetalleVenta_ventaId_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `Movimiento` DROP FOREIGN KEY `Movimiento_productoId_fkey`;

-- DropForeignKey
ALTER TABLE `Movimiento` DROP FOREIGN KEY `Movimiento_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_mesaId_fkey`;

-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_parquaderoId_fkey`;

-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_rolId_fkey`;

-- DropForeignKey
ALTER TABLE `Venta` DROP FOREIGN KEY `Venta_metodoPagoId_fkey`;

-- DropForeignKey
ALTER TABLE `Venta` DROP FOREIGN KEY `Venta_usuarioId_fkey`;

-- DropIndex
DROP INDEX `DetalleVenta_productoId_idx` ON `DetalleVenta`;

-- DropIndex
DROP INDEX `DetalleVenta_ventaId_idx` ON `DetalleVenta`;

-- DropIndex
DROP INDEX `Horario_usuarioId_idx` ON `Horario`;

-- DropIndex
DROP INDEX `Mesa_numero_key` ON `Mesa`;

-- DropIndex
DROP INDEX `MetodoPago_tipo_key` ON `MetodoPago`;

-- DropIndex
DROP INDEX `Movimiento_productoId_idx` ON `Movimiento`;

-- DropIndex
DROP INDEX `Movimiento_usuarioId_idx` ON `Movimiento`;

-- DropIndex
DROP INDEX `Producto_nombre_idx` ON `Producto`;

-- DropIndex
DROP INDEX `Reserva_fechaReserva_idx` ON `Reserva`;

-- DropIndex
DROP INDEX `Reserva_mesaId_fkey` ON `Reserva`;

-- DropIndex
DROP INDEX `Reserva_parquaderoId_fkey` ON `Reserva`;

-- DropIndex
DROP INDEX `Reserva_usuarioId_idx` ON `Reserva`;

-- DropIndex
DROP INDEX `Rol_nombre_key` ON `Rol`;

-- DropIndex
DROP INDEX `Usuario_correo_key` ON `Usuario`;

-- DropIndex
DROP INDEX `Usuario_rolId_idx` ON `Usuario`;

-- DropIndex
DROP INDEX `Venta_metodoPagoId_idx` ON `Venta`;

-- DropIndex
DROP INDEX `Venta_usuarioId_idx` ON `Venta`;

-- AlterTable
ALTER TABLE `DetalleVenta` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `precioUnit`,
    DROP COLUMN `productoId`,
    DROP COLUMN `ventaId`,
    ADD COLUMN `cod_producto` INTEGER NOT NULL,
    ADD COLUMN `id_detalleventa` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `id_venta` INTEGER NOT NULL,
    ADD COLUMN `precio_produc` DECIMAL(10, 2) NOT NULL,
    ADD PRIMARY KEY (`id_detalleventa`);

-- AlterTable
ALTER TABLE `Horario` DROP PRIMARY KEY,
    DROP COLUMN `fecha`,
    DROP COLUMN `horaFin`,
    DROP COLUMN `horaInicio`,
    DROP COLUMN `id`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `dia_semana` ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo') NOT NULL,
    ADD COLUMN `doc_identidad` INTEGER NOT NULL,
    ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `hora_entrada` TIME(0) NOT NULL,
    ADD COLUMN `hora_salida` TIME(0) NOT NULL,
    ADD COLUMN `id_horario` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_horario`);

-- AlterTable
ALTER TABLE `Mesa` DROP PRIMARY KEY,
    DROP COLUMN `capacidad`,
    DROP COLUMN `id`,
    DROP COLUMN `numero`,
    ADD COLUMN `capacidad_mesa` INTEGER NOT NULL,
    ADD COLUMN `cod_mesa` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `estado_mesa` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `numero_mesa` INTEGER NOT NULL,
    ADD COLUMN `precio_reserva` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `tipo_mesa` ENUM('Normal', 'VIP') NOT NULL,
    ADD PRIMARY KEY (`cod_mesa`);

-- AlterTable
ALTER TABLE `MetodoPago` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `tipo`,
    ADD COLUMN `cod_metodopago` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `nombre` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`cod_metodopago`);

-- AlterTable
ALTER TABLE `Movimiento` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `id`,
    DROP COLUMN `productoId`,
    DROP COLUMN `tipo`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `cod_producto` INTEGER NOT NULL,
    ADD COLUMN `descrip_movimineto` TEXT NOT NULL,
    ADD COLUMN `fecha_registro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `id_movimiento` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `tipo_movimiento` ENUM('Entrada', 'Salida') NULL,
    ADD PRIMARY KEY (`id_movimiento`);

-- AlterTable
ALTER TABLE `Producto` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `descripcion`,
    DROP COLUMN `id`,
    DROP COLUMN `nombre`,
    DROP COLUMN `precio`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `cantidad` INTEGER NOT NULL,
    ADD COLUMN `cod_producto` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `estado_produc` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `nombre_produc` VARCHAR(100) NOT NULL,
    ADD COLUMN `precio_produc` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `presentacion_produc` VARCHAR(50) NOT NULL,
    ALTER COLUMN `stock` DROP DEFAULT,
    ADD PRIMARY KEY (`cod_producto`);

-- AlterTable
ALTER TABLE `Reserva` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `fechaReserva`,
    DROP COLUMN `id`,
    DROP COLUMN `mesaId`,
    DROP COLUMN `parquaderoId`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `cantidad_personas` INTEGER NOT NULL,
    ADD COLUMN `cod_mesa` INTEGER NOT NULL,
    ADD COLUMN `cod_parqueadero` INTEGER NULL,
    ADD COLUMN `doc_identidad` INTEGER NOT NULL,
    ADD COLUMN `estado_temporal` ENUM('Activa', 'Expirada') NOT NULL DEFAULT 'Activa',
    ADD COLUMN `fecha_expiracion` DATETIME(0) NULL,
    ADD COLUMN `fecha_reserva` DATE NOT NULL,
    ADD COLUMN `hora_reserva` TIME(0) NOT NULL,
    ADD COLUMN `id_reserva` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `incluye_cover` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `estado` ENUM('Pendiente', 'Confirmada', 'Cancelada') NOT NULL DEFAULT 'Pendiente',
    ADD PRIMARY KEY (`id_reserva`);

-- AlterTable
ALTER TABLE `Rol` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `id`,
    DROP COLUMN `nombre`,
    ADD COLUMN `cod_rol` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `descrip_rol` VARCHAR(100) NULL,
    ADD COLUMN `nombre_rol` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`cod_rol`);

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    DROP COLUMN `apellido`,
    DROP COLUMN `correo`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `id`,
    DROP COLUMN `nombre`,
    DROP COLUMN `password`,
    DROP COLUMN `rolId`,
    DROP COLUMN `telefono`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `cod_rol` INTEGER NOT NULL,
    ADD COLUMN `correo_usu` VARCHAR(100) NOT NULL,
    ADD COLUMN `doc_identidad` INTEGER NOT NULL,
    ADD COLUMN `nombre_usu` VARCHAR(100) NOT NULL,
    ADD COLUMN `password_usu` VARCHAR(255) NOT NULL,
    ADD COLUMN `telefono_usu` VARCHAR(15) NULL,
    ADD PRIMARY KEY (`doc_identidad`);

-- AlterTable
ALTER TABLE `Venta` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `id`,
    DROP COLUMN `metodoPagoId`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `cod_metodopago` INTEGER NULL,
    ADD COLUMN `doc_identidad` INTEGER NOT NULL,
    ADD COLUMN `fecha` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `id_venta` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `reserva_id` INTEGER NULL,
    MODIFY `estado` ENUM('Pendiente', 'Pagada', 'Cancelada') NOT NULL DEFAULT 'Pendiente',
    ADD PRIMARY KEY (`id_venta`);

-- DropTable
DROP TABLE `Parquadero`;

-- CreateTable
CREATE TABLE `Parqueadero` (
    `cod_parqueadero` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_par` INTEGER NOT NULL,
    `estado_par` BOOLEAN NOT NULL DEFAULT true,
    `precio_parqueadero` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,

    PRIMARY KEY (`cod_parqueadero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TokenBlacklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cancion` (
    `id_cancion` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_identidad` INTEGER NOT NULL,
    `nombre_can` TEXT NOT NULL,
    `Link_can` TEXT NOT NULL,
    `numero_fila` INTEGER NOT NULL,

    INDEX `Cancion_doc_identidad_idx`(`doc_identidad`),
    PRIMARY KEY (`id_cancion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria` (
    `id_auditoria` INTEGER NOT NULL AUTO_INCREMENT,
    `tabla_afectada` VARCHAR(50) NULL,
    `accion` ENUM('INSERT', 'UPDATE', 'DELETE') NULL,
    `usuario_afectado` INTEGER NULL,
    `fecha` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `descripcion` TEXT NULL,

    PRIMARY KEY (`id_auditoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `DetalleVenta_id_venta_idx` ON `DetalleVenta`(`id_venta`);

-- CreateIndex
CREATE INDEX `DetalleVenta_cod_producto_idx` ON `DetalleVenta`(`cod_producto`);

-- CreateIndex
CREATE INDEX `Horario_doc_identidad_idx` ON `Horario`(`doc_identidad`);

-- CreateIndex
CREATE INDEX `Movimiento_cod_producto_idx` ON `Movimiento`(`cod_producto`);

-- CreateIndex
CREATE INDEX `Reserva_doc_identidad_idx` ON `Reserva`(`doc_identidad`);

-- CreateIndex
CREATE INDEX `Reserva_cod_mesa_idx` ON `Reserva`(`cod_mesa`);

-- CreateIndex
CREATE INDEX `Reserva_cod_parqueadero_idx` ON `Reserva`(`cod_parqueadero`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_correo_usu_key` ON `Usuario`(`correo_usu`);

-- CreateIndex
CREATE INDEX `Usuario_cod_rol_idx` ON `Usuario`(`cod_rol`);

-- CreateIndex
CREATE INDEX `Venta_doc_identidad_idx` ON `Venta`(`doc_identidad`);

-- CreateIndex
CREATE INDEX `Venta_cod_metodopago_idx` ON `Venta`(`cod_metodopago`);

-- CreateIndex
CREATE INDEX `Venta_reserva_id_idx` ON `Venta`(`reserva_id`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_cod_rol_fkey` FOREIGN KEY (`cod_rol`) REFERENCES `Rol`(`cod_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_doc_identidad_fkey` FOREIGN KEY (`doc_identidad`) REFERENCES `Usuario`(`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;

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
