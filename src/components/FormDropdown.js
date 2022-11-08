import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

export default function FormDropdown({
  required,
  placeholder,
  value,
  onChange,
  isInvalid,
  id,
  errors,
}) {
  function mapIt(toMap, matchThis, selectWhat) {
    let items = '';
    let option = document.createElement('option');
    option.text = `Select ${selectWhat}`;
    document.querySelector(matchThis).add(option);
    items = toMap.map((mapped) => {
      return ` <option>${mapped}</option>`;
    });
    document.querySelector(matchThis).insertAdjacentHTML('afterbegin', items);
  }

  useEffect(() => {
    async function fetchForm() {
      fetch(`https://frontend-take-home.fetchrewards.com/form`, {
        method: 'GET',
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data) {
            const occupationList = data.occupations;

            const statesList = data.states;
            const stateNames = statesList.map((stateName) => {
              return stateName.name;
            });
            mapIt(occupationList, '#occupations-field', `Occupation`);
            mapIt(stateNames, '#states-field', `State`);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchForm();
  }, []);

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control
            as="select"
            required={required}
            type="select"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isInvalid={isInvalid}
            id={id}
            errors={errors}
          />

          <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
        </Form.Group>
      </Form>
    </>
  );
}
