const cloudinary = require("cloudinary")
const Product = require("../model/Product");
const User = require("../model/User");
const Store = require("../model/Store")



exports.postProduct = async (req,res) => {
    const { productname, description, quantity, cost } = req.body

try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const user = await User.findById(req.userId)


     const product = await Product.create({
        productname,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
        description,
        quantity,
        cost,
        user: req.userId,
        store: user.storeId
      });

      const store = await Store.findById(user.storeId)
      store.products = store.products.concat(product.id)
      await store.save()
      
      console.log(product.id);
      console.log("product has been added!");
      res.status(201).json({message: "Product Created and added to store"})

    } catch (err) {
      console.log(err);
    }
  }

  exports.getProducts = async (req,res) => {
    const products = await Product.find({})
    res.status(200).json(products)
  }


  exports.deleteProduct = async(req,res) => {
    try {
      const product = await Product.findById({_id: req.params.id} );
      await cloudinary.uploader.destroy(product.image.public_id)  
      await Product.deleteOne({_id: req.params.id})
      res.status(302).json({message: 'found and deleted'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
