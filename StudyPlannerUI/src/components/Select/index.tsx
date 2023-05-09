import { Select as StyledSelect, Label, SelectWrapper } from './style';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options?: string[];
  children?: React.ReactNode;
}

export function Select({ label, options, children, ...props }: Props) {
  return (
    <SelectWrapper>
      <Label htmlFor={props.name}>{label}</Label>
      <StyledSelect {...props}>
        {children}
        {options?.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
}
