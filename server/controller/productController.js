
const User = require("../model/User");
const cloudinary = require("cloudinary")
const Product = require("../model/Product");


exports.postProduct = async (req,res) => {
    const { productname, description, quantity, cost } = req.body
    const user = await User.findById(req.userId)


try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

  console.log(result);
     const product = await Product.create({
        productname,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
        description,
        quantity,
        cost,
        user: user.id,
      });
      console.log(product);
      console.log("product has been added!");
      res.status(201).json({message: "Product Created"})

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
