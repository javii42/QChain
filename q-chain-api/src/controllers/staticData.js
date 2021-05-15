class StaticData {

    static async getStaticData(req, res, next) {
        try {
            const components = include('openapi/components');

            res.send({
                swagger: {components}
            });

        } catch (err) {
            next(err);
        }
    }
}

module.exports = StaticData;
