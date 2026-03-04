/*
  Warnings:

  - The primary key for the `DetalleVenta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_producto` on the `DetalleVenta` table. All the data in the column will be lost.
  - You are about to drop the column `id_detalleventa` on the `DetalleVenta` table. All the data in the column will be lost.
  - You are about to drop the column `id_venta` on the `DetalleVenta` table. All the data in the column will be lost.
  - You are about to drop the column `precio_produc` on the `DetalleVenta` table. All the data in the column will be lost.
  - The primary key for the `Horario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dia_semana` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `doc_identidad` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `hora_entrada` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `hora_salida` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `id_horario` on the `Horario` table. All the data in the column will be lost.
  - The primary key for the `Mesa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `capacidad_mesa` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `cod_mesa` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `estado_mesa` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `numero_mesa` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `precio_reserva` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_mesa` on the `Mesa` table. All the data in the column will be lost.
  - The primary key for the `MetodoPago` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_metodopago` on the `MetodoPago` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `MetodoPago` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `MetodoPago` table. All the data in the column will be lost.
  - The primary key for the `Movimiento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_producto` on the `Movimiento` table. All the data in the column will be lost.
  - You are about to drop the column `descrip_movimineto` on the `Movimiento` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_registro` on the `Movimiento` table. All the data in the column will be lost.
  - You are about to drop the column `id_movimiento` on the `Movimiento` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_movimiento` on the `Movimiento` table. All the data in the column will be lost.
  - The primary key for the `Producto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cantidad` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `cod_producto` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `estado_produc` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_produc` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `precio_produc` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `presentacion_produc` on the `Producto` table. All the data in the column will be lost.
  - The primary key for the `Reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cantidad_personas` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `cod_mesa` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `cod_parqueadero` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `doc_identidad` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `estado_temporal` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_expiracion` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_reserva` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `hora_reserva` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `id_reserva` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `incluye_cover` on the `Reserva` table. All the data in the column will be lost.
  - You are about to alter the column `estado` on the `Reserva` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(8))` to `Enum(EnumId(3))`.
  - The primary key for the `Rol` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_rol` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `descrip_rol` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_rol` on the `Rol` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_rol` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `correo_usu` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `doc_identidad` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_usu` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `password_usu` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `telefono_usu` on the `Usuario` table. All the data in the column will be lost.
  - The primary key for the `Venta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_metodopago` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `doc_identidad` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `id_venta` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `reserva_id` on the `Venta` table. All the data in the column will be lost.
  - You are about to alter the column `estado` on the `Venta` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(7))` to `Enum(EnumId(2))`.
  - You are about to drop the `Auditoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cancion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parqueadero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenBlacklist` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[numero]` on the table `Mesa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tipo]` on the table `MetodoPago` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Rol` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioUnit` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productoId` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ventaId` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaFin` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaInicio` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacidad` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Movimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productoId` to the `Movimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Movimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Movimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaReserva` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rolId` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodoPagoId` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cancion` DROP FOREIGN KEY `Cancion_doc_identidad_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleVenta` DROP FOREIGN KEY `DetalleVenta_cod_producto_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleVenta` DROP FOREIGN KEY `DetalleVenta_id_venta_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_doc_identidad_fkey`;

-- DropForeignKey
ALTER TABLE `Movimiento` DROP FOREIGN KEY `Movimiento_cod_producto_fkey`;

-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_cod_mesa_fkey`;

-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_cod_parqueadero_fkey`;

-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_doc_identidad_fkey`;

-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_cod_rol_fkey`;

-- DropForeignKey
ALTER TABLE `Venta` DROP FOREIGN KEY `Venta_cod_metodopago_fkey`;

-- DropForeignKey
ALTER TABLE `Venta` DROP FOREIGN KEY `Venta_doc_identidad_fkey`;

-- DropForeignKey
ALTER TABLE `Venta` DROP FOREIGN KEY `Venta_reserva_id_fkey`;

-- DropIndex
DROP INDEX `DetalleVenta_cod_producto_idx` ON `DetalleVenta`;

-- DropIndex
DROP INDEX `DetalleVenta_id_venta_idx` ON `DetalleVenta`;

-- DropIndex
DROP INDEX `Horario_doc_identidad_idx` ON `Horario`;

-- DropIndex
DROP INDEX `Movimiento_cod_producto_idx` ON `Movimiento`;

-- DropIndex
DROP INDEX `Reserva_cod_mesa_idx` ON `Reserva`;

-- DropIndex
DROP INDEX `Reserva_cod_parqueadero_idx` ON `Reserva`;

-- DropIndex
DROP INDEX `Reserva_doc_identidad_idx` ON `Reserva`;

-- DropIndex
DROP INDEX `Usuario_cod_rol_idx` ON `Usuario`;

-- DropIndex
DROP INDEX `Usuario_correo_usu_key` ON `Usuario`;

-- DropIndex
DROP INDEX `Venta_cod_metodopago_idx` ON `Venta`;

-- DropIndex
DROP INDEX `Venta_doc_identidad_idx` ON `Venta`;

-- DropIndex
DROP INDEX `Venta_reserva_id_idx` ON `Venta`;

-- AlterTable
ALTER TABLE `DetalleVenta` DROP PRIMARY KEY,
    DROP COLUMN `cod_producto`,
    DROP COLUMN `id_detalleventa`,
    DROP COLUMN `id_venta`,
    DROP COLUMN `precio_produc`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `precioUnit` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `productoId` INTEGER NOT NULL,
    ADD COLUMN `ventaId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Horario` DROP PRIMARY KEY,
    DROP COLUMN `dia_semana`,
    DROP COLUMN `doc_identidad`,
    DROP COLUMN `estado`,
    DROP COLUMN `hora_entrada`,
    DROP COLUMN `hora_salida`,
    DROP COLUMN `id_horario`,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL,
    ADD COLUMN `horaFin` VARCHAR(191) NOT NULL,
    ADD COLUMN `horaInicio` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `usuarioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Mesa` DROP PRIMARY KEY,
    DROP COLUMN `capacidad_mesa`,
    DROP COLUMN `cod_mesa`,
    DROP COLUMN `estado_mesa`,
    DROP COLUMN `numero_mesa`,
    DROP COLUMN `precio_reserva`,
    DROP COLUMN `tipo_mesa`,
    ADD COLUMN `capacidad` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `numero` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `MetodoPago` DROP PRIMARY KEY,
    DROP COLUMN `cod_metodopago`,
    DROP COLUMN `estado`,
    DROP COLUMN `nombre`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `tipo` ENUM('EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'NEQUI', 'DAVIPLATA') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Movimiento` DROP PRIMARY KEY,
    DROP COLUMN `cod_producto`,
    DROP COLUMN `descrip_movimineto`,
    DROP COLUMN `fecha_registro`,
    DROP COLUMN `id_movimiento`,
    DROP COLUMN `tipo_movimiento`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `productoId` INTEGER NOT NULL,
    ADD COLUMN `tipo` ENUM('ENTRADA', 'SALIDA') NOT NULL,
    ADD COLUMN `usuarioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Producto` DROP PRIMARY KEY,
    DROP COLUMN `cantidad`,
    DROP COLUMN `cod_producto`,
    DROP COLUMN `estado_produc`,
    DROP COLUMN `nombre_produc`,
    DROP COLUMN `precio_produc`,
    DROP COLUMN `presentacion_produc`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `descripcion` VARCHAR(191) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `stock` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Reserva` DROP PRIMARY KEY,
    DROP COLUMN `cantidad_personas`,
    DROP COLUMN `cod_mesa`,
    DROP COLUMN `cod_parqueadero`,
    DROP COLUMN `doc_identidad`,
    DROP COLUMN `estado_temporal`,
    DROP COLUMN `fecha_expiracion`,
    DROP COLUMN `fecha_reserva`,
    DROP COLUMN `hora_reserva`,
    DROP COLUMN `id_reserva`,
    DROP COLUMN `incluye_cover`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fechaReserva` DATETIME(3) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `mesaId` INTEGER NULL,
    ADD COLUMN `parquaderoId` INTEGER NULL,
    ADD COLUMN `usuarioId` INTEGER NOT NULL,
    MODIFY `estado` ENUM('ACTIVA', 'CANCELADA', 'FINALIZADA') NOT NULL DEFAULT 'ACTIVA',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Rol` DROP PRIMARY KEY,
    DROP COLUMN `cod_rol`,
    DROP COLUMN `descrip_rol`,
    DROP COLUMN `nombre_rol`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    DROP COLUMN `cod_rol`,
    DROP COLUMN `correo_usu`,
    DROP COLUMN `doc_identidad`,
    DROP COLUMN `nombre_usu`,
    DROP COLUMN `password_usu`,
    DROP COLUMN `telefono_usu`,
    ADD COLUMN `apellido` VARCHAR(191) NOT NULL,
    ADD COLUMN `correo` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `rolId` INTEGER NOT NULL,
    ADD COLUMN `telefono` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Venta` DROP PRIMARY KEY,
    DROP COLUMN `cod_metodopago`,
    DROP COLUMN `doc_identidad`,
    DROP COLUMN `fecha`,
    DROP COLUMN `id_venta`,
    DROP COLUMN `reserva_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `metodoPagoId` INTEGER NOT NULL,
    ADD COLUMN `usuarioId` INTEGER NOT NULL,
    MODIFY `estado` ENUM('COMPLETADA', 'CANCELADA', 'ANULADA') NOT NULL DEFAULT 'COMPLETADA',
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Auditoria`;

-- DropTable
DROP TABLE `Cancion`;

-- DropTable
DROP TABLE `Parqueadero`;

-- DropTable
DROP TABLE `TokenBlacklist`;

-- CreateTable
CREATE TABLE `Parquadero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` INTEGER NOT NULL,

    UNIQUE INDEX `Parquadero_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `DetalleVenta_ventaId_idx` ON `DetalleVenta`(`ventaId`);

-- CreateIndex
CREATE INDEX `DetalleVenta_productoId_idx` ON `DetalleVenta`(`productoId`);

-- CreateIndex
CREATE INDEX `Horario_usuarioId_idx` ON `Horario`(`usuarioId`);

-- CreateIndex
CREATE UNIQUE INDEX `Mesa_numero_key` ON `Mesa`(`numero`);

-- CreateIndex
CREATE UNIQUE INDEX `MetodoPago_tipo_key` ON `MetodoPago`(`tipo`);

-- CreateIndex
CREATE INDEX `Movimiento_productoId_idx` ON `Movimiento`(`productoId`);

-- CreateIndex
CREATE INDEX `Movimiento_usuarioId_idx` ON `Movimiento`(`usuarioId`);

-- CreateIndex
CREATE INDEX `Producto_nombre_idx` ON `Producto`(`nombre`);

-- CreateIndex
CREATE INDEX `Reserva_usuarioId_idx` ON `Reserva`(`usuarioId`);

-- CreateIndex
CREATE INDEX `Reserva_fechaReserva_idx` ON `Reserva`(`fechaReserva`);

-- CreateIndex
CREATE UNIQUE INDEX `Rol_nombre_key` ON `Rol`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_correo_key` ON `Usuario`(`correo`);

-- CreateIndex
CREATE INDEX `Usuario_rolId_idx` ON `Usuario`(`rolId`);

-- CreateIndex
CREATE INDEX `Venta_usuarioId_idx` ON `Venta`(`usuarioId`);

-- CreateIndex
CREATE INDEX `Venta_metodoPagoId_idx` ON `Venta`(`metodoPagoId`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimiento` ADD CONSTRAINT `Movimiento_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimiento` ADD CONSTRAINT `Movimiento_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_metodoPagoId_fkey` FOREIGN KEY (`metodoPagoId`) REFERENCES `MetodoPago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `Venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `Mesa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_parquaderoId_fkey` FOREIGN KEY (`parquaderoId`) REFERENCES `Parquadero`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

