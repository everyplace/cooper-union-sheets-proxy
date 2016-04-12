var request = require('request');
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

exports.json = function(req, res, next) {
  res.set({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  next();
};

exports.index = function(req, res){
  var path = 'about';
  res.render('template', {
    title: 'Serving a real template',
    name: path,
    description:'Sample links for the Parts of Speech API',
    examples:[{
      url:"/words?phrase=the quick brown fox jumps over the lazy dog",
      title:"Text parsing for 'the quick brown fox jumps over the lazy dog'."
    }]
  });
};

exports.test = function(req, res) {

  // https://docs.google.com/spreadsheets/d/1NH905jK2KqEIN5-UQ0dm2yVNh8SKgxzKYHKRkwlbi8I/pubhtml

  var doc = new GoogleSpreadsheet('1NH905jK2KqEIN5-UQ0dm2yVNh8SKgxzKYHKRkwlbi8I');
  var sheet;

  async.series([
    function setAuth(step) {
      // see notes below for authentication instructions!
      var creds = JSON.parse(process.env.credentials);

      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {

        console.log(err, info);

        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        sheet = info.worksheets[0];
        console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
        step();
      });
    }
  ]);


  console.log(req.query);
  res.end();

};


exports.template = function(req, res){
  var path = (req.url.substring(1));
  var config = {
    title: (req.title) ? req.title : path,
    name: (req.name) ? req.name : path,
    page: (req.page) ? req.page : ""
  };

  for (var i in attributes) {
    if(req[attributes[i]] !== undefined) {
      config[attributes[i]] = req[attributes[i]];
    }
  }
  console.log(config);
  res.render('template', config);
};
