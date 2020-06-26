import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/Usuario';
import authConfig from '../config/authConfig.json';

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Missing email or password'],
        });
      }

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      console.log(user);
      if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ errors: 'Invalid password' });


      const { id } = user;
      const token = jwt.sign({ id, email }, authConfig.secret, {
        expiresIn: 86400,
      });

      return res.json({ token, user: { nome: user.nome, id, email } });
    } catch (e) {
      return res.status(401).json(console.log(e));
    }
  }
}

export default new TokenController();
