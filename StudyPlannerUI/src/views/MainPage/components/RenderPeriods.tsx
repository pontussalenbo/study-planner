/**
 * Renders periods as a select if there are multiple periods,
 * otherwise as a span in the table.
 * @param periods Periods to render
 * @returns JSX.Element
 */
export default function renderPeriods(
  data: { periods: API.Period[]; row: CourseData.DataWithLocale },
  onChange: (...args: any) => void
) {
  const { periods, row } = data;
  if (!periods || periods.length === 0) return null;

  if (periods.length > 1) {
    return (
      <select
        required
        onChange={e => {
          e.preventDefault();
          onChange(row, e.target.value);
        }}
        defaultValue=''
      >
        <option value='' disabled>
          Please select
        </option>
        {periods.map((period, index) => (
          <option key={index} value={`${period.Start},${period.End}`}>
            {period.Start} {period.End - period.Start > 0 ? ` -> ${period.End}` : ''}
          </option>
        ))}
      </select>
    );
  }

  const period = periods[0];
  return (
    <span>
      {period.Start} {period.End - period.Start > 0 ? ` -> ${period.End}` : ''}
    </span>
  );
}
