"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
// file system => es una libreria propia de nodejs para manejar archivos de tu servidor
const fs = require('fs');
// path_module => libreria propia de node para manejar archivos
const path_module = require('path');
exports.subirImagen = (req, res) => {
    try {
        let ruta = req.files.imagen.path; //img\wrAiYQ4P-ckFACDNB9TADSl6.PNG
        let nameExtension = ruta.split("\\")[1];
        sequelize_1.Imagen.build({ doc_id: req.body.doc_id, ima_url: nameExtension }).save()
            .then((objImagen) => {
            let rpta = { ok: true, content: objImagen };
            res.status(201).json(rpta);
        });
        console.log(ruta);
        //            let rpta = {result: req.files.imagen}; //json
        //            res.status(200).json(rpta);             
    }
    catch (_a) {
        let fake = { ok: false, content: 'No se ha seleccionado ningun archivo' };
        res.status(404).json(fake);
    }
};
exports.eliminarImagen = (req, res) => {
    let { id_img } = req.params;
    let url = "";
    sequelize_1.Imagen.findByPk(id_img).then((imagen) => {
        if (imagen) {
            url = imagen.ima_url;
            return sequelize_1.Imagen.destroy({ where: { ima_id: id_img } });
        }
    })
        .then((objImagen) => {
        fs.unlink(`img/${url}`, (error) => {
            if (!error) {
                let rpta = { ok: true, content: 'Imagen eliminada con exito' };
                res.status(200).json(rpta);
            }
            else {
                let fake = { ok: false, content: 'Hubo un error al eliminar la imagen' };
                res.status(500).json(fake);
            }
        });
    });
};
exports.getImagenById = (req, res) => {
    let { id_img } = req.params;
    sequelize_1.Imagen.findByPk(id_img)
        .then((objImagen) => {
        let imagenDefault = 'img/default.jpg';
        if (objImagen) {
            let ruta = `img/${objImagen.ima_url}`;
            if (fs.existsSync(ruta)) {
                return res.sendFile(path_module.resolve(ruta));
            }
            else {
                return res.sendFile(path_module.resolve(imagenDefault));
            }
        }
        else {
            return res.sendFile(path_module.resolve(imagenDefault));
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error };
        res.status(500).json(fake);
    });
};
exports.updateImagenById = (req, res) => {
    let { id_img } = req.params;
    sequelize_1.Imagen.findByPk(id_img)
        .then((objImagen) => {
        let imagenDefault = 'img/default.jpg';
        if (objImagen) {
            fs.unlink(`img/${objImagen.ima_url}`, (error) => {
                if (!error) {
                    try {
                        let ruta = req.files.imagen.path;
                        let nameExtension = ruta.split("\\")[1];
                        sequelize_1.Imagen.update({ ima_url: nameExtension }, { where: { ima_id: objImagen.ima_id } })
                            .then((objImagen) => {
                            let rpta = { ok: true, estado: 'Imagen anterior eliminada con exito', message: 'Se actualizo con exito', content: objImagen };
                            res.status(201).json(rpta);
                        });
                    }
                    catch (_a) {
                        let fake = { ok: false, content: 'No se ha seleccionado ningun archivo' };
                        res.status(404).json(fake);
                    }
                }
                else {
                    let fake = { ok: false, content: 'Hubo un error al eliminar la imagen' };
                    res.status(500).json(fake);
                }
            });
        }
        else {
            return res.sendFile(path_module.resolve(imagenDefault));
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error };
        res.status(500).json(fake);
    });
};
