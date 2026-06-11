import { SCHOOL_CLASSES, getClassBand } from './classes'

const HOMEROOM_CONFIG = [
  { class: 'Nursery', name: 'Smt. Radha Krishnan', subject: 'Early Childhood', email: 'radha@masterminds.edu' },
  { class: 'LKG', name: 'Mrs. Swetha Thomas', subject: 'Early Childhood', email: 'swetha@masterminds.edu' },
  { class: 'UKG', name: 'Smt. Meena Krishnan', subject: 'Early Childhood', email: 'meena@masterminds.edu' },
  { class: '1', name: 'Shri. Aditya Singh', subject: 'Primary Education', email: 'aditya@masterminds.edu' },
  { class: '2', name: 'Mrs. Kavitha Nair', subject: 'Primary Education', email: 'kavitha@masterminds.edu' },
  { class: '3', name: 'Mr. Suresh Babu', subject: 'Primary Education', email: 'suresh@masterminds.edu' },
  { class: '4', name: 'Smt. Deepa Iyer', subject: 'Primary Education', email: 'deepa@masterminds.edu' },
  { class: '5', name: 'Shri. Karthik Reddy', subject: 'Primary Education', email: 'karthik@masterminds.edu' },
  { class: '6', name: 'Mr. Venkatesh Rao', subject: 'Middle School', email: 'venkatesh@masterminds.edu' },
  { class: '7', name: 'Smt. Lakshmi Devi', subject: 'Middle School', email: 'lakshmi@masterminds.edu' },
  { class: '8', name: 'Dr. Ramesh Kumar', subject: 'Middle School', email: 'ramesh@masterminds.edu' },
  { class: '9', name: 'Mrs. Anjali Mehta', subject: 'English', email: 'anjali@masterminds.edu' },
  { class: '10', name: 'Smt. Priya Sharma', subject: 'Mathematics', email: 'priya@masterminds.edu' },
]

const SPECIALIST_TEACHERS = [
  { id: 'teacher-14', name: 'Shri. Naveen Choudhary', subject: 'Physical Education', email: 'naveen@masterminds.edu', class: 'all', section: 'all', classTime: 'Mon–Sat, 3:00 – 3:45 PM' },
  { id: 'teacher-15', name: 'Smt. Divya Menon', subject: 'Library & Reading', email: 'divya@masterminds.edu', class: 'all', section: 'all', classTime: 'Saturday, 9:00 – 10:00 AM' },
  { id: 'teacher-16', name: 'Mrs. Pooja Agarwal', subject: 'Sanskrit', email: 'pooja@masterminds.edu', class: '9', section: 'A', classTime: 'Thu, 2:00 – 2:45 PM' },
  { id: 'teacher-17', name: 'Mr. Rajesh Varma', subject: 'Economics', email: 'rajesh.v@masterminds.edu', class: '10', section: 'A', classTime: 'Wed, 11:00 – 11:45 AM' },
  { id: 'teacher-18', name: 'Dr. Sunitha Rao', subject: 'Chemistry', email: 'sunitha@masterminds.edu', class: '10', section: 'A', classTime: 'Tue/Thu, 10:00 – 10:45 AM' },
]

const CLASS_TIMES = {
  Nursery: 'Mon–Fri, 9:00 – 12:00 PM',
  LKG: 'Mon–Fri, 9:00 – 12:30 PM',
  UKG: 'Mon–Fri, 8:30 – 12:30 PM',
  default: 'Mon–Fri, 8:00 AM – 3:00 PM',
}

const STUDENT_NAMES = {
  Nursery: [['Aadhya Reddy', 'Female'], ['Vihaan Kumar', 'Male']],
  LKG: [['Isha Patel', 'Female'], ['Reyansh Sharma', 'Male']],
  UKG: [['Anika Nair', 'Female'], ['Advik Rao', 'Male']],
  1: [['Diya Iyer', 'Female'], ['Arnav Singh', 'Male']],
  2: [['Myra Gupta', 'Female'], ['Kabir Das', 'Male']],
  3: [['Sara Mehta', 'Female'], ['Dhruv Reddy', 'Male']],
  4: [['Anvi Joshi', 'Female'], ['Rudra Varma', 'Male']],
  5: [['Kiara Naidu', 'Female'], ['Ayaan Babu', 'Male']],
  6: [['Pari Agarwal', 'Female'], ['Vivaan Choudhary', 'Male']],
  7: [['Navya Sri', 'Female'], ['Ishaan Kumar', 'Male']],
  8: [['Riya Thomas', 'Female'], ['Kian Reddy', 'Male']],
  9: [['Zara Patel', 'Female'], ['Aarav Sharma', 'Male']],
  10: [['Arjun Reddy', 'Male'], ['Sneha Patel', 'Female']],
}

const PRE_PRIMARY_WEEK = {
  Monday: ['p1', 'Rhymes & Stories', 'p2', 'Numbers & Shapes', 'p3', 'Art & Craft', 'p4', 'Play Time'],
  Tuesday: ['p1', 'English Basics', 'p2', 'Rhymes & Stories', 'p3', 'Numbers & Shapes', 'p4', 'Music & Movement'],
  Wednesday: ['p1', 'Art & Craft', 'p2', 'Play Time', 'p3', 'English Basics', 'p4', 'Rhymes & Stories'],
  Thursday: ['p1', 'Numbers & Shapes', 'p2', 'Music & Movement', 'p3', 'Play Time', 'p4', 'Art & Craft'],
  Friday: ['p1', 'Rhymes & Stories', 'p2', 'English Basics', 'p3', 'Art & Craft', 'p4', 'Play Time'],
  Saturday: ['p1', 'Music & Movement', 'p2', 'Play Time'],
}

const PRIMARY_WEEK = {
  Monday: ['p1', 'English', 'p2', 'Mathematics', 'p3', 'EVS', 'p4', 'Telugu', 'p5', 'Hindi', 'p6', 'Art', 'p7', 'Computer', 'p8', 'Physical Education'],
  Tuesday: ['p1', 'Mathematics', 'p2', 'English', 'p3', 'Hindi', 'p4', 'EVS', 'p5', 'Telugu', 'p6', 'Computer', 'p7', 'Art', 'p8', 'Physical Education'],
  Wednesday: ['p1', 'English', 'p2', 'Mathematics', 'p3', 'Telugu', 'p4', 'EVS', 'p5', 'Hindi', 'p6', 'Physical Education', 'p7', 'Art', 'p8', 'Computer'],
  Thursday: ['p1', 'Mathematics', 'p2', 'English', 'p3', 'EVS', 'p4', 'Hindi', 'p5', 'Telugu', 'p6', 'Computer', 'p7', 'Physical Education', 'p8', 'Art'],
  Friday: ['p1', 'English', 'p2', 'Mathematics', 'p3', 'Hindi', 'p4', 'Telugu', 'p5', 'EVS', 'p6', 'Art', 'p7', 'Physical Education', 'p8', 'Computer'],
  Saturday: ['p1', 'Library', 'p2', 'Art', 'p3', 'Physical Education'],
}

const MIDDLE_WEEK = {
  Monday: ['p1', 'English', 'p2', 'Mathematics', 'p3', 'Science', 'p4', 'Social Studies', 'p5', 'Hindi', 'p6', 'Telugu', 'p7', 'Computer', 'p8', 'Physical Education'],
  Tuesday: ['p1', 'Mathematics', 'p2', 'Science', 'p3', 'English', 'p4', 'Hindi', 'p5', 'Social Studies', 'p6', 'Computer', 'p7', 'Telugu', 'p8', 'Art'],
  Wednesday: ['p1', 'English', 'p2', 'Mathematics', 'p3', 'Social Studies', 'p4', 'Science', 'p5', 'Telugu', 'p6', 'Hindi', 'p7', 'Physical Education', 'p8', 'Computer'],
  Thursday: ['p1', 'Science', 'p2', 'Mathematics', 'p3', 'English', 'p4', 'Social Studies', 'p5', 'Hindi', 'p6', 'Computer', 'p7', 'Art', 'p8', 'Physical Education'],
  Friday: ['p1', 'English', 'p2', 'Mathematics', 'p3', 'Hindi', 'p4', 'Science', 'p5', 'Telugu', 'p6', 'Social Studies', 'p7', 'Physical Education', 'p8', 'Computer'],
  Saturday: ['p1', 'Library', 'p2', 'Science Lab', 'p3', 'Physical Education'],
}

const SECONDARY_WEEK = {
  Monday: [
    ['p1', 'English', 'anjali'],
    ['p2', 'Mathematics', 'priya'],
    ['p3', 'Hindi', 'deepa'],
    ['p4', 'Physics', 'ramesh'],
    ['p5', 'Telugu', 'karthik'],
    ['p6', 'Social Studies', 'suresh'],
    ['p7', 'Chemistry', 'lakshmi'],
    ['p8', 'Biology', 'venkatesh'],
  ],
  Tuesday: [
    ['p1', 'English', 'anjali'],
    ['p2', 'Mathematics', 'priya'],
    ['p3', 'Hindi', 'deepa'],
    ['p4', 'Chemistry', 'lakshmi'],
    ['p5', 'Biology', 'venkatesh'],
    ['p6', 'Computer Science', 'kavitha'],
    ['p7', 'Art & Craft', 'meena'],
    ['p8', 'Economics', 'rajesh'],
  ],
  Wednesday: [
    ['p1', 'English', 'anjali'],
    ['p2', 'Mathematics', 'priya'],
    ['p3', 'Physics', 'ramesh'],
    ['p4', 'Telugu', 'karthik'],
    ['p5', 'Social Studies', 'suresh'],
    ['p6', 'Sanskrit', 'pooja'],
    ['p7', 'Computer Science', 'kavitha'],
    ['p8', 'Library', 'divya'],
  ],
  Thursday: [
    ['p1', 'English', 'anjali'],
    ['p2', 'Mathematics', 'priya'],
    ['p3', 'Hindi', 'deepa'],
    ['p4', 'Physics', 'ramesh'],
    ['p5', 'Chemistry', 'lakshmi'],
    ['p6', 'Physical Education', 'naveen'],
    ['p7', 'Moral Science', 'naveen'],
    ['p8', 'Biology', 'venkatesh'],
  ],
  Friday: [
    ['p1', 'English', 'anjali'],
    ['p2', 'Mathematics', 'priya'],
    ['p3', 'Telugu', 'karthik'],
    ['p4', 'Social Studies', 'suresh'],
    ['p5', 'Economics', 'rajesh'],
    ['p6', 'Computer Science', 'kavitha'],
    ['p7', 'Moral Science', 'naveen'],
    ['p8', 'Hindi', 'deepa'],
  ],
  Saturday: [
    ['p1', 'Library', 'divya'],
    ['p2', 'Physical Education', 'naveen'],
    ['p3', 'Mathematics', 'priya'],
  ],
}

const TEACHER_KEY_MAP = {
  priya: 'teacher-13',
  anjali: 'teacher-12',
  ramesh: 'teacher-11',
  lakshmi: 'teacher-18',
  venkatesh: 'teacher-9',
  karthik: 'teacher-8',
  deepa: 'teacher-7',
  suresh: 'teacher-6',
  kavitha: 'teacher-5',
  meena: 'teacher-3',
  rajesh: 'teacher-17',
  pooja: 'teacher-16',
  naveen: 'teacher-14',
  divya: 'teacher-15',
}

export function buildTeachers() {
  const homeroom = HOMEROOM_CONFIG.map((cfg, i) => ({
    id: `teacher-${i + 1}`,
    name: cfg.name,
    email: cfg.email,
    password: 'teacher123',
    subject: cfg.subject,
    class: cfg.class,
    section: 'A',
    classTime: CLASS_TIMES[cfg.class] || CLASS_TIMES.default,
    phone: `9876543${String(210 + i).slice(-3)}`,
    isClassTeacher: true,
    createdAt: '2024-06-01',
  }))

  const specialists = SPECIALIST_TEACHERS.map((t) => ({
    ...t,
    password: 'teacher123',
    phone: '9876543299',
    isClassTeacher: false,
    createdAt: '2024-06-01',
  }))

  return [...homeroom, ...specialists]
}

export function buildStudents(teachers) {
  const students = []
  let roll = 1
  const orderedClasses = ['10', ...SCHOOL_CLASSES.filter((c) => c !== '10')]

  for (const cls of orderedClasses) {
    const classTeacher = teachers.find((t) => t.class === cls && t.isClassTeacher)
    const names = STUDENT_NAMES[cls] || [['Student One', 'Male'], ['Student Two', 'Female']]

    names.forEach(([name, gender], idx) => {
      const year = cls === '10' ? 2010 : cls === '9' ? 2011 : 2015
      students.push({
        id: `student-${roll}`,
        rollNo: `MM2024${String(roll).padStart(3, '0')}`,
        name,
        class: cls,
        section: 'A',
        dob: `${year}-0${(idx + 3)}-15`,
        gender,
        address: `${roll * 3} School Road, Hyderabad`,
        parentName: `Parent of ${name.split(' ')[0]}`,
        parentPhone: `9988776${String(600 + roll).slice(-3)}`,
        parentEmail: `parent.${roll}@email.com`,
        studentPassword: 'student123',
        parentPassword: 'parent123',
        teacherId: classTeacher?.id || 'teacher-13',
        createdAt: '2024-06-10',
      })
      roll += 1
    })
  }

  return students
}

function parseWeekSlots(weekDef, homeroomId, peId, libraryId) {
  const entries = []
  for (const [day, slots] of Object.entries(weekDef)) {
    if (Array.isArray(slots[0])) {
      for (const [periodId, subject, key] of slots) {
        entries.push({ day, periodId, subject, teacherId: TEACHER_KEY_MAP[key] || homeroomId })
      }
    } else {
      for (let i = 0; i < slots.length; i += 2) {
        const periodId = slots[i]
        const subject = slots[i + 1]
        let teacherId = homeroomId
        if (subject === 'Physical Education') teacherId = peId
        if (subject === 'Library') teacherId = libraryId
        entries.push({ day, periodId, subject, teacherId })
      }
    }
  }
  return entries
}

export function buildTimetable(teachers) {
  const peId = teachers.find((t) => t.id === 'teacher-14')?.id
  const libraryId = teachers.find((t) => t.id === 'teacher-15')?.id
  const entries = []
  let n = 1

  for (const cls of SCHOOL_CLASSES) {
    const homeroom = teachers.find((t) => t.class === cls && t.isClassTeacher)
    const homeroomId = homeroom?.id
    const band = getClassBand(cls)

    let slots = []
    if (band === 'preprimary') slots = parseWeekSlots(PRE_PRIMARY_WEEK, homeroomId, peId, libraryId)
    else if (band === 'primary') slots = parseWeekSlots(PRIMARY_WEEK, homeroomId, peId, libraryId)
    else if (band === 'middle') slots = parseWeekSlots(MIDDLE_WEEK, homeroomId, peId, libraryId)
    else slots = parseWeekSlots(SECONDARY_WEEK, homeroomId, peId, libraryId)

    for (const slot of slots) {
      entries.push({
        id: `tt-${n++}`,
        class: cls,
        section: 'A',
        ...slot,
      })
    }
  }

  return entries
}
