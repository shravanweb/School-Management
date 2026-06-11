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
  }
}
