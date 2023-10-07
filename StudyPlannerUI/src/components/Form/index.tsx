import {
  SelectContainer,
  SelectLabel,
  StyledFieldset,
  StyledLegend,
  LegendContent
} from 'components/Select/style';
import { ChangeEvent, useState } from 'react';
import { SearchInput } from './styles';

// TODO: make onchange optional if readonly
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState<boolean>(!!value);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setHasValue(!!e.target.value);
  };

  return (
    <SelectContainer isOpen={isFocused} disabled={false}>
      <SelectLabel isOpen={isFocused || hasValue}>{placeholder || label}</SelectLabel>
      <StyledFieldset isOpen={isFocused}>
        <StyledLegend hasValue={hasValue || isFocused}>
          <LegendContent>{label}</LegendContent>
        </StyledLegend>
        <SearchInput
          {...rest}
          value={value || ''}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </StyledFieldset>
    </SelectContainer>
  );
};
