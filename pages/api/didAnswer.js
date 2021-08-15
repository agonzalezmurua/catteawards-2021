import { getSession } from "next-auth/client";
import { DatabaseClient } from "../../services/database_client";

export default async function didAnswer(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.json(false);
  }

  const didAnswer = await DatabaseClient.didAnswer(session.user.email);

  res.json(didAnswer);
}
