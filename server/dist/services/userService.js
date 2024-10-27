"use strict";
//src/services/userService.ts
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
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
class UserService {
    constructor() {
        this.userRepository = new userRepository_1.default();
    }
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.registerUser(userData);
        });
    }
    getUserData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUserData(userData);
        });
    }
    getAllUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getAllUserData();
        });
    }
    updateUserData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.updateUserData(userData);
        });
    }
    deleteUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.deleteUser(userData);
        });
    }
    resetPassword(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.resetPassword(userData);
        });
    }
}
exports.default = UserService;
