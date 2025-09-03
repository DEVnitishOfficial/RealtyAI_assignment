import rateLimit from "express-rate-limit";

export const transcribeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 2,              
  message: {
    error: "Too many transcription requests from this IP, please try again after a minute.",
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

export const summaryLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 2,              
  message: {
    error: "Too many summary requests from this IP, please try again after a minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
