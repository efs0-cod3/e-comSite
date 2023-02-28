const User = require("../model/User");
const Store = require("../model/Store");
const Product = require("../model/Product");
const cloudinary = require("cloudinary")

exports.createStore = async (req, res) => {
  const { storename, description } = req.body;

  if (!storename || !description) {
    return res
      .status(400)
      .json({ message: "Storename and description are required" });
  }

  const user = await User.findById(req.userId);

  // checkif user have a store
  if (user.storeId) {
    return res.status(409).json({ message: "User have a store already" });
  }

  try {
    const store = await Store.create({
      storename,
      description,
      user: req.userId,
    });

    // por hacer
    // crear co-relacion con el user para tener el id de su store
    user.storeId = store.id;
    await user.save();

    res.status(201).json(store);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getStore = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const store = await Store.findById(user.storeId).populate("products");
    res.status(200).json(store);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteStore = async (req, res) => {
  // queda implementar como borrar imagenes de cloudinary cuando se borra el store
  // se puede usar esto cloudinary.v2.api.delete_resources(public_ids) public id seria un array de strings

  // cloudinary.v2.api
  // .delete_resources(['image1', 'image2'])
  // .then(result=>console.log(result));

  try {
    const user = await User.findById(req.userId);
    const foundStore = await Store.findById(user.storeId).populate('products');
    const productsIdsArray = foundStore.products.map( el => el.image.public_id)
    await cloudinary.v2.api.delete_resources(productsIdsArray)
    await Product.deleteMany({ store: foundStore.id });
    await Store.deleteOne(user.storeId);
    user.storeId = undefined;
    await user.save();

    res.status(302).json({ message: `store has been deleated!` });
  } catch (error) {
    console.log({ error });
    res.status(404).json(error);
  }
};

// test
exports.getProductsIds = async (req,res) => {
    const user = await User.findById(req.userId);
    const foundStore = await Store.findById(user.storeId).populate('products')
    const p = foundStore.products.map( el => el.image.public_id)
    console.log(p);
    res.json({p})
}