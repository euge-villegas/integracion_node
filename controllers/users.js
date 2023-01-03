import { request, response } from "express";
import Users from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../helpers/generateJWT.js";

const userPost = async(req = request, res = response) => {

    const {email, password} = req.body;
    const user = new Users({email, password});
    
    console.log(user);
    
    //Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    //Save on DB
    await user.save();
    

    res.status(200).json({
        email: user.email,
        localId: user.localId,
        idToken: await generateJWT(user.id),
        expiresIn: user.expiresIn
    })
}

const login = async(req = request, res = response) => {

    const {email, password} = req.body;

    try {

        //Verify if email exists
        const user = await Users.findOne({email});

        if (!user) {
            return res.status(400).json({
                msg: 'User or password might be wrong'
            })
        }

        //Verify password
        const validPass = bcrypt.compareSync( password, user.password );
        if (!validPass) {
            return res.status(400).json({
                msg: 'User or password might be wrong - wrong password'
            })
        }

        //Generate json web token
        const token = await generateJWT(user.id)

        res.status(200).json({
            email: user.email,
            localId: user.localId,
            idToken: token,
            expiresIn: user.expiresIn
        })
    } catch (error) {
        
    }
}

export {
    userPost,
    login
}