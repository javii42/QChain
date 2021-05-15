const { User, UserRol, Rol } = include('models');
const CrudService = require('./crud');

const bcrypt = require('bcryptjs');
const jsonWebToken = include('helpers/jsonWebToken');
const isEmpty = require('lodash/isEmpty');
const has = require('lodash/has');

class UserService extends CrudService {
    constructor() {
        super(User);
    }

    async login(user_mail, user_password) {
        try {
            const searchedUser = await this.fetchOne({ user_mail });
            if (searchedUser) {
                const userRole = await UserRol.findOne({user_id: searchedUser._id});
                const rol = await Rol.findOne({_id: userRole.user_role_id});
                if (bcrypt.compareSync(user_password, searchedUser.user_password)) {
                    delete searchedUser.user_password;
                    const token = await jsonWebToken.generateToken(searchedUser);
                    return {
                        token,
                        searchedUser,
                        rol
                    };
                }
            }
            return { status: 'Error' };
        } catch(err) {
            console.log('err', err);
        }
    }

    async saveOne(params, object) {
        if(has(object, 'user_password')) {
            const hashedPassword = await bcrypt.hash(object.user_password, 16);
            if(hashedPassword) {
                object.user_password = hashedPassword;
            }
        }
        if (isEmpty(params)) {
            return this._model.create(object);
        }

        await this._model
            .updateOne(params || { _id: object._id }, object, { upsert: true })
            .lean()
            .exec();

        return this._model.findOne(params || { _id: object._id });
    }

}

module.exports = UserService;
