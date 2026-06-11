import { createContext, useContext, useEffect, useState } from 'react'
import { STORAGE_KEY, getDefaultData } from '../data/seed'

const SchoolContext = createContext(null)

function loadData() {
  const defaults = getDefaultData()
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...defaults,
        ...parsed,
        principal: parsed.principal ?? defaults.principal,
        teachers: parsed.teachers ?? defaults.teachers,
        students: parsed.students ?? defaults.students,
        syllabus: parsed.syllabus ?? defaults.syllabus,
        attendance: parsed.attendance ?? defaults.attendance,
        news: parsed.news ?? defaults.news,
        examResults: parsed.examResults ?? defaults.examResults,
        reports: parsed.reports ?? defaults.reports,
      }
    }
  } catch {
    /* use default */
  }
  return defaults
}

function matchesClassTarget(item, classNum, section) {
  const classMatch = item.targetClass === 'all' || item.targetClass === classNum
  const sectionMatch =
    item.targetSection === 'all' || item.targetSection === section
  return classMatch && sectionMatch
}

export function SchoolProvider({ children }) {
  const [data, setData] = useState(loadData)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const addTeacher = (teacher) => {
    const entry = {
      ...teacher,
      id: `teacher-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setData((prev) => ({ ...prev, teachers: [...prev.teachers, entry] }))
    return entry
  }

  const removeTeacher = (id) => {
    setData((prev) => ({
      ...prev,
      teachers: prev.teachers.filter((t) => t.id !== id),
      students: prev.students.filter((s) => s.teacherId !== id),
      syllabus: prev.syllabus.filter((s) => s.teacherId !== id),
      attendance: prev.attendance.filter((a) => a.teacherId !== id),
      news: prev.news.filter((n) => n.teacherId !== id),
      examResults: prev.examResults.filter((e) => e.teacherId !== id),
      reports: prev.reports.filter((r) => r.teacherId !== id),
    }))
  }

  const addStudent = (student) => {
    const entry = {
      ...student,
      id: `student-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setData((prev) => ({ ...prev, students: [...prev.students, entry] }))
    return entry
  }

  const updateStudent = (id, updates) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    }))
  }

  const removeStudent = (id) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id),
      attendance: prev.attendance.filter((a) => a.studentId !== id),
      examResults: prev.examResults.filter((e) => e.studentId !== id),
      reports: prev.reports.filter((r) => r.studentId !== id),
    }))
  }

  const getTeacherById = (id) => data.teachers.find((t) => t.id === id)

  const getStudentByRollNo = (rollNo) =>
    data.students.find(
      (s) => s.rollNo.toLowerCase() === rollNo.trim().toLowerCase()
    )

  const getStudentsByTeacher = (teacherId) =>
    data.students.filter((s) => s.teacherId === teacherId)

  const upsertSyllabus = (entry) => {
    setData((prev) => {
      const existing = prev.syllabus.find(
        (s) =>
          s.teacherId === entry.teacherId &&
          s.class === entry.class &&
          s.section === entry.section &&
          s.subject === entry.subject
      )
      if (existing) {
        return {
          ...prev,
          syllabus: prev.syllabus.map((s) =>
            s.id === existing.id
              ? {
                  ...s,
                  ...entry,
                  updatedAt: new Date().toISOString().split('T')[0],
                }
              : s
          ),
        }
      }
      const newEntry = {
        ...entry,
        id: `syllabus-${Date.now()}`,
        updatedAt: new Date().toISOString().split('T')[0],
      }
      return { ...prev, syllabus: [...prev.syllabus, newEntry] }
    })
  }

  const getSyllabusForClass = (classNum, section) =>
    data.syllabus.filter((s) => s.class === classNum && s.section === section)

  const getSyllabusByTeacher = (teacherId) =>
    data.syllabus.filter((s) => s.teacherId === teacherId)

  const setAttendanceRecord = (studentId, teacherId, month, records) => {
    setData((prev) => {
      const existing = prev.attendance.find(
        (a) =>
          a.studentId === studentId && a.teacherId === teacherId && a.month === month
      )
      if (existing) {
        return {
          ...prev,
          attendance: prev.attendance.map((a) =>
            a.id === existing.id ? { ...a, records } : a
          ),
        }
      }
      return {
        ...prev,
        attendance: [
          ...prev.attendance,
          {
            id: `att-${Date.now()}`,
            studentId,
            teacherId,
            month,
            records,
          },
        ],
      }
    })
  }

  const getAttendanceForStudent = (studentId, month) =>
    data.attendance.find((a) => a.studentId === studentId && a.month === month)

  const getAttendanceByTeacherMonth = (teacherId, month) =>
    data.attendance.filter((a) => a.teacherId === teacherId && a.month === month)

  const addNews = (entry) => {
    const newEntry = {
      ...entry,
      id: `news-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setData((prev) => ({ ...prev, news: [newEntry, ...prev.news] }))
    return newEntry
  }

  const removeNews = (id) => {
    setData((prev) => ({
      ...prev,
      news: prev.news.filter((n) => n.id !== id),
    }))
  }

  const getNewsForClass = (classNum, section) =>
    data.news
      .filter((n) => matchesClassTarget(n, classNum, section))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const getNewsByTeacher = (teacherId) =>
    data.news
      .filter((n) => n.teacherId === teacherId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const addExamResult = (entry) => {
    const newEntry = {
      ...entry,
      id: `exam-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
    }
    setData((prev) => ({ ...prev, examResults: [...prev.examResults, newEntry] }))
    return newEntry
  }

  const updateExamResult = (id, updates) => {
    setData((prev) => ({
      ...prev,
      examResults: prev.examResults.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    }))
  }

  const removeExamResult = (id) => {
    setData((prev) => ({
      ...prev,
      examResults: prev.examResults.filter((e) => e.id !== id),
    }))
  }

  const getExamResultsForStudent = (studentId) =>
    data.examResults
      .filter((e) => e.studentId === studentId)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

  const getExamResultsByTeacher = (teacherId) =>
    data.examResults.filter((e) => e.teacherId === teacherId)

  const addReport = (entry) => {
    const newEntry = {
      ...entry,
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setData((prev) => ({ ...prev, reports: [...prev.reports, newEntry] }))
    return newEntry
  }

  const updateReport = (id, updates) => {
    setData((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    }))
  }

  const removeReport = (id) => {
    setData((prev) => ({
      ...prev,
      reports: prev.reports.filter((r) => r.id !== id),
    }))
  }

  const getReportsForStudent = (studentId) =>
    data.reports
      .filter((r) => r.studentId === studentId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const getReportsByTeacher = (teacherId) =>
    data.reports.filter((r) => r.teacherId === teacherId)

  const getTeachersForStudent = (student) => {
    const teacherIds = new Set([student.teacherId])
    data.syllabus
      .filter((s) => s.class === student.class && s.section === student.section)
      .forEach((s) => teacherIds.add(s.teacherId))
    return [...teacherIds]
      .map((id) => data.teachers.find((t) => t.id === id))
      .filter(Boolean)
  }

  return (
    <SchoolContext.Provider
      value={{
        data,
        addTeacher,
        removeTeacher,
        addStudent,
        updateStudent,
        removeStudent,
        getTeacherById,
        getStudentByRollNo,
        getStudentsByTeacher,
        upsertSyllabus,
        getSyllabusForClass,
        getSyllabusByTeacher,
        setAttendanceRecord,
        getAttendanceForStudent,
        getAttendanceByTeacherMonth,
        addNews,
        removeNews,
        getNewsForClass,
        getNewsByTeacher,
        addExamResult,
        updateExamResult,
        removeExamResult,
        getExamResultsForStudent,
        getExamResultsByTeacher,
        addReport,
        updateReport,
        removeReport,
        getReportsForStudent,
        getReportsByTeacher,
        getTeachersForStudent,
      }}
    >
      {children}
    </SchoolContext.Provider>
  )
}

export function useSchool() {
  const ctx = useContext(SchoolContext)
  if (!ctx) throw new Error('useSchool must be used within SchoolProvider')
  return ctx
}
