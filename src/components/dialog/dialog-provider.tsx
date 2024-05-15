import { ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import Dialog from "./dialog";

//TODO: to fix any
const DialogContext = createContext({} as any);

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }: {children: ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const openDialog = (content: SetStateAction<string>) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setContent("");
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{ isOpen, openDialog, closeDialog, content }}
    >
      {children}
      <Dialog></Dialog>
    </DialogContext.Provider>
  );
};
