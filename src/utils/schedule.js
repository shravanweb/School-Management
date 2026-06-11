export const SCHOOL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function formatTime(date = new Date()) {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export function getDayName(date = new Date()) {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
    date.getDay()
  ]
}

export function getCurrentPeriod(periods, date = new Date()) {
  const time = formatTime(date)
  return periods.find((p) => time >= p.start && time < p.end) || null
}

export function getLiveSessions(timetable, periods, teachers, date = new Date()) {
  const day = getDayName(date)
  const period = getCurrentPeriod(periods, date)
  if (!period || day === 'Sunday') return { day, period: null, sessions: [] }

  const sessions = timetable
    .filter((t) => t.day === day && t.periodId === period.id)
    .map((t) => ({
      ...t,
      period,
      teacher: teachers.find((te) => te.id === t.teacherId),
    }))
    .sort((a, b) => `${a.class}${a.section}`.localeCompare(`${b.class}${b.section}`))

  return { day, period, sessions }
}

export function getTeacherSchedule(timetable, teacherId) {
  return timetable
    .filter((t) => t.teacherId === teacherId)
    .sort((a, b) => {
      const dayOrder = SCHOOL_DAYS.indexOf(a.day) - SCHOOL_DAYS.indexOf(b.day)
      if (dayOrder !== 0) return dayOrder
      return a.periodId.localeCompare(b.periodId)
    })
}

export function getClassSchedule(timetable, classNum, section) {
  return timetable.filter((t) => t.class === classNum && t.section === section)
}

export function groupScheduleByDay(schedule, periods) {
  const grouped = {}
  for (const day of SCHOOL_DAYS) {
    grouped[day] = periods.map((p) => {
      const slot = schedule.find((s) => s.day === day && s.periodId === p.id)
      return slot ? { ...slot, period: p } : { period: p, empty: true }
    })
  }
  return grouped
}

export function isHolidayToday(holidays, date = new Date()) {
  const today = date.toISOString().split('T')[0]
  return holidays.find((h) => {
    if (h.endDate) return today >= h.date && today <= h.endDate
    return h.date === today
  })
}
