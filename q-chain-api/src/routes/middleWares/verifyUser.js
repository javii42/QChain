const Error = include('helpers/error');

const {UserServices} = include('services');

module.exports = async (req, res, next) => {
    const service = new UserServices();
    try {
        const result = await service.verifyUser(req.body);
        if(result.status === true) {
            return next();
        }
        return res.status(403).send(result);
    } catch (err) {
        return res.sendStatus(Error.UNAUTHORIZED);
    }
};
