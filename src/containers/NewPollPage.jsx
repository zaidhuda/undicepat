import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import { FirebaseContext } from '../contexts';

import OptionField from '../components/OptionField';

const NewPollPage = () => {
  const navigate = useNavigate();
  const { createPoll } = useContext(FirebaseContext);
  const { control, register, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = (data) => {
    createPoll(data, ({ id }) => navigate(`/${id}`, { replace: true }));
  };

  useEffect(() => {
    if (fields.length < 2) append({ name: 'options' }, { shouldFocus: false });
  }, [append, fields.length]);

  return (
    <div className="container lg:w-1/3 md:w-1/2 mx-auto xl:w-1/4 pt-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label>
          <h1 className="text-2xl text-gray-700">New Poll</h1>
          <textarea
            className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-1 rounded-md shadow-sm w-full"
            rows="3"
            placeholder="The question"
            {...register('question', {
              required: true,
              setValueAs: (v) => v.trim(),
            })}
          ></textarea>
        </label>

        <hr />

        <h2>Options</h2>

        {fields.map((field, index) => (
          <OptionField
            defaultValue={field.value}
            index={index}
            key={field.id}
            register={register}
            remove={remove}
          />
        ))}

        {fields.length < 10 && (
          <button
            onClick={append}
            type="button"
            className="block border-2 border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-0 focus:ring-opacity-50 font-semibold p-2 rounded-md shadow-sm w-full"
          >
            Add option
          </button>
        )}

        <hr />

        <label className="block">
          <span className="text-gray-700">
            Stop accepting responses after (optional)
          </span>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('endsAt')}
          />
        </label>

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('multipleChoice')}
          />
          <span className="ml-2">Users can select multiple answers</span>
        </label>

        <button
          type="submit"
          className="bg-indigo-600 block focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-0 focus:ring-opacity-50 font-semibold p-2 rounded-md shadow-md text-lg text-white w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewPollPage;
