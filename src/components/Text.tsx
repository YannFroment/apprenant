type TextProps = {
  sentence: string;
};

export const SuccessText = ({ sentence }: TextProps) => {
  return <span data-testid="success">{sentence}</span>;
};

export const NeutralText = ({ sentence }: TextProps) => {
  return <span data-testid="neutral">{sentence}</span>;
};
