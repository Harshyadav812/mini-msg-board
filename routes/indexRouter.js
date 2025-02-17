const { Router } = require("express");
const indexRouter = Router();
const userController = require("../controllers/userController")


indexRouter.get("/", userController.getAllMessages);
indexRouter.get("/:id", userController.getMessageById);
indexRouter.get("/new", userController.insertMessageGet);
indexRouter.post("/new", userController.insertMessagePost);
indexRouter.get("/update/:id", userController.updateMessageGet);
indexRouter.post("/update/:id", userController.updateMessagePost);
indexRouter.get("/delete/:id", userController.deleteMessage);

module.exports = {
  indexRouter
};