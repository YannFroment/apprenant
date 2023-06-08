import Draggable from 'react-draggable';

export const SentencesPool = ({ sentences }: { sentences: string[] }) => {
  return (
    <>
      {sentences.map((sentence, index) => {
        return (
          <Draggable key={index}>
            <Sentence
              sentence={sentence}
              goodIndex={index}
              suggestedIndex={index}
              key={index}
            />
          </Draggable>
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
