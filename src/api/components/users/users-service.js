const usersRepository = require('./users-repository');
const { passwordMatched } = require('../../../utils/password');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName) {
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

async function updatePassword(id, newPassword) {
  const user = await usersRepository.findById(id);
  if (!user) return false;

  user.password = newPassword;
  await user.save();
  return true;
}

async function loginUser(email, password) {
  const user = await usersRepository.getUserByEmail(email);
  if (!user) return null; // User not found

  const isMatch = await passwordMatched(password, user.password);
  if (!isMatch) return null; // Password incorrect

  return { id: user._id, email: user.email, fullName: user.fullName };
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  loginUser,
};
