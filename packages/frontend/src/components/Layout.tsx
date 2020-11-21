import React from "react";
import styled, { css } from "styled-components/macro";

const headerHeight = "85px";
const footerHeight = "50px";

export const MaxWidthCSS = css`
  max-width: 90%;
  margin: auto;
`;
const Header = styled.header`
  height: ${headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

const Main = styled.main`
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  padding: 0 25px;
  ${MaxWidthCSS}
`;

const Footer = styled.footer`
  height: ${footerHeight};
  padding: 0 25px;
  ${MaxWidthCSS};
`;

const NavigationList = styled.ul`
  list-style: none;
`;
const NavigationItem = styled.li`
  color: ${(props) => props.theme.colors.primary};
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <div
          css={`
            font-size: 27px;
            letter-spacing: 3px;
            flex: 1;
          `}
        >
          <span
            css={`
              text-decoration: underline overline;
            `}
          >
            TimeTracker
            

          </span>
          <br></br>
          <span
           css={`
           font-size: 14px;
           letter-spacing: 2px;
           flex: 1;
         `}
          >
            DoNotWasteYourTime!
          </span>

        </div>
      </Header>
      <Main>{children}</Main>
      <Footer>© 2020 Mephisto_08</Footer>
    </>
  );
};
