import React, { useState } from 'react';
// import './ChipComponent.css'; // Import your CSS file for styling

const ChipComponent = () => {
  const [userList, setUserList] = useState([
    { id: 1, name: 'User1' },
    { id: 2, name: 'User2' },
    { id: 3, name: 'User3' },
    // Add more users as needed
  ]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setSearchString(e.target.value.toLowerCase());
    setShowDropdown(true);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
    setUserList((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    setSearchString('');
    setShowDropdown(false);
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    setUserList((prevUsers) => [...prevUsers, user]);
  };

  return (
    <div className="chip-container">
      <div className="selected-users-container">
        {selectedUsers.map((user) => (
          <div key={user.id} className="selected-user">
            <div>{user.name}</div>
            <span onClick={() => handleRemoveUser(user)}>&times;</span>
          </div>
        ))}
      </div>

      <div className="dropdown-container">
        <input
          type="text"
          placeholder="Click here to select users"
          value={searchString}
          onClick={() => setShowDropdown(true)}
          onChange={handleInputChange}
        />

        {showDropdown && (
          <ul className="user-dropdown">
            {userList
              .filter((user) => !selectedUsers.some((selected) => selected.id === user.id))
              .filter((user) => user.name.toLowerCase().includes(searchString))
              .map((user) => (
                <li key={user.id} onClick={() => handleUserSelect(user)}>
                  {user.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChipComponent;

