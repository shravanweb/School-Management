import { SCHOOL_CLASSES, formatClassLabel } from '../data/seed'

export default function ClassFilterSelect({ value, onChange, getCount, id = 'class-filter' }) {
  return (
    <div className="class-filter-select">
      <label htmlFor={id}>
        Filter by Class
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="all">All Classes ({getCount('all')})</option>
          {SCHOOL_CLASSES.map((cls) => (
            <option key={cls} value={cls}>
              {formatClassLabel(cls)} ({getCount(cls)})
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
