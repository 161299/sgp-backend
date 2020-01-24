"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./../utils/utils");
const PresupuestoProyecto_1 = require("./../controllers/PresupuestoProyecto");
const express_1 = require("express");
exports.presupuestoproyecto_router = express_1.Router();
exports.presupuestoproyecto_router.post('/pp-varios', utils_1.wachiman, PresupuestoProyecto_1.PostPresupuestoProyecto);
exports.presupuestoproyecto_router.get('/presupuestoproyecto/proyecto/:pro_id', utils_1.wachiman, PresupuestoProyecto_1.getPresupuestoByIdProyecto);
