const messageModel = require("../model/MessageModel");

const getMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const message = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectedMessages = message.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;

    const { data } = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data)
      return res.json({ status: true, message: "Message Added Successfully" });
    else
      return res.json({
        status: false,
        message: "Failed to add message to the database",
      });
  } catch (error) {
    return res.json({ stutus: false, message: error.message });
  }
};

module.exports = { getMessage, addMessage };
