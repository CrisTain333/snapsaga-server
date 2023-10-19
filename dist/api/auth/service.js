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
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const httpCodes_1 = require("../../shared/httpCodes");
const jwtHelpers_1 = require("../../utils/helper/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const primsa_1 = require("../../shared/primsa");
const hashPassword_1 = require("../../shared/hashPassword");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = user;
    //Check the email exist in database or not ;
    const isExits = yield primsa_1.prisma.user.findUnique({
        where: {
            email
        }
    });
    if (isExits) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Email already exists');
    }
    const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
    const convertedPassword = hashedPassword;
    // now create the user;
    const newUser = yield primsa_1.prisma.user.create({
        data: {
            email,
            name,
            password: convertedPassword
        }
    });
    return newUser;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isUserExist = yield primsa_1.prisma.user.findUnique({
        where: {
            email: userEmail
        }
    });
    // check the email exist
    if (!isUserExist) {
        throw new ApiError_1.default(httpCodes_1.httpCode.NOT_FOUND, 'User does not exist');
    }
    // check the password
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    // if not matched throw error;
    if (!isPasswordMatched) {
        throw new ApiError_1.default(httpCodes_1.httpCode.UNAUTHORIZED, 'Invalid credentials');
    }
    const { email, role } = isUserExist;
    // if matched created
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ role, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken
    };
});
exports.AuthService = { createUser, login };
