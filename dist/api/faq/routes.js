"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.User_Role.ADMIN, user_1.User_Role.SUPER_ADMIN), controller_1.FaqController.createFaq);
router.get('/', controller_1.FaqController.getFaq);
router.delete('/:id', (0, auth_1.default)(user_1.User_Role.ADMIN, user_1.User_Role.SUPER_ADMIN), controller_1.FaqController.deleteFaq);
router.patch('/:id', (0, auth_1.default)(user_1.User_Role.ADMIN, user_1.User_Role.SUPER_ADMIN), controller_1.FaqController.updateFaq);
exports.FaqRoute = router;
