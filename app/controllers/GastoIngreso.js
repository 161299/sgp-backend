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
let registrarGasto = (objDocumento, objGastoIngreso, arrDocumentoDetalle) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_1.conexion.transaction();
    try {
        if (objGastoIngreso.gasin_crit == 'gasto') {
            let documentoCreado = yield sequelize_1.Documento.create(objDocumento, { transaction: t });
            let doc_id = documentoCreado.doc_id;
            objGastoIngreso.doc_id = doc_id;
            yield sequelize_1.GastoIngreso.create(objGastoIngreso, { transaction: t });
            for (let i = 0; i < arrDocumentoDetalle.length; i++) {
                arrDocumentoDetalle[i].doc_id = doc_id;
                yield sequelize_1.DocumentoDetalle.create(arrDocumentoDetalle[i], { transaction: t });
            }
            yield t.commit();
            return true;
        }
        if (objGastoIngreso.gasin_crit == 'ingreso') {
            let documentoCreado = yield sequelize_1.Documento.create(objDocumento, { transaction: t });
            let doc_id = documentoCreado.doc_id;
            objGastoIngreso.doc_id = doc_id;
            yield sequelize_1.GastoIngreso.create(objGastoIngreso, { transaction: t });
        }
        yield t.commit();
        return true;
    }
    catch (error) {
        console.log('error en la transacción');
        console.log(error);
        t.rollback();
        throw error;
    }
});
exports.postTransaccion = (req, res) => {
    let { objDocumento, objGastoIngreso, arrDocumentoDetalle } = req.body;
    registrarGasto(objDocumento, objGastoIngreso, arrDocumentoDetalle)
        .then((rpta) => {
        res.status(201).json({
            ok: true,
            message: 'se ha Realizado la Transacción exitosamente'
        });
    })
        .catch((error) => {
        res.status(500).json({
            ok: false,
            content: error,
            message: 'El servidor está fallando'
        });
    });
};
// export const postGastoIngreso = (req: Request, res: Response) => {
//   let { fecha, crit, usuario, documento } = req.body;
//   let objGastoIngreso = {
//                           gasin_fech: fecha,
//                           gasin_crit: crit,
//                           usu_id: usuario,
//                           doc_id: documento
//                         };
//   //        GastoIngreso.build(objGastoIngreso)
//   Usuario.findByPk(usuario)
//     .then((usuarios: any) => {
//       if (usuarios) {
//         Documento.findByPk(documento).then((documentos: any) => {
//           if (documentos) {
//             GastoIngreso.build(objGastoIngreso)
//               .save()
//               .then((objGastoIngreso: any) => {
//                 let rpta = { ok: true, content: objGastoIngreso };
//                 res.status(201).json(rpta);
//               })
//               .catch((error: any) => {
//                 let fake = { ok: false, content: error };
//                 res.status(500).json(fake);
//               });
//           } else {
//             let fake = {
//               ok: false,
//               content: `no hay ese documento en la base de datos`
//             };
//             res.status(404).json(fake);
//           }
//         });
//       } else {
//         let fake = { ok: false, content: `no hay ese usuario en la base de datos` };
//         res.status(404).json(fake);
//       }
//     })
//     .catch((error: any) => {
//       let fake = { ok: false, content: error };
//       res.status(500).json(fake);
//     });
// };
exports.getGastoIngresoByPk = (req, res) => {
    let { id_gastoingreso } = req.params;
    sequelize_1.GastoIngreso.findByPk(id_gastoingreso, { include: [{ model: sequelize_1.Documento, attributes: ["doc_total"] }] })
        .then((objGastoIngreso) => {
        if (objGastoIngreso) {
            let rpta = { ok: true, content: objGastoIngreso };
            res.status(200).json(rpta);
        }
        else {
            let fake = { ok: false, content: `Error al buscar gastoingreso, el ${id_gastoingreso} ingresado no existe` };
            res.status(404).json(fake);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error.errors };
        res.status(500).json(fake);
    });
};
exports.updateGastoIngresoByPk = (req, res) => {
    let { id_gastoingreso } = req.params;
    let { fecha, crit, usuario, documento } = req.body;
    let objGastoIngreso = {
        gasin_fech: fecha,
        gasin_crit: crit,
        usu_id: usuario,
        doc_id: documento
    };
    console.log(id_gastoingreso);
    sequelize_1.Usuario.findByPk(usuario)
        .then((usuarios) => {
        if (usuarios) {
            sequelize_1.Documento.findByPk(documento).then((documentos) => {
                if (documentos) {
                    sequelize_1.GastoIngreso.update(objGastoIngreso, { where: { gasin_id: id_gastoingreso } })
                        .then((GastoIngresoUpdate) => {
                        let rpta = { ok: true, message: 'valido', content: GastoIngresoUpdate };
                        res.status(201).json(rpta);
                    })
                        .catch((error) => {
                        let fake = { ok: false, content: error };
                        res.status(500).json(fake);
                    });
                }
                else {
                    let fake = { ok: false, content: `El ${documento} ingresado no existe` };
                    res.status(404).json(fake);
                }
            });
        }
        else {
            let fake = { ok: false, content: `El ${usuarios} ingresado no existe` };
            res.status(404).json(fake);
        }
    })
        .catch((error) => {
        let fake = { ok: false, content: error };
        res.status(500).json(fake);
    });
};
