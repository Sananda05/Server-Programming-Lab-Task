const invalidPage = (req, res) => {
    res.sendfile("404.html", {root : "./views"});
  };
  
  module.exports = { invalidPage };
  