var mongoose=require('mongoose');

var ListSchema= mongoose.Schema({
  month: {
    type: Number,
    min:1,
    max:12,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true,
    index: {unique: true}
  },
  list: {
    type: Array,
    required: true
  }
});

var List=mongoose.model('List',ListSchema);

module.exports=List;