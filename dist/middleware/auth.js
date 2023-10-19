"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jwtHelpers_1 = require("../utils/helper/jwtHelpers");
const ApiError_1 = __importDefault(require("../error/ApiError"));
const httpCodes_1 = require("../shared/httpCodes");
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(401, 'You are not authorized');
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        req.user = verifiedUser;
        // role diye guard korar jnno
        console.log(verifiedUser);
        if (requiredRoles.length &&
            !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError_1.default(httpCodes_1.httpCode.FORBIDDEN, `You Don't  have permission to access this.`);
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
