"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPresupuestoProyecto = (req, res) => {
    let { objPresupuesto } = req.body;
    PostPresupuesto.build(objPresupuesto).save()
        .then((presupuesto) => { })
        .catch(() => { });
};
