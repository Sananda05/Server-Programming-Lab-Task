const getLanding = (req, res) => {
  res.send("Landing");
};

const getHome =  (req, res) => {
    res.send("Home")
};

module.exports = { getHome,getLanding };
