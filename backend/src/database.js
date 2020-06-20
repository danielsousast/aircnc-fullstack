const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/aircnc',
    {useUnifiedTopology:true, useNewUrlParser:true}
);