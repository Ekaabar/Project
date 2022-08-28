const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
/***********************************SIN UP*******************************/
/************************************************************************/
exports.signup = (req, res, next) => {
  //asynchronous function that returns a Promise in which we receive the generated hash
  //10 rounds represents the sold= how often we execute the hash algorithm
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const admin = new Admin({
        email: req.body.email,
        //we will record the hash that was encrypted beforehand
        password: hash,
      });
      //register the Admin in the database
      admin
        .save()
        .then(() =>
          res.status(201).json({ message: "Iser created with success !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
/***************************************LOG IN******************************/
/***************************************************************************/
exports.login = (req, res, next) => {
  //we use the Mongoose template to verify that the email entered by
  // the Admin matches an existing Admin in the DB
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({ error: "User not found !" });
      }
      //if the email matches an existing user, we continue ;
      //we use the compare function in bcrypt to compare the password
      // entered by the admin with the hash stored in the DB:
      bcrypt
        .compare(req.body.password, admin.password)
        .then((valid) => {
          //if they don't match, we return a 401 Unauthorized error
          if (!valid) {
            return res.status(401).json({ error: "false password !" });
          }
          res.status(200).json({
            adminId: admin._id,
            admin: admin,
            //use the sign function of jsonwebtoken to encode a new token
            //this token contains the user/admin ID + payload (the data encoded in the token)
            //to ensure that only one user/admin can create and modify the same object
            token: jwt.sign({ adminId: admin._id }, "RANDOM_TOKEN_SECRET", {
              //expiration of token within 24h
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
