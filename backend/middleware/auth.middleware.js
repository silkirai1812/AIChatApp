import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async ( req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        console.log('Token:', token);

        if(!token){
            return res.status(401).send({ error: 'Unauthorized User '});
        }

        const isBlackListed = await redisClient.get(token);
        console.log('Is Blacklisted:', isBlackListed);

        if(isBlackListed){
            res.cookie('token','');
            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();  
    } catch(error){
        res.status(401).send({ error: 'Unauthorized User'});
    }
}