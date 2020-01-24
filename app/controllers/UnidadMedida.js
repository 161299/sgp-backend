"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.postUnidadMedida = (req, res) => {
    let { nombre, abreviatura } = req.body;
    let objUnidadMedida = {
        um_nom: nombre,
        um_abr: abreviatura
    };
    sequelize_1.UnidadMedida.build(objUnidadMedida).save()
        .then((unidadMedidaCreado) => {
        let rpta = { ok: true, content: unidadMedidaCreado };
        res.status(201).json(rpta);
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.getUnidadMedidas = (req, res) => {
    sequelize_1.UnidadMedida.findAll()
        .then((arregloUnidadMedida) => {
        if (arregloUnidadMedida) {
            let rpta = { ok: true, content: arregloUnidadMedida };
            res.status(201).json(rpta);
        }
        else {
            let fake = { ok: false, content: 'No hay ninguna Unidad de medida' };
            res.status(404).json(fake);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.getUnidadMedidaByNombre = (req, res) => {
    let { nombre } = req.params;
    sequelize_1.UnidadMedida.findAll({ where: { um_nom: nombre } })
        .then((objUnidadMedida) => {
        if (objUnidadMedida) {
            let rpta = { ok: true, content: objUnidadMedida };
            res.status(200).json(rpta);
        }
    });
    if ({ where: { um_nom: nombre } }) {
        res.status(404).json({ message: 'No existe ese nombre de Unidad de medida' });
    }
};
