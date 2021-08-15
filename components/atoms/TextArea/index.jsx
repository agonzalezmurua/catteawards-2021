import { useField } from "formik";
import { useMemo } from "react";
import cx from "classnames";

import styles from "./styles.module.css";

const TextArea = (props) => {
  const [field, meta] = useField(props.name);
  const displayError = useMemo(() => {
    return meta.error && meta.touched;
  }, [meta.error, meta.touched]);

  return (
    <>
      <textarea
        {...field}
        {...props}
        className={cx(styles.textarea, {
          [styles.textarea_error]: displayError,
        })}
      ></textarea>
      {displayError && (
        <label className={styles.error_label}>{meta.error}</label>
      )}
    </>
  );
};

export default TextArea;
