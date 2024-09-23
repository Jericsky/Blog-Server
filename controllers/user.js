const User = require('../models/User')
const bcrypt = require('bcrypt')
const auth = require('../auth')

module.exports.registerUser = async (req, res) => {
    try {
        const {email, username, password, confirmPassword} = req.body;

        if(!email.includes('@')){
            return res.status(400).send({error: 'Invalid email format'})
        }

        if(password.length < 8){
            return res.status(400).send({error: 'Password must 8 characters long'})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send({error: 'Email already exists'})
        }

        let newUser = new User({
            email,
            username,
            password: bcrypt.hashSync(password, 10)
        })

        return newUser.save()
        .then((result) => {
            return res.status(201).send(result)
        })
    } catch (error) {
        console.log('Error register a user: ', error)
        return res.status(500).send({error: 'Internal server error: Failed to register a user'})
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        console.log(user)

        if(!user){
            return res.status(404).send({error: 'No email found'})
        }

        const comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return res.status(404).send({error: 'Email or Password is incorrect'})
        }

        const accessToken = auth.createAccess(user);
        console.log(accessToken);

        return res.status(200).send({access: accessToken})

    } catch (error) {
        console.log('Error login: ', error);
        return res.send(500).send({error: 'Internal server error: Failed to login'})
    }
}

module.exports.getUserProfile = async (req, res) => {
    try {
        const {userId} = req.params

        const user = await User.findById(userId) 
        if(!user){
            return res.status(404).send({error: 'No user found'})
        }

        res.status(200).send(user)
        
    } catch (error) {
        console.log('Error to get user profile: ', error)
        return res.status(500).send({error: 'Internal server error: Failed to get user profile'})
    }
}