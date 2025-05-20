"use client";

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UIMessage } from "ai";
import { quizSchema } from '@/lib/schemas';



export function Chat() {

  const { object, submit, error } = useObject({
    api: '/api/quiz',
    schema: quizSchema,
  });
  
  
    const [files, setFiles] = React.useState<FileList | undefined>(undefined);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="grid w-screen h-screen grid-rows-[1fr_auto] max-w-[800px] m-auto">
      <div className="flex flex-col-reverse gap-8 p-8 overflow-y-auto">
      {object?.questions?.map((question, index) => (
        <div key={index}>
          <p>{question?.text}</p>
          <ul>{question?.answers?.map((answer) => (
            <li key={answer?.text}>{answer?.text} {answer?.isCorrect ? "✅" : "❌"}</li>
          ))}</ul>
        </div>
      ))}
      </div>

      {error && (
        <div className="px-8 pb-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              An error occurred while generating the response.
            </AlertDescription>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              // onClick={() => reload()}
            >
              Retry
            </Button>
          </Alert>
        </div>
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const payload: { messages: UIMessage[]; } = {
            messages: [
              {
                id: 'image',
                role: 'user',
                parts: [
                  {
                    type: 'file',
                    mediaType: 'image/png',
                    url: 'https://ami7ynpmfdaio2co.public.blob.vercel-storage.com/napoleon-X9M1p3TM1QML4h7smRMybHogT7dG9K.png'
                  }
                ]
              },
            ],
          };
          submit(payload);
          setFiles(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
        className="flex justify-center px-8 pt-0 pb-8"
      >
        <Card className="w-full p-0">
          <CardContent className="flex items-center gap-3 p-2">

            <div className="flex flex-1 items-center">
            <input
              type="file"
              className=""
              onChange={event => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              multiple
              ref={fileInputRef}
            />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="h-8 w-8 ml-1"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}