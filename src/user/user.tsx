import { useState, useEffect } from 'react';
import "./user.css"

interface User {
  name: {
    first: string;
    last: string;
  },
  email: string;
  picture: {
    thumbnail: string;
  },
  location: {
    street: {
      number: number;
      name: string;
    },
    city: string;
    country: string;
  }
}


interface Props {
  count: number;
}

const RandomUsers: React.FC<Props> = (props: Props) => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [newFirstName, setNewFirstName] = useState<string>('');
  const [newLastName, setNewLastName] = useState<string>('');

  const fetchData = async () => {
    const response = await fetch(`https://randomuser.me/api/?results=${props.count}`);
    const data = await response.json();
    setUsers(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastName(event.target.value);
  };

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsers(users.map(user => {
      if (user.email === event.currentTarget.id) {
        return {
          ...user,
          name: {
            first: newFirstName,
            last: newLastName
          }
        };
      }
      return user;
    }));
  };

  return (
    <div className='app-conatianer'>
      {users.map(user => (
        <div className='employee-card' key={user.email}>
          <img src={user.picture.thumbnail} alt="user thumbnail" />
          <form id={user.email} onSubmit={handleNameSubmit}>
            <label>First name:</label>
            <input type="text" value={newFirstName} onChange={handleFirstNameChange} />
            <br />
            <label>Last name:</label>
            <input type="text" value={newLastName} onChange={handleLastNameChange} />
            <br />
            <button type="submit">Submit</button>
          </form>
          <p>{`${user.name.first} ${user.name.last}`}</p>
          <p>{user.email}</p>
          <p>{`Age: ${Math.floor(Math.random() * (40 - 20 + 1)) + 20}`}</p>
          <p>{`Address: ${user.location.street.number} ${user.location.street.name},  ${user.location.city}, ${user.location.country}`}</p>
            </div>
          ))}
        </div>
      );
    };


export default RandomUsers;