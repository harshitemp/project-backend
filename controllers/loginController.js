const AccountUser = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AccountUser.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", userType: user.userType });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
