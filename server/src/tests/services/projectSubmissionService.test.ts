


import mongoose from 'mongoose';
import { IProjectSubmissionMark } from '../../types/types';
import ProjectSubmissionService from '../../services/projectSubmissionMarksService';
import ProjectSubmissionRepository from '../../repositories/marks/projectSubmissionRepository';

jest.mock('../../repositories/marks/projectSubmissionRepository'); // Mock the repository module

let projectSubmissionService: ProjectSubmissionService;
let projectSubmissionRepositoryMock: jest.Mocked<ProjectSubmissionRepository>;
const student_id = new mongoose.Types.ObjectId('8817507c84674a77f23e5a6d');
const sampleId = new mongoose.Types.ObjectId('4817509c84674a67f23e5a6d');

const mockProjectSubmissionData: IProjectSubmissionMark = {
    student: {
        _id: student_id,
        name: "John Doe",
        studentId: "12345",
    },
    _id: sampleId,
    marks: 27,
    project_title: 'Library Management System',
    date: new Date("2024-11-23"),
};

beforeEach(() => {
    // Create a mock instance of the repository
    projectSubmissionRepositoryMock = new ProjectSubmissionRepository() as jest.Mocked<ProjectSubmissionRepository>;

    // Define the methods to be mocked
    projectSubmissionRepositoryMock.createProjectSubmissionData = jest.fn();
    projectSubmissionRepositoryMock.getAllProjectSubmissionData = jest.fn();
    projectSubmissionRepositoryMock.getProjectSubmissionDataByStudentId = jest.fn();
    projectSubmissionRepositoryMock.updateProjectSubmissionData = jest.fn();
    projectSubmissionRepositoryMock.deleteProjectSubmissionDataByStudentId = jest.fn();

    // Instantiate the service and replace the internal repository with the mock
    projectSubmissionService = new ProjectSubmissionService();
    projectSubmissionService['projectSubmissionRepository'] = projectSubmissionRepositoryMock;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('createProjectSubmissionData', () => {
    it('should create new project submission data', async () => {
        // Mock the resolved value for the method
        projectSubmissionRepositoryMock.createProjectSubmissionData.mockResolvedValue(mockProjectSubmissionData);
        
        const result = await projectSubmissionService.createProjectSubmissionData(mockProjectSubmissionData);

        expect(projectSubmissionRepositoryMock.createProjectSubmissionData).toHaveBeenCalledWith(mockProjectSubmissionData);
        expect(result).toEqual(mockProjectSubmissionData);
    });

    // Add more tests as needed...
});

    describe('getAllProjectSubmissionData', () => {

        it('should return all project submission data', async () => {
            projectSubmissionRepositoryMock.getAllProjectSubmissionData.mockResolvedValue([mockProjectSubmissionData]);
            const result = await projectSubmissionService.getAllProjectSubmissionData();

            expect(projectSubmissionRepositoryMock.getAllProjectSubmissionData).toHaveBeenCalled();
            expect(result).toEqual([mockProjectSubmissionData]);
        });

        it('should return null if no project submission data are found', async () => {
            projectSubmissionRepositoryMock.getAllProjectSubmissionData.mockResolvedValue(null);

            const result = await projectSubmissionService.getAllProjectSubmissionData();

            expect(result).toBeNull();
        });
    });

        describe('getProjectSubmissionDataByStudentId', () => {
            it('should return the project submission data for a given student ID', async () => {
                projectSubmissionRepositoryMock.getProjectSubmissionDataByStudentId.mockResolvedValue(mockProjectSubmissionData);
    
                const result = await projectSubmissionService.getProjectSubmissionDataByStudentId('123');
    
                expect(projectSubmissionRepositoryMock.getProjectSubmissionDataByStudentId).toHaveBeenCalledWith('123');
                expect(result).toEqual(mockProjectSubmissionData);
            });

        it('should return null if no project submission data is found for the given student ID', async () => {
            projectSubmissionRepositoryMock.getProjectSubmissionDataByStudentId.mockResolvedValue(null);

            const result = await projectSubmissionService.getProjectSubmissionDataByStudentId('123');

            expect(result).toBeNull();
        });
    });

    describe('updateProjectSubmissionData', () => {
        it('should update project submission data for the given student ID', async () => {
            const updates: Partial<IProjectSubmissionMark> = { marks: 28 };
            const updatedMark = { ...mockProjectSubmissionData, ...updates };
            projectSubmissionRepositoryMock.updateProjectSubmissionData.mockResolvedValue(updatedMark);

            const result = await projectSubmissionService.updateProjectSubmissionData('123', updates);

            expect(projectSubmissionRepositoryMock.updateProjectSubmissionData).toHaveBeenCalledWith('123', updates);
            expect(result).toEqual(updatedMark);
        });

        it('should return null if the project submission data to update is not found', async () => {
            projectSubmissionRepositoryMock.updateProjectSubmissionData.mockResolvedValue(null);

            const result = await projectSubmissionService.updateProjectSubmissionData('123', {marks: 24 });

            expect(result).toBeNull();
        });
    });

    describe('deleteProjectSubmissionData', () => {
        it('should delete project submission data for the given student ID', async () => {
            projectSubmissionRepositoryMock.deleteProjectSubmissionDataByStudentId.mockResolvedValue(mockProjectSubmissionData);

            const result = await projectSubmissionService.deleteProjectSubmissionDataByStudentId('123');

            expect(projectSubmissionRepositoryMock.deleteProjectSubmissionDataByStudentId).toHaveBeenCalledWith('123');
            expect(result).toEqual(mockProjectSubmissionData);
        });

        it('should return null if no project submission data is found for the given student ID', async () => {
            projectSubmissionRepositoryMock.deleteProjectSubmissionDataByStudentId.mockResolvedValue(null);

            const result = await projectSubmissionService.deleteProjectSubmissionDataByStudentId('123');

            expect(result).toBeNull();
        });
    });
