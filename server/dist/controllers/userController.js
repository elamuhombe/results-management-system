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
const userService_1 = __importDefault(require("../services/userService"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler")); // Import the error handler
class UserController {
    constructor() {
        this.userService = new userService_1.default();
    }
    // Controller method to register a new user
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const newUser = yield this.userService.registerUser(userData);
                return res.status(201).json(newUser);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get user data by email
    getUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const user = yield this.userService.getUserData({ email });
                return res.status(200).json(user);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get all user data
    getAllUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUserData();
                return res.status(200).json(users);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to update user data
    updateUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const updates = req.body;
                const updatedUser = yield this.userService.updateUserData({ email, updates });
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete a user
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const deletedUser = yield this.userService.deleteUser({ email });
                return res.status(200).json(deletedUser);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to reset user password
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const resetPasswordResponse = yield this.userService.resetPassword({ email });
                return res.status(200).json(resetPasswordResponse);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
}
exports.default = UserController;
