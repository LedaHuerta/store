import { getSession } from "next-auth/client";
const random = require("lodash/random");

const premium = async (request, response) => {
  const session = await getSession({ req: request });

  if (session == null) {
    response.status(401).end();

    return;
  }

  response.status(200).json({
    data: `https://randomfox.ca/images/${random(1, 122)}.jpg`,
    time: new Date().getTime(),
  });
};

export default premium;
