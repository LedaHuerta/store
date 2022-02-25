import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { Comment, CommentProps } from "../../components/Wall/Comment";
import Link from "next/link";
import { Typography, Button } from "@mui/material";
import { AccessDenied } from "../../components/AccessDenied";
import { Editor } from "../../components/Wall/Editor";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);

  if (session == null) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
type Story = Pick<CommentProps, "name" | "imageUrl" | "text"> & { id: string };

const WallPage = () => {
  const [session] = useSession();
  const [stories, setStories] = useState<Story[]>([]);

  const addStory = (text: string) => {
    const message = text.trim();

    if (message.length < 1) {
      return;
    }

    const newStory: Story = {
      id: new Date().getTime().toString(),
      name: session?.user?.name || "",
      imageUrl: session?.user?.image || "",
      text: message,
    };

    setStories((previousStories) => [newStory, ...previousStories]);
  };

  if (session == null) {
    return <AccessDenied />;
  }
  return (
    <div>
      <div>
        <Typography variant="h2">El Muro</Typography>
        <div>
          <Editor onSubmit={addStory} />
        </div>
      </div>
      <section>
        {stories.map(({ id, ...storyProps }) => (
          <Comment key={id} {...storyProps} />
        ))}
        <Comment text="This man is a knight in shining armor. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they'll be." />
        <Comment text="Itaque quisquam dolores voluptates. Aut molestiae voluptates asperiores sequi et facere itaque porro doloribus!" />
        <Comment text="You hit me with a cricket bat. Stop talking, brain thinking. Hush. I'm the Doctor. Well, they call me the Doctor. I don't know why. I call me the Doctor too. I still don't know why. I am the Doctor, and you are the Daleks!" />
      </section>
    </div>
  );
};

export default WallPage;
