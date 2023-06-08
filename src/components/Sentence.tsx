import { cutTextIntoSentences } from '../domain/sentences';

export const Sentences = ({ text }: { text: string }) => {
  const sentences = cutTextIntoSentences(text);

  return (
    <>
      {sentences.map((sentence, index) => (
        <Sentence
          sentence={sentence}
          goodIndex={index}
          suggestedIndex={index}
          key={index}
        />
      ))}
    </>
  );
};

type SentenceProps = {
  sentence: string;
  goodIndex: number;
  suggestedIndex: number;
};

const Sentence = ({ sentence, goodIndex, suggestedIndex }: SentenceProps) => {
  return goodIndex === suggestedIndex ? (
    <SuccessText sentence={sentence} />
  ) : (
    <NeutralText sentence={sentence} />
  );
};

type TextProps = {
  sentence: string;
};

export const SuccessText = ({ sentence }: TextProps) => {
  return <span data-testid="success">{sentence}</span>;
};

export const NeutralText = ({ sentence }: TextProps) => {
  return <span data-testid="neutral">{sentence}</span>;
};

export default Sentence;
