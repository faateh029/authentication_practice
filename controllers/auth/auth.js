import jwt from 'jsonwebtoken';

export const generateAccessToken = (user)=>{
    const token = jwt.sign({username:user.username} , "abc" , {expiresIn:"15min"})
    return token;
}

export const generateRefreshToken = (user)=>{
    const token = jwt.sign({username:user.username} , "abc" , {expiresIn:"7days"})
    return token;
}

export const authenticationToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "abc", (error, decoded) => {
        if (error) {
            return res.status(403).json({ msg: "Invalid or expired token" });
        }

        // Optionally attach user data to request
        req.user = decoded;
        next();
    });
};