import bcrypt from 'bcryptjs';
import User from "../models/User";

export default class UserService {
    static async create(reqBody: { email: string; password: string; }) {
        console.log('REQBODY', reqBody)
        const password_hash = await bcrypt.hash(reqBody.password, +process.env.SALT_ROUNDS! || 7)
        const user = await User.insert({ ...reqBody, password_hash })
        return user;
    }

    static async authorize({ email, password }: { email: string; password: string }) {
        try {
            const user = await User.findByEmail(email);
            console.log(user)
            const passwordsMatch = await bcrypt.compare(password, user.password_hash!);
            if (!passwordsMatch) throw new Error('Invalid Email/Password');

            return user;
        } catch (err: any) {
            err.status = 401;
            throw err;
        }
    }
}