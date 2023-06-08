type SentenceProps = {
  sentence: string;
};

const Sentence = ({ sentence }: SentenceProps) => {
  return <div>{sentence}</div>;
};

export default Sentence;
