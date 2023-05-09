import { Select as StyledSelect, Label, SelectWrapper } from './style';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export function Select({ label, options, ...props }: Props) {
  return (
    <SelectWrapper>
      <Label>{label}</Label>
      <StyledSelect {...props}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
}
