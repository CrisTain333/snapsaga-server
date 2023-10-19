"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStatus = exports.User_Role = void 0;
var User_Role;
(function (User_Role) {
    User_Role["USER"] = "user";
    User_Role["ADMIN"] = "admin";
    User_Role["SUPER_ADMIN"] = "super_admin";
})(User_Role || (exports.User_Role = User_Role = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["CANCELED"] = "canceled";
    BookingStatus["COMPLETED"] = "completed";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
