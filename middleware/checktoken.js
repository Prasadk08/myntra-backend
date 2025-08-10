import jwt from "jsonwebtoken";

export const checkToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Please login first" });
    token = token.split(" ")[1];
    let verify = jwt.verify(token, "afjaosifasfasfas");
    req.user = verify;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Invalid Token" });
  }
};
