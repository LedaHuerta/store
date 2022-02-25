// import clsx from "clsx";

import { Typography } from "@mui/material";

export type CommentProps = {
  name?: string;
  imageUrl?: string;
  className?: string;
  text: string;
};

export function Comment(props: CommentProps) {
  const image = props.imageUrl ?? "/assets/user.jpg";
  const name = props.name ?? "Michelle Huerta";

  return (
    <article>
      <figure style={{ maxWidth: 42, maxHeight: 42, padding: 3 }}>
        <img alt={name} src={image} width={42} />
      </figure>
      <div>
        <header>
          <Typography variant="h6">{name}</Typography>
        </header>
        <div dangerouslySetInnerHTML={{ __html: props.text }} />
      </div>
    </article>
  );
}
