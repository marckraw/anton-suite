import { atom } from "jotai";
import { ConversationMessages } from "@/api-lib/ai.types";

export const settingsOpenAtom = atom(false);
export const aboutDialogOpenAtom = atom(false);
export const commandMenuOpenAtom = atom(false);
export const rightPaneOpenAtom = atom(false);
export const conversationAtom = atom<ConversationMessages>([]);

interface Message {
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  messages: Message[];
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Load conversations from local storage
const loadConversations = (): Conversation[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("conversations");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

// Save conversations to local storage
const saveConversations = (conversations: Conversation[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }
};

// Atom for storing all conversations
export const conversationsAtom = atom<Conversation[]>(loadConversations());

// Atom for the current conversation ID
export const currentConversationIdAtom = atom<string | null>(null);

// Derived atom for the current conversation
export const currentConversationAtom = atom(
  (get) => {
    const conversations = get(conversationsAtom);
    const currentId = get(currentConversationIdAtom);
    return conversations.find((conv) => conv.id === currentId) || null;
  },
  (get, set, updatedConversation: Conversation | null) => {
    if (!updatedConversation) return;

    const conversations = get(conversationsAtom);
    const updatedConversations = conversations.map((conv) =>
      conv.id === updatedConversation.id ? updatedConversation : conv,
    );

    set(conversationsAtom, updatedConversations);
    saveConversations(updatedConversations);
  },
);

// Action to create a new conversation
export const createConversationAtom = atom(null, (get, set) => {
  const newConversation: Conversation = {
    id: generateId(),
    messages: [],
  };

  const conversations = [...get(conversationsAtom), newConversation];
  set(conversationsAtom, conversations);
  set(currentConversationIdAtom, newConversation.id);
  saveConversations(conversations);
});

// Action to add a message to the current conversation
export const addMessageAtom = atom(
  null,
  (get, set, message: Omit<Message, "timestamp">) => {
    const currentConversation = get(currentConversationAtom);
    if (!currentConversation) return;

    const updatedConversation = {
      ...currentConversation,
      messages: [
        ...currentConversation.messages,
        { ...message, timestamp: Date.now() },
      ],
    };

    set(currentConversationAtom, updatedConversation);
  },
);

// Action to delete a conversation
export const deleteConversationAtom = atom(null, (get, set, id: string) => {
  const conversations = get(conversationsAtom).filter((conv) => conv.id !== id);
  set(conversationsAtom, conversations);

  if (get(currentConversationIdAtom) === id) {
    set(currentConversationIdAtom, conversations[0]?.id || null);
  }

  saveConversations(conversations);
});
