import LinkedInRepository from '../../repositories/marks/linkedinRepository';
import LinkedinService from '../../services/linkedinPostMarksService';
import { IAttendanceMark, ILinkedInPostMark } from '../../types/types';

import mongoose from 'mongoose';

jest.mock('../../repositories/marks/linkedinRepository');

describe('LinkedinService', () => {
    let linkedinPostService: LinkedinService;
    let linkedinRepositoryMock: jest.Mocked<LinkedInRepository>;
    const student_id = new mongoose.Types.ObjectId('507f1f77bcf86cd799439011')

    const sampleId = new mongoose.Types.ObjectId('4917109c84674a67f23e5a6d');

    beforeEach(() => {
        linkedinRepositoryMock = new LinkedInRepository() as jest.Mocked<LinkedInRepository>;
        linkedinPostService = new LinkedinService();
        linkedinPostService['linkedinRepository'] = linkedinRepositoryMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockLinkedInPostData: ILinkedInPostMark = {
        student: {
            _id: student_id,
            name: "John Doe",
            studentId: "245",
        },
        date: new Date("2024-10-23"),
        marks: 25,
        postLink: 'https://www.linkedin.com/posts/sample-post-id',
        _id: sampleId
    };

    describe('createLinkedInPostData', () => {
        it('should create new LinkedIn post data', async () => {
            linkedinRepositoryMock.createLinkedinData.mockResolvedValue(mockLinkedInPostData);

            const result = await linkedinPostService.createLinkedinPostData(mockLinkedInPostData);

            expect(linkedinRepositoryMock.createLinkedinData).toHaveBeenCalledWith(mockLinkedInPostData);
            expect(result).toEqual(mockLinkedInPostData);
        });
    });

    describe('getAllLinkedinPostData', () => {
        it('should return all LinkedIn post data', async () => {
            linkedinRepositoryMock.getAllLinkedInData.mockResolvedValue([mockLinkedInPostData]);

            const result = await linkedinPostService.getAllLinkedinPostData();

            expect(linkedinRepositoryMock.getAllLinkedInData).toHaveBeenCalled();
            expect(result).toEqual([mockLinkedInPostData]);
        });

        it('should return null if no LinkedIn post data is found', async () => {
            linkedinRepositoryMock.getAllLinkedInData.mockResolvedValue([]);

            const result = await linkedinPostService.getAllLinkedinPostData();

            expect(linkedinRepositoryMock.getAllLinkedInData).toHaveBeenCalled();
            expect(result).toEqual([]); // Adjust to an empty array instead of null for consistency
        });
    });

    describe('getLinkedinPostDataByStudentId', () => {
        it('should return LinkedIn post data if found', async () => {
            const mockData: ILinkedInPostMark = {
                student: {
                    _id: student_id,
                    name: "Jane Doe",
                    studentId: "123",
                },
                date: new Date(),
                marks: 90,
                postLink: 'https://www.linkedin.com/posts/example',
                _id: new mongoose.Types.ObjectId(),
            };
            linkedinRepositoryMock.getLinkedInData.mockResolvedValue(mockData);

            const result = await linkedinPostService.getLinkedinPostDataByStudentId(student_id.toString());

            expect(linkedinRepositoryMock.getLinkedInData).toHaveBeenCalledWith(student_id.toString());
            expect(result).toEqual(mockData);
        });

        it('should return null if no LinkedIn post data is found', async () => {
            linkedinRepositoryMock.getLinkedInData.mockResolvedValue(null);

            const result = await linkedinPostService.getLinkedinPostDataByStudentId('non-existent-id');

            expect(linkedinRepositoryMock.getLinkedInData).toHaveBeenCalledWith('non-existent-id');
            expect(result).toBeNull();
        });
    });

    describe('updateLinkedinPostData', () => {
        it('should update LinkedIn post data for the given student ID', async () => {
            const updates: Partial<ILinkedInPostMark> = { marks: 34 };
            const updatedMark = { ...mockLinkedInPostData, ...updates };
            linkedinRepositoryMock.updateLinkedInData.mockResolvedValue(updatedMark);

            const result = await linkedinPostService.updateLinkedinPostData(sampleId.toString(), updates);

            expect(linkedinRepositoryMock.updateLinkedInData).toHaveBeenCalledWith(sampleId.toString(), updates);
            expect(result).toEqual(updatedMark);
        });

        it('should return null if the LinkedIn post data to update is not found', async () => {
            linkedinRepositoryMock.updateLinkedInData.mockResolvedValue(null);

            const result = await linkedinPostService.updateLinkedinPostData('123', { marks: 36 });

            expect(result).toBeNull();
        });
    });

    describe('deleteLinkedinPostData', () => {
        it('should delete LinkedIn post data for the given student ID', async () => {
            linkedinRepositoryMock.deleteLinkedInData.mockResolvedValue(mockLinkedInPostData);

            const result = await linkedinPostService.deleteLinkedinPostData(sampleId.toString());

            expect(linkedinRepositoryMock.deleteLinkedInData).toHaveBeenCalledWith(sampleId.toString());
            expect(result).toEqual(mockLinkedInPostData);
        });

        it('should return null if no LinkedIn post data is found for the given student ID', async () => {
            linkedinRepositoryMock.deleteLinkedInData.mockResolvedValue(null);

            const result = await linkedinPostService.deleteLinkedinPostData('123');

            expect(result).toBeNull();
        });
    });

    describe('deleteAllLinkedinPostData', () => {
        it('should delete all LinkedIn post data and return the count of deleted documents', async () => {
            const mockDeletedCount = 5;
            linkedinRepositoryMock.deleteAllLinkedInData.mockResolvedValue({ deletedCount: mockDeletedCount });

            const result = await linkedinPostService.deleteAllLinkedinPostData();

            expect(linkedinRepositoryMock.deleteAllLinkedInData).toHaveBeenCalled();
            expect(result).toEqual({ deletedCount: mockDeletedCount });
        });

        it('should return a delete count of 0 if no documents were deleted', async () => {
            linkedinRepositoryMock.deleteAllLinkedInData.mockResolvedValue({ deletedCount: 0 });

            const result = await linkedinPostService.deleteAllLinkedinPostData();

            expect(linkedinRepositoryMock.deleteAllLinkedInData).toHaveBeenCalled();
            expect(result).toEqual({ deletedCount: 0 });
        });

        it('should throw an error if delete operation fails', async () => {
            linkedinRepositoryMock.deleteAllLinkedInData.mockRejectedValue(new Error('Delete operation failed'));

            await expect(linkedinPostService.deleteAllLinkedinPostData()).rejects.toThrow('Delete operation failed');
            expect(linkedinRepositoryMock.deleteAllLinkedInData).toHaveBeenCalled();
        });
    });
});
