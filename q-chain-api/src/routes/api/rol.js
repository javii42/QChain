const {
    RolController
} = include('controllers');

module.exports = router => {
    router.post('/', RolController.register);
    router.put('/', RolController.update);
    router.delete('/', RolController.delete);
    return router;
};
