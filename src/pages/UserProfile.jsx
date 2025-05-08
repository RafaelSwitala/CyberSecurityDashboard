import React, { useEffect, useState } from "react";
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
    Userrolle: ''
  });
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:9555/api/user-profile/${username}`);
        if (!response.ok) {
          throw new Error(`Fehler beim Laden des Profils: ${response.statusText}`);
        }
        const data = await response.json();
        setFormData(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Fehler beim Laden des Profils:", err);
        setError("Profil konnte nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchUserData();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:9555/api/user-profile/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Speichern des Profils");
      }

      alert("Profil erfolgreich gespeichert.");
      setIsEditable(false);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Speichern fehlgeschlagen. Bitte erneut versuchen.");
    }
  };

  if (loading) return <div>Lade Benutzerdaten...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mainPageContainer mainPageContainerUserProfile">
      <h2>Benutzerprofil</h2>
      <div className="profileGrid">
        <div className="profileSection">
          <h3>Persönliche Daten</h3>

          <label>Vorname:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditable} />

          <label>Nachname:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditable} />

          <label>Adresse:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!isEditable} />

          <label>Geburtstag:</label>
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} disabled={!isEditable} />

          <label>Geschlecht:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} disabled={!isEditable}>
            <option value="">Bitte wählen</option>
            <option value="male">Männlich</option>
            <option value="female">Weiblich</option>
            <option value="other">Divers</option>
          </select>

          <label>Sprache:</label>
          <select name="language" value={formData.language} onChange={handleChange} disabled={!isEditable}>
            <option value="">Bitte wählen</option>
            <option value="de">Deutsch</option>
            <option value="en">Englisch</option>
            <option value="fr">Französisch</option>
          </select>
        </div>

        <div className="profileSection">
          <h3>Kontodaten</h3>

          <label>Benutzername:</label>
          <input type="text" name="username" value={formData.username} disabled />

          <label>Rolle:</label>
          <input type="text" name="Userrolle" value={formData.Userrolle} disabled />

          <label>E-Mail-Adresse:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditable} />

          <label>Telefonnummer:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditable} />

          {!isEditable && <button onClick={() => setIsEditable(true)}>Bearbeiten</button>}
          {isEditable && <button onClick={handleSave}>Änderungen speichern</button>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
