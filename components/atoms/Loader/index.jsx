import Image from "next/image";

import styles from "./styles.module.css";

const Loader = (props) => {
  return (
    <div className={styles.loader} hidden={props.show}>
      <Image
        className={styles.image}
        src="https://cdn.discordapp.com/attachments/145997768056504320/876495948648439838/LOGO.png"
        layout="fill"
        alt="loader"
      />
    </div>
  );
};

export default Loader;
