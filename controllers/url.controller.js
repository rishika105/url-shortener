import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

export const handleGenerateNewShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url)
      return res.status(400).json({
        success: false,
        message: "URL not found!",
      });

    const shortID = nanoid(9);
    const result = await URL.create({
      shortId: shortID,
      redirectURL: url,
      visitedHistory: [],
    });

    return res.render("home", {
      id: shortID,
      baseUrl: process.env.NODE_URL,
    });

    // return res.status(200).json({
    //   success: true,
    //   message: "Shortened url success",
    //   result,
    // });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error shortening URL",
      error: error.message,
    });
  }
};

export const handleRedirectURL = async (req, res) => {
  try {
    //find id in db and then update the that id created before with visited time
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitedHistory: { timestamp: Date.now() },
        },
      }
    );

    //redirect from new updated obj url
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error redirecting URL",
      error: error.message,
    });
  }
};

export const handleGetAnalytics = async (req, res) => {
  try {
    const shortId = req.params.id;
    //find the entry and send the appropriate res
    const result = await URL.findOne({ shortId });
    return res.status(200).json({
      success: true,
      totalClicks: result.visitedHistory.length,
      analytics: result.visitedHistory,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error showing analytics of the URL",
      error: error.message,
    });
  }
};
