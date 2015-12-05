var request = require('request'),
    request = require('request'),
    Imagga = require('imagga');

exports.index = function(req, res){
  var path = 'about';
  res.render('template', {
    title: 'Serving a real template',
    name: path,
    description:'Sample links for the Imagga API',
    examples:[{
      url:"/color?image=http://imagga.com/static/images/tagging/wind-farm-538576_640.jpg",
      title:"Color information for the image at http://imagga.com/static/images/tagging/wind-farm-538576_640.jpg"
    }]
  });
};

exports.color = function(req, res){

  var config = {
    key:process.env.IMAGGA_KEY,
    secret:process.env.IMAGGA_SECRET,
    endpoint:process.env.IMAGGA_ENDPOINT,
    image: req.query.image
  }

  var url = 'https://' + config.key + ':' + config.secret + "@" + config.endpoint + "/colors?url=" +config.image;

  request({url: url}, function (error, response, body) {
     res.end(body);
  });
};



exports.template = function(req, res){
  var path = (req.url.substring(1));
  var config = {
    title: (req.title) ? req.title : path,
    name: (req.name) ? req.name : path,
    page: (req.page) ? req.page : ""
  };

  for (i in attributes) {
    if(req[attributes[i]] !== undefined) {
      config[attributes[i]] = req[attributes[i]];
    }
  }
  console.log(config)
  res.render('template', config);
};
