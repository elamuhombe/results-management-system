
import AssessmentRepository from '../../repositories/marks/assessmentRepository';
import AssessmentService from '../../services/assessmentMarksService';


import mongoose from 'mongoose';
import { IAssessmentMark } from '../../types/types';

jest.mock('../../repositories/marks/assessmentRepository');

let assessmentMarkService: AssessmentService;
let assessmentMarkRepositoryMock: jest.Mocked<AssessmentRepository>;
let student_id =  new mongoose.Types.ObjectId('8817507c84674a77f23e5a6d');
let sampleId = new mongoose.Types.ObjectId('4817509c84674a67f23e5a6d');

beforeEach(() => {
 assessmentMarkRepositoryMock = new AssessmentRepository() as jest.Mocked<AssessmentRepository>;
    assessmentMarkService = new AssessmentService();
    // Replace the internal repository instance with the mock
    assessmentMarkService['assessmentRepository'] = assessmentMarkRepositoryMock;
});

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockAssessmentMark: IAssessmentMark = {
        student: {
            _id: student_id,
            name: "John Doe",
            studentId: "12345",
        },
        _id: sampleId,
        subject: 'Programming  Fundamentals',
        marks: 27,
        date: new Date("2024-11-23")
      
    };

    describe('createAssessmenteData', () => {
        it('should create a new assessment data', async () => {

            assessmentMarkRepositoryMock.createAssessmentData.mockResolvedValue(mockAssessmentMark)
             const result = await assessmentMarkService.createAssessment(mockAssessmentMark)

            expect(assessmentMarkRepositoryMock.createAssessmentData).toHaveBeenCalledWith(mockAssessmentMark);
            expect(result).toEqual(mockAssessmentMark);
        });
    });

    describe('getAllAssessmentData', () => {

        it('should return all assessment data', async () => {
            assessmentMarkRepositoryMock.getAllAssessmentData.mockResolvedValue([mockAssessmentMark]);
            const result = await assessmentMarkService.getAllAssessments();

            expect(assessmentMarkRepositoryMock.getAllAssessmentData).toHaveBeenCalled();
            expect(result).toEqual([mockAssessmentMark]);
        });

        it('should return null if no assessment data are found', async () => {
            assessmentMarkRepositoryMock.getAllAssessmentData.mockResolvedValue(null);

            const result = await assessmentMarkService.getAllAssessments();

            expect(result).toBeNull();
        });
    });

        describe('getAssessmentDataByStudentId', () => {
            it('should return the assessment data for a given student ID', async () => {
                assessmentMarkRepositoryMock.getAssessmentDataByStudentId.mockResolvedValue(mockAssessmentMark);
    
                const result = await assessmentMarkService.getAssessmentByStudentId('123');
    
                expect(assessmentMarkRepositoryMock.getAssessmentDataByStudentId).toHaveBeenCalledWith('123');
                expect(result).toEqual(mockAssessmentMark);
            });

        it('should return null if no attendance mark is found for the given student ID', async () => {
            assessmentMarkRepositoryMock.getAssessmentDataByStudentId.mockResolvedValue(null);

            const result = await assessmentMarkService.getAssessmentByStudentId('123');

            expect(result).toBeNull();
        });
    });

    describe('updateAssessmentData', () => {
        it('should update assessment data for the given student ID', async () => {
            const updates: Partial<IAssessmentMark> = { marks: 28 };
            const updatedMark = { ...mockAssessmentMark, ...updates };
            assessmentMarkRepositoryMock.updateAssessmentData.mockResolvedValue(updatedMark);

            const result = await assessmentMarkService.updateAssessment('123', updates);

            expect(assessmentMarkRepositoryMock.updateAssessmentData).toHaveBeenCalledWith('123', updates);
            expect(result).toEqual(updatedMark);
        });

        it('should return null if the assessment data to update is not found', async () => {
            assessmentMarkRepositoryMock.updateAssessmentData.mockResolvedValue(null);

            const result = await assessmentMarkService.updateAssessment('123', {marks: 24 });

            expect(result).toBeNull();
        });
    });

    describe('deleteAssessmentData', () => {
        it('should delete an assessment data for the given student ID', async () => {
            assessmentMarkRepositoryMock.deleteAssessmentDataByStudentId.mockResolvedValue(mockAssessmentMark);

            const result = await assessmentMarkService.deleteAssessmentData('123');

            expect(assessmentMarkRepositoryMock.deleteAssessmentDataByStudentId).toHaveBeenCalledWith('123');
            expect(result).toEqual(mockAssessmentMark);
        });

        it('should return null if no assessment data is found for the given student ID', async () => {
            assessmentMarkRepositoryMock.deleteAssessmentDataByStudentId.mockResolvedValue(null);

            const result = await assessmentMarkService.deleteAssessmentData('123');

            expect(result).toBeNull();
        });
    });
