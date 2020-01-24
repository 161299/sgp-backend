"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
// trnasacciones para recibir mas de un objeto en si un arreglo de objetos
let crearPresupuestos = (arrayPresupuestos) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_1.conexion.transaction();
    try {
        for (let i = 0; i < arrayPresupuestos.length; i++) {
            yield sequelize_1.PresupuestoProyecto.create(arrayPresupuestos[i], { transaction: t });
        }
        yield t.commit();
        return true;
    }
    catch (error) {
        console.log("error en la transacción");
        console.log(error);
        t.rollback();
        throw error;
    }
});
exports.PostPresupuestoProyecto = (req, res) => {
    console.log(req.body);
    crearPresupuestos(req.body)
        .then((rpta) => {
        console.log(rpta);
        res.status(201).json({
            ok: true,
            message: "Presupuestos creados de manera Exitosa"
        });
    })
        .catch((error) => {
        res.status(500).json({
            ok: false,
            content: error,
            message: "Error al crear el presupuesto"
        });
    });
};
exports.getPresupuestoByIdProyecto = (req, res) => {
    let { pro_id } = req.params;
    sequelize_1.PresupuestoProyecto.findAll({
        where: { pro_id: pro_id },
        include: [{ model: sequelize_1.Recurso }, { model: sequelize_1.UnidadMedida }]
    })
        .then((rpta) => {
        res.status(200).json({
            ok: true,
            content: rpta
        });
    })
        .catch((error) => {
        res.status(500).json({
            ok: false,
            content: error
        });
    });
};
