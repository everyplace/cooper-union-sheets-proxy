var request = require('request');

exports.index = function(req, res){
  var path = 'about';
  res.render('template', {
    title: 'Serving a real template',
    name: path,
    description:'Sample links for the Imagga API',
    examples:[{
      url:"/words?phrase=the quick brown fox jumps over the lazy dog",
      title:"Text parsing for 'the quick brown fox jumps over the lazy dog'."
    }]
  });
};

exports.words = function(req, res){
  var path = (req.url.substring(1));
  var query = req.query.phrase;
  if((query != null) && query != "") {

    var url = "http://parts-of-speech.info/tagger/postagger?text="+query;
    request(url, function(err, response, body){
      var data = JSON.stringify({
        phrase: JSON.parse(body.split("callback(")[1].split(");")[0]).taggedText
      });

      res.end(data);
    })
  } else {

    res.end(JSON.stringify({
      error:"No valid query. Please use ?phrase=<sentence> to get a valid response."
    }))

  }
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
