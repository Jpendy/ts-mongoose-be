import pool from '../utils/pool';

class User {
    id?: string;
    email: string;
    password_hash?: string;

    constructor(row: User) {
        this.id = row.id;
        this.email = row.email;
        this.password_hash = row.password_hash;
    }

    static async insert({ email, password_hash }: User): Promise<User> {
        const { rows } = await pool.query(`
            INSERT INTO users (email, password_hash) 
            VALUES ($1, $2)
            RETURNING *;
        `, [email, password_hash])

        return new User(rows[0])
    }

    static async findById(id: string): Promise<User> {
        const { rows } = await pool.query(`
        SELECT * FROM users WHERE id = $1;
        `, [id])
        if (!rows[0]) throw new Error(`No user with id ${id} found`)
        return new User(rows[0])
    }

    static async findByEmail(email: string): Promise<User> {
        const { rows } = await pool.query(`
        SELECT * FROM users WHERE email = $1;
        `, [email])

        if (!rows[0]) throw new Error(`No user with email ${email} found`)
        return new User(rows[0])
    }
}

export default User;