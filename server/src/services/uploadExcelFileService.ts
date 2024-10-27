import {
  assessmentMarkValidationSchema,
  attendanceMarkValidationSchema,
  linkedInPostMarkValidationSchema,
  projectReviewMarkValidationSchema,
  projectSubmissionMarkValidationSchema,
} from "../validation/marksValidation";
import * as XLSX from "xlsx";

class ExcelFileUploadService {
  // Create a function to read and validate Excel files
  async uploadExcelFile(
    file: Express.Multer.File,
    dataType:
      | "attendance"
      | "projectReview"
      | "linkedin"
      | "assessment"
      | "projectSubmission"
  ) {
    // Read the Excel file
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);

    // Validate data based on type
    let schema;
    switch (dataType) {
      case "attendance":
        schema = attendanceMarkValidationSchema;
        break;
      case "projectReview":
        schema = projectReviewMarkValidationSchema;
        break;
      case "linkedin":
        schema = linkedInPostMarkValidationSchema;
        break;
      case "assessment":
        schema = assessmentMarkValidationSchema;
        break;
      case "projectSubmission":
        schema = projectSubmissionMarkValidationSchema;
        break;
      default:
        throw new Error("Invalid data type");
    }

    // Validate each row of data
    const validatedData = data.map((row) => schema.parse(row));

    return validatedData;
  }

  // Export the function for use in other parts of your application
}
export default ExcelFileUploadService;
