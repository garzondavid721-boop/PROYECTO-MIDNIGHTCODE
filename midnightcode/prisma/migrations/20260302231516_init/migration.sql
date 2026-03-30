-- CreateTable
CREATE TABLE `Horario` (
    `id_horario` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_identidad` INTEGER NOT NULL,
    `dia_semana` ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo') NOT NULL,
    `hora_entrada` VARCHAR(191) NOT NULL,
    `hora_salida` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id_horario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
