const {
    CompanyTypeController
} = include('controllers');

module.exports = router => {
    router.post('/', CompanyTypeController.register);
    router.put('/', CompanyTypeController.update);
    router.delete('/', CompanyTypeController.delete);
    return router;
};
