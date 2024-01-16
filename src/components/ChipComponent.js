

import React, { useState, useEffect, useRef } from 'react';


const ChipComponent = () => {
  const [userList, setUserList] = useState([
    { id: 1, name: 'Harsh Singh', gmail: 'harsh.singh0310@gmail.com' },
    { id: 2, name: 'Divyansh Vaibhav', gmail: 'divyansh.vaibhav@gmail.com' },
    { id: 3, name: 'Moinak Chatterjee', gmail: 'moinak.chatterjee@gmail.com' },
    { id: 4, name: 'Ritesh Singh', gmail: 'ritesh.singh@gmail.com' },
    { id: 5, name: 'Nikhil Tewari', gmail: 'nikhil.tewari@gmail.com' },
    { id: 6, name: 'Naman Singh', gmail: 'naman.singh@gmail.com' },
    { id: 7, name: 'Aditya Kamal', gmail: 'Aditya.kamal@gmail.com' },
    { id: 8, name: 'Priyata Singh', gmail: 'priyata.singh@gmail.com' },
    // Add more users as needed
  ]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedChip, setHighlightedChip] = useState(null);

  const inputRef = useRef(null);

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

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && searchString === '') {
      e.preventDefault();

      // If a chip is highlighted, remove it
      if (highlightedChip) {
        handleRemoveUser(highlightedChip);
        setHighlightedChip(null);
      } else {
        // Highlight the last chip
        if (selectedUsers.length > 0) {
          setHighlightedChip(selectedUsers[selectedUsers.length - 1]);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchString, selectedUsers, highlightedChip]);

  return (
    <div className="chip-container">
      <div className="input-container">
        <div className="selected-users-container">
          {selectedUsers.map((user) => (
            <div
              key={user.id}
              className={`selected-user ${highlightedChip === user ? 'highlighted' : ''}`}
            >
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
            ref={inputRef}
          />

          {showDropdown && (
            <ul className="user-dropdown">
              {userList
                .filter((user) => !selectedUsers.some((selected) => selected.id === user.id))
                .filter((user) =>
                  user.name.toLowerCase().includes(searchString) ||
                  user.gmail.toLowerCase().includes(searchString)
                )
                .map((user) => (
                  <li
                    key={user.id}
                    onClick={() => {
                      handleUserSelect(user);
                      setHighlightedChip(null); // Clear highlight after selecting
                    }}
                  >
                    {`${user.name} (${user.gmail})`}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipComponent;
