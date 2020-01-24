"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
//valida la token enviada de acuerdo a su password y algotirmo, si todo es correctom retorna un true y si algo esta mal, como su tiempo de vida, contraseña, algoritmo o longitud de la toke, retorna un false
exports.verificarToken = (token) => {
    try {
        let data = jwt.verify(token, 'sapeee', { algorithm: 'RS256' });
        return data;
    }
    catch (error) {
        return false;
    }
    ;
};
exports.wachiman = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        console.log(token);
        let rpta = exports.verificarToken(token);
        console.log(rpta);
        if (rpta) {
            next();
        }
        else {
            let fake = { ok: false, content: 'No esta autorizado para realizar la solicitud' };
            res.status(401).json(fake);
        }
        ;
    }
    else {
        let fake = { ok: false, content: 'Necesita un token para realizar la solicitud' };
        res.status(401).json(fake);
    }
    ;
};
