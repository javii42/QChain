const {
    UserController,
    CompanyEmployeeController
} = include('controllers');

const {
    verifyEmployee
} = require('../middleWares');

module.exports = router => {
    router.post('/employee', verifyEmployee, UserController.registerEmployee, CompanyEmployeeController.register);
    router.put('/generic', UserController.update);
    router.delete('/generic', UserController.delete);
    return router;
};
