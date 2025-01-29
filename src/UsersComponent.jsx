import { useState } from "react";

const UsersComponent = () => {
  const mockData = [
    { username: "Ola Normann", email: "ola.normann@norge.no" },
    { username: "Torleif", email: "torleif@kodehode.no" },
    { username: "Jan Egil", email: "jan.egil@kodehode.no" },
    { username: "Sander", email: "sander@kodehode.no" },
  ];

  const [users, setUsers] = useState(mockData);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const addUser = () => {
    if (newUsername && newEmail) {
      const newUser = { username: newUsername, email: newEmail };
      setUsers([...users, newUser]);
      setNewUsername("");
      setNewEmail("");
    }
  };

  return (
    <div>
      <h2>Brukerliste</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>{user.username}</strong> - {user.email}
          </li>
        ))}
      </ul>

      <h2>Legg til ny bruker</h2>
      <div>
        <input
          type="text"
          placeholder="Brukernavn"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-post"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={addUser}>Legg til bruker</button>
      </div>
    </div>
  );
};

export default UsersComponent;
