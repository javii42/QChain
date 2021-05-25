const {
    UserController,
    ShiftController
} = include('controllers');

module.exports = router => {
    router.post('/login', UserController.login);
    router.post('/user/generic', UserController.register);
    router.post('/decryptBlockchainData', ShiftController.decryptBlockchainData);
    return router;
};
