import { PressableProps } from "react-native";
import styled from "styled-components/native";
import Typography from "../typography";

interface Props extends PressableProps {
  children: React.ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <s.root>
      <s.text color="white" fontWeigth={700}>
        {children}
      </s.text>
    </s.root>
  );
};

const s = {
  root: styled.Pressable`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8px 24px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.purple["500"]};
  `,
  text: styled(Typography)``,
};

export default Button;
