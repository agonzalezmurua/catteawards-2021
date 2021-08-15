import TextArea from "../atoms/TextArea";

const Moment = (props) => {
  return (
    <section>
      <h2>Momento Catte</h2>
      <p>
        El mejor momento que hayas tenido este año junto al gremio. Puedes
        también dejar un comentario o una dedicatoria
      </p>
      <TextArea maxLength="250" name={props.name} />
    </section>
  );
};

export default Moment;
