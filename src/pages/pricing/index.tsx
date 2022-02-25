import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const index = () => {
  return (
    <div>
      <p>Contenido de pricing</p>
      <Link href="/" passHref>
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default index;
