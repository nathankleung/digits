import { prisma } from './lib/prisma';
import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Create users
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;

    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }

  // Create contacts

  // Create default contacts
  for (const contact of config.defaultContacts) {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);

    const existingContact = await prisma.contact.findFirst({
      where: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        owner: contact.owner,
      },
    });

    const contactData = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    };

    if (existingContact) {
      await prisma.contact.update({
        where: { id: existingContact.id },
        data: contactData,
      });
    } else {
      await prisma.contact.create({
        data: contactData,
      });
    }
  }

  console.log('Database seeding completed successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
