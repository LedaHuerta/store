import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { useSession, getSession } from "next-auth/client";

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  //validar sesión
  const session = await getSession(context);
  if (session === null) {
    //redirect
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

const PremiumPage = () => {
  const [session, loading] = useSession();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [refetchCounter, refetch] = useState(0);

  useEffect(() => {
    fetch("/api/premium")
      .then((response) => response.json())
      .then(({ data }) => setImageUrl(data));
  }, [refetchCounter]);

  if (loading) {
    return null;
  }
  //denegado
  if (session == null) {
    return (
      <div>
        <p>Acceso denegado</p>
        <Link href="/" passHref>
          <Button>Home</Button>
        </Link>
      </div>
    );
  }
  //logueado
  return (
    <div>
      <p>Contenido super secreto</p>
      {imageUrl == null ? null : (
        <img
          key={imageUrl}
          src={imageUrl}
          alt="Random fox"
          className="rounded"
        />
      )}
      <Button variant="outlined" onClick={() => refetch((c) => ++c)}>
        Ver más
      </Button>
      <Link href="/" passHref>
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default PremiumPage;
