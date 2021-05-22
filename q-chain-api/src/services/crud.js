'use strict';
const ceil = require('lodash/ceil');
const isEmpty = require('lodash/isEmpty');
const map = require('lodash/map');
const toNumber = require('lodash/toNumber');

module.exports = class Common {
    constructor(model) {
        /**
         * @var {mongoose.model}
         */
        this._model = model;
        this.fetch = this.fetch.bind(this);
        this.getPagination = this.getPagination.bind(this);
        this.fetchOne = this.fetchOne.bind(this);
        this.saveOne = this.saveOne.bind(this);
        this.saveMany = this.saveMany.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteMany = this.deleteMany.bind(this);
        this.copy = this.copy.bind(this);
    }

    /**
     * Filters to find the wanted results
     * it will return an array of objects
     * @param {Object} filters
     * @returns {Array<Object>}
     */
    fetch(filters, skip, size) {
        if (skip !== undefined) {
            return this._model
                .find(filters)
                .skip(skip * size || 0)
                .limit(size)
                .lean()
                .exec();
        }
        return this._model.find(filters).lean().exec();
    }

    async getPagination(filters, size) {
        /**
         * @type {mongoose.model}
         */
        const total = await this._model.countDocuments(filters).exec();
        return {
            total,
            size: ceil(total / size)
        };
    }

    /**
     * Filters to find the wanted result
     * it will return only one result
     * @param {Object} filters
     * @returns {Object}
     */
    async fetchOne(filters) {
        return this._model.findOne(filters).lean().exec();
    }

    async copy({_id}) {
        const previous = await this._model.findById(toNumber(_id)).lean().exec();
        if (previous) {
            delete previous._id;
            previous.isCopy = true;
            return this._model.create(previous);
        }

    }

    /**
     * params to find the object to be updated
     * object the values of the objects to update
     * will create by default if object its undefined
     * return false if fail, object that where update on success
     * @param {Object} params
     * @param {Object} object
     * @returns {Bool|Object}
     */
    async saveOne(params, object) {
        if (isEmpty(params)) {
            return this._model.create(object);
        }

        await this._model
            .updateOne(params || { _id: object._id }, object, { upsert: true })
            .lean()
            .exec();

        return this._model.findOne(params || { _id: object._id });
    }

    /**
     * object the values of the objects to update
     * will create by default if object its undefined
     * return false if fail, array of object that where updated on success
     * @param {Array<Object>} objects
     * @returns {Bool|Object}
     */
    saveMany(objects) {
        return Promise.all(
            map(objects, obj =>
                this._model
                    .updateOne({ _id: obj._id }, obj, { upsert: true })
                    .lean()
                    .exec()
            )
        );
    }

    /**
     * params to find the object to be deleted
     * return boolean
     * @param {Object} params
     * @returns {Bool}
     */
    deleteOne({_id}) {
        return this._model.deleteOne({ _id }).lean().exec();
    }

    /**
     * objects to be deleted
     * return array of boolean
     * @param {Array<Object>} objects
     * @returns {Array<Bool>}
     */
    deleteMany(objects) {
        return Promise.all(
            map(objects, obj =>
                this._model.deleteOne({ _id: obj._id }).lean().exec()
            )
        );
    }
};
