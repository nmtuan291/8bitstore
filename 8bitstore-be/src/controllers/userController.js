import User from '../models/User.js';
import bcrypt from 'bcrypt';
import JwtProvider from '../providers/JwtProvider.js';
import ms from 'ms';

const userController = {};

userController.signUp = async (req, res) => {
    const { email, fullName, address, phoneNumber, password, confirmPassword } = req.body;

    if (!email || !fullName || !address || !phoneNumber || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields must be filled'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email format is not correct'})
    }

    if (!passwordPattern.test(password)) {
        return res.status(400).json({ message: 'Wrong password format'})
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password does not match'});
    }

    const duplicatedUser = await User.findById(email);

    if (duplicatedUser) {
        return res.status(409).json({ message: 'User already exists'});
    } 

    // hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
        _id: email,
        password: passwordHash,
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        role: 'user'
    })

    await newUser.save();

    return res.status(201).json({ message: 'Sign up successfully'});
    
};

userController.login = async (req, res) => {
    try {
        const { email , password, sessionCookie } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields must be filled'});
        }
        
        const user = await User.findById(email);
        if (!user) {
            return res.status(404).json({ message: 'User does not exists'});
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Password is incorrect'});
        }
        
        const userInfo = {
            userId: user._id,
        }

        // Generate access token for user
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            process.env.ACCESS_TOKEN_SECRET_KEY,
            '30m'
        )

        // Generate refresh token for user
        const refreshToken = await JwtProvider.generateToken(
            userInfo,
            process.env.REFRESH_TOKEN_SECRET_KEY,
            '7 days'
        )

        const cookieSetting = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        }

        if (sessionCookie === false) {
            cookieSetting.maxAge = ms('7 days');
        }

        // Store the tokens in cookie
        res.cookie('access_token', accessToken, cookieSetting);

        res.cookie('refresh_token', refreshToken, { 
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: ms('7 days')
        });

        res.status(200).json(user);
        
    } catch (error) {
        throw new Error(error);
    }
}

export default userController;