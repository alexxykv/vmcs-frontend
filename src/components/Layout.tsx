import React, { useState } from "react";
import { Container } from "@mui/material";
import { WithChildrenProps } from "../interfaces/Props";
import DrawerMenu from "./DrawerMenu";
import Main from "./Main";
import Header from "./Header";
import { useAuth } from "../hooks";


const Layout: React.FC<WithChildrenProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);
  const auth = useAuth();

  const toggleOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <Container disableGutters maxWidth={false} sx={{
      display: 'flex',
      minHeight: '100vh'
    }}>
      {
        auth.status === 'Authorized'
          ? <>
            <DrawerMenu open={open} />
            <Header open={open} toggleOpen={toggleOpen} />
          </>
          : <></>
      }
      <Main open={open}>
        {children}
      </Main>
    </Container>
  );
}


export default Layout;