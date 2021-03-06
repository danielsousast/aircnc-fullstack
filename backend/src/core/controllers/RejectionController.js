const Booking = require('../models/Booking');

class RejectionController {
    async store(req, res) {
        const {id} = req.params;

        const booking = await Booking.findById(id).populate('spot');

        if(!booking) {
            return res.status(400).json({error: 'Booking does not exists'});
        }

        booking.approved = false;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user];

        if(bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    
    }
}

module.exports = new RejectionController();