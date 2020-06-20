const User = require('../models/User');

class SessionController {
    async store(req, res) {
        const {email} = req.body;
        
        const userExists = await User.findOne({email});

        if(userExists) {
            return res.json(userExists);
        }

        const user = await User.create({email});

        return res.json(user);
    }
}

module.exports = new SessionController();