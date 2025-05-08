const { PrismaClient } = require('@prisma/client'); 
const bcrypt = require('bcryptjs');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (frage) => new Promise(resolve => rl.question(frage, resolve));

(async () => {
  const username = await ask('Benutzername: ');
  const password = await ask('Passwort: ');
  const roleInput = await ask('Rolle (ADMIN/ANALYST): ');
  const firstName = await ask('Vorname: ');
  const lastName = await ask('Nachname: ');
  const email = await ask('E-Mail: ');
  const phone = await ask('Telefonnummer: ');
  const birthdayInput = await ask('Geburtsdatum (TT-MM-JJJJ): ');
  const address = await ask('Adresse: ');
  const gender = await ask('Geschlecht: ');
  const language = await ask('Sprache: ');

  // Rolle prüfen
  const role = roleInput.toUpperCase();
  if (!['ADMIN', 'ANALYST'].includes(role)) {
    console.error('❌ Ungültige Rolle. Nur ADMIN oder ANALYST erlaubt.');
    process.exit(1);
  }

  // Datum umwandeln von TT-MM-JJJJ zu YYYY-MM-DD
  const [day, month, year] = birthdayInput.split('-');
  const birthday = new Date(`${year}-${month}-${day}`);

  if (isNaN(birthday.getTime())) {
    console.error('❌ Ungültiges Datumsformat. Bitte im Format TT-MM-JJJJ (z.B. 25-02-2002) eingeben.');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.userAuthentication.create({
    data: {
      username,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      email,
      phone,
      address,
      gender,
      language,
      birthday
    }
  });

  console.log('✅ Benutzer erfolgreich erstellt:', user);

  rl.close();
  await prisma.$disconnect();
})();
