import Image from "next/image";
import OptionsInput from "../atoms/OptionsInput";

const Entry = ({
  title,
  description,
  name,
  options,
  banner,
  disabled,
  ...props
}) => {
  return (
    <section {...props}>
      {/* <Image src={banner} alt={name} /> */}
      <h2>{title}</h2>
      <p>{description}</p>
      <OptionsInput disabled={disabled} name={name} options={options} />
    </section>
  );
};

export default Entry;
