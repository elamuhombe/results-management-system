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
const authService_1 = __importDefault(require("../services/authService"));
class AuthController {
    // Handle user login
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const result = yield authService_1.default.login(email, password);
                res.status(200).json(result);
            }
            catch (error) {
                next(error); // Pass the error to the next middleware (error handler)
            }
        });
    }
    // Handle user logout
    logout(req, res, next) {
        try {
            authService_1.default.logout();
            res.status(200).json({ message: 'Logged out successfully' });
        }
        catch (error) {
            next(error); // Pass the error to the next middleware (error handler)
        }
    }
}
exports.default = AuthController;
