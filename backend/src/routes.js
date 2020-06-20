const {Router} = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const SessionController = require('./core/controllers/SessionController');
const SpotController = require('./core/controllers/SpotController');
const DashboadController = require('./core/controllers/DashboardController');
const BookingController = require('./core/controllers//BookingController');
const ApprovalController = require('./core/controllers/ApprovalController');
const RejectionController = require('./core/controllers/RejectionController');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);
routes.delete('/spots/:id', SpotController.delete);

routes.get('/dashboard', DashboadController.show);

routes.post('/spots/:id/bookings', BookingController.store);

routes.post('/bookings/:id/approvals', ApprovalController.store);
routes.post('/bookings/:id/rejections', RejectionController.store);


module.exports = routes;