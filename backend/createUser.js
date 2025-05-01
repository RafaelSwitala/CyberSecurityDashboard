const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Gib einen Benutzernamen ein: ', (username) => {
  rl.question('Gib ein Passwort für den Benutzer ein: ', async (password) => {
    rl.question('Gib die Rolle des Benutzers ein (ADMIN oder ANALYST): ', async (role) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.userAuthentication.create({
        data: {
          username: username,
          password: hashedPassword,
          role: role.toUpperCase(),
        },
      });

      console.log('✅ Benutzer erfolgreich erstellt:', user);

      rl.close();
      prisma.$disconnect();
    });
  });
});
