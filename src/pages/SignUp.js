import React, { useContext, useState } from 'react';
import {useHistory} from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import Icon from '../components/Icon';
import Input from '../components/Input';
import validateUtil from '../utils/validate';

const SignUp = () => {
  const {auth, updateUserData, signUp} = useContext(AuthContext);
  const {user: {
    firstName,
    lastName,
    email,
    phone,
  }} = auth;

  const [errors, setErrors] = useState({});

  const validate = () => {
    const validations = [
      {name: 'firstName', value: firstName, validations: {required: true}},
      {name: 'lastName', value: lastName, validations: {required: true}},
      {name: 'email', value: email, validations: {required: true, email: true}},
      {name: 'phone', value: phone, validations: {required: true}},
    ];
    const validateResult = validateUtil(validations);
    if (!validateResult.valid) {
      setErrors(validateResult.errors);
    }
    return validateResult.valid;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    signUp();
  };

  return (
    <div className="container">
      <div className="sign-up">
        <div className="title">
          <h1 className="text-primary">Welcome!</h1>
          <strong className="text-secondary">Completa la siguiente información para continuar.</strong>
        </div>
        <form className="sign-up-form" onSubmit={submit}>
          <div className="two-columns">
            <Input
              label="First name"
              id="firstName"
              value={firstName}
              required
              onChange={updateUserData}
              error={errors.firstName}
            />
            <Input
              label="Last name"
              id="lastName"
              value={lastName}
              required
              onChange={updateUserData}
              error={errors.lastName}
            />
          </div>
          <Input
            label="E-mail"
            id="email"
            value={email}
            required
            onChange={updateUserData}
            error={errors.email}
          />
          <Input
            label="Phone number"
            id="phone"
            value={phone}
            required
            onChange={updateUserData}
            error={errors.phone}
          />
          <button
            type="submit"
            className="btn btn-secondary"
          >
            Continue
            {' '}
            <Icon name="arrow-right" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
