/* eslint-disable space-before-function-paren */
import fs from 'fs/promises';
import pool from '../lib/utils/pool';

export default function () {
    // eslint-disable-next-line no-undef
    return fs.readFile(`${__dirname}/../sql/setup.sql`, { encoding: 'utf-8' })
        .then(sql => pool.query(sql));
}