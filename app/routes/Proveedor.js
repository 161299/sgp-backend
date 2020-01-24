"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Proveedor_1 = require("./../controllers/Proveedor");
const express_1 = require("express");
exports.proveedor_router = express_1.Router();
exports.proveedor_router.post('/proveedor', Proveedor_1.postProveedor);
exports.proveedor_router.get('/proveedores', Proveedor_1.getProveedores);
exports.proveedor_router.get('/proveedor/:id_proveedor', Proveedor_1.getProveedorById);
exports.proveedor_router.put('/proveedor/:id_proveedor', Proveedor_1.updateProveedor);
