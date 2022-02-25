import type { NextApiRequest, NextApiResponse } from "next";

const credentialsAuth = (req: NextApiRequest, res: NextApiResponse<User>) => {
  const {
    body: { password },
  } = req;
  //GET any not ok
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  //POST ok
  //Validar credenciales
  if (password === process.env.AUTH_PLATZI_SECRET) {
    const platziUser: User = {
      name: "Michelle Huerta",
      email: "ledamhuerta@gmail.com",
      image: "/assets/user.jpg",
    };
    return res.status(200).json(platziUser);
  }
  return res.status(401).end();
};

export default credentialsAuth;
