const { verifySignUp } = require("../middleware");
const controller = require("../controllers/authCtr.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( 
    "/signup",
    [ 
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/signin", controller.signin);

  app.post("/signout", controller.signout);

  app.get("/user/:id", controller.getUserById);

  app.patch("/user/:id", controller.updateUser );

};