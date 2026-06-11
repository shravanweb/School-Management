export function BarChart({ title, data, suffix = '', maxValue }) {
  const peak = maxValue || Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="bar-chart">
        {data.map((item) => (
          <div key={item.label} className="bar-chart-row">
            <span className="bar-label" title={item.label}>
              {item.label}
            </span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(item.value / peak) * 100}%`,
                  background: item.color || undefined,
                }}
              />
            </div>
            <span className="bar-value">
              {item.value}
              {suffix}
            </span>
          </div>
        ))}
        {data.length === 0 && <p className="chart-empty">No data available</p>}
      </div>
    </div>
  )
}

export function ColumnChart({ title, data }) {
  const peak = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="column-chart">
        {data.map((item) => (
          <div key={item.label} className="column-item">
            <div className="column-bar-wrap">
              <div
                className="column-bar"
                style={{
                  height: `${(item.value / peak) * 100}%`,
                  background: item.color || 'var(--navy)',
                }}
                title={`${item.label}: ${item.value}`}
              />
            </div>
            <span className="column-label">{item.label}</span>
          </div>
        ))}
        {data.length === 0 && <p className="chart-empty">No data available</p>}
      </div>
    </div>
  )
}

export function AnalyticsTable({ title, columns, rows }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="table-wrap">
        <table className="data-table analytics-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="empty-row">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
