/*
  Warnings:

  - You are about to alter the column `tabla_afectada` on the `Auditoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `fecha` on the `Auditoria` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `fecha_registro` on the `Movimiento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `tipo_movimiento` on the `Movimiento` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(4))`.
  - You are about to alter the column `fecha` on the `Venta` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - The values [Anulada] on the enum `Venta_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_cod_rol_fkey`;

-- AlterTable
ALTER TABLE `Auditoria` MODIFY `tabla_afectada` VARCHAR(50) NULL,
    MODIFY `fecha` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `descripcion` TEXT NULL;

-- AlterTable
ALTER TABLE `Cancion` MODIFY `nombre_can` TEXT NOT NULL,
    MODIFY `Link_can` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Mesa` MODIFY `precio_reserva` DECIMAL(10, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `Movimiento` MODIFY `fecha_registro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `tipo_movimiento` ENUM('Entrada', 'Salida') NULL,
    MODIFY `descrip_movimineto` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Parqueadero` MODIFY `precio_parqueadero` DECIMAL(10, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `Venta` MODIFY `fecha` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `estado` ENUM('Pendiente', 'Pagada', 'Cancelada') NOT NULL DEFAULT 'Pendiente';

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_cod_rol_fkey` FOREIGN KEY (`cod_rol`) REFERENCES `Rol`(`cod_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Cancion` RENAME INDEX `Cancion_doc_identidad_fkey` TO `Cancion_doc_identidad_idx`;

-- RenameIndex
ALTER TABLE `Movimiento` RENAME INDEX `Movimiento_cod_producto_fkey` TO `Movimiento_cod_producto_idx`;

-- RenameIndex
ALTER TABLE `Reserva` RENAME INDEX `Reserva_cod_parqueadero_fkey` TO `Reserva_cod_parqueadero_idx`;

-- RenameIndex
ALTER TABLE `Venta` RENAME INDEX `Venta_cod_metodopago_fkey` TO `Venta_cod_metodopago_idx`;

-- RenameIndex
ALTER TABLE `Venta` RENAME INDEX `Venta_reserva_id_fkey` TO `Venta_reserva_id_idx`;
