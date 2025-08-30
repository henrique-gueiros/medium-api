import { User } from '../models/index.js';
import bcryptjs from 'bcryptjs';
import { pick } from 'lodash'

export default class UserService {
    async createUser(user) {

        const transaction = await User.sequelize.transaction();

        try {
            user.password = await bcryptjs.hash(user.password, 10);
            const newUser = await User.create(user, { transaction });

            await transaction.commit();
            return pick(newUser, ['id', 'name', 'email', 'created_at', 'updated_at']);

        } catch (error) {
            if (transaction) transaction.rollback();
            throw error;
        }

    } 
}