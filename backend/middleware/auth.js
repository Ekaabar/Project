const jwt = require("jsonwebtoken");
//Check that the user/admin is authenticated before allowing requests to be sent.

module.exports = (req, res, next) => {
  //we extract the token from the Authorization header of the incoming request.
  //by using the split function to get everything after the space in the header.
  console.log(req.headers.authorization.split(" ")[1]);
  //We then use the verify function to decode our token.
  console.log(
    jwt.verify(req.headers.authorization.split(" ")[1], "RANDOM_TOKEN_SECRET")
  );
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    //we extract the admin ID of our token ;

    const adminId = decodedToken.adminId;

    console.log(adminId);
    console.log(req.body);
    // If the request contains a adminID, we compare it to the one extracted
    //from the token.If they are different, we generate an error ;
    if (req.body.adminId && req.body.adminId !== adminId) {
      throw "Invalid admin ID";
    } else {
      next();
    }
    //Errors generated here will be displayed in the catch block
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
