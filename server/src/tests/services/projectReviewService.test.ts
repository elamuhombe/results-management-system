import mongoose from "mongoose";
import { IProjectReviewMark } from "../../types/types";
import ProjectReviewService from "../../services/projectReviewMarksService";
import ProjectReviewRepository from "../../repositories/marks/projectReviewRepository";

jest.mock("../../repositories/marks/projectReviewRepository"); // Mock the repository module

let projectReviewService: ProjectReviewService;
let projectReviewRepositoryMock: jest.Mocked<ProjectReviewRepository>;
const student_id = new mongoose.Types.ObjectId("8817507c84674a77f23e5a6d");
const sampleId = new mongoose.Types.ObjectId("4817509c84674a67f23e5a6d");

const mockProjectReviewData: IProjectReviewMark = {
  student: {
    _id: student_id,
    name: "John Doe",
    studentId: "12345",
  },
  _id: sampleId,
  marks: 27,
  project_title: "Credon security system",
  feedback: "Consider adding indexing to your database to speed up query times",
  date: new Date("2024-11-23"),
};

beforeEach(() => {
  // Create a mock instance of the repository
  projectReviewRepositoryMock =
    new ProjectReviewRepository() as jest.Mocked<ProjectReviewRepository>;

  // Define the methods to be mocked
  projectReviewRepositoryMock.createProjectReviewMark = jest.fn();
  projectReviewRepositoryMock.getAllProjectReviewData = jest.fn();
  projectReviewRepositoryMock.getProjectReviewMarkByStudentId = jest.fn();
  projectReviewRepositoryMock.updateProjectReviewDataByStudentId = jest.fn();
  projectReviewRepositoryMock.deleteProjectReviewData = jest.fn();

  // Instantiate the service and replace the internal repository with the mock
  projectReviewService = new ProjectReviewService();
  projectReviewService["projectReviewRepository"] = projectReviewRepositoryMock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("createProjectReviewData", () => {
  it("should create new project review data", async () => {
    // Mock the resolved value for the method
    projectReviewRepositoryMock.createProjectReviewMark.mockResolvedValue(
      mockProjectReviewData
    );

    const result = await projectReviewService.createProjectReviewData(
      mockProjectReviewData
    );

    expect(
      projectReviewRepositoryMock.createProjectReviewMark
    ).toHaveBeenCalledWith(mockProjectReviewData);
    expect(result).toEqual(mockProjectReviewData);
  });

  // Add more tests as needed...
});

describe("getAllProjectReviewData", () => {
  it("should return all project review data", async () => {
    projectReviewRepositoryMock.getAllProjectReviewData.mockResolvedValue([
      mockProjectReviewData,
    ]);
    const result = await projectReviewService.getAllProjectReviewData();

    expect(
      projectReviewRepositoryMock.getAllProjectReviewData
    ).toHaveBeenCalled();
    expect(result).toEqual([mockProjectReviewData]);
  });

  it("should return null if no project review data are found", async () => {
    projectReviewRepositoryMock.getAllProjectReviewData.mockResolvedValue(null);

    const result = await projectReviewService.getAllProjectReviewData();

    expect(result).toBeNull();
  });
});

describe("getProjectReviewDataByStudentId", () => {
  it("should return the project revioew data for a given student ID", async () => {
    projectReviewRepositoryMock.getProjectReviewMarkByStudentId.mockResolvedValue(
      mockProjectReviewData
    );

    const result = await projectReviewService.getProjectReviewDataByStudentId(
      "123"
    );

    expect(
      projectReviewRepositoryMock.getProjectReviewMarkByStudentId
    ).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockProjectReviewData);
  });

  it("should return null if no project review data is found for the given student ID", async () => {
    projectReviewRepositoryMock.getProjectReviewMarkByStudentId.mockResolvedValue(
      null
    );

    const result = await projectReviewService.getProjectReviewDataByStudentId(
      "123"
    );

    expect(result).toBeNull();
  });
});

describe("updateProjectReviewData", () => {
  it("should update project review data for the given student ID", async () => {
    const updates: Partial<IProjectReviewMark> = { marks: 28 };
    const updatedMark = { ...mockProjectReviewData, ...updates };
    projectReviewRepositoryMock.updateProjectReviewDataByStudentId.mockResolvedValue(
      updatedMark
    );

    const result = await projectReviewService.updateProjectReviewData(
      "123",
      updates
    );

    expect(
      projectReviewRepositoryMock.updateProjectReviewDataByStudentId
    ).toHaveBeenCalledWith("123", updates);
    expect(result).toEqual(updatedMark);
  });

  it("should return null if the project review data to update is not found", async () => {
    projectReviewRepositoryMock.updateProjectReviewDataByStudentId.mockResolvedValue(
      null
    );

    const result = await projectReviewService.updateProjectReviewData("123", {
      marks: 24,
    });

    expect(result).toBeNull();
  });
});

describe("deleteProjectReviewDataByStudentId", () => {
  it("should delete project submission data for the given student ID", async () => {
    projectReviewRepositoryMock.deleteProjectReviewData.mockResolvedValue(
      mockProjectReviewData
    );

    const result =
      await projectReviewService.deleteProjectReviewDataByStudentId("123");

    expect(
      projectReviewRepositoryMock.deleteProjectReviewData
    ).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockProjectReviewData);
  });

  it("should return null if no project review data is found for the given student ID", async () => {
    projectReviewRepositoryMock.deleteProjectReviewData.mockResolvedValue(null);

    const result =
      await projectReviewService.deleteProjectReviewDataByStudentId("123");

    expect(result).toBeNull();
  });
});
