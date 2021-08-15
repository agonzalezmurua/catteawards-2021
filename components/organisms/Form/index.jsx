import { useCallback, useMemo } from "react";
import { Formik } from "formik";
import styles from "./styles.module.css";

import Entry from "../../molecules/Entry";
import Submit from "../../atoms/Button";
import Moment from "../../molecules/Moment";

const Questionary = (props) => {
  const initialValues = useMemo(() => {
    let values = { MOMENTO: "" };
    props.questions.forEach((question) => {
      values[question.name] = "";
    });

    return values;
  }, [props.questions]);

  const options = useMemo(() => {
    return props.members.map((member) => ({
      value: member.username,
      label: member.nick || member.username,
    }));
  }, [props.members]);

  const validate = useCallback(
    async (values) => {
      const errors = {};

      Object.entries(values).forEach(([entry, answer]) => {
        if (String(answer).trim().length === 0) {
          errors[entry] = "Nada es opcional";
          return;
        }

        // Check members
        if (entry === "MOMENTO") {
          return;
        }
        if (options.find(({ value }) => value === answer) === undefined) {
          errors[entry] = "Verifica el miembro";
          return;
        }
      });

      if (values.KINGCATTE === "Goatchaser") {
        errors.KINGCATTE = "Vota x otro culiao 😆";
      }

      return errors;
    },
    [options]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validate={validate}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          {props.questions.map((question) => (
            <Entry
              key={question.title}
              title={question.title}
              description={question.description}
              name={question.name}
              banner={question.banner}
              disabled={isSubmitting}
              options={options}
            />
          ))}
          <br />
          <Moment name="MOMENTO" />
          <br />
          <Submit type="submit" disabled={isSubmitting}>
            Enviar
          </Submit>
        </form>
      )}
    </Formik>
  );
};

export default Questionary;
