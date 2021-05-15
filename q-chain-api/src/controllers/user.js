const CrudController = require('./crud');
const {Types: {ObjectId}} = require('mongoose');

const {
    UserService,
    RolService,
    UserRolService
} = include('services');

const generateUserRole = async (
    rol_name,
    _id
) => {
    const rolService = new RolService();
    const roleToAssign = await rolService.fetchOne({rol_name});
    const useRolService = new UserRolService();
    await useRolService.saveOne(
        {
            _id: ObjectId()
        },
        {
          user_id: _id,
          user_role_id: roleToAssign._id,
          user_role_active: true  
        }
    );
}

class UserController extends CrudController {
    constructor() {
        const service = new UserService();
        super(service);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.registerForCompany = this.registerForCompany.bind(this);
        this.registerEmployee = this.registerEmployee.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async login(req, res, next) {
        try {
            const {
                user_mail,
                user_password
            } = req.body;
            const result = await this._service.login(user_mail, user_password);
            res.send(result);
        } catch(err) {
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            const _id = ObjectId();
            const result = await this._service.saveOne({_id}, req.body);
            await generateUserRole('Genérico', _id);
            res.send(result);
        } catch(err) {
            next(err);
        }
    }

    async registerEmployee(req, res, next) {
        try {
            const _id = ObjectId();
            console.log('this', this);
            const result = await this._service.saveOne({_id}, req.body);
            await generateUserRole('Empleado', _id);
            req.result = {
                user_id: _id,
                company_id: req.body.company_id
            }
            next();
        } catch(err) {
            next(err);
        }
    }

    async registerForCompany(req, res, next) {
        try {
            const _id = ObjectId();
            await this._service.saveOne({_id}, req.user);
            await generateUserRole('Administrador', _id);
            req.result = {
                user_id: _id,
                company_id: req.user.company_id
            }
            next();
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const {
                _id,
                ...props
            } = req.body;
            const result = await this._service.saveOne({_id}, props);
            res.send(result);
        } catch(err) {
            next(err);
        }
    }

    async updateRol(req, res, next) {
        try {
            const result = await this._service.saveOne({_id}, req.params);
            res.send(result);
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const result = await this._service.deleteOne(req.body);
            res.send(result);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new UserController();
