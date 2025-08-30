import { User } from '../models/index.js';
import bcryptjs from 'bcryptjs';
import { pick } from 'lodash'
import jwt from 'jsonwebtoken';

export default class UserService {
    async createUser(user) {

        const transaction = await User.sequelize.transaction();

        try {

            const userExists = await User.findOne({ where: { email: user.email, is_deleted: false } });
            if (userExists) throw { status: 409, message: 'Email already in use' };


            user.password = await bcryptjs.hash(user.password, 10);
            const newUser = await User.create(user, { transaction });

            await transaction.commit();
            return pick(newUser, ['id', 'name', 'email', 'created_at', 'updated_at']);

        } catch (error) {
            if (transaction) transaction.rollback();
            throw error;
        }

    } 

    async login(email, password) {
        try{
            const user = await User.findOne({ where: { email, is_deleted: false } });

            if (!user) throw { status: 401, message: "Invalid credentials" };

            const senhaValida = await bcryptjs.compare(password, user.password);
            if (!senhaValida) throw { status: 401, message: 'Invalid credentials' };

            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

            return token;
            
        } catch (error){
            throw error;
        }

    }
}