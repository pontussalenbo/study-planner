import React, { useEffect } from 'react';

const Table = (props: any) => {
	const headers = ['Course Code', 'Credits', 'Level', 'Name'];
	const contents = ['courseCode', 'credits', 'cycle', 'name_en'];

	useEffect(() => {
		const { courses } = props;
		console.log(courses);
	}, [props]);
	return (
		<div className='container'>
			<table className='table b-table w-100 table-striped table-hover table-sm text-left'>
				<thead className='thead-dark'>
					<tr>
						{headers.map(header => (
							<th className='p-2'>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{props.courses.map(course => (
						<tr>
							{contents.map(content => (
								<td>{course[content]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
