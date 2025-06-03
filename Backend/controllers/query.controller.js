// controllers/query.controller.js
const queryValidator = require('../validators/query.validator');
const queryRepository = require('../repository/query.repository');

class QueryController {
    async submitQuery(req, res) {
        try {
            const { error, value } = queryValidator.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const queryData = await queryRepository.createQuery(value);
            return res.status(201).json({ message: 'Query submitted successfully', data: queryData });

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    async getQueries(req, res) {
        try {
            const queries = await queryRepository.getAllQueries();
            return res.status(200).json({ message: 'Queries fetched successfully', data: queries });

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = new QueryController();

            