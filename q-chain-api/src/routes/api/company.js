const {
    CompanyController,
    UserController,
    CompanyEmployeeController
} = include('controllers');

module.exports = router => {
    router.post('/generic', CompanyController.register, UserController.registerForCompany, CompanyEmployeeController.register);
    router.get('/generic', CompanyController.fetchOneByQuery);
    router.put('/generic', CompanyController.update);
    router.delete('/generic', CompanyController.delete);
    return router;
};
