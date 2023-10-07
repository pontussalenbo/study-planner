import {
  SelectContainer,
  SelectLabel,
  StyledFieldset,
  StyledLegend,
  LegendContent
} from './Select/style';

interface ReadonlyFieldProps {
  label: string;
  value: string;
}

export function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <SelectContainer isOpen={false} disabled>
      <SelectLabel isOpen={false}>{value}</SelectLabel>
      <StyledFieldset isOpen={false}>
        <StyledLegend hasValue>
          <LegendContent>{label}</LegendContent>
        </StyledLegend>
      </StyledFieldset>
    </SelectContainer>
  );
}
