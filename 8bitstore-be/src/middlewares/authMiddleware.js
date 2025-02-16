import JwtProvider from '../providers/JwtProvider.js'

const isAuthorized = async (req, res, next) => {
    // Take access token form cookies
    const accessTokenFromCookie = req.cookies?.access_token;

    if (!accessTokenFromCookie) {
        return res.status(401).json({ message: 'Unauthorized - no cookie'});
    }

    try {
        const accessTokenDecoded = await JwtProvider.verifyToken(
            accessTokenFromCookie,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )

        req.jwtDecoded = accessTokenDecoded;

        next();
    } catch (error) {
        // Case: Access token is expired
        if (error.message?.includes('jwt expired')) {
            return res.status(410).json({ message: 'Unauthorized - Access token is expired'}); // Status code 410 - GONE
        }

        // Case: Invalid access token
        return res.status(401).json({ message: 'Unauthorized - invalid'});
    }
        
}

export default isAuthorized;