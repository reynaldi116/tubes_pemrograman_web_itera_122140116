import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, onSubmitCallback) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('useForm: handleSubmit triggered. Calling onSubmitCallback.');
    if (onSubmitCallback) {
      onSubmitCallback(values);
    }
  };

  const resetForm = useCallback(() => {
    console.log('useForm: resetForm called. Initial values:', initialValues);
    setValues(initialValues);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const updateFormValues = useCallback((newValues) => {
    console.log('useForm: updateFormValues called with newValues:', newValues);
    setValues(newValues);
  }, []);


  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    updateFormValues
  };
};