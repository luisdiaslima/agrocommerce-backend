import jwt from 'jsonwebtoken';
import User from '../models/Usuario';
import authConfig from '../config/authConfig.json';


export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, authConfig.secret);
    const { id, email } = dados;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        errors: ['Token expirado, ou usuário inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json('Token malformed');
  }
};
