import { request, response } from "express";
import Recipe from "../models/recipes.js";

const save = async (req, res) => {
	try {
		const recipes = req.body;
        console.log(recipes);
		await Recipe.deleteMany({});

		recipes.forEach(async element => {
			const recipe = new Recipe(element);
			await recipe.save();
		});

		res.status(200).json({
			msg: "The recipes were saved successfully"
		});

	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "The recipes could not save, talk to the administrator"
		});
	}
}


//Need to get recipes
const recipesGet = async(req = request, res = response) => {
    
    try {
		const recipes = await Recipe.find();
        res.status(200).json(recipes)
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "Sorry, we couldn't find the recipes"
		});
	}    
}

export {
   recipesGet,
   save
}