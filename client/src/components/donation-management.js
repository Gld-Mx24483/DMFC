// donation-management.js
import React, { useState } from 'react';
import './donation-management.css';

const Donatee = () => {
  const [donations, setDonations] = useState([
    { date: '2024-02-01', name: 'Suraju Micheal', email: 'john@example.com', amount: 5000 },
    { date: '2024-02-02', name: 'Jane Smith', email: 'jane@example.com', amount: 7000 },
    { date: '2024-02-03', name: 'Alice Johnson', email: 'alice@example.com', amount: 3000 },
    { date: '2024-03-10', name: 'David Dame', email: 'john@example.com', amount: 10000 },
    { date: '2024-01-18', name: 'Jone Sam', email: 'jane@example.com', amount: 4000 },
    { date: '2024-07-21', name: 'Bolaji son', email: 'blice@example.com', amount: 25000 },
  ]);

  const [filteredDonations, setFilteredDonations] = useState([...donations]);
  const [filterType, setFilterType] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilterType(value);
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedDonations = [...filteredDonations].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
    setFilteredDonations(sortedDonations);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value.trim() === '') {
      setFilteredDonations([...donations]);
    } else {
      const filteredList = donations.filter((donation) =>
        donation[filterType].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDonations(filteredList);
    }
  };

  return (
    <div className='donation-management-main-container'>
        <select value={filterType} onChange={handleFilterChange} className='filter-select'>
        <option value='date'>Date</option>
        <option value='name'>Name</option>
      </select>
      <input
        type='text'
        placeholder='Search by Date or Name'
        onChange={handleSearch}
        className='search-input'
      />
      <button onClick={handleSortChange} className='sort-button'>
        Sort by Amount {sortOrder === 'asc' ? '↓' : '↑'}
      </button>
      <table className='donation-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Amount (NGN)</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonations.map((donation, index) => (
            <tr key={index}>
              <td data-title="Date">{donation.date}</td>
              <td data-title="Name">{donation.name}</td>
              <td data-title="Email">{donation.email}</td>
              <td data-title="Amount">{donation.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donatee;
