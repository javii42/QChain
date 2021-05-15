const {
    HealthInsuranceController
} = include('controllers');

module.exports = router => {
    router.post('/', HealthInsuranceController.register);
    router.put('/', HealthInsuranceController.update);
    router.delete('/', HealthInsuranceController.delete);
    return router;
};
