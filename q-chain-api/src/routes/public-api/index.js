const {
    UserController
} = include('controllers');

module.exports = router => {
    router.post('/login', UserController.login);
    router.post('/user/generic', UserController.register);
    return router;
};
