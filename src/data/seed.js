import { buildStudents, buildTeachers, buildTimetable } from './builders'

export { SCHOOL_CLASSES, CLASS_SECTIONS, formatClassLabel } from './classes'

export const ROLES = {
  PRINCIPAL: 'principal',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student',
}

export const STORAGE_KEY = 'masterminds_school_data'

export const SCHOOL_PERIODS = [
  { id: 'p1', label: 'Period 1', start: '08:00', end: '08:45' },
  { id: 'p2', label: 'Period 2', start: '08:45', end: '09:30' },
  { id: 'p3', label: 'Period 3', start: '09:30', end: '10:15' },
  { id: 'p4', label: 'Period 4', start: '10:30', end: '11:15' },
  { id: 'p5', label: 'Period 5', start: '11:15', end: '12:00' },
  { id: 'p6', label: 'Period 6', start: '12:45', end: '13:30' },
  { id: 'p7', label: 'Period 7', start: '13:30', end: '14:15' },
  { id: 'p8', label: 'Period 8', start: '14:15', end: '15:00' },
]

export function getDefaultData() {
  const teachers = buildTeachers()
  const students = buildStudents(teachers)

  return {
    principal: {
      id: 'principal-1',
      username: 'principal',
      password: 'admin123',
      name: 'Dr. Rajesh Kumar',
      role: ROLES.PRINCIPAL,
    },
    teachers,
    students,
    syllabus: [
      {
        id: 'syllabus-1',
        teacherId: 'teacher-13',
        class: '10',
        section: 'A',
        subject: 'Mathematics',
        units: [
          {
            title: 'Algebra',
            topics: ['Linear Equations', 'Quadratic Equations', 'Polynomials'],
            weeks: 4,
          },
          {
            title: 'Geometry',
            topics: ['Triangles', 'Circles', 'Coordinate Geometry'],
            weeks: 5,
          },
          {
            title: 'Trigonometry',
            topics: ['Ratios', 'Identities', 'Heights & Distances'],
            weeks: 3,
          },
        ],
        updatedAt: '2025-06-01',
      },
    ],
    attendance: [
      {
        id: 'att-1',
        studentId: 'student-1',
        teacherId: 'teacher-13',
        month: '2025-06',
        records: {
          '1': 'present', '2': 'present', '3': 'absent', '4': 'present',
          '5': 'present', '6': 'present', '9': 'present', '10': 'late',
          '11': 'present', '12': 'present',
        },
      },
      {
        id: 'att-2',
        studentId: 'student-2',
        teacherId: 'teacher-13',
        month: '2025-06',
        records: {
          '1': 'present', '2': 'present', '3': 'present', '4': 'present',
          '5': 'late', '6': 'present', '9': 'present', '10': 'present',
          '11': 'present', '12': 'absent',
        },
      },
    ],
    news: [
      {
        id: 'news-1',
        teacherId: 'teacher-13',
        title: 'Annual Science Exhibition — June 20',
        body: 'Students from Class 6–10 are invited to participate in the annual science exhibition. Submit project titles by June 15.',
        targetClass: 'all',
        targetSection: 'all',
        createdAt: '2025-06-05',
      },
      {
        id: 'news-2',
        teacherId: 'teacher-13',
        title: 'Mid-Term Exam Schedule Released',
        body: 'Mid-term examinations for Class 10 will begin on June 24. Nursery to UKG have separate assessment schedules.',
        targetClass: '10',
        targetSection: 'A',
        createdAt: '2025-06-08',
      },
    ],
    examResults: [
      {
        id: 'exam-1',
        studentId: 'student-1',
        teacherId: 'teacher-13',
        examName: 'Unit Test 1',
        term: 'Term 1',
        subjects: [
          { name: 'Mathematics', marks: 88, maxMarks: 100, grade: 'A' },
          { name: 'Science', marks: 76, maxMarks: 100, grade: 'B+' },
          { name: 'English', marks: 82, maxMarks: 100, grade: 'A' },
        ],
        publishedAt: '2025-05-20',
      },
      {
        id: 'exam-2',
        studentId: 'student-2',
        teacherId: 'teacher-13',
        examName: 'Unit Test 1',
        term: 'Term 1',
        subjects: [
          { name: 'Mathematics', marks: 92, maxMarks: 100, grade: 'A+' },
          { name: 'Science', marks: 85, maxMarks: 100, grade: 'A' },
          { name: 'English', marks: 90, maxMarks: 100, grade: 'A+' },
        ],
        publishedAt: '2025-05-20',
      },
    ],
    reports: [
      {
        id: 'report-1',
        studentId: 'student-1',
        teacherId: 'teacher-13',
        term: 'Term 1',
        type: 'progress',
        remarks:
          'Arjun shows strong aptitude in Mathematics. Consistent effort in Science will help improve overall performance.',
        rating: 'Good',
        createdAt: '2025-05-25',
      },
    ],
    periods: SCHOOL_PERIODS,
    timetable: buildTimetable(teachers),
    sports: [
      {
        id: 'sport-1',
        name: 'Cricket',
        coachId: 'teacher-14',
        schedule: 'Mon & Wed, 3:45 – 5:00 PM',
        venue: 'Main Cricket Ground',
        classes: 'Class 6 – 10',
        description: 'Inter-house cricket practice and tournament preparation.',
      },
      {
        id: 'sport-2',
        name: 'Football',
        coachId: 'teacher-14',
        schedule: 'Tue & Thu, 3:45 – 5:00 PM',
        venue: 'Sports Field',
        classes: 'Class 4 – 10',
        description: 'Football drills, fitness training, and league matches.',
      },
      {
        id: 'sport-3',
        name: 'Basketball',
        coachId: 'teacher-14',
        schedule: 'Friday, 3:45 – 5:00 PM',
        venue: 'Indoor Basketball Court',
        classes: 'Class 8 – 10',
        description: 'Basketball skills development and school team selection.',
      },
      {
        id: 'sport-4',
        name: 'Athletics & Track',
        coachId: 'teacher-14',
        schedule: 'Saturday, 7:00 – 8:30 AM',
        venue: 'Athletics Track',
        classes: 'Nursery – Class 10',
        description: 'Sprint, relay, long jump, and annual sports day preparation.',
      },
      {
        id: 'sport-5',
        name: 'Chess Club',
        coachId: 'teacher-5',
        schedule: 'Wednesday, 2:45 – 3:30 PM',
        venue: 'Activity Room B',
        classes: 'Class 3 – 10',
        description: 'Strategic thinking through chess tournaments and coaching.',
      },
      {
        id: 'sport-6',
        name: 'Yoga & Wellness',
        coachId: 'teacher-3',
        schedule: 'Mon & Fri, 7:00 – 7:45 AM',
        venue: 'Multipurpose Hall',
        classes: 'Nursery – Class 10',
        description: 'Morning yoga sessions for physical and mental wellness.',
      },
    ],
    holidays: [
      {
        id: 'hol-1',
        title: 'Republic Day',
        date: '2025-01-26',
        type: 'Public Holiday',
        description: 'National holiday — school closed.',
      },
      {
        id: 'hol-2',
        title: 'Holi',
        date: '2025-03-14',
        type: 'Public Holiday',
        description: 'Festival holiday.',
      },
      {
        id: 'hol-3',
        title: 'Summer Vacation',
        date: '2025-04-15',
        endDate: '2025-06-01',
        type: 'School Holiday',
        description: 'Annual summer break for all students and staff.',
      },
      {
        id: 'hol-4',
        title: 'Independence Day',
        date: '2025-08-15',
        type: 'Public Holiday',
        description: 'National holiday — flag hoisting ceremony.',
      },
      {
        id: 'hol-5',
        title: 'Dasara Holidays',
        date: '2025-10-02',
        endDate: '2025-10-10',
        type: 'School Holiday',
        description: 'Dasara festival break.',
      },
      {
        id: 'hol-6',
        title: 'Diwali',
        date: '2025-10-20',
        type: 'Public Holiday',
        description: 'Festival holiday.',
      },
      {
        id: 'hol-7',
        title: 'Christmas',
        date: '2025-12-25',
        type: 'Public Holiday',
        description: 'Christmas celebrations and holiday.',
      },
    ],
    teacherLeaves: [
      {
        id: 'leave-1',
        teacherId: 'teacher-11',
        fromDate: '2025-06-15',
        toDate: '2025-06-16',
        reason: 'Family function out of town',
        status: 'pending',
        appliedAt: '2025-06-10',
      },
      {
        id: 'leave-2',
        teacherId: 'teacher-7',
        fromDate: '2025-06-20',
        toDate: '2025-06-20',
        reason: 'Medical appointment',
        status: 'approved',
        appliedAt: '2025-06-08',
        reviewedAt: '2025-06-09',
      },
      {
        id: 'leave-3',
        teacherId: 'teacher-3',
        fromDate: '2025-06-18',
        toDate: '2025-06-19',
        reason: 'Personal leave',
        status: 'pending',
        appliedAt: '2025-06-11',
      },
    ],
  }
}
