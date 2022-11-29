import React, { useState, useEffect } from 'react';
// import FormInput from '../components/FormInput';
// import FormDropdown from '../components/FormDropdown';
import ModalWindow from '../components/ModalWindow';
import { Form, Button } from 'react-bootstrap';

export default function Home({ occupations, states }) {
  // console.log('occupations', occupations);
  const [form, setForm] = useState({
    name: '',
    email: '',
    occupation: null,
    state: null,
    password: '',
    passconfirm: '',
  });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [formReset, setFormReset] = useState(false);
  const occElement = document.querySelector('#occupations-field');
  const stateElement = document.querySelector('#states-field');

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetForm = (field) => {
    setForm({
      ...form,
      name: '',
      email: '',
      occupation: null,
      state: null,
      password: '',
      passconfirm: '',
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });

    occElement.value = 'Select Occupation';
    stateElement.value = 'Select State';
  };

  const findFormErrors = () => {
    const { name, email, password, passconfirm, occupation, state } = form;
    const newErrors = {};
    if (!name || name === '') {
      newErrors.name = 'name cannot be blank';
    } else if (name.length > 30) {
      newErrors.name = 'name is too long';
    } else if (!email || email === '') {
      newErrors.email = 'email cannot be blank';
    } else if (!email.includes('@')) {
      newErrors.email = 'email must contain and @ symbol';
    } else if (!password || password === '') {
      newErrors.password = 'password cannot be blank';
    } else if (password.length < 6) {
      newErrors.password = 'password must be at least 6 characters';
    } else if (password !== passconfirm) {
      newErrors.passconfirm = 'passwords do not match';
    } else if (!occupation || occupation === 'Select Occupation') {
      newErrors.occupation = 'must select an occupation';
    } else if (occupation === undefined) {
      newErrors.occupation = 'must select an occupation';
    } else if (!state || state === 'Select State') {
      newErrors.state = 'must select a state';
    } else if (state === undefined) {
      newErrors.state = 'must select a state';
    }

    return newErrors;
  };

  const showModal = () => {
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      await fetch(`https://frontend-take-home.fetchrewards.com/form`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          passconfirm: form.passconfirm,
          occupation: form.occupation,
          state: form.state,
        }),
      })
        .then((data) => {
          console.log('Request succeeded with JSON response', data);
          if (data.status === 201) {
            setMessage(`Thank you for your submission, ${form.name}`);

            showModal(true);
          } else {
            alert('Submission was unsuccessful');
          }
        })
        .catch((error) => {
          console.log('Request failed', error);
        });
    }
  };

  useEffect(() => {
    if (formReset) {
      resetForm();
      setFormReset(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formReset]);

  // console.log('form', form);

  return (
    <>
      <div className="container-fluid">
        <div className="row header-row">
          <h1>Front End Take Home Exercise</h1>
          <h2>by: Kurt Reynolds</h2>
        </div>
      </div>
      <div className="container form-container">
        <Form>
          <Form.Group className="form-group">
            <Form.Control
              className="form-element"
              required
              type="text"
              placeholder="full name"
              value={form.name}
              onChange={(e) => setField('name', e.target.value.trim())}
              isInvalid={!!errors.name}
              errors={errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>

            <Form.Control
              className="form-element"
              required
              type="text"
              placeholder="email"
              value={form.email}
              onChange={(e) => setField('email', e.target.value.trim())}
              isInvalid={!!errors.email}
              errors={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>

            <Form.Select
              className="form-element"
              required
              type="select"
              placeholder="Select Occupation"
              value={form.occupation}
              onChange={(e) => setField('occupation', e.target.value.trim())}
              isInvalid={!!errors.occupation}
              id="occupations-field"
              errors={errors.occupation}
            >
              <option>Select Occupation</option>
              {occupations &&
                occupations.map((occupation) => {
                  return <option>{occupation}</option>;
                })}
            </Form.Select>

            <Form.Select
              className="form-element"
              required
              placeholder="Select State"
              value={form.state}
              onChange={(e) => setField('state', e.target.value.trim())}
              isInvalid={!!errors.state}
              id="states-field"
              errors={errors.state}
            >
              <option>Select State</option>
              {states &&
                states.map((state) => {
                  return <option>{state}</option>;
                })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>

            <Form.Control
              className="form-element"
              required
              type="password"
              placeholder="password"
              value={form.password}
              onChange={(e) => setField('password', e.target.value.trim())}
              isInvalid={!!errors.password}
              errors={errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>

            <Form.Control
              className="form-element"
              required
              type="password"
              placeholder="confirm password"
              value={form.passconfirm}
              onChange={(e) => setField('passconfirm', e.target.value.trim())}
              isInvalid={!!errors.passconfirm}
              errors={errors.passconfirm}
            />
            <Form.Control.Feedback type="invalid">
              {errors.passconfirm}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <div className="row form-row">
          <Button
            variant="primary"
            size="md"
            className="home-button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
      <ModalWindow
        show={show}
        setShow={setShow}
        setFormReset={setFormReset}
        message={message}
      />
    </>
  );
}
