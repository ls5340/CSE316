const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    console.log("herro?");
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email
            }
        }).send();
    })
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify) {
            console.log("1");
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            console.log("2");
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            console.log("3");
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("4");
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, passwordHash
        });
        const savedUser = await newUser.save();
        console.log("5");
        console.log(savedUser);
        console.log(User);
        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("1");
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            console.log("4");
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address does not exist!"
                });
        }

        /*
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        */
        console.log(existingUser);
        console.log(password);
        const match = await bcrypt.compare(password, existingUser.passwordHash);
        if (match) {
            console.log("correct password");

            const token = auth.signToken(existingUser);

            await res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json({
                success: true,
                user: {
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: existingUser.email
                }
            }).send();
        }
        else {
            console.log("wrong password");
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "wrong password"
                });
        }
        // let error = -1;
        // bcrypt.compare(password, existingUser.passwordHash).then(async function(err, res1) {
        //     if (err) {
        //         console.log(err);
        //         error = 0;
        //         console.log("WHAT1");
        //     }
        //     if (res1) {
        //         error = 1;      // password correct
        //         console.log("WHAT2");
        //     }
        //     else {
        //         error = 2;      // password wrong
        //         console.log("WHAT3");
        //     }

        //     console.log(error);
        //     if (error === 0) {
        //         console.log("compare error");
        //         return res
        //             .status(400)
        //             .json({
        //                 success: false,
        //                 errorMessage: "bcrypt compare error"
        //             });
        //     }
        //     else if (error === 2) {
        //         console.log("wrong password");
        //         return res
        //             .status(400)
        //             .json({
        //                 success: false,
        //                 errorMessage: "wrong password"
        //             });
        //     }

        //     console.log("correct password");

        //     const token = auth.signToken(existingUser);

        //     await res.cookie("token", token, {
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: "none"
        //     }).status(200).json({
        //         success: true,
        //         user: {
        //             firstName: existingUser.firstName,
        //             lastName: existingUser.lastName,
        //             email: existingUser.email
        //         }
        //     }).send();
        // });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    console.log("attempt logout");
    try {
        await res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
}