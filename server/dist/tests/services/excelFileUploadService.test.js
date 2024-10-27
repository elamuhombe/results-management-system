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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = __importStar(require("xlsx"));
const marksValidation_1 = require("../../validation/marksValidation");
const uploadExcelFileService_1 = __importDefault(require("../../services/uploadExcelFileService"));
// Mock the XLSX library
jest.mock('xlsx', () => ({
    read: jest.fn(),
    utils: {
        sheet_to_json: jest.fn(),
    },
}));
// Mock validation schemas
jest.mock('../../validation/marksValidation', () => ({
    assessmentMarkValidationSchema: {
        parse: jest.fn(),
    },
    attendanceMarkValidationSchema: {
        parse: jest.fn(),
    },
    linkedInPostMarkValidationSchema: {
        parse: jest.fn(),
    },
    projectReviewMarkValidationSchema: {
        parse: jest.fn(),
    },
    projectSubmissionMarkValidationSchema: {
        parse: jest.fn(),
    },
}));
// ... existing imports and mocks
describe('ExcelFileUploadService', () => {
    let excelFileUploadService;
    beforeEach(() => {
        excelFileUploadService = new uploadExcelFileService_1.default();
    });
    // Valid Data Type Tests
    const validDataTypes = ['attendance', 'projectReview', 'projectSubmission', 'assessment',
        'linkedin'];
    it.each(validDataTypes)('should upload and validate %s data', (type) => __awaiter(void 0, void 0, void 0, function* () {
        const mockFile = {
            buffer: Buffer.from('mock excel data'),
        };
        const mockData = [{ name: 'John Doe', attendance: 'Present' }]; // Example data based on type
        XLSX.read.mockReturnValue({
            SheetNames: ['Sheet1'],
            Sheets: {
                Sheet1: {},
            },
        });
        XLSX.utils.sheet_to_json.mockReturnValue(mockData);
        // Map the validation schema based on the type
        const validationSchemas = {
            attendance: marksValidation_1.attendanceMarkValidationSchema,
            projectReview: marksValidation_1.projectReviewMarkValidationSchema,
            projectSubmission: marksValidation_1.projectSubmissionMarkValidationSchema,
            assessment: marksValidation_1.assessmentMarkValidationSchema,
            linkedin: marksValidation_1.linkedInPostMarkValidationSchema,
        };
        validationSchemas[type].parse.mockReturnValue(mockData[0]);
        const result = yield excelFileUploadService.uploadExcelFile(mockFile, type);
        expect(XLSX.read).toHaveBeenCalledWith(mockFile.buffer, { type: 'buffer' });
        expect(XLSX.utils.sheet_to_json).toHaveBeenCalledWith({});
        expect(validationSchemas[type].parse).toHaveBeenCalledWith(mockData[0]);
        expect(result).toEqual(mockData);
    }));
    it('should throw error for invalid data type', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockFile = {
            buffer: Buffer.from('mock excel data'),
        };
        yield expect(excelFileUploadService.uploadExcelFile(mockFile, 'invalidType')).rejects.toThrow('Invalid data type');
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
