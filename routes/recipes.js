import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { recipesGet, save } from "../controllers/recipes.js";

export const routerRec = Router();

routerRec.get('/', [
    validateJWT
], recipesGet);

routerRec.put('/', [
    validateJWT
], save);


export {
    Router
}