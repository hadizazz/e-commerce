const db = require('../models');

// model
const Review = db.reviews

// functions

//1. Add Review

const addReview = async (req, res) => {

console.log(req.body);
    id = req.params.id
    let info = {
        product_id: id,
        rating: req.body.rating,
        description: req.body.description
    }

    console.log(info);
    const reviews = await Review.create(info)
    res.status(200).send(reviews)

};

// 2. Get All Reviews

const getAllReviews = async (req, res) => {
    try{
        const reviews = await Review.findAll({})
        console.log("reviews");
        res.json(reviews)
    }catch (error) {
        res.json({ message: error.message });
      }
}

module.exports = {
    addReview,
    getAllReviews
}