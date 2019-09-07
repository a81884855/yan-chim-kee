const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const fs = require("fs");

const Product = require("../../src/models/Product");

router.use(fileUpload());

router.get("/list", (req, res) => {
  Product.find({})
    .then(list => res.status(200).json(list))
    .catch(err => {
      throw err;
    });
});

router.get("/info/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then(info => res.json(info))
    .catch(err => {
      throw err;
    });
});

router.post("/info", (req, res) => {
  const { images, name, price } = req.body;
  const newProduct = new Product({
    images,
    name,
    price
  });

  newProduct
    .save()
    .then(res.send("Success"))
    .catch(err => {
      throw err;
    });
});

router.put("/edit/image/:id/:num", (req, res) => {
  const { id, num } = req.params;
  Product.findById(id)
    .then(product => {
      const { images } = product;
      const target = images.splice(num, 1);
      product.images = images;
      product
        .save()
        .then(() => {
          try {
            fs.unlinkSync(`./images/products/${target}`);
          } catch (err) {
            res.json("Can't delete!!");
          }
          res.json("Success!");
        })
        .catch(err => res.status(400).send("Can't Delete the pic"));
    })
    .catch(err => res.status(400).send("Can't find this product info"));
});

router.put("/edit/product/:id", (req, res) => {
  const { id } = req.params;
  const { images, name, price } = req.body;
  console.log(images, name, price);
  Product.findById(id)
    .then(product => {
      product.images = req.body.images;
      product.name = req.body.name;
      product.price = req.body.price;
      product
        .save()
        .then(res.json("Success!"))
        .catch(err => res.status(400).send("Can't Delete the pic"));
    })
    .catch(err => res.status(400).send("Can't find this product info"));
});

router.post("/images", function(req, res) {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  var current_files = fs.readdirSync(`./images/products/`);
  let profilePic = req.files.selectedFile;
  let fileName = profilePic.name;

  if (current_files.includes(fileName))
    return res.status(400).send({ message: "file already exist!!" });

  let send_filePath = `./images/products/` + fileName;

  profilePic.mv(send_filePath, function(err) {
    if (err) return res.status(500).send(err);

    const res_dataObj = {
      newFileName: fileName
    };

    const newProduct = new Product({
      image: profilePic.name
    });

    newProduct
      .save()
      .then(res.send(res_dataObj))
      .catch(err => {
        throw err;
      });
  });
});

router.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id).then(result => {
    result.images.forEach(image => {
      try {
        fs.unlinkSync(`./images/products/${image}`);
      } catch (err) {
        throw err;
      }
    });
  });
  Product.remove()
    .then(res.send("success delete"))
    .catch(err => {
      throw err;
    });
});

module.exports = router;
