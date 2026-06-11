export const SCHOOL_CLASSES = [
  'Nursery',
  'LKG',
  'UKG',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
]

export const CLASS_SECTIONS = ['A', 'B']

export function formatClassLabel(cls) {
  if (['Nursery', 'LKG', 'UKG'].includes(cls)) return cls
  return `Class ${cls}`
}

export function getClassBand(cls) {
  if (['Nursery', 'LKG', 'UKG'].includes(cls)) return 'preprimary'
  if (['1', '2', '3', '4', '5'].includes(cls)) return 'primary'
  if (['6', '7', '8'].includes(cls)) return 'middle'
  return 'secondary'
}
