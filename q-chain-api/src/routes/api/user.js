const {
    UserController,
    CompanyEmployeeController,
    CompanySectorController,
    ShiftController,
    BranchController
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
    router.post('/shift', ShiftController.register);
    router.put('/shift', ShiftController.update);
    router.get('/shift', ShiftController.fetchOneByQuery);
    router.get('/branch/:company_id', BranchController.fetchManyByParams);
    router.get('/sector/:company_id', CompanySectorController.fetchManyByParams);
    router.get('/employees/:branch_id', UserController.fetchEmployeesByBranch);
    return router;
};
