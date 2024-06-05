import React from 'react';
//import './Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile-container">
      <h1>Perfil</h1>
      <p>Nome: {user.nome}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
