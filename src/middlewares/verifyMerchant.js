const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()

//token must exit, valid , contain bearer prefix
//token must be valid

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            success: false,
            msg: "forbiden"
        })
    }

    try {
        const token = authHeader.split(" ")[1]

        const verified = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = verified;

        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = verifyUser;