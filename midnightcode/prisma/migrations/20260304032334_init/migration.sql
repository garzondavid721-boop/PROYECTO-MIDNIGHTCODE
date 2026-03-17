-- AlterTable
ALTER TABLE `Reserva` ADD COLUMN `estado_temporal` ENUM('Activa', 'Expirada') NOT NULL DEFAULT 'Activa',
    ADD COLUMN `fecha_expiracion` DATETIME(0) NULL;
