const jwt = require("jsonwebtoken");
const JWT_KEY = "NavneetIsAGoodDeveloper@@@$$$000"

const fetchuser = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ success: false, error: "Please login with the valid token!!" })
        }
        const data = jwt.verify(token, JWT_KEY)
        req.user = data.user
        next()
    } catch (error) {
        return res.status(401).json({ success: false, error: "Please login with the valid token!!" })
    }
}

module.exports = fetchuser