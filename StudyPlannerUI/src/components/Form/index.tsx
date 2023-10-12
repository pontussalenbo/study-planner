import {
  SelectContainer,
  SelectLabel,
  StyledFieldset,
  StyledLegend,
  LegendContent
} from 'components/Select/style';
import { ChangeEvent, useState } from 'react';
import { SearchInput } from './styles';
import FlexContainer from 'components/Layout';

interface CommonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMsg?: string;
}

type EditableInputProps = CommonProps & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: false;
};

type ReadOnlyInputProps = CommonProps & {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: true;
};

type FormInputProps = EditableInputProps | ReadOnlyInputProps;

// TODO: make onchange optional if readonly

export const FormInput: React.FC<FormInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  errorMsg,
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
    <FlexContainer direction='column' gap='5px' id='1'>
      <SelectContainer isOpen={isFocused} disabled={false} id='2'>
        <SelectLabel isOpen={isFocused || hasValue} id='3'>
          {placeholder || label}
        </SelectLabel>
        <StyledFieldset error={!!errorMsg} isOpen={isFocused} id='4'>
          <StyledLegend hasValue={hasValue || isFocused} id='5'>
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
      <span>{errorMsg}</span>
    </FlexContainer>
  );
};
