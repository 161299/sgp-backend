"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.getProyectos = (req, res) => {
    sequelize_1.Proyecto.findAll()
        .then((arregloProyectos) => {
        let rpta = { ok: true, content: arregloProyectos };
        res.json(rpta);
    })
        .catch((error) => {
        console.log(error);
    });
};
exports.postProyecto = (req, res) => {
    let { nombre, fecha_inicio, fecha_fin, presupuesto, estado } = req.body;
    let objProyecto = { pro_nom: nombre,
        pro_fechin: fecha_inicio,
        pro_fechfin: fecha_fin,
        pro_pres: presupuesto,
        pro_est: estado
    };
    sequelize_1.Proyecto.build(objProyecto).save()
        .then((proyectoCreado) => {
        let rpta = { ok: true, content: proyectoCreado };
        res.status(201).json(rpta);
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.updateProyecto = (req, res) => {
    let { id_proyecto } = req.params;
    let { nombre, fecha_inicio, fecha_fin, presupuesto, estado } = req.body;
    let objProyecto = { pro_nom: nombre,
        pro_fechin: fecha_inicio,
        pro_fechfin: fecha_fin,
        pro_pres: presupuesto,
        pro_est: estado
    };
    sequelize_1.Proyecto.update(objProyecto, { where: { pro_id: id_proyecto } })
        .then((proyectoUpdate) => {
        let rpta = { ok: true, content: proyectoUpdate };
        res.status(201).json(rpta);
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.deleteProyecto = (req, res) => {
    let { id_proyecto } = req.params;
    sequelize_1.Proyecto.destroy({ where: { pro_id: id_proyecto } })
        .then((proyectoEliminado) => {
        let rpta = { ok: true, content: proyectoEliminado };
        res.status(200).json(rpta);
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.getProyectoById = (req, res) => {
    const { id_proyecto } = req.params;
    sequelize_1.Proyecto.findByPk(id_proyecto)
        .then((objProyecto) => {
        if (objProyecto) {
            let rpta = { ok: true, content: objProyecto };
            res.status(200).json(rpta);
        }
        else {
            let fake = { ok: false, message: 'No hay un proyecto con ese id' };
            res.status(404).json(fake);
        }
    });
};
