import { Select as StyledSelect, Label, SelectWrapper, OptionalText } from './style';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  optional?: boolean;
  options?: string[];
  children?: React.ReactNode;
}

export function Select({ label, options, optional, children, ...props }: Props) {
  const id = props.name + '_' + label;
  return (
    <SelectWrapper>
      <Label htmlFor={id}>
        {label} {optional && <OptionalText>(optional)</OptionalText>}
      </Label>
      <StyledSelect id={id} {...props}>
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
