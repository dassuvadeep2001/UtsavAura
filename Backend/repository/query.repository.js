// repositories/query.repository.js
const queryModel = require('../models/query.model');

class QueryRepository {
    async createQuery(data) {
        return await queryModel.create(data);
    }

    async getAllQueries() {
        return await queryModel.find({ isDeleted: false }).sort({ createdAt: -1 });
    }
}

module.exports = new QueryRepository();
