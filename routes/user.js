import { Router } from "express";
import { login, userPost } from "../controllers/users.js";
import { check } from "express-validator";

import { validateCamps } from "../middlewares/campsValidations.js";

import { isMailValid} from "../helpers/db-validators.js";


export const router = Router();

router.post('/signUp', [
    check('email').custom(isMailValid), 
    check('password', 'Password need to be 6 letter').isLength({min: 6}),
    validateCamps
] , userPost);

router.post('/login', [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateCamps
], login);

export {
    Router
}