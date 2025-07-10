const Admins = require("../db/models/adminsModel");

const findAdmin = async () => await Admins.findOne({ login: "LinkAdmin" });

const findKahootAdmin = async () =>
  await Admins.findOne({ login: "KahootAdmin" });

const findUserAdmin = async () => await Admins.findOne({ login: "UserAdmin" });

const findTeacherAdmin = async () =>
  await Admins.findOne({ login: "TeacherAdmin" });

const findPedagogiumAdmin = async () =>
  await Admins.findOne({ login: "PedagogiumAdmin" });

const findWSTIJOAdmin = async () =>
  await Admins.findOne({ login: "WSTIJOAdmin" });

const findWSKMAdmin = async () =>
  await Admins.findOne({ login: "WSKMAdmin" });

const findSSWAdmin = async () => await Admins.findOne({ login: "SSWAdmin" });

const findMANSAdmin = async () => await Admins.findOne({ login: "MANSAdmin" });

const findAHNSAdmin = async () => await Admins.findOne({ login: "AHNSAdmin" });

const findANSWPAdmin = async () =>
  await Admins.findOne({ login: "ANSWPAdmin" });

const findCollectionsAdmin = async () =>
  await Admins.findOne({ login: "CollectionsAdmin" });

const newAdmin = async (body) => await Admins(body).save();

const signInAdmin = async (id, body) =>
  await Admins.findByIdAndUpdate(id, body, { new: true });

const signInKahootAdmin = async (id, body) =>
  await Admins.findByIdAndUpdate(id, body, { new: true });

const signInUserAdmin = async (id, body) =>
  await Admins.findByIdAndUpdate(id, body, { new: true });

const signInTeacherAdmin = async (id, body) =>
  await Admins.findByIdAndUpdate(id, body, { new: true });

const signInCollectionsAdmin = async (id, body) =>
  await Admins.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  findAdmin,
  findKahootAdmin,
  findUserAdmin,
  findTeacherAdmin,
  findPedagogiumAdmin,
  findWSTIJOAdmin,
  findWSKMAdmin,
  findSSWAdmin,
  findMANSAdmin,
  findAHNSAdmin,
  findANSWPAdmin,
  findCollectionsAdmin,
  newAdmin,
  signInAdmin,
  signInKahootAdmin,
  signInUserAdmin,
  signInTeacherAdmin,
  signInCollectionsAdmin,
};
