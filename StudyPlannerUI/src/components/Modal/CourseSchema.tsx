import { z } from 'zod';

const errorMsgs = {
  courseCode: 'Course code is required',
  courseName: 'Course name is required',
  credits: 'Credits must be between 1 and 30',
  level: 'Level must be G1, G2 or A',
  start: {
    bound: 'Start period must be between 1 and 4',
    order: 'Start period must be before end period'
  },
  end: {
    bound: 'End period must be between 1 and 4',
    order: 'End period must be after start period'
  }
};

export const courseSchema = z.object({
  courseCode: z.string().min(1, errorMsgs.courseCode),
  courseName: z.string().min(1, errorMsgs.courseName),
  credits: z.number().min(1, errorMsgs.credits).max(30, errorMsgs.credits),
  level: z.enum(['G1', 'G2', 'A'], { required_error: errorMsgs.level }),
  periods: z.array(
    z
      .object({
        start: z.number().min(1, errorMsgs.start.bound).max(4, errorMsgs.start.bound),
        end: z.number().min(1, errorMsgs.end.bound).max(4, errorMsgs.end.bound)
      })
      .refine(data => data.start <= data.end, {
        message: errorMsgs.start.order,
        path: ['start']
      })
      .refine(data => data.end >= data.start, {
        message: errorMsgs.end.order,
        path: ['end']
      })
  )
});
