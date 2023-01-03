import { request, response } from 'express';
import Users from "../models/user.js";
import jwt from 'jsonwebtoken';


const validateJWT = async(req = request, res = response, netx) => {
    //no llega por header , llega por param
    //pasar el token de un user por param en la peticion de get recipes

    const {auth} = req.query;
    const token = auth;

    if(!token) {
        return res.status(401).json({
        msg: 'We couldn\'t found a token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await Users.findById(uid);

        //Verify user exists
        if(!user) {
            return res.status(401).json({
                msg: 'Not a valid token - Not an existing user'
            })
        }

        req.user = user;
        netx()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Not a valid token'
        })
    }
}

export {
    validateJWT
}