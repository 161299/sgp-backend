"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.RegistrarUsuario = (req, res) => {
    sequelize_1.Usuario.findAll({ where: { usu_email: req.body.usu_email } })
        .then((usuarios) => {
        if (usuarios.length != 0) {
            let rpta = { ok: false, content: `El usuario con email ${req.body.usu_email} ya existe!` };
            res.status(204).json(rpta);
        }
        else {
            let objUsuario = sequelize_1.Usuario.build(req.body);
            objUsuario.setSaltAndHash(req.body.password);
            objUsuario.save()
                .then((usuarioCreado) => {
                let token = objUsuario.generarJWT();
                let rpta = { ok: true, content: `Usuario ${usuarioCreado.usu_email} creado con exito`, token: token };
                res.status(201).json(rpta);
            })
                .catch((error) => {
                res.status(500).json({
                    ok: false,
                    error: error
                });
            });
        }
    });
};
exports.login = (req, res) => {
    let { correo, password } = req.body;
    sequelize_1.Usuario.findOne({ where: { usu_email: correo } })
        .then((objUsuario) => {
        if (objUsuario) {
            let validacion = objUsuario.validarPassword(password);
            if (validacion) {
                let token = objUsuario.generarJWT();
                let rpta = { ok: true, token: token, content: 'Usuario correctamente logeado' };
                res.status(200).json(rpta);
            }
            else {
                let fake = { ok: false, content: 'Usuario o contraseña incorrectos' };
                res.status(404).json(fake);
            }
        }
        else {
            let fake = { ok: false, content: 'Usuario no registrado' };
            res.status(404).json(fake);
        }
    });
};
exports.getUsuarios = (req, res) => {
    sequelize_1.Usuario.findAll()
        .then((arrayUsuarios) => {
        res.status(200).json({
            ok: true,
            content: arrayUsuarios
        });
    })
        .catch((error) => {
        res.status(500).json({
            ok: false,
            content: error
        });
    });
};
