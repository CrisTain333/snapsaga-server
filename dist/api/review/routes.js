"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), controller_1.ReviewController.createReview);
router.get('/:id', controller_1.ReviewController.getReviewsById);
exports.ReviewRoute = router;
