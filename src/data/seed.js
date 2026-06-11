export const ROLES = {
  PRINCIPAL: 'principal',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student',
}

export const STORAGE_KEY = 'masterminds_school_data'

export function getDefaultData() {
  return {
    principal: {
      id: 'principal-1',
      username: 'principal',
      password: 'admin123',
      name: 'Dr. Rajesh Kumar',
      role: ROLES.PRINCIPAL,
    },
    teachers: [
      {
        id: 'teacher-1',
        name: 'Smt. Priya Sharma',
        email: 'priya@masterminds.edu',
        password: 'teacher123',
        subject: 'Mathematics',
        phone: '9876543210',
        createdAt: '2024-06-01',
      },
    ],
    students: [
      {
        id: 'student-1',
        rollNo: 'MM2024001',
        name: 'Arjun Reddy',
        class: '10',
        section: 'A',
        dob: '2010-03-15',
        gender: 'Male',
        address: '12 MG Road, Hyderabad',
        parentName: 'Ravi Reddy',
        parentPhone: '9988776655',
        parentEmail: 'ravi.reddy@email.com',
        studentPassword: 'student123',
        parentPassword: 'parent123',
        teacherId: 'teacher-1',
        createdAt: '2024-06-10',
      },
    ],
    syllabus: [
      {
        id: 'syllabus-1',
        teacherId: 'teacher-1',
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
        teacherId: 'teacher-1',
        month: '2025-06',
        records: {
          '1': 'present',
          '2': 'present',
          '3': 'absent',
          '4': 'present',
          '5': 'present',
          '6': 'present',
          '9': 'present',
          '10': 'late',
          '11': 'present',
          '12': 'present',
        },
      },
    ],
    news: [
      {
        id: 'news-1',
        teacherId: 'teacher-1',
        title: 'Annual Science Exhibition — June 20',
        body: 'All Class 10 students are invited to participate in the annual science exhibition. Submit your project titles by June 15.',
        targetClass: '10',
        targetSection: 'all',
        createdAt: '2025-06-05',
      },
      {
        id: 'news-2',
        teacherId: 'teacher-1',
        title: 'Mid-Term Exam Schedule Released',
        body: 'Mid-term examinations for Class 10 will begin on June 24. Please check the syllabus and prepare accordingly.',
        targetClass: '10',
        targetSection: 'A',
        createdAt: '2025-06-08',
      },
    ],
    examResults: [
      {
        id: 'exam-1',
        studentId: 'student-1',
        teacherId: 'teacher-1',
        examName: 'Unit Test 1',
        term: 'Term 1',
        subjects: [
          { name: 'Mathematics', marks: 88, maxMarks: 100, grade: 'A' },
          { name: 'Science', marks: 76, maxMarks: 100, grade: 'B+' },
          { name: 'English', marks: 82, maxMarks: 100, grade: 'A' },
        ],
        publishedAt: '2025-05-20',
      },
    ],
    reports: [
      {
        id: 'report-1',
        studentId: 'student-1',
        teacherId: 'teacher-1',
        term: 'Term 1',
        type: 'progress',
        remarks:
          'Arjun shows strong aptitude in Mathematics. Consistent effort in Science will help improve overall performance.',
        rating: 'Good',
        createdAt: '2025-05-25',
      },
    ],
  }
}
