import AttendanceMarkRepository from '../../repositories/marks/attendanceRepository';
import AttendanceMarkService from '../../services/attendanceMarksService';
import { IAttendanceMark } from '../../types/types';

import mongoose from 'mongoose';

jest.mock('../../repositories/marks/attendanceRepository');

describe('AttendanceMarkService', () => {
    let attendanceMarkService: AttendanceMarkService;
    let attendanceMarkRepositoryMock: jest.Mocked<AttendanceMarkRepository>;
    let student_id =  new mongoose.Types.ObjectId('8817507c84674a77f23e5a6d');
    let sampleId = new mongoose.Types.ObjectId('4817509c84674a67f23e5a6d');

    beforeEach(() => {
        attendanceMarkRepositoryMock = new AttendanceMarkRepository() as jest.Mocked<AttendanceMarkRepository>;
        attendanceMarkService = new AttendanceMarkService();
        // Replace the internal repository instance with the mock
        attendanceMarkService['attendanceMarkRepository'] = attendanceMarkRepositoryMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockAttendanceMark: IAttendanceMark = {
        student: {
            _id: student_id,
            name: "John Doe",
            studentId: "12345",
        },
        date: new Date("2024-10-23"),
        attendancePercentage: 100,
        marks: 17,
        status: "present",
        _id: sampleId
    };

    describe('createAttendanceMark', () => {
        it('should create a new attendance mark', async () => {
            attendanceMarkRepositoryMock.createAttendanceMark.mockResolvedValue(mockAttendanceMark);

            const result = await attendanceMarkService.createAttendanceMark(mockAttendanceMark);

            expect(attendanceMarkRepositoryMock.createAttendanceMark).toHaveBeenCalledWith(mockAttendanceMark);
            expect(result).toEqual(mockAttendanceMark);
        });
    });

    describe('getAllAttendanceMarks', () => {
        it('should return all attendance marks', async () => {
            attendanceMarkRepositoryMock.getAllAttendanceMarks.mockResolvedValue([mockAttendanceMark]);

            const result = await attendanceMarkService.getAllAttendanceMarks();

            expect(attendanceMarkRepositoryMock.getAllAttendanceMarks).toHaveBeenCalled();
            expect(result).toEqual([mockAttendanceMark]);
        });

        it('should return null if no attendance marks are found', async () => {
            attendanceMarkRepositoryMock.getAllAttendanceMarks.mockResolvedValue(null);

            const result = await attendanceMarkService.getAllAttendanceMarks();

            expect(result).toBeNull();
        });
    });

    describe('getAttendanceMarkByStudentId', () => {
        it('should return the attendance mark for a given student ID', async () => {
            attendanceMarkRepositoryMock.getAttendanceMarkByStudentId.mockResolvedValue(mockAttendanceMark);

            const result = await attendanceMarkService.getAttendanceMarkByStudentId('123');

            expect(attendanceMarkRepositoryMock.getAttendanceMarkByStudentId).toHaveBeenCalledWith('123');
            expect(result).toEqual(mockAttendanceMark);
        });

        it('should return null if no attendance mark is found for the given student ID', async () => {
            attendanceMarkRepositoryMock.getAttendanceMarkByStudentId.mockResolvedValue(null);

            const result = await attendanceMarkService.getAttendanceMarkByStudentId('123');

            expect(result).toBeNull();
        });
    });

    describe('updateAttendanceMark', () => {
        it('should update an attendance mark for the given student ID', async () => {
            const updates: Partial<IAttendanceMark> = { status: 'absent' };
            const updatedMark = { ...mockAttendanceMark, ...updates };
            attendanceMarkRepositoryMock.updateAttendanceDataByStudentId.mockResolvedValue(updatedMark);

            const result = await attendanceMarkService.updateAttendanceMark('123', updates);

            expect(attendanceMarkRepositoryMock.updateAttendanceDataByStudentId).toHaveBeenCalledWith('123', updates);
            expect(result).toEqual(updatedMark);
        });

        it('should return null if the attendance mark to update is not found', async () => {
            attendanceMarkRepositoryMock.updateAttendanceDataByStudentId.mockResolvedValue(null);

            const result = await attendanceMarkService.updateAttendanceMark('123', { status: 'absent' });

            expect(result).toBeNull();
        });
    });

    describe('deleteAttendanceMark', () => {
        it('should delete an attendance mark for the given student ID', async () => {
            attendanceMarkRepositoryMock.deleteAttendanceMark.mockResolvedValue(mockAttendanceMark);

            const result = await attendanceMarkService.deleteAttendanceMark('123');

            expect(attendanceMarkRepositoryMock.deleteAttendanceMark).toHaveBeenCalledWith('123');
            expect(result).toEqual(mockAttendanceMark);
        });

        it('should return null if no attendance mark is found for the given student ID', async () => {
            attendanceMarkRepositoryMock.deleteAttendanceMark.mockResolvedValue(null);

            const result = await attendanceMarkService.deleteAttendanceMark('123');

            expect(result).toBeNull();
        });
    });
});
