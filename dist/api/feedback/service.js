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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const primsa_1 = require("../../shared/primsa");
const addFeedback = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield primsa_1.prisma.feedback.create({
        data: data
    });
    return result;
});
exports.FeedbackService = {
    addFeedback
};
