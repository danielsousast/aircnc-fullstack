const Spot = require('../models/Spot');

class DashboardController {
    async show(req, res) {
        const {user} = req.headers;
        const spots = await Spot.find({user})

        return res.json(spots);
    }

    async remove(req, res) {
        const {user} = req.headers;
        const spot = await Spot.findById(req.params.id);

        if(!spot) {
            return res.status(400).json({error:'Spot does not exists'});
        }

        if(spot.user !== user) {
            return res.status(401).json({error:'No Authorized'});
        }

        return res.status(204).send();
    }
}

module.exports = new DashboardController();