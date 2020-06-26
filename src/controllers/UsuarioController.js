import User from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) { return res.status(400).send({ error: 'User alredy exists' }); }
      const novoUser = await User.create(req.body);
      // const { name, email } = novoUser;
      return res.send(novoUser);
    } catch (e) {
      return res.status(400).json(console.log(e));
    }
  }

  async index(req, res) {
    const { email } = req.body;
    try {
      const users = await User.find({});
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      const user = await User.findById(id);
      const { name, email } = user;
      return res.status(200).json();
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }
      const novosDados = await User.updateOne(req.body);

      return res.status(200).json(novosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      if (!id) {
        return res.status(400).json({
          errors: ['Id não enviado.'],
        });
      }

      const user = await User.findById(id);
      console.log(user);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await User.remove(user);
      return res.json('Usuário deletado');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}


export default new UsuarioController();
