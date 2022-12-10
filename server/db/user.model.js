const mongoose = require('mongoose');

const UserSchema = require('./user.schema');

const UserModal = mongoose.model('User', UserSchema);

function register(user) {
  return UserModal.create(user);
}

function userInfo(name) {
  return UserModal.findOne({ username: name });
}

function updateDescription(name, descrip) {
  const filter = { username: name };
  const update = { description: descrip };

  return UserModal.findOneAndUpdate(filter, update);
}

module.exports = {
  register,
  userInfo,
  updateDescription,
};
