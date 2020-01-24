"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Imagen_1 = require("./../controllers/Imagen");
const express_1 = require("express");
const Imagen_2 = require("../controllers/Imagen");
exports.imagen_router = express_1.Router();
let multiParty = require('connect-multiparty'); //sube archivos a nuestra carpeta master img
let multiPartyMiddLeware = multiParty({ uploadDir: './img' });
exports.imagen_router.post('/imagen/upload', multiPartyMiddLeware, Imagen_2.subirImagen);
exports.imagen_router.delete('/imagen/:id_img', Imagen_1.eliminarImagen);
exports.imagen_router.get('/imagen/:id_img', Imagen_1.getImagenById);
exports.imagen_router.put('/imagen/:id_img', multiPartyMiddLeware, Imagen_1.updateImagenById);
//body -> form-data  /key =imagen /value -> insertamos un file 
// "result": {
//                     "fieldName": "imagen",
//                     "originalFilename": "Captura.PNG",
//                     "path": "img\\wrAiYQ4P-ckFACDNB9TADSl6.PNG",
//                     "headers": {
//                         "content-disposition": "form-data; name=\"imagen\"; filename=\"Captura.PNG\"",
//                         "content-type": "image/png"
//                     },
//                     "size": 60428,
//                     "name": "Captura.PNG",
//                     "type": "image/png"
//                 }
