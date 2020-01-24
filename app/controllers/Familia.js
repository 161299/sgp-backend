"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.postFamilia = (req, res) => {
    let { nombre } = req.body;
    let objFamilia = { fam_nom: nombre };
    sequelize_1.Familia.build(objFamilia).save()
        .then((familiaCreada) => {
        if (familiaCreada) {
            let rpta = { ok: true, content: familiaCreada };
            res.status(201).json(rpta);
        }
        else {
            let fake = { ok: false, content: 'No se pudo crear el recurso' };
            res.status(204).json(fake);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.getFamilias = (req, res) => {
    sequelize_1.Familia.findAll()
        .then((arregloFamilias) => {
        let rpta = { ok: true, content: arregloFamilias };
        res.status(200).json(rpta);
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
