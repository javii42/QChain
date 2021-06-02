const { 
    User,
    UserRol,
    Rol,
    CompanyEmployee,
    CompanySector,
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
const filter = require('lodash/filter');
const find = require('lodash/find');
class UserService extends CrudService {
    constructor() {
        super(User);
    }

    async login(user_mail, user_password) {
        try {
            const searchedUser = await this.fetchOne({ user_mail });
            if (searchedUser) {
                /*const userRole = await UserRol.findOne({user_id: searchedUser._id});
                const rol = await Rol.findOne({_id: userRole.user_role_id});*/
                if (bcrypt.compareSync(user_password, searchedUser.user_password)) {
                    delete searchedUser.user_password;
                    const token = await jsonWebToken.generateToken(searchedUser);
                    /*set(searchedUser, 'rol', rol);
                    if(rol && rol.rol_name === 'companyAdmin') {
                        const companyEmployee = await CompanyEmployee.findOne({user_id: searchedUser._id});
                        const companyId = get(companyEmployee, 'company_id');
                        set(searchedUser, 'company_id', companyId);
                    }*/
                    return {
                        token,
                        searchedUser,
                        rol: get(searchedUser, 'rol', 'Genérico')
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
            if(employees) {
                const users = await User.find({ '_id': { $in: employees } });
                if(users) {
                    const finalEmployees = filter(users, user => {
                        const parsedUser = user.toJSON();
                        return parsedUser.rol === 'sysEmployeeShift';
                    });
                    return finalEmployees;
                }
            }
            return [];
        }
    }

    async fetchEmployeesByBranchAndSector(branch_id, sector_id) {
        const branchEmployees = await this.fetchEmployees(branch_id);
        const companySector = await CompanySector.findOne({_id: sector_id});
        const cs_employees = get(companySector, 'cs_employees');
        const finalEmployees = filter(branchEmployees, employee => {
            const parsedEmployee = employee.toJSON();
            return find(cs_employees, cs_employee => {
                console.log('cs_employee === parsedEmployee._id', typeof cs_employee , typeof parsedEmployee._id)
                return cs_employee === toString(parsedEmployee._id);
            });
        });
        return finalEmployees;

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
