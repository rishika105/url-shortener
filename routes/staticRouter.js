//frontend pages static routes
import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('home');
})

export default router;
