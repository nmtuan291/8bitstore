import JwtProvider from '../providers/JwtProvider.js'

const isAuthorized = async (req, res, next) => {
    // Take access token form cookies
    const accessTokenFromCookie = req.cookies?.accessToken;

    if (!accessTokenFromCookie) {
        res.status(401).json({ message: 'Unauthorized'});
    }

    try {
        const accessTokenDecoded = await JwtProvider.verifyToken(
            accessTokenFromCookie,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )

        req.jwdDecoded = accessTokenDecoded;

        next();
    } catch (error) {
        // Case: Access token is expired
        if (error.message?.include('jwt expired')) {
            return res.status(410).json({ message: 'Unauthorized - Access token is expired'}); // Status code 410 - GONE
        }

        // Case: Invalid access token
        res.status(401).json({ message: 'Unauthorized'});
    }
        
}

export default isAuthorized;