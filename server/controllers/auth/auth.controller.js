const User = require("../../models/user/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const createToken = (id, pseudo) => {
    return jwt.sign({
            data: {id, pseudo}
        }, process.env.JWT_SECRET, { 
            expiresIn: "30d"
        });
}


module.exports.signUp = async (request, response) => {
    const {pseudo, email, password} = request.body;
    const salt = bcrypt.genSaltSync(10);
    const cryptPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({
        pseudo,
        email,
        password: cryptPassword,
        salt
    })
    const token = createToken(user._id, user.pseudo)
    return response.status(201).json({
        message: "User created successfully",
        token
    })
}

module.exports.signIn = async (request, response) => {
    const {email, password} = request.body;
    const userExist = await User.find({email: email});
    if(!userExist) {
        return response.status(401).json({
            message: `User with this address email ${email} does not exist!`
        })
    }
    const comparePassword = bcrypt.compareSync(password, userExist[0].password);
    if(!comparePassword) {
        return response.status(401).json({
            message: "Mot de passe incorrect!"
        })
    }
    const token = createToken(userExist._id, userExist.pseudo)
    return response.status(201).json({
        token
    })
}