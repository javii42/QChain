const {
    CompanyController,
    UserController,
    CompanyEmployeeController,
    CompanySectorController,
    BranchController,
    BranchAddressController,
    AgendaController,
    ShiftController,
    ShiftTrackingController
} = include('controllers');

module.exports = router => {
    router.post('/generic', CompanyController.register, UserController.registerForCompany, CompanyEmployeeController.register);
    router.get('/generic', CompanyController.fetchOneByQuery);
    router.put('/generic', CompanyController.update);
    router.delete('/generic', CompanyController.delete);
    router.post('/sector', CompanySectorController.register);
    router.post('/branch', BranchController.register);
    router.post('/branch/address', BranchAddressController.register);
    router.post('/agenda', AgendaController.register);
    router.put('/shift', ShiftController.update);
    router.get('/shift', ShiftController.fetchOneByQuery);
    router.post('/shift/tracking', ShiftTrackingController.fetchManyByBody);
    return router;
};
