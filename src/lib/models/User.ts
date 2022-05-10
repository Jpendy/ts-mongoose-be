import { model, Schema, Model } from "mongoose";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export interface IUser {
    email: string;
    passwordHash: string;
    createAuthToken(): string;
}

// Static methods are type defined here
interface UserModel extends Model<IUser> {
    verifyToken(token: string): IUser;
    authorize({ email, password }: { email: string, password: string }): Promise<IUser>;
}

const userSchema = new Schema<IUser, UserModel>({
    email: {
        type: String,
        required: true,
        unique: true
    },

    passwordHash: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.passwordHash,
                delete ret.__v,
                delete ret.id;
        }
    }
});

userSchema.virtual('password').set(function (password) {
    this.passwordHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS! || 8);
});

userSchema.static('authorize', function authorize({
    email,
    password
}: {
    email: string;
    password: string
}): Promise<IUser> {
    return this.findOne({ email })
        .then((user: IUser | null) => {
            if (!user) {
                throw new Error('Wrong Email/Password');
            }
            if (!bcrypt.compareSync(password, user.passwordHash)) {
                throw new Error('Wrong Email/Password');
            }
            return user;
        });
});

userSchema.static('verifyToken', function verifyToken(token: string): IUser {
    const { sub } = jwt.verify(token, process.env.APP_SECRET);
    return this.hydrate(sub);
});

userSchema.method('createAuthToken', function createAuthToken(): string {
    return jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET, {
        expiresIn: '48h'
    });
});

export default model<IUser, UserModel>('User', userSchema)