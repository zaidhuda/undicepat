import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { DateTime } from 'luxon';

import { FirebaseContext, PollContext } from '../contexts';

const PollPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPoll } = useContext(FirebaseContext);
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    getPoll(id, setPoll);
  }, [getPoll, id, setPoll]);

  const goToResult = useCallback(
    () => navigate(`/${id}/result`, { replace: true }),
    [navigate, id]
  );

  useEffect(() => {
    if (poll?.endsAt && DateTime.now() > poll.endsAt.toDate()) goToResult();
  }, [goToResult, navigate, id, poll]);

  if (!poll) return null;

  return (
    <PollContext.Provider value={poll}>
      <Outlet />
    </PollContext.Provider>
  );
};

export default PollPage;
