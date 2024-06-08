const wakeUp = async (_, res) => {
  res.status(200).json("Okay, I'm awake");
};

module.exports = wakeUp;
