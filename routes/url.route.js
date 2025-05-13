import express from "express";
import { handleGenerateNewShortUrl, handleRedirectURL, handleGetAnalytics } from "../controllers/url.controller.js";
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/:id", handleRedirectURL);
router.get("/analytics/:id", handleGetAnalytics);

export default router;
