import styles from "./styles.module.css";
import { useMemo } from "react";
import { useField } from "formik";

const Options = ({ options, ...props }) => {
  const listId = useMemo(() => `${props.name}-list`, [props.name]);
  const [field] = useField(props.name);

  return (
    <>
      <input list={listId} {...field} {...props} className={styles.input} />
      <datalist name={props.name} id={listId}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default Options;
