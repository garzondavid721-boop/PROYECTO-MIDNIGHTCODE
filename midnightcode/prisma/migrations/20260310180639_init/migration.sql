/*
  Warnings:

  - A unique constraint covering the columns `[codigo_pago]` on the table `Venta` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Venta` ADD COLUMN `codigo_pago` INTEGER NULL,
    ADD COLUMN `id_caja` INTEGER NULL;

-- CreateTable
CREATE TABLE `Caja` (
    `id_caja` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_identidad` INTEGER NOT NULL,
    `monto_inicial` DECIMAL(10, 2) NOT NULL,
    `monto_final` DECIMAL(10, 2) NULL,
    `estado` ENUM('Abierta', 'Cerrada') NOT NULL DEFAULT 'Abierta',
    `fecha_apertura` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_cierre` DATETIME(3) NULL,

    PRIMARY KEY (`id_caja`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Auditoria_usuario_afectado_idx` ON `Auditoria`(`usuario_afectado`);

-- CreateIndex
CREATE UNIQUE INDEX `Venta_codigo_pago_key` ON `Venta`(`codigo_pago`);

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_id_caja_fkey` FOREIGN KEY (`id_caja`) REFERENCES `Caja`(`id_caja`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Caja` ADD CONSTRAINT `Caja_doc_identidad_fkey` FOREIGN KEY (`doc_identidad`) REFERENCES `Usuario`(`doc_identidad`) ON DELETE RESTRICT ON UPDATE CASCADE;
