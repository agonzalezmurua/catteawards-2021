import { useMemo } from "react";
import { Formik } from "formik";
import styles from "./styles.module.css";

import Entry from "../../molecules/Entry";
import Submit from "../../atoms/Button";

const Questionary = (props) => {
  const initialValues = useMemo(() => {
    let values = {};
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

  return (
    <Formik initialValues={initialValues} onSubmit={props.onSubmit}>
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
          <Submit type="submit" disabled={isSubmitting}>
            Enviar
          </Submit>
        </form>
      )}
    </Formik>
  );
};

export default Questionary;
