
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let countrySchema = new Schema({

id: {
	type: String
},
populationwiselist: {
	type: Array
},
areawiselist:{
	type:Array,
  },
listwithcapital: {
	type: Array
},
listnationalanimal:{
type:Array
},
listnationalbird:{
    type:Array
},
listnationalflag:{
type:Array
},
listcurrency:{
    type:Array
}
}, {
	collection: 'country'
})

module.exports = mongoose.model('country', countrySchema)