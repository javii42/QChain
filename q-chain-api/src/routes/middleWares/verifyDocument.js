const Error = include('helpers/error');

const {DuplicatedRequestServices} = include('services');
const { registerStatus } = include('enums');

module.exports = (req, res, next) => {
    const service = new DuplicatedRequestServices();
    try {
        const result = service.verifyDocument(req.body);
        if(result) {
            switch (result) {
                case 'VALID':
                    return next();

                case 'INVALID_TYPE':
                    return res.status(403).send(registerStatus.invalidDocumentType);

                case 'TYPE_OR_ID_NULL':
                    return res.status(403).send(registerStatus.invalidDocumentId);
            }
            return next();
        }
        return res.status(403);
    } catch (err) {
        return res.sendStatus(Error.UNAUTHORIZED);
    }
};
