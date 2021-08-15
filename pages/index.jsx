import { useCallback, useEffect, useMemo } from "react";
import Head from "next/head";
import useSWR from "swr";
import { useSession } from "next-auth/client";
import Router from "next/router";

import styles from "../styles/Home.module.css";

import { Discord } from "../services/discord_client";
import { Gsheet } from "../services/gsheet_client,";
import { WebClient, WebClientFetcher } from "../services/web_client";

import Questionary from "../components/organisms/Form";
import Loader from "../components/atoms/Loader";

export async function getStaticProps(ctx) {
  const members = await Discord.getMembers();
  const questions = await Gsheet.getQuestions();

  return {
    props: {
      members: members,
      questions: questions,
    },
  };
}

export default function Home(props) {
  const [session] = useSession();
  const { data: didAnswer, mutate: setDidAnswer } = useSWR(
    "/api/didAnswer",
    WebClientFetcher
  );

  const handleSubmit = useCallback(
    async (values) => {
      const answers = {};

      Object.entries(values).forEach(([name, username]) => {
        const { id } = props.members.find(
          (member) => member.username === username
        );

        answers[name] = id;
      });

      await WebClient.post("/api/sendAnswers", answers);
      setDidAnswer(true, false);
    },
    [props.members, setDidAnswer]
  );

  const isReady = useMemo(() => {
    return session !== null && didAnswer === undefined;
  }, [session, didAnswer]);

  useEffect(() => {
    if (session === null) {
      Router.push("/api/auth/signin");
    }
  }, [session]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Gremio Awards 2021</title>
        <meta name="description" content="VOTEN LUEGO FEOS CULIAOS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Loader show={isReady === false} />
        {session && didAnswer === false && (
          <>
            <Questionary
              questions={props.questions}
              members={props.members}
              onSubmit={handleSubmit}
            />
          </>
        )}
        {session && didAnswer === true && (
          <>
            <p>Gracias por participar!</p>
          </>
        )}
      </main>
    </div>
  );
}
