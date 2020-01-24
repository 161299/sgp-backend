"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.postDocumento = (req, res) => {
    let { tipo, total, observaciones, fecha, idproveedor } = req.body;
    let objDocumento = {
        doc_tipo: tipo,
        doc_total: total,
        doc_obs: observaciones,
        doc_fech: fecha,
        prov_id: idproveedor
    };
    sequelize_1.Proveedor.findByPk(idproveedor)
        .then((proveedor) => {
        if (proveedor) {
            sequelize_1.Documento.build(objDocumento).save()
                .then((createDocumento) => {
                let rpta = { ok: true, content: createDocumento };
                res.status(201).json(rpta);
            })
                .catch((error) => {
                let fake = { ok: false, content: error };
                res.status(500).json(fake);
            });
        }
        else {
            let fake = { ok: false, content: `no existe el ${idproveedor} ingresado` };
            return res.status(404).json(fake);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error };
        res.status(500).json(fake);
    });
};
exports.getDocumento = (req, res) => {
    let { id_documento } = req.params;
    sequelize_1.Documento.findByPk(id_documento)
        .then((objDocumento) => {
        if (objDocumento) {
            let rpta = { ok: true, content: objDocumento };
            res.status(200).json(rpta);
        }
        else {
            let fake = { ok: false, content: 'No hay ningun documento' };
            res.status(404).json(fake);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error };
        res.status(500).json(fake);
    });
};
