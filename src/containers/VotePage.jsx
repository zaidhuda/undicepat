import React, { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FirebaseContext, PollContext } from '../contexts';

const PollPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const { submitResponse } = useContext(FirebaseContext);
  const poll = useContext(PollContext);
  const { question, options, multipleChoice } = poll;

  const onSubmit = (data) => {
    submitResponse(id, data, () =>
      navigate(`/${id}/result`, { replace: true })
    );
  };

  return (
    <div className="container lg:w-1/3 md:w-1/2 mx-auto xl:w-1/4 pt-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Link to={`/${id}/result`}>
          <h1 className="font-semibold text-3xl">{question}</h1>
        </Link>

        <hr />

        {options.map((option) => (
          <div key={option}>
            <label className="border border-indigo-100 cursor-pointer inline-flex items-center p-2 rounded-md shadow-sm w-full">
              <input
                name="answers"
                value={option}
                type={multipleChoice ? 'checkbox' : 'radio'}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                {...register('answers', { required: true })}
              />
              <span className="ml-2">{option}</span>
            </label>
          </div>
        ))}

        <hr />

        <button
          type="submit"
          className="bg-indigo-600 block focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-0 focus:ring-opacity-50 font-semibold p-2 rounded-md shadow-md text-lg text-white w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PollPage;
