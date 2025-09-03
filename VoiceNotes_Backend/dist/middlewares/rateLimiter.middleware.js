"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summaryLimiter = exports.transcribeLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.transcribeLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute window
    max: 2,
    message: {
        error: "Too many transcription requests from this IP, please try again after a minute.",
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.summaryLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute window
    max: 2,
    message: {
        error: "Too many summary requests from this IP, please try again after a minute.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
