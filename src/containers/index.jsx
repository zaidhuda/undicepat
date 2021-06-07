import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FirebaseContext } from '../contexts';
import useFirebase from '../hooks/useFirebase';

import NewPollPage from './NewPollPage';
import PollPage from './PollPage';
import VotePage from './VotePage';
import ResultPage from './ResultPage';
import Navbar from '../components/Navbar';

function App() {
  const firebase = useFirebase();
  const { ready } = firebase;

  if (!ready) return null;

  return (
    <FirebaseContext.Provider value={firebase}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path=":id" element={<PollPage />}>
            <Route path="/" element={<VotePage />} />
            <Route path="result" element={<ResultPage />} />
          </Route>
          <Route path="/" exact element={<NewPollPage />} />
        </Routes>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;
