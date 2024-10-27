"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const marksValidation_1 = require("../validation/marksValidation");
const XLSX = __importStar(require("xlsx"));
class ExcelFileUploadService {
    // Create a function to read and validate Excel files
    uploadExcelFile(file, dataType) {
        return __awaiter(this, void 0, void 0, function* () {
            // Read the Excel file
            const workbook = XLSX.read(file.buffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            // Convert the sheet to JSON
            const data = XLSX.utils.sheet_to_json(worksheet);
            // Validate data based on type
            let schema;
            switch (dataType) {
                case "attendance":
                    schema = marksValidation_1.attendanceMarkValidationSchema;
                    break;
                case "projectReview":
                    schema = marksValidation_1.projectReviewMarkValidationSchema;
                    break;
                case "linkedin":
                    schema = marksValidation_1.linkedInPostMarkValidationSchema;
                    break;
                case "assessment":
                    schema = marksValidation_1.assessmentMarkValidationSchema;
                    break;
                case "projectSubmission":
                    schema = marksValidation_1.projectSubmissionMarkValidationSchema;
                    break;
                default:
                    throw new Error("Invalid data type");
            }
            // Validate each row of data
            const validatedData = data.map((row) => schema.parse(row));
            return validatedData;
        });
    }
}
exports.default = ExcelFileUploadService;
