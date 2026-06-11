import { createContext, useContext, useEffect, useState } from 'react'
import { STORAGE_KEY, getDefaultData } from '../data/seed'

const SchoolContext = createContext(null)

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    /* use default */
  }
  return getDefaultData()
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
    }))
  }

  const getTeacherById = (id) => data.teachers.find((t) => t.id === id)

  const getStudentByRollNo = (rollNo) =>
    data.students.find(
      (s) => s.rollNo.toLowerCase() === rollNo.trim().toLowerCase()
    )

  const getStudentsByTeacher = (teacherId) =>
    data.students.filter((s) => s.teacherId === teacherId)

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
