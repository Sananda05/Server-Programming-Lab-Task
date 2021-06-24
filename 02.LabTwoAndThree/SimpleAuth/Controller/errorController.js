const invalidPage = (req, res) => {
    res.status(401).send("404! Page doesn't exist");
  };
  
  module.exports = { invalidPage };
  