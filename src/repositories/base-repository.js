import Db from './db-pg.js';

export default class BaseRepository {
    constructor(tableName) {
        if (!tableName) {
            throw new Error('BaseRepository necesita el nombre de una tabla.');
        }

        /*
         * El nombre de la tabla no se puede enviar como parámetro $1.
         * Por eso comprobamos que solo tenga caracteres permitidos.
         *
         * De todas formas, tableName será definido por los repositories
         * del proyecto y nunca vendrá directamente desde el usuario.
         */
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
            throw new Error(`El nombre de tabla "${tableName}" no es válido.`);
        }

        this.tableName = tableName;
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(
            `${this.constructor.name}.getAllAsync()`
        );

        const sql = `SELECT * FROM ${this.tableName}`;

        return await this.db.queryAll(sql);
    }

    getByIdAsync = async (id) => {
        console.log(
            `${this.constructor.name}.getByIdAsync(${id})`
        );

        const sql = `
            SELECT *
            FROM ${this.tableName}
            WHERE id = $1
        `;

        return await this.db.queryOne(sql, [id]);
    }

    deleteByIdAsync = async (id) => {
        console.log(
            `${this.constructor.name}.deleteByIdAsync(${id})`
        );

        const sql = `
            DELETE FROM ${this.tableName}
            WHERE id = $1
        `;

        return await this.db.queryRowCount(sql, [id]);
    }
}