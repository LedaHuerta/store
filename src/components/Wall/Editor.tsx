import { FormEventHandler, KeyboardEventHandler } from "react";
import { TextField, Button } from "@mui/material";
import sanitizeHTML from "sanitize-html";

type EditorOnSubmitHandler = (value: string, form: HTMLFormElement) => void;

export type EditorProps = {
  onSubmit: EditorOnSubmitHandler;
  resetOnSubmit?: boolean;
};

export function Editor({
  resetOnSubmit = true,
  onSubmit: onSubmitCb,
}: EditorProps) {
  const onSubmit: EditorOnSubmitHandler = (value, form) => {
    if (resetOnSubmit) {
      form.reset();
    }
    const safeHTML = sanitizeHTML(value, {
      allowedTags: ["strong", "em", "a", "b"],
      allowedAttributes: {
        a: ["href"],
      },
    });

    onSubmitCb(safeHTML, form);
  };

  const shareStory: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(event.currentTarget.story.value, event.currentTarget);
  };

  const submitOnKeyDown: KeyboardEventHandler<HTMLFormElement> = ({
    key,
    metaKey,
    currentTarget,
  }) => {
    if (key === "Enter" && metaKey) {
      onSubmit(currentTarget.story.value, currentTarget);
    }
  };

  return (
    <form onSubmit={shareStory} onKeyDown={submitOnKeyDown}>
      <TextField
        id="story-input"
        name="story"
        label="whatsUp"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
      />
      <Button variant="outlined" type="submit">
        Compartir
      </Button>
    </form>
  );
}
