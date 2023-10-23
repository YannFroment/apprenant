import { Button as BaseButton } from '@radix-ui/themes';

type ButtonProps = {
  label: string;
  onClick: () => void;
  dataTestid: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({ label, onClick, dataTestid, type }: ButtonProps) => {
  return (
    <BaseButton
      data-testid={dataTestid}
      onClick={onClick}
      variant="solid"
      type={type}
    >
      {label}
    </BaseButton>
  );
};
