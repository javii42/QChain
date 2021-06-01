const { 
    User,
    UserRol,
    Rol,
    CompanyEmployee,
    Branch
} = include('models');
const CrudService = require('./crud');
const {Types: {ObjectId}} = require('mongoose');

const bcrypt = require('bcryptjs');
const jsonWebToken = include('helpers/jsonWebToken');
const isEmpty = require('lodash/isEmpty');
const has = require('lodash/has');
const set = require('lodash/set');
const get = require('lodash/get');
const toString = require('lodash/toString');
const map = require('lodash/map');

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
                    set(searchedUser, 'rol', rol);
                    if(rol && rol.rol_name === 'companyAdmin') {
                        const companyEmployee = await CompanyEmployee.findOne({user_id: searchedUser._id});
                        const companyId = get(companyEmployee, 'company_id');
                        set(searchedUser, 'company_id', companyId);
                    }
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

    async fetchEmployees(branch_id) {
        const branch = await Branch.findOne({_id: branch_id});
        if(branch) {
            const employees = get(branch, 'branch_employees');

            const roleForEmployeeWithShift = await Rol.find({rol_name: 'sysEmployeeShift'});
            const role_id = get(roleForEmployeeWithShift, '_id');

            if(role_id) {
                const employeesWithRole = await UserRol.find({role_id});
                const finalEmployees = forEach(employees)
            }



            return await User.find({ '_id': { $in: employees } });
        }
    }

    async fetchEmployeesByBranchAndSector(branch_id, sector_id) {
        const branch = await Branch.findOne({_id: branch_id});
        if(branch) {
            const employees = map(get(branch, 'branch_employees'), be => toString(be));
            return await User.find({ '_id': { $in: employees } });
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
