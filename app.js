const   express     = require("express"),
        app         = express(),
        mongoose    = require("mongoose");
        bodyParser  = require("body-parser"),
        cookieParser = require("cookie-parser"),
        session = require("express-session"),
        methodOverride = require("method-override");


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/blogdb', {useNewUrlParser: true, useUnifiedTopology: true});

//Schema Setup
var commentSchema = new mongoose.Schema({
    author: String,
    text: String,
});

var Comment = mongoose.model("Comment", commentSchema)


//Routes
app.get("/", function(req, res){
    res.render("index.ejs");
});

//Show all comments
app.get("/blog", function(req, res){
    Comment.find({}, function(err, allComments){
        if(err){
            console.log(err);
        } else {
            res.render("blog.ejs", {comment:allComments})
        }
    });
});

//Add new Comment and save to DB
app.post("/blog", function(req, res){
    var text = req.body.text;
    var author = req.body.author;
    var newComment = {
        author: author,
        text: text }
    Comment.create(newComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    });
});

//Form to create new comments
app.get("/new", function(req, res){
    res.render("new.ejs");
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
console.log("Server Has Started!");
});

