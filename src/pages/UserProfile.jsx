import React, { useState } from "react";
import './allPages.css';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    birthday: '',
    gender: '',
    language: '',
    username: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Gespeicherte Daten:", formData);
    alert("Profil gespeichert!");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Willst du dein Konto wirklich löschen?");
    if (confirmed) {
      console.log("Konto gelöscht");
      alert("Konto gelöscht");
    }
  };

  return (
    <div className="mainPageContainer mainPageContainerUserProfile">
      <h2>Benutzerprofil</h2>
      <div className="profileGrid">
        <div className="profileSection">
          <h3>Persönliche Daten</h3>

          <label>Vorname:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />

          <label>Nachname:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />

          <label>Adresse:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />

          <label>Geburtstag:</label>
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />

          <label>Geschlecht:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Bitte wählen</option>
            <option value="male">Männlich</option>
            <option value="female">Weiblich</option>
            <option value="other">Divers</option>
          </select>

          <label>Sprache:</label>
          <select name="language" value={formData.language} onChange={handleChange}>
            <option value="">Bitte wählen</option>
            <option value="de">Deutsch</option>
            <option value="en">Englisch</option>
            <option value="fr">Französisch</option>
          </select>
        </div>

        <div className="profileSection">
          <h3>Kontodaten</h3>

          <label>Benutzername:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />

          <label>E-Mail-Adresse:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label>Telefonnummer:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />

          <label>Aktuelles Passwort:</label>
          <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />

          <label>Neues Passwort:</label>
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />

          <button onClick={handleSave}>Änderungen speichern</button>
          <button onClick={handleDeleteAccount} className="deleteBtn">
            Konto löschen
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
