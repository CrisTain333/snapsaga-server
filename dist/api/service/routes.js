"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
// import validateRequest from '../../middleware/validateRequest';
// import { ServiceValidation } from './validation';
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../enums/user");
const uploadSystem_1 = require("../../middleware/uploadSystem");
const router = express_1.default.Router();
router.post('/create', 
// validateRequest(ServiceValidation.ServiceSchema),
uploadSystem_1.uploadSystem.single('banner'), controller_1.ServiceController.createService);
router.get('/best-services', controller_1.ServiceController.getBestService);
router.get('/:id', controller_1.ServiceController.getSingleService);
router.get('/', controller_1.ServiceController.getAllService);
router.delete('/:id', (0, auth_1.default)(user_1.User_Role.SUPER_ADMIN, user_1.User_Role.ADMIN), controller_1.ServiceController.deleteServiceF);
router.patch('/:id', (0, auth_1.default)(user_1.User_Role.SUPER_ADMIN, user_1.User_Role.ADMIN), controller_1.ServiceController.updateService);
exports.ServiceRoute = router;
