import AuthDb from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getRoutes = (req, res) => {
  res.status(200).json({ message: "gettting teh request correctly" });
};

export const createUser = async (req, res) => {
  const {
    firstname,
    image,
    lastname,
    email,
    password,
    confirmpassword,
  } = req.body;
  try {
    //confirming password
    if (password != confirmpassword) {
      console.log("pasword didn't match");
      return res.status(400).json({ message: "password did not match" });
    }

    //checking if user exists
    const userExists = await AuthDb.findOne({ email });

    if (userExists) {
      console.log("user already exits");
      return res.status(400).json({ message: "User already exists" });
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      firstname,
      lastname,
      email,
      image,
      password: hashedPassword,
    };

    //creating the user
    const result = await AuthDb.create(user);
    console.log("saveData", result?._id);

    //creating the json token
    const token = jwt.sign(
      { email: result.email, userId: result._id },
      "secret"
    );

    //sending the response
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(
      "error catched at createUser(backend /controllers/index.js) ",
      error
    );
  }
};

export const getUser = async (req, res) => {
  try {
    const fetchData = await AuthDb.find();
    res.status(200).send(fetchData);
  } catch (error) {
    console.log(error);
  }
};

export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find() returns array of an objects even if there is only one user
    //findOne() returns object
    const checkUserExists = await AuthDb.findOne({ email });

    if (!checkUserExists) {
      console.log("user not found");
      res.status(400).json({ message: "user not found" });
    }

    const checkTruePass = await bcrypt.compare(
      password,
      checkUserExists.password
    );

    if (!checkTruePass) {
      console.log("incorrect password");
      res.status(400).json({ message: "incorrect password" });
    }

    const token = jwt.sign(
      {
        email: checkUserExists.email,
        id: checkUserExists._id,
      },
      "secret"
    );

    res.status(200).json({ result: checkUserExists, token });
  } catch (error) {
    console.log("error found", error);
  }
};
