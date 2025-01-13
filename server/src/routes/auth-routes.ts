import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;  // Extract username and password from request body

  const user = await User.findOne({ // Find user by username
    where: { username },
  });

  // Error handling
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Password validation
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || ''; // ENV Secret Key

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' }); // Generate token, 1 hrs exp
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
