var jwt = require('jsonwebtoken');
const JWT_SECRET = "Whatthehe$ll"

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    console.log("req.header: ", req.header);
    const token = req.header('auth-token');
    console.log("Midlware-Token: ", token)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET) // decode the token
        req.user = data.user;
        // console.log("req.user: ",req.user);
        console.log("data.user: ",data.user);
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = { fetchuser };
