import Product from '../models/Products';

class ProductController {
  async store(req, res) {
    // res.json({
    //   succes: 1,
    //   products_url: `http://localhost:3000/product/${req.file.filename}`,
    // });
    try {
      const newProduct = await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productImage: `http://localhost:3000/product/images/${req.file.filename}`,
      });
      console.log(newProduct);
      return res.send(newProduct);
    } catch (e) {
      return res.status(400).json(console.log(e));
    }
  }

  async index(req, res) {
    try {
      const products = await Product.find({});
      return res.json(products);
    } catch (e) {
      console.log(e);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      const product = await Product.findById(id);
      return res.status(200).json(product);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      }
      const novosDados = await Product.updateOne(req.body);

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

      const product = await Product.findById(id);
      console.log(product);

      if (!product) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      }

      await Product.remove(product);
      return res.json('Produto deletado');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}


export default new ProductController();
