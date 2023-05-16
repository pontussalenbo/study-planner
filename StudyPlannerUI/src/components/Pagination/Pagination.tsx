import { usePagination, DOTS } from '../../hooks/usePagination';
import {
  PaginationContainer,
  ArrowLeft,
  ArrowRight,
  PaginationItem,
  PaginationItemDots,
  PageNumber
} from './styles';

interface IPaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

function Pagination(props: IPaginationProps): JSX.Element | null {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = (): void => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = (): void => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <PaginationContainer>
      <PaginationItem
        disabled={currentPage === 1}
        onClick={currentPage === 1 ? undefined : onPrevious}
      >
        <ArrowLeft />
      </PaginationItem>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return <PaginationItemDots key={`dots_${idx}`}>&#8230;</PaginationItemDots>;
        }

        return (
          <PaginationItem
            key={pageNumber}
            selected={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber as number)}
          >
            <PageNumber href='/#' onClick={e => e.preventDefault()}>
              {pageNumber}
            </PageNumber>
          </PaginationItem>
        );
      })}
      <PaginationItem
        disabled={currentPage === lastPage}
        onClick={currentPage === lastPage ? undefined : onNext}
      >
        <ArrowRight />
      </PaginationItem>
    </PaginationContainer>
  );
}

export default Pagination;
