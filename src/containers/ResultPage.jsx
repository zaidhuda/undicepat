import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { FirebaseContext, PollContext } from '../contexts';

const PollPage = () => {
  const { id } = useParams();
  const { getResponses } = useContext(FirebaseContext);
  const [responses, setResponses] = useState([]);
  const poll = useContext(PollContext);
  const { question, options } = poll;

  useEffect(
    () =>
      getResponses(id, (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setResponses(data);
      }),
    [getResponses, id]
  );


  const flatResponses = responses.flatMap(({ answers }) => answers);

  const result = options.reduce(
    (res, option) => ({
      ...res,
      [option]: flatResponses.filter((res) => res === option).length,
    }),
    {}
  );

  const totalResponses = responses.length;

  const renderOption = (option) => {
    const percentage = totalResponses
      ? `${(result[option] * 100) / totalResponses}%`
      : '0%';

    return (
      <div
        key={option}
        className="inline-flex items-center p-2 relative rounded-md w-full"
      >
        <div
          className="absolute border border-indigo-100 w-full h-full left-0 shadow-sm  rounded-md"
          style={{ zIndex: -1 }}
        />
        <div
          className="absolute bg-indigo-300 bottom-0 left-0 rounded-md h-full"
          style={{
            zIndex: -1,
            width: percentage,
          }}
        />
        <span>{percentage}</span>
        <span className="ml-2">{option}</span>
      </div>
    );
  };

  return (
    <div className="container lg:w-1/3 md:w-1/2 mx-auto xl:w-1/4 pt-12 space-y-4">
      <Link to={`/${id}`}>
        <h1 className="font-semibold text-3xl">{question}</h1>
      </Link>

      <hr />

      {options.map(renderOption)}

      <p className="text-sm text-gray-400">Responses: {totalResponses}</p>
    </div>
  );
};

export default PollPage;
