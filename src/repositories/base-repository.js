import Db from './db-pg.js';

export default class BaseRepository {
    constructor(tableName) {
        if (!tableName) {
            throw new Error(
                'BaseRepository necesita el nombre de una tabla.'
            );
        }

        this.tableName = tableName;
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(
            `${this.constructor.name}.getAllAsync()`
        );

        const sql = `
            SELECT *
            FROM ${this.tableName}
        `;

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