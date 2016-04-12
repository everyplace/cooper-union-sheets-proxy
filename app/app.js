var express = require('express'),
    http = require('http'),
    path = require('path'),
    reload = require('reload'),
    routes = require('./routes'),
    apicache = require('apicache').options({
      debug:((process.env.APICACHE_DEBUG) && (process.env.APICACHE_DEBUG=='true'))?true:false,
      enabled:((process.env.APICACHE) && (process.env.APICACHE=='false'))?false:true
    }).middleware,
    favicon = require('favicon'),
    exphbs = require('express-handlebars'),
    morgan = require('morgan');

var app = module.exports = express();
var hbs = exphbs.create({
  layoutsDir:'app/views/layouts'
});

app.set('port', process.env.PORT || 5000);
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../public')));


//configure routes
app.get('/post', routes.json, routes.post);
app.get('/', routes.index);

var server = http.createServer(app);

//initiate the app server
server.listen(app.get('port'), function(){
  console.log("cooper union sheets proxy " + app.get('port'));
});
