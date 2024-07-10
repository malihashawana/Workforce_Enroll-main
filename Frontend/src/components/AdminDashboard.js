import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '', position: '' });
  const [editCandidate, setEditCandidate] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    // Fetch candidates from the server
    fetch('/api/candidates')
      .then(response => response.json())
      .then(data => setCandidates(data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate({ ...newCandidate, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCandidate({ ...editCandidate, [name]: value });
  };

  const addCandidate = () => {
    // Send a POST request to add a new candidate
    fetch('/api/candidates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCandidate)
    })
      .then(response => response.json())
      .then(data => setCandidates([...candidates, data]))
      .catch(error => console.error('Error adding candidate:', error));
  };

  const updateCandidate = (id) => {
    // Send a PUT request to update a candidate
    fetch(`/api/candidates/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editCandidate)
    })
      .then(response => response.json())
      .then(data => {
        const updatedCandidates = candidates.map(candidate =>
          candidate.id === id ? data : candidate
        );
        setCandidates(updatedCandidates);
        setEditCandidate(null);
      })
      .catch(error => console.error('Error updating candidate:', error));
  };

  const deleteCandidate = (id) => {
    // Send a DELETE request to remove a candidate
    fetch(`/api/candidates/${id}`, { method: 'DELETE' })
      .then(() => {
        const remainingCandidates = candidates.filter(candidate => candidate.id !== id);
        setCandidates(remainingCandidates);
      })
      .catch(error => console.error('Error deleting candidate:', error));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Add New Candidate</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newCandidate.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newCandidate.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={newCandidate.position}
        onChange={handleInputChange}
      />
      <button onClick={addCandidate}>Add Candidate</button>

      <h3>Candidate List</h3>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate.id}>
            {editCandidate && editCandidate.id === candidate.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editCandidate.name}
                  onChange={handleEditInputChange}
                />
                <input
                  type="email"
                  name="email"
                  value={editCandidate.email}
                  onChange={handleEditInputChange}
                />
                <input
                  type="text"
                  name="position"
                  value={editCandidate.position}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => updateCandidate(candidate.id)}>Save</button>
              </div>
            ) : (
              <div>
                <span>{candidate.name} - {candidate.email} - {candidate.position}</span>
                <button onClick={() => setEditCandidate(candidate)}>Edit</button>
                <button onClick={() => deleteCandidate(candidate.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

