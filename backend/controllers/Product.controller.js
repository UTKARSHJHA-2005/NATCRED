import Product from "../model/Product.model.js";

export const getProducts = async (req, res) => {
  try {
    const product = await Product.find({}).sort({ Value: -1 });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching posts" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, productimage, Shops } = req.body;
    const newProduct = new Product({ title, productimage, Shops });
    await newProduct.save();
    return res.status(201).json({ message: "New product created", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
}

export const createShop = async (req, res) => {
  try {
    const { title, productimage, Shops } = req.body;
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.title = title;  
    product.productimage = productimage || product.productimage;
    product.Shops = Shops;  
    await product.save();
    return res.json({ message: "Shop(s) updated", product });
  } catch (err) {
    res.status(500).json({ message: "Shop Error", error: err.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};