import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useState, useEffect } from 'react';

const useFirebase = () => {
  const [app, setApp] = useState();
  const [db, setDatabase] = useState();
  const [user, setUser] = useState();

  // *** API ***

  const createPoll = (poll, callback) => {
    let { endsAt } = poll;

    if (endsAt) {
      endsAt = new Date(Date.parse(endsAt));
      endsAt.setHours(0, 0, 0, 0);
    } else {
      endsAt = null;
    }

    db.collection('polls')
      .add({ ...poll, endsAt, user: user.uid })
      .then(callback)
      .catch(alert);
  };

  const getPoll = (id, callback) => {
    db.collection('polls')
      .doc(id)
      .get()
      .then((doc) => (doc.exists ? callback(doc.data()) : null))
      .catch(alert);
  };

  const submitResponse = (pollId, answers, callback) => {
    db.collection(`polls/${pollId}/responses`)
      .doc(user.uid)
      .set(answers)
      .then(callback)
      .catch(alert);
  };

  const getResponses = (pollId, callback) =>
    db.collection(`polls/${pollId}/responses`).onSnapshot(callback);

  // Initialize Firebase app
  useEffect(() => {
    if (firebase.apps.length === 0) {
      fetch('/__/firebase/init.json').then(async (response) => {
        setApp(firebase.initializeApp(await response.json()));
      });
    } else {
      setApp(firebase.apps[0]);
    }

    return setApp;
  }, []);

  // Set up firestore
  useEffect(() => (app ? setDatabase(app.firestore()) : setDatabase), [app]);

  //
  useEffect(
    () => !!app && !user && firebase.auth().signInAnonymously(),
    [app, user]
  );

  // Set user based on Firebase auth state
  useEffect(() => app && app.auth().onAuthStateChanged(setUser), [app]);

  return {
    ready: !!app && !!db,
    user,
    createPoll,
    getPoll,
    submitResponse,
    getResponses,
  };
};

export default useFirebase;
