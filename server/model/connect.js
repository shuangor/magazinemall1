const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/journal');
mongoose.Promise = global.Promise;