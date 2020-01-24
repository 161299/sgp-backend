"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.postRecurso = (req, res) => {
    let { nombre, categoria } = req.body;
    let objRecurso = {
        rec_nom: nombre,
        cat_id: categoria
    };
    sequelize_1.Recurso.build(objRecurso)
        .save()
        .then((recursoCreado) => {
        let rpta = { ok: true, content: recursoCreado };
        res.status(201).json(rpta);
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.getRecursos = (req, res) => {
    sequelize_1.Recurso.findAll()
        .then((arrayRecursos) => {
        res.status(200).json({
            ok: true, content: arrayRecursos
        });
    })
        .catch((error) => {
        res.status(500).json({
            ok: false, content: 'Server internal Error'
        });
    });
};
