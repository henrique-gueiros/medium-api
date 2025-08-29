import { User } from '../models/index.js';
import bcryptjs from 'bcryptjs';

export default class UserService {
    static async createUser(user) {

        const transaction = await User.sequelize.transaction();

        try {
            user.password = await bcryptjs.hash(user.password, 10);
            const newUser = await User.create(user, { transaction });

            await transaction.commit();
            return newUser;

        } catch (error) {
            if (transaction) transaction.rollback();
            throw error;
        }

    }
}