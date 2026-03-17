-- CreateTable
CREATE TABLE `Rol` (
    `cod_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_rol` VARCHAR(191) NOT NULL,
    `descrip_rol` VARCHAR(191) NULL,

    PRIMARY KEY (`cod_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `doc_identidad` INTEGER NOT NULL,
    `cod_rol` INTEGER NOT NULL,
    `nombre_usu` VARCHAR(191) NOT NULL,
    `telefono_usu` VARCHAR(191) NULL,
    `correo_usu` VARCHAR(191) NOT NULL,
    `password_usu` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Usuario_correo_usu_key`(`correo_usu`),
    PRIMARY KEY (`doc_identidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Horario_doc_identidad_idx` ON `Horario`(`doc_identidad`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_cod_rol_fkey` FOREIGN KEY (`cod_rol`) REFERENCES `Rol`(`cod_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_doc_identidad_fkey` FOREIGN KEY (`doc_identidad`) REFERENCES `Usuario`(`doc_identidad`) ON DELETE CASCADE ON UPDATE CASCADE;
