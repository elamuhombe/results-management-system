"use strict";
//src/services/authService.ts
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
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
class AuthService {
    // Login a user by verifying credentials and generating a token
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call the repository to handle user login logic
                const result = yield authRepository_1.default.loginUser(email, password);
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    // Logout functionality
    logout() {
        authRepository_1.default.logoutUser();
    }
}
exports.default = new AuthService();
