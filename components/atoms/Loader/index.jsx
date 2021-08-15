import Image from "next/image";

import styles from "./styles.module.css";

const Loader = (props) => {
  return (
    <div className={styles.loader} hidden={props.show}>
      <Image
        className={styles.image}
        src="https://cdn.discordapp.com/emojis/403722823962722320.png"
        layout="fill"
        alt="loader"
      />
    </div>
  );
};

export default Loader;
