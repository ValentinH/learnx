import { z } from 'zod';

export const quizSchema = z.object({
  questions: z.array(
    z.object({
      text: z.string().describe('Question text.'),
      answers: z.array(z.object({
        text: z.string().describe('Answer text.'),
        isCorrect: z.boolean().describe('Whether the answer is correct.'),
      })).describe('Answers to the question.'),
    }),
  ),
});