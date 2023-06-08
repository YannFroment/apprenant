type SentenceProps = {
  sentence: string;
};

const Sentence = ({ sentence }: SentenceProps) => {
  return <div>{sentence}</div>;
};

type TextProps = {
  sentence: string;
};

export const SuccessText = ({ sentence }: TextProps) => {
  return <span data-testid="success">{sentence}</span>;
};

export default Sentence;
