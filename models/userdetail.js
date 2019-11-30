var mongoose=require('mongoose');
const userdetailSchema=mongoose.Schema({
    bloodgroup:{
        type:String
    }
});
module.exports  = mongoose.model('search',userdetailSchema);  