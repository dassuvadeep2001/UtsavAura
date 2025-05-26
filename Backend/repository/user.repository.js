const userModel = require('../models/user.model');

class UserRepository {
    async findByEmail(email) {
        return await userModel.find({ email });
    }

    async findOneByEmail(email) {
        return await userModel.findOne({ email });
    }

    async createUser(userData) {
        return await userModel.create(userData);
    }

    async findById(id) {
        return await userModel.findById(id);
    }

    async updateByEmail(email, update) {
        return await userModel.updateOne({ email }, update);
    }

    async updateById(id, update) {
        return await userModel.updateOne({ _id: id }, update);
    }

    async getPublicProfileById(id) {
        return await userModel.findById(id).select("-password -createdAt -updatedAt -__v -isDeleted -_id -otp");
    }

    async hashPassword(password) {
        return await new userModel().generateHash(password);
    }

    async validatePassword(plainPassword, hashedPassword) {
        return await new userModel().validatePassword(plainPassword, hashedPassword);
    }
}

module.exports = new UserRepository();
