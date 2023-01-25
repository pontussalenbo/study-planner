import React from 'react';
import styles from './Pagination.module.css';
import { usePagination, DOTS } from '../hooks/usePagination';

interface IPaginationProps {
	onPageChange: (page: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
}

const Pagination = (props: IPaginationProps) => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize
	});

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	const lastPage = paginationRange[paginationRange.length - 1];
	return (
		<ul className={`${styles.paginationContainer} ${styles.paginationBar}`}>
			{/* Left navigation arrow */}
			<li
				className={
					currentPage === 1
						? styles.paginationItemDisabled
						: styles.paginationItem
				}
				onClick={onPrevious}
			>
				<div className={`${styles.arrow} ${styles.arrowLeft}`} />
			</li>
			{paginationRange.map(pageNumber => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === DOTS) {
					return (
						<li className={styles.paginationItemDots}>&#8230;</li>
					);
				}

				// Render our Page Pills
				return (
					<li
						className={
							pageNumber === currentPage
								? `${styles.paginationItemSelected} ${styles.paginationItem}`
								: styles.paginationItem
						}
						onClick={() => onPageChange(pageNumber)}
					>
						<a href='#'>{pageNumber}</a>
					</li>
				);
			})}
			{/*  Right Navigation arrow */}
			<li
				className={
					currentPage === lastPage
						? styles.paginationItemDisabled
						: styles.paginationItem
				}
				onClick={onNext}
			>
				<div className={`${styles.arrow} ${styles.arrowRight}`} />
			</li>
		</ul>
	);
};

export default Pagination;
