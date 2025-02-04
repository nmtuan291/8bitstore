import JWT from 'jsonwebtoken';

const generateToken = async (userInfo, secretKey, tokenLife) => {
    try {
        return JWT.sign(userInfo, secretKey, { algorithm: 'HS256', expiresIn: tokenLife });
    } catch (error) {
        throw new Error(error);
    }
};

const verifyToken = async (token, secretKey) => {
    try {
        return JWT.verify(token, secretKey);
    } catch (error) {
        throw new Error(error);
    }
};

const JwtProvider = {
    generateToken,
    verifyToken
}

export default JwtProvider;