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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const createFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faqData = __rest(req.body, []);
    const result = yield service_1.FaqService.createFaq(faqData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faq Added successfully',
        data: result
    });
}));
const getFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.FaqService.getFaq();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faq fetched successfully',
        data: result
    });
}));
const deleteFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_1.FaqService.deleteFaq(parseInt(id));
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faq deleted successfully',
        data: result
    });
}));
const updateFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield service_1.FaqService.updateFaq(parseInt(id), data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faq updated successfully',
        data: result
    });
}));
exports.FaqController = {
    createFaq,
    getFaq,
    deleteFaq,
    updateFaq
};
