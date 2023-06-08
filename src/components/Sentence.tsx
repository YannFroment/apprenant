import { SuccessText, NeutralText } from './Text';

export const SentencesPool = ({ sentences }: { sentences: string[] }) => {
  return (
    <>
      {sentences.map((sentence, index) => {
        return (
          <Sentence
            sentence={sentence}
            goodIndex={index}
            suggestedIndex={index}
            key={index}
          />
        );
      })}
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

export default Sentence;
