import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Create user
router.route("/users").post(userCtrl.create);


router.route("/users/profile")
  .get(authCtrl.requireSignin, userCtrl.getProfile)     // GET /api/users/profile
  .put(authCtrl.requireSignin, userCtrl.updateProfile)  // PUT /api/users/profile  
  .delete(authCtrl.requireSignin, userCtrl.deleteProfile); // DELETE /api/users/profile

// List users 
router.route("/users").get(
  authCtrl.requireSignin,
  userCtrl.isAdmin,
  userCtrl.list
);

// Delete multiple users 
router.route("/users").delete(
  authCtrl.requireSignin,
  userCtrl.isAdmin,
  userCtrl.removeMany
);


router
  .route("/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);


router.param("userId", userCtrl.userByID);

export default router;