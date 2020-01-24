"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.recurso_model = (conexion) => {
    const modelo = conexion.define('Recurso', {
        rec_id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        rec_nom: { type: sequelize_1.DataTypes.STRING(45), allowNull: false }
    }, {
        tableName: 't_recurso',
        timestamps: true
    });
    return modelo;
};
