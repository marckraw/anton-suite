"use client";

import React, { useState } from "react";
import { useAtom } from "jotai";
import { rightPaneOpenAtom, conversationAtom } from "@/store/store";
import { getOpenAIResponse } from "@/services/aiService";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ai } from "@/lib/http";
import { ConversationMessages } from "@/api-lib/ai.types";

export const ConversationPane: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(rightPaneOpenAtom);
  const [conversation, setConversation] = useAtom(conversationAtom);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setConversation([...conversation, { role: "user", content: input }]);

    setInput("");

    console.log("This is conversation:");
    console.log(conversation);

    console.log("current message: ");
    console.log(input);

    try {
      console.log("aksj.dkjasld");
    } catch (e) {
      console.log("Whatever...");
    }

    const messages: ConversationMessages = [
      {
        role: "user",
        content: input,
      },
    ];

    try {
      const response: any = await ai({ messages });
      const { data, ...rest } = response;
      console.log("This is maazing response from api: ");
      console.log(data);
      setConversation((prev) => [...prev, ...data.messages]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error." },
      ]);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[80%] w-[400px] sm:w-[540px]">
        <DrawerHeader className="pb-2">
          <DrawerTitle>Conversation</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-2 h-[calc(100%-10rem)] overflow-y-auto">
          <div className="space-y-2">
            {conversation.map((message, index) => (
              <div
                key={index}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
              >
                {message.role} - {message.content}
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="p-2 border rounded mb-2 w-full"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded w-full"
            >
              Send
            </button>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
