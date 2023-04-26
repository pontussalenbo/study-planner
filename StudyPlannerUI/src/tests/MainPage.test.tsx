/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
//@ts-nocheck

//TODO : Fix?

import { describe, expect } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from 'views/MainPage';
import { useFetch } from 'hooks/useFetchCourses';

vi.mock('hooks/useFetchCourses', () => {
  return { useFetch: vi.fn() };
});

describe('MainPage', () => {
  let mockFetch: ReturnType<typeof mockUseFetch>;

  afterEach(() => {
    mockFetch = mockUseFetch();
    mockFetch.mockReset();
  });

  test('renders loading state', () => {
    mockFetch.mockReturnValue({ data: null, loading: true, error: null });
    render(<MainPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    const errorMessage = 'Error loading courses';
    mockFetch.mockReturnValue({
      data: null,
      loading: false,
      error: { message: errorMessage }
    });
    render(<MainPage />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  test('renders courses table and add course', async () => {
    // Mock the data returned by useFetch
    mockFetch.mockReturnValue({
      data: [
        {
          id: 1,
          course_code: 'ABC123',
          course_name: 'Sample Course 1',
          credits: 3,
          periods: [{ Start: 1, End: 2 }]
        },
        {
          id: 2,
          course_code: 'DEF456',
          course_name: 'Sample Course 2',
          credits: 4,
          periods: [{ Start: 3, End: 4 }]
        }
      ],
      loading: false,
      error: null
    });

    render(<MainPage />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    expect(screen.getByText('Sample Course 1')).toBeInTheDocument();
    expect(screen.getByText('Sample Course 2')).toBeInTheDocument();

    const addButton = screen.getAllByText('Add')[0];
    fireEvent.click(addButton);

    expect(screen.getByText('Selected Courses')).toBeInTheDocument();
    expect(screen.getByText('Sample Course 1')).toBeInTheDocument();
  });

  test('renders credits table', async () => {
    mockFetch.mockReturnValue({ data: [], loading: false, error: null });
    render(<MainPage />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(screen.getByText('Credits')).toBeInTheDocument();
  });

  test('renders horizontal bar chart', async () => {
    mockFetch.mockReturnValue({ data: [], loading: false, error: null });
    render(<MainPage />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(screen.getAllByTestId('horizontal-bar-chart')).toHaveLength(2);
  });
});
