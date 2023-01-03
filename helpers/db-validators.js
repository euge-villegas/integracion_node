import Users from "../models/user.js"


//Verify email exists
const isMailValid = async(email = '') => {
const existMail = await Users.findOne({email});
    if (existMail) {
        throw new Error(`Email ${email} is already registered`)
    }
}

//Verify user exists
const isValidUserId = async(id) => {
    const existUserId = await Users.findById(id);
    if (!existUserId) {
        throw new Error(`ID \"${id}\" doesnt exist`)
    }
}


export {
    isMailValid,
    isValidUserId
}