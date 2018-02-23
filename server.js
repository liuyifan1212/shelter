var express = require( "express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname, './angular/dist')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/pets');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;
let PetSchema = new mongoose.Schema({
    name: { type: String, unique: [true,'Pet name must be unique'], required: [true, 'Pet name is required'], minlength: [3, 'Pet name must be at least 3 characters long']},
    type: { type: String, required: [true, 'Pet type is required'],  minlength: [3, 'Pet type must be at least 3 characters long']}, 
    description: { type: String,  required: [true, 'Description is required'], minlength: [3, 'Description must be at least 3 characters long']},
    like: { type: Number, default: 0},
    skill1: { type: String },
    skill2: { type: String },
    skill3: { type: String }
}, {timestamps:true});

let Pet = mongoose.model("Pet", PetSchema);


app.get('/pet', function(req, res){
    Pet.find({}, function(err, results){
        if(err){
            res.json(err);
        } else{
            res.json(results);
        }
    })
})

app.get('/pet/:id', function(req, res){
    Pet.find({_id: req.params.id}, function(err, results){
        if(err){
            res.json(err)
        }else{
            res.json(results);
        }
    })
})

app.post('/pet', function(req, res){
    var pet = new Pet(req.body);
    pet.save(function(err){
        if(err){
            res.json(err)
        }else{
            res.json({message: "You added a pet!"});
        }
    })
})

app.put('/pet/:id', function(req, res){
    Pet.update({_id: req.params.id},
    req.body,{runValidators: true}, function(err,results){
        if(err){
            res.json(err)
        }else{
            res.json({message: "You updated a pet!"});
        }
    })
})

app.get('/pet/like/:id',function(req,res){
    Pet.update({_id: req.params.id},{ $inc: {like:1}},function(err,results){
        if(err){
            res.json(err)
        }else{
            res.json(results);
        }
    })
})

app.delete('/pet/:id', function(req, res){
    Pet.remove({_id:req.params.id}, function(err,results){
        if(err){
            res.json(err)
        }else{
            res.json({message: "You deleted the pet!"});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/index.html"))
});

app.listen(8000, function(){
    console.log("listening on port 8000");
})




   
