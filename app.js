const   express     = require("express"),
        app         = express();

// app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res){
    res.render("index.ejs");
});

app.get("/blog", function(req, res){
    res.render("blog.ejs")
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
console.log("Server Has Started!");
});

