import { CssBaseline, AppBar, Toolbar, Typography, Container } from "@mui/material"

import SchedulerPage from "./pages/scheduler"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">Calendar</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            Calendar
          </Typography>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<SchedulerPage />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </main>
    </>
  )
}

export default App
