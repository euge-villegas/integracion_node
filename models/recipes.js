import { Schema, model } from "mongoose";

const recipeSchema = Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
	},
	ingredients: {
		type: [{
			amount: String,
			name: String
		}],
		required: false
	},
	imagePath: {
		type: String,
		required: [true, 'Image Path is required'],
	}
});


export default model("Recipe", recipeSchema);