const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({

name:{ 
	type: String, 
	required: true 
},
synopsis:{ 
	type: String, 
	required: true 
},
runTime:{
	type: String, 
	required: true 

},
releaseDate:{
	type: String, 
	required: true 

},
posterImg:{
	data: Buffer, 
	type: String,
	required: true 
},
rating:{ 
	type: Number, 
	required: true 
},
genre:{ 
	type: String, 
	required: true 
},

}),

Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;