var jwt = require('jsonwebtoken');

const JWT_SECRET = "ddskfnf";

const fetchusers = (req, res,next) =>{

    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: 'Invalid token'});
    }

    try{
        const data = jwt.decode(token,JWT_SECRET);
        req.body.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send({error: 'Invalid token'});
    }
}

module.exports = fetchusers;