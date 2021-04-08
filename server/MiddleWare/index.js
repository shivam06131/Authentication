import jwt from "jsonwebtoken";

//this middleware is not being used in this perticular project , but if we wanted to do any actions based on authenticated user that only perticular user can create or delete , then this middleware would have been used

// We can only use this when the token is received in req.authorization.headers , and this middleware can be used to create and do task as a valid user

const auth = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const customAuth = token.length < 500;

    let decodedData;

    if (token && customAuth) {
      decodedData = jwt.verify(token, "secret");
      console.log("decodedData", decodedData);
      req.userId = decodedData?._id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log("error occoured at middleware", error);
  }
};

export default auth;
