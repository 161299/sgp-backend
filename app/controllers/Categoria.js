"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.postCategoria = (req, res) => {
    let { nombre, familia } = req.body;
    let objCategoria = {
        cat_nom: nombre,
        fam_id: familia
    };
    sequelize_1.Familia.findByPk(req.body.familia)
        .then((objFamilia) => {
        if (objFamilia) {
            return sequelize_1.Categoria.build(objCategoria).save();
        }
        if (!objFamilia) {
            let fake = { ok: false, content: `La familia de id ${familia} no existe en la BD` };
            res.status(400).json(fake);
        }
    })
        .then((objFamiliaC) => {
        if (objFamiliaC) {
            let rpta = { ok: true, content: objFamiliaC };
            res.status(201).json(rpta);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.getCategorias = (req, res) => {
    sequelize_1.Categoria.findAll({ include: [{ model: sequelize_1.Familia },
            //{model: Recurso, include[model:PresupuestoProyecto]} -> para sacar info de las tablas relacionadas
            { model: sequelize_1.Recurso }
        ] })
        .then((arregloCategorias) => {
        if (arregloCategorias) {
            let rpta = { ok: true, content: arregloCategorias };
            res.status(200).json(rpta);
        }
        else {
            let fake = { ok: false, content: 'No se encontro ninguna Categoria' };
            res.status(404).json(fake);
        }
    });
};
