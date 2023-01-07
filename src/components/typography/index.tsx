import styled, { css } from "styled-components/native";
import theme from "../../styles/theme";
import get from "lodash.get";
import { DotNestedKeys } from "../../utils/dot-nested-key";

export type TextFontWeight = 400 | 500 | 700;
export type TextVariant = "xs" | "sm" | "base" | "xl";
export type TextColorVariant = DotNestedKeys<typeof theme.color>;

interface Props {
  color?: TextColorVariant;
  variant?: TextVariant;
  fontWeigth?: TextFontWeight;
}

const Typography = ({
  children,
  variant = "base",
  ...rest
}: {
  children: React.ReactNode;
} & Props) => {
  return (
    <s.text variant={variant} {...rest}>
      {children}
    </s.text>
  );
};

const s = {
  text: styled.Text<Props>`
    /* Variant */
    ${({ variant }) => {
      switch (variant) {
        case "xs":
          return css`
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
          `;
        case "sm":
          return css`
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 21px;
          `;
        case "base":
          return css`
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
          `;
        case "xl":
          return css`
            font-style: normal;
            font-size: 20px;
            line-height: 30px;
          `;

        default:
          break;
      }

      return "";
    }}

    /* Font Weight */
    font-family: ${({ fontWeigth }) => {
      switch (fontWeigth) {
        case 400:
          return "Nunito_400Regular";
        case 500:
          return "Nunito_500Medium";
        case 700:
          return "Nunito_700Bold";

        default:
          return "Nunito_400Regular";
      }
    }};

    /* Color */
    color: ${({ color, theme }) =>
      color ? get(theme.color, color) : theme.color.text.black};
  `,
};

export default Typography;
