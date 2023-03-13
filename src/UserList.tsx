import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
  [key: string]: any;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filterBy, setFilterBy] = useState<string>("name");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => {
        setUsers(data);
        console.log("DATA ---> ", data);
        setFilteredUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message)
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  const handleFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value.toLowerCase();
    const filtered = users.filter((user) =>
      // user[filterBy].toLowerCase().includes(filterValue)
      filterBy === 'address.city' 
      ? user.address.city.toLowerCase().includes(filterValue)
      : user[filterBy].toLowerCase().includes(filterValue)
    );
    setFilteredUsers(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <label htmlFor="filterBy">Filter by:</label>
      <select id="filterBy" value={filterBy} onChange={handleFilterChange}>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="address.city">City</option>
      </select>
      <input type="text" onChange={handleFilterInput} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;