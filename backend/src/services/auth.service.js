import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../dao/user.dao.js';
import { generateToken } from '../utils/helper.js';
import { ValidationError, UnauthorizedError, ConflictError } from '../utils/errorHandler.js';

export const registerUser = async (name, email, password) => {
    // Validation
    if (!name || !email || !password) {
        throw new ValidationError('Name, email, and password are required');
    }

    if (password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters long');
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const userData = {
        name,
        email,
        password: hashedPassword
    };

    const user = await createUser(userData);
    const token = generateToken(user._id);

    return { user, token };
};

export const loginUser = async (email, password) => {
    // Validation
    if (!email || !password) {
        throw new ValidationError('Email and password are required');
    }

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
        throw new UnauthorizedError('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password from user object
    user.password = undefined;

    return { user, token };
};
