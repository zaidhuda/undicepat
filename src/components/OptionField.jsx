import React from 'react';
import PropTypes from 'prop-types';

const OptionField = ({ register, remove, index }) => {
  const name = `options.${index}`;

  const removeField = () => {
    remove(index);
  };

  return (
    <div className="flex space-x-1">
      <input
        type="text"
        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full"
        placeholder={`Option ${index + 1}`}
        {...register(name, { required: true, setValueAs: (v) => v.trim() })}
      />
      <button
        type="button"
        onClick={removeField}
        className="border border-red-300 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-red-200 px-2 rounded-md shadow-sm"
      >
        Remove
      </button>
    </div>
  );
};

OptionField.propTypes = {
  register: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default OptionField;
