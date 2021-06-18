import {useState} from 'react';
import Icon from './components/Icon';
import Input from "./components/Input";

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="sign-up">
      <h1 className="text-primary">Welcome!</h1>
      <strong className="text-secondary">Completa la siguiente información para continuar.</strong>
      <form className="sign-up-form">
        <Input
          label="First name"
          id="firstName"
          value={firstName}
          required
          onChange={setFirstName}
        />
        <Input
          label="Last name"
          id="lastName"
          value={lastName}
          required
          onChange={setLastName}
        />
        <Input
          label="E-mail"
          id="email"
          value={email}
          required
          onChange={setEmail}
        />
        <Input
          label="Phone number"
          id="phone"
          value={phone}
          required
          onChange={setPhone}
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
  );
}

export default App;
