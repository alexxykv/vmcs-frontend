import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import Cookies from "js-cookie";
import { useAuth } from "./hooks";
import {
  AccountPage, ChannelPage, DashboardPage,
  InvitationsPage, LoginPage, MeetingPage, NotFoundPage
} from "./pages";
import {
  AuthProvider, ChatHubProvider, CodeSharingProvider,
  MeetingHubProvider, MeetingProvider, UserProvider
} from "./contexts";
import { Layout, PrivateRoute } from "./components";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const App: React.FC = () => {
  const themeMode = Cookies.get('theme');
  if (themeMode === undefined) {
    Cookies.set('theme', 'light');
  }
  const [mode, setMode] = useState<PaletteMode>(themeMode ? themeMode as PaletteMode : 'light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prev => {
          const newMode = prev === 'light' ? 'dark' : 'light';
          Cookies.set('theme', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'JetBrains Mono'
        },
        palette: {
          mode
        },
      }),
    [mode],
  );

  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ChatHubProvider>
            <MeetingHubProvider>
              <CodeSharingProvider>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <Layout>
                      <Routing />
                    </Layout>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </CodeSharingProvider>
            </MeetingHubProvider>
          </ChatHubProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

const Routing: React.FC = () => {
  const auth = useAuth();

  return (
    <Routes>
      <Route path='/' element={<Navigate to={auth.status === 'Authorized' ? '/dashboard' : '/login'} />} />
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<AccountPage />} />
        <Route path='/channels/:id' element={<ChannelPage />} />
        <Route path='/meeting/:id' element={<MeetingProvider><MeetingPage /></MeetingProvider>} />
        <Route path='/invitations' element={<InvitationsPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={
        auth.status === 'Authorized'
          ? <NotFoundPage />
          : <Navigate to={'/login'} />
      } />
    </Routes>
  );
}


export default App;