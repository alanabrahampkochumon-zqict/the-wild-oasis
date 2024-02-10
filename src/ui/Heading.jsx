import styled, { css } from "styled-components";

const Heading = styled.h1`
    ${(props) => {
        switch (props.as) {
            case "h1":
                return css`
                    font-size: 3rem;
                    font-weight: 600;
                `;
            case "h2":
                return css`
                    font-size: 2rem;
                    font-weight: 600;
                `;
            case "h3":
                return css`
                    font-size: 2rem;
                    font-weight: 500;
                `;
            case "h4":
                return css`
                    font-size: 3rem;
                    font-weight: 600;
                    text-align: center;
                `;
            default:
                return "";
        }
    }}
`;

export default Heading;
