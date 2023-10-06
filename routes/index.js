const products = require ('../controllers/products.js')

const router = require ('express').Router();

router.get("/", products.getAllProducts);
router.get("/:id", products.getProductById );
router.get("/kategori/:kategori", products.getProductByKategori );
router.post("/", products.upload ,products.createProducts );
router.patch("/:id", products.upload , products.updateProducts );
router.delete("/:id", products.deleteProducts );

router.get('/getproductreviews/:id', products.getProductReviews)

module.exports = router;