"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./../utils/utils");
const Usuario_1 = require("./../controllers/Usuario");
const express_1 = require("express");
exports.usuario_router = express_1.Router();
exports.usuario_router.post('/registro', Usuario_1.RegistrarUsuario);
exports.usuario_router.post('/login', Usuario_1.login);
exports.usuario_router.get('/usuarios', utils_1.wachiman, Usuario_1.getUsuarios);
