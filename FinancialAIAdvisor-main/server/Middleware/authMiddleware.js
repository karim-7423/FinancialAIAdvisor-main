import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const JWT_SECRET = "6dsb&c~HYAx3K787,5.K2lK*EA*h|9C-6Y,$.jiKS1s9lTE5^bPN$>+~";

export const auth = async (req, res, next) => {
  let token;
  console.log("Authorization Header:", req.headers.authorization);
  // Retrieve token from the Authorization header
  console.log("✅ JWT_SECRET:", JWT_SECRET);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token is found, return an error
  if (!token) {
    return res.status(401).json({
      message: "Authorization denied, no token provided",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from the token and attach to req object
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res
      .status(401)
      .json({ message: "Unauthorized, token verification failed" });
  }
};

// Middleware to authorize specific roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role ${req.user.role} is not authorized to access this resource`,
      });
    }
    next();
  };
};
