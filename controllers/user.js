const UserModel = require('../models/users')

// * update user details
const updateUser = (req, res) => {

}

// ! delete user
const deleteUser = async (req, res) => {
  const { id } = req.query
  try {
    const deleted = await UserModel.findByIdAndDelete(id)
    // console.log(deleted)
    if (!deleted) return res.status(422).json({ message: "User does not exist!" })
    res.json({ message: `User with userName: ${deleted.userName} and email: ${deleted.email} deleted Successfully` })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Some Error Occured" })
  }
}

module.exports = { updateUser, deleteUser }