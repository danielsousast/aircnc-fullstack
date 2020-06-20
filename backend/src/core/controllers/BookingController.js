const Booking = require('../models/Booking');

class BookingController {
    async store(req, res) {
        const {user} = req.headers;
        const{id:spot} = req.params;
        const {date} =req.body;

        const booking = await Booking.create({
            date,
            spot,
            user,
        })

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if(ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }

    async index(req, res) {
        const {user} = req.headers;

        const bookings = await Booking.find({user});

        return res.json(user);
    }

    async remove(req, res) {

        return res.status(204).send();
    }
}

module.exports = new BookingController();