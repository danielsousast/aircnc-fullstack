const Spot = require('../models/Spot');
const User = require('../models/User');

class SpotController {
    async index(req, res) {
        const {tech} = req.query;
        
        const spots = await Spot.find({techs: tech});

        return res.json(spots);
    }

    async store(req, res) {
        const {filename} = req.file;
        const {company, price, techs} = req.body;
        const {user} = req.headers;

        const userExists = await User.findById(user);

        if(!userExists) {
            return res.status(400).json({error:'User does not exists'})
        }

        const spot = await Spot.create({
            user,
            thumbnail:filename,
            company,
            price,
            techs:techs.split(',').map(tech => tech.trim()),
        });

        return res.json(spot);
    }

    async delete(req, res) {
        const spot = await Spot.findById(req.params.id);

        await spot.remove()

        return res.status(204);
    }
}

module.exports = new SpotController();