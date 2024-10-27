import * as XLSX from 'xlsx';
import {
  assessmentMarkValidationSchema,
  attendanceMarkValidationSchema,
  linkedInPostMarkValidationSchema,
  projectReviewMarkValidationSchema,
  projectSubmissionMarkValidationSchema,
} from '../../validation/marksValidation';
import ExcelFileUploadService from '../../services/uploadExcelFileService';

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
    let excelFileUploadService: ExcelFileUploadService;
  
    beforeEach(() => {
      excelFileUploadService = new ExcelFileUploadService();
    });
  
    // Valid Data Type Tests
    const validDataTypes = ['attendance', 'projectReview', 'projectSubmission', 'assessment', 
        'linkedin'] as const;
  
    it.each(validDataTypes)('should upload and validate %s data', async (type) => {
      const mockFile = {
        buffer: Buffer.from('mock excel data'),
      } as Express.Multer.File;
  
      const mockData = [{ name: 'John Doe', attendance: 'Present' }]; // Example data based on type
  
      (XLSX.read as jest.Mock).mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: {
          Sheet1: {},
        },
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockData);
      
      // Map the validation schema based on the type
      const validationSchemas: Record<string, any> = {
        attendance: attendanceMarkValidationSchema,
        projectReview: projectReviewMarkValidationSchema,
        projectSubmission: projectSubmissionMarkValidationSchema,
        assessment: assessmentMarkValidationSchema,
        linkedin: linkedInPostMarkValidationSchema,
      };
  
      (validationSchemas[type].parse as jest.Mock).mockReturnValue(mockData[0]);
  
      const result = await excelFileUploadService.uploadExcelFile(mockFile, type);
  
      expect(XLSX.read).toHaveBeenCalledWith(mockFile.buffer, { type: 'buffer' });
      expect(XLSX.utils.sheet_to_json).toHaveBeenCalledWith({});
      expect(validationSchemas[type].parse).toHaveBeenCalledWith(mockData[0]);
      expect(result).toEqual(mockData);
    });
  
    it('should throw error for invalid data type', async () => {
      const mockFile = {
        buffer: Buffer.from('mock excel data'),
      } as Express.Multer.File;
  
      await expect(
        excelFileUploadService.uploadExcelFile(mockFile, 'invalidType' as any)
      ).rejects.toThrow('Invalid data type');
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
  