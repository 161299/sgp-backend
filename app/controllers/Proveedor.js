"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.postProveedor = (req, res) => {
    let { razonSocial, ruc } = req.body;
    let objProveedor = {
        prov_rz: razonSocial,
        prov_ruc: ruc
    };
    sequelize_1.Proveedor.findAll({ where: { prov_ruc: ruc } })
        .then((ruc) => {
        if (ruc.length != 0) {
            let fake = { ok: false, content: 'Ya hay ese provedor registrado con ese RUC' };
            return res.status(500).json(fake);
        }
        else {
            sequelize_1.Proveedor.build(objProveedor).save()
                .then((createProveedor) => {
                if (createProveedor) {
                    let rpta = { ok: true, content: createProveedor };
                    res.status(201).json(rpta);
                }
            })
                .catch((error) => {
                let fake = { ok: false, content: error.errors };
                res.status(500).json(fake);
            });
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.getProveedorById = (req, res) => {
    let { id_proveedor } = req.params;
    sequelize_1.Proveedor.findByPk(id_proveedor)
        .then((objProveedor) => {
        if (objProveedor) {
            let rpta = { ok: true, content: objProveedor };
            res.status(200).json(rpta);
        }
        else {
            let fake = { ok: false, content: 'Error al buscar Proveedor, no existe ese Id' };
            res.status(404).json(fake);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(400).json(fake);
    });
};
exports.getProveedores = (req, res) => {
    sequelize_1.Proveedor.findAll(req.body)
        .then((objProveedor) => {
        if (objProveedor) {
            let rpta = { ok: true, content: objProveedor };
            res.status(200).json(rpta);
        }
        else {
            let fake = { ok: false, content: 'No existe ningun Proveedor' };
            res.status(404).json(fake);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(400).json(fake);
    });
};
exports.updateProveedor = (req, res) => {
    let { id_proveedor } = req.params;
    let { razonSocial } = req.body;
    let objProveedor = {
        prov_rz: razonSocial,
    };
    sequelize_1.Proveedor.update(objProveedor, { where: { prov_id: id_proveedor } })
        .then((proveedorUpdate) => {
        let rpta = { ok: true, content: proveedorUpdate };
        res.status(201).json(rpta);
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
