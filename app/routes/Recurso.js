"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Recurso_1 = require("./../controllers/Recurso");
const express_1 = require("express");
const utils_1 = require("./../utils/utils");
exports.recurso_router = express_1.Router();
exports.recurso_router.post('/recurso', utils_1.wachiman, Recurso_1.postRecurso);
exports.recurso_router.get('/recursos', utils_1.wachiman, Recurso_1.getRecursos);
