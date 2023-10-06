// import Product from "../models/productModels.js";
const db = require("../models");
const Product = db.products;
const Review = db.reviews

// const Product = require('../models/productModels.js')
const multer = require("multer");
const path = require("path");
const { log } = require("console");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    let products = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};
const getProductByKategori = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        kategori: req.params.kategori,
      },
    });
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};
const getProductReviews =  async (req, res) => {

  const id = req.params.id

  const data = await Product.findOne({
      include: [{
          model: Review,
          as: 'review'
      }],
      where: { id: id }
  })

  res.status(200).send(data)

}
const createProducts = async (req, res, next) => {
  // const a = JSON.parse(req.files);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Image");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });
  // console.log(req.files)
  let info = {
    image: req.files.image[0].filename,
    name: req.body.name,
    price: req.body.price,
    image1: req.files.image1[0].filename,
    image2: req.files.image2[0].filename,
    image3: req.files.image3[0].filename,
    deskripsi: req.body.deskripsi,
    kategori: req.body.kategori,
    weight: req.body.weight,
    size: req.body.size
  }
  const products = await Product.create(info);
  res.status(200).send(products);
};

const updateProducts = async (req, res) => {
  try {
    let aktifasi = 0
    let aktifasi1 = 0
    let aktifasi2 = 0
    let aktifasi3 = 0
    console.log(req.body.name);
    let info = {
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      kategori: req.body.kategori,
      weight: req.body.weight,
      size: req.body.size
    }
    files = req.files.image

    if (files !== undefined) {

      info.image = req.files.image[0].filename
      aktifasi = 1
      imageUpload = req.files.image
      console.log(req.files.image[0].filename)
    }
    console.log("titit");

    if (req.files.image1 !== undefined) {
      info.image1 = req.files.image1[0].filename
      aktifasi1 = 1
      console.log("test")
      imageUpload1 = req.files.image1[0].filename
    }
    if (req.files.image2 !== undefined) {
      info.image2 = req.files.image2[0].filename
      aktifasi2 = 1
      imageUpload2 = req.files.image2[0].filename
    }
    if (req.files.image3 !== undefined) {
      info.image3 = req.files.image3[0].filename
      aktifasi3 = 1
      imageUpload3 = req.files.image3[0].filename
    }
    
    if (aktifasi === 1) {

      multer({
        storage: storage,
        limits: { fileSize: "5000000" },
        fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
          const mimeType = file.mimetype;
          const extname = fileTypes.test(file.originalname);
          
          if (mimeType && extname) {
            // console.log(cb(null, true));
            return cb(null, true);
          }
          const err = new Error('Only .png, .jpg and .jpeg format allowed!')
          err.name = 'ExtensionError'
          return cb(err);  },
          // console.log();
        
      }).single('imageUpload')
    }
    if (aktifasi1 === 1) {
      multer({
        storage: storage,
        limits: { fileSize: "5000000" },
        fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
          const mimeType = file.mimetype;
          const extname = fileTypes.test(file.originalname);
          
          if (mimeType && extname) {
            // console.log(cb(null, true));
            return cb(null, true);
          }
          const err = new Error('Only .png, .jpg and .jpeg format allowed!')
          err.name = 'ExtensionError'
          return cb(err);  },
          // console.log();
        
      }).single('imageUpload1')
    }
    if (aktifasi2 === 1) {
      multer({
        storage: storage,
        limits: { fileSize: "5000000" },
        fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
          const mimeType = file.mimetype;
          const extname = fileTypes.test(file.originalname);
          
          if (mimeType && extname) {
            // console.log(cb(null, true));
            return cb(null, true);
          }
          const err = new Error('Only .png, .jpg and .jpeg format allowed!')
          err.name = 'ExtensionError'
          return cb(err);  },
          // console.log();
        
      }).single('imageUpload2')
    }
    if (aktifasi3 === 1) {
      multer({
        storage: storage,
        limits: { fileSize: "5000000" },
        fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
          const mimeType = file.mimetype;
          const extname = fileTypes.test(file.originalname);
          
          if (mimeType && extname) {
            // console.log(cb(null, true));
            return cb(null, true);
          }
          const err = new Error('Only .png, .jpg and .jpeg format allowed!')
          err.name = 'ExtensionError'
          return cb(err);  },
          // console.log();
        
      }).single('imageUpload3')
    }

    console.log(info);
    const products = await Product.update(info, {
      where: {
        id: req.params.id,
      },
    });
    res.json(products); 
    // console.log(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteProducts = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Image");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
    const mimeType = file.mimetype;
    const extname = fileTypes.test(file.originalname);

    if (mimeType && extname) {
      // console.log(cb(null, true));
      return cb(null, true);
    }
    const err = new Error('Only .png, .jpg and .jpeg format allowed!')
    err.name = 'ExtensionError'
    return cb(err);  },
  
}).fields([{name: 'image', maxCount: 1},{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},])


module.exports = {
  getAllProducts,
  getProductById,
  createProducts,
  updateProducts,
  deleteProducts,
  upload,
  getProductByKategori,
  getProductReviews,
};
