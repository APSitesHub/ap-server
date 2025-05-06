const express = require("express");

const { validateAdminUser } = require("../schema/adminsSchema");

const auth = require("../middlewares/streams/auth");
const authKahoot = require("../middlewares/streams/authKahoot");
const authUserAdmin = require("../middlewares/streams/authUserAdmin");
const authCollectionsAdmin = require("../middlewares/streams/authCollectionsAdmin");

const addAdmin = require("../controllers/admins/addAdmin");
const getLinkAdmin = require("../controllers/admins/getLinkAdmin");
const loginAdmin = require("../controllers/admins/loginAdmin");
const refreshAdminToken = require("../controllers/admins/refreshAdminToken");
const getKahootAdmin = require("../controllers/admins/getKahootAdmin");
const loginKahootAdmin = require("../controllers/admins/loginKahootAdmin");
const refreshKahootAdminToken = require("../controllers/admins/refreshKahootAdminToken");
const getUserAdmin = require("../controllers/admins/getUserAdmin");
const loginUserAdmin = require("../controllers/admins/loginUserAdmin");
const refreshUserAdminToken = require("../controllers/admins/refreshUserAdminToken");
const getCollectionsAdmin = require("../controllers/admins/getCollectionsAdmin");
const refreshCollectionAdminToken = require("../controllers/admins/refreshCollectionAdminToken");
const loginCollectionAdmin = require("../controllers/admins/loginCollectionAdmin");
const loginTeacherAdmin = require("../controllers/admins/loginTeacherAdmin");
const getTeacherAdmin = require("../controllers/admins/getTeacherAdmin");
const refreshTeacherAdminToken = require("../controllers/admins/refreshTeacherAdminToken");
const loginPedagogiumAdmin = require("../controllers/admins/loginPedagogiumAdmin");
const refreshPedagogiumAdminToken = require("../controllers/admins/refreshPedagogiumAdminToken");
const loginSSWAdmin = require("../controllers/admins/loginSSWAdmin");
const loginMANSAdmin = require("../controllers/admins/loginMANSAdmin");
const refreshSSWAdminToken = require("../controllers/admins/refreshSSWAdminToken");
const refreshMANSAdminToken = require("../controllers/admins/refreshMANSAdminToken");
const loginAHNSAdmin = require("../controllers/admins/loginAHNSAdmin");
const refreshAHNSAdminToken = require("../controllers/admins/refreshAHNSAdminToken");

const router = express.Router();

router.get("/", auth, getLinkAdmin);

router.get("/kahoot", authKahoot, getKahootAdmin);

router.get("/users", authUserAdmin, getUserAdmin);

router.get("/teachers", authUserAdmin, getTeacherAdmin);

router.get("/collections", authCollectionsAdmin, getCollectionsAdmin);

router.post("/new", validateAdminUser, addAdmin);

router.post("/login", validateAdminUser, loginAdmin);

router.post("/login/kahoot", validateAdminUser, loginKahootAdmin);

router.post("/login/users", validateAdminUser, loginUserAdmin);

router.post("/login/teachers", validateAdminUser, loginTeacherAdmin);

router.post("/login/collections", validateAdminUser, loginCollectionAdmin);

router.post("/login/pedagogium", validateAdminUser, loginPedagogiumAdmin);

router.post("/login/ssw", validateAdminUser, loginSSWAdmin);

router.post("/login/mans", validateAdminUser, loginMANSAdmin);

router.post("/login/ahns", validateAdminUser, loginAHNSAdmin);

router.post("/refresh", refreshAdminToken);

router.post("/refresh/kahoot", refreshKahootAdminToken);

router.post("/refresh/users", refreshUserAdminToken);

router.post("/refresh/teachers", refreshTeacherAdminToken);

router.post("/refresh/pedagogium", refreshPedagogiumAdminToken);

router.post("/refresh/ssw", refreshSSWAdminToken);

router.post("/refresh/mans", refreshMANSAdminToken);

router.post("/refresh/ahns", refreshAHNSAdminToken);

router.post("/refresh/collections", refreshCollectionAdminToken);

module.exports = router;
