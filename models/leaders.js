const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

let leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	featured: {
		type: Boolean,
		required: true,
		default: false
	}
},{
	timestamps: true
});

let Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;