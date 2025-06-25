import User from "../models/user.model.js";

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email }).select('+password');
};

export const findUserById = async (id) => {
    return await User.findById(id);
};

export const updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};
