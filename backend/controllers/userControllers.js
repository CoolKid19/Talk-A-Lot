const  asyncHandler = require('express-async-handler');
const {User} = require('../models/userModel');
const {generateToken} = require('../config/generateToken');
const { Schema } = require('mongoose');

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, pic} = req.body;

    console.log(req.body)

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        console.log(userExists);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });
    
    if(user){
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id) // jwt token helps us authorize the user in our backend
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }

});

const authUser = asyncHandler(async(req, res) => {
    
    const {email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists && (await userExists.matchPassword(password))){
        res.json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            pic: userExists.pic,
            token: generateToken(userExists._id)
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }

});

// api/user?search=abc

const allUsers = asyncHandler(async(req, res) => {

    const keyword = req.query.search ? {
        $or: [
            {name: {$regex: req.query.search, $options: 'i'}},
            {email: {$regex: req.query.search, $options: 'i'}}
        ]

    } : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });// to get this req.user._id we need to use the auth middleware
                                                                            // as we need to authorize the user that is currently logged in
                                                                            // for that we need user to login and provide us with the json web token

    if(users){
        res.json(users);
    }


});

exports.allUsers = allUsers;

exports.authUser = authUser;

exports.registerUser = registerUser;