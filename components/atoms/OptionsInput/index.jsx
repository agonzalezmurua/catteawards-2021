import styles from "./styles.module.css";
import { useCallback, useMemo } from "react";
import { useField } from "formik";
import cx from "classnames";

const Options = ({ options, ...props }) => {
  const listId = useMemo(() => `${props.name}-list`, [props.name]);
  const [field, meta] = useField(props.name);

  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  const computeLabel = useCallback(
    (option) => {
      if (isChrome) {
        return option.label;
      } else {
        return `${[option.value, option.label].filter((v) => v).join(" | ")}`;
      }
    },
    [isChrome]
  );

  const displayError = useMemo(() => {
    return meta.error && meta.touched;
  }, [meta.error, meta.touched]);

  return (
    <>
      <input
        list={listId}
        {...field}
        {...props}
        className={cx(styles.input, { [styles.input_error]: displayError })}
      />
      {displayError && (
        <label className={styles.error_label}>{meta.error}</label>
      )}
      <datalist name={props.name} id={listId}>
        <select name={props.name}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {computeLabel(option)}
            </option>
          ))}
        </select>
      </datalist>
    </>
  );
};

export default Options;
