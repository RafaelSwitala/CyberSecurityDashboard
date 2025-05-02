# CyberSecurityDashboard
Fallstudie - Software Engineering - Projekt

Stand: 02.05.2025

Tools:
- Git
- Node.js und npm
- Visual Studio Code
- React
- React-Bootstrap
- Express
- CORS
- Prisma Studio
- pg Admin: PostgreSQL

Anleitung - Installation: 
- git clone https://github.com/RafaelSwitala/CyberSecurityDashboard.git
- cd CyberSecurityDashboard
- npm install
- npm start

Bitte beachten:
1.	Bevor du mit dem Programmieren loslegst, hol dir zuerst die neueste Version des Projekts:
Gib diese Befehle im Terminal ein:
•	git pull --all (holt alle aktuellen Änderungen)
•	git checkout feature/Sprint1DeinVorname (wechsle in deinen eigenen Entwicklungszweig)
2.	Jetzt kannst du am Projekt arbeiten und programmieren.
3.	Wenn du zwischendurch speichern möchtest, zum Beispiel nach einem wichtigen Zwischenschritt, mach folgendes:
•	git add . (bereitet alle Änderungen zum Speichern vor)
•	git commit -m "kurze Beschreibung deiner Änderungen" (speichert deine Änderungen mit einer Nachricht)
4.	Wenn du komplett fertig bist mit deiner Arbeit, lade deine Änderungen hoch:
•	git add .
•	git commit -m "kurze Beschreibung deiner Änderungen"
•	git push --all (lädt alles auf GitHub hoch)




User Stories: Cybersecurity-Dashboard
Admin-User: 
<!-- 1.	Als Admin möchte ich mich sicher mit Benutzername und Passwort einloggen, um auf das Dashboard zugreifen zu können. -->
<!-- 2.	Als Admin möchte ich neue Benutzer anlegen oder löschen können, um den Zugriff zu kontrollieren. -->
3.	Als Admin möchte ich eine Liste aktueller sicherheitsrelevanter Alarme sehen, um schnell auf Vorfälle reagieren zu können.
4.	Als Admin möchte ich bei kritischen Angriffen per Mail oder in der UI gewarnt werden, um rechtzeitig Maßnahmen zu ergreifen.
<!-- 5.	Als Admin möchte ich alle importierten Logs einsehen, durchsuchen und filtern können, um verdächtige Aktivitäten zu analysieren. -->

Analyst-User:
6.	Als Analyst möchte ich die wichtigsten Kennzahlen auf einen Blick sehen (z. B. Angriffe pro Tag), um den Sicherheitsstatus einzuschätzen.
<!-- 7.	Als Analyst möchte ich Visualisierungen zu Angriffstypen und Zeitverläufen sehen, um Muster zu erkennen. -->
8.	Als Analyst möchte ich einzelne Logs aufklappen können, um Details wie Quell-IP, Port und Angriffstyp zu prüfen.
9.	Als Analyst möchte ich Logs exportieren können, um sie in anderen Tools weiterzuverarbeiten.

System:
<!-- 10. Als System möchte ich neue Logs automatisch verarbeiten und abspeichern, um jederzeit aktuelle Daten bereitzustellen. -->
11.	 Als System möchte ich automatisch Alerts auslösen, wenn ein kritischer Angriff erkannt wird, um Benutzer zu informieren.
12.	 Als System möchte ich API-Anfragen innerhalb von 300ms beantworten, um ein flüssiges Nutzererlebnis zu gewährleisten.


Weitere ToDo´s:
Oben sollen Diagramme/Angriffsbenachrichtigungen rein
Unten sollen Tasks rein

Mehrere Geräte hinzufügen: Aktuell ist nur einer da (3. Sprint)
AlertSystem: Je nach Log soll alarmiert werden (Priorisierung?, Ranking?, Enums? Alert-Stufen(Grün, gelb, rot)?)

Performance Optimierung

Alle Komponenten erstellen --> Ziel: Keine funktionslose Buttons mehr

Dokumentation-Inhalt:
- Projekttitel, Zielsetzung, Zielgruppe, Motivation: Offen
- Rollen und Aufgabenverteilung: Atakan
- Technologie: Rafael
- Datenmodelle, Tabellen, Felderbeschreibung: Aziz 
- API-Dokumentation, create, user, login: Aziz
- Beschreibung der Tools: Log-Generator, Attacksimmulator sowie Angriffsarten : Atakan
- Umgesetzte Anforderungen pro Sprint, Meilensteine, offene Punke: Rafael
- Sicherheitsbezug: Atakan 