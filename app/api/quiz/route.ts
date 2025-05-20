import { convertToModelMessages, streamObject, UIMessage } from "ai";
import { DEFAULT_MODEL } from "@/lib/constants";
import { gateway } from "@/lib/gateway";
import { quizSchema } from '@/lib/schemas';

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    messages,
  }: { messages: UIMessage[];  } = await req.json();


  console.log({ messages })
  console.log(convertToModelMessages(messages))
  
  const result = streamObject({
    model: gateway(DEFAULT_MODEL),
    system: "Généres moi un quizz avec 5 questions à choix multiples sur ce cours.",
    messages: convertToModelMessages(messages),
    schema: quizSchema,
    onError: (e) => {
      console.error(`Error while streaming.`, e);
    },
  });

  return result.toTextStreamResponse();
}