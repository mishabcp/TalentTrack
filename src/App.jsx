import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import CandidatesPage from './pages/CandidatesPage';
import JobsPage from './pages/JobsPage';
import SchedulerPage from './pages/SchedulerPage';
import InterviewRoomPage from './pages/InterviewRoomPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CommunicationPage from './pages/CommunicationPage';
import AssessmentPage from './pages/AssessmentPage';
import CandidateDatabasePage from './pages/CandidateDatabasePage';
import theme from './theme';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/candidates" element={<CandidatesPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/scheduler" element={<SchedulerPage />} />
                <Route path="/interview/:id" element={<InterviewRoomPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/communications" element={<CommunicationPage />} />
                <Route path="/assessments" element={<AssessmentPage />} />
                <Route path="/database" element={<CandidateDatabasePage />} />
              </Routes>
            </Layout>
          </Router>
        </AppProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
