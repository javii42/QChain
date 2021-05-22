const {
    UserController,
    CompanyEmployeeController
} = include('controllers');

const {
    verifyEmployee
} = require('../middleWares');

module.exports = router => {
    router.post('/employee', verifyEmployee, UserController.registerEmployee, CompanyEmployeeController.register);
    router.get('/employee', UserController.fetchEmployee);
    router.put('/employee', UserController.update);
    router.delete('/employee', UserController.delete);
    router.put('/generic', UserController.update);
    router.delete('/generic', UserController.delete);
    return router;
};
