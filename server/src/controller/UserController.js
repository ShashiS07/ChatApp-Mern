const userModel = require("../model/UserModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUsernameExist = await userModel.findOne({ username });
    if (isUsernameExist)
      return res.json({ status: false, message: "username is already used" });

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist)
      return res.json({ status: false, message: "Email is already exist" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    delete user.password;
    return res.json({ status: true, message: "success", user });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({
        status: false,
        message: "Incorrect email or password",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({
        status: false,
        message: "Incoorect email or password",
      });

    delete user.password;
    return res.json({ status: true, message: "success", user });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await userModel.findByIdAndUpdate(
      userId,
      {
        isAvatarSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel
      .find({ _id: { $ne: req.params.id } })
      .select(["email", "username", "avatarImage", "_id"]);
    return res.json(user);
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    if (req.params.id)
      return res.json({ status: false, message: "User id is required" });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

module.exports = { register, login, setAvatar, getAllUsers,logout };
