import { useEffect } from "react";

export const EMAIL = "t.srinikitha@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
