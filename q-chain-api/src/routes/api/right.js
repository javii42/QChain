const {
    RightController
} = include('controllers');

module.exports = router => {
    router.post('/', RightController.register);
    router.put('/', RightController.update);
    router.delete('/', RightController.delete);
    return router;
};
