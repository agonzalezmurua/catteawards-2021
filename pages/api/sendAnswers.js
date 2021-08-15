import { getSession } from "next-auth/client";
import { DatabaseClient } from "../../services/database_client";

export default async function handle(req, res) {
  const session = await getSession({ req });

  if ((await DatabaseClient.didAnswer(session.user.email)) === false) {
    await DatabaseClient.sendChoices(session.user.email, req.body);
    return res.send(200);
  } else {
    return res.send(400);
  }
}
