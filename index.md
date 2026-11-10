<img src="doc/landing.png">

This app is intended for the viewing and managing the contacts of users.

## Installation

First, clone this repository to a local repo to begin working on it.

Then, [install PostgreSQL](https://www.postgresql.org/download/). Then create a database for your application if you don't have one already.
(Note: "mydb" is a temporary name. Replace with whatever you'd like)

```

$ createdb mydb
Password:
$

```
Second, cd into the directory of your local copy of the repo, and install third party libraries with:

```

$ npm install

```

Third, create a `.env` file from the `sample.env`. Edit the line `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"` to match your setup. Replace `mydb` with the PostgreSQL database that you created in the first step (in the example for this step the database is `nextjs-application-template`). replace `johndoe:randompassword` with a username and password you created for this db. If you did not create a user for this database, you can use the `postgress` user with the password you set when you installed postgress. Note: this is not a recommdened practice since the `postgres` user is an admin with full access to postgres. 

See the Prisma docs [Connect your database](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql#3-connect-your-database). 

Then run the Prisma migration `npx prisma migrate dev` to set up the PostgreSQL tables.

```
$ npx prisma migrate dev
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.
Datasource "db": PostgreSQL database "mydb", schema "public" at "localhost:5432"

Applying migration `20260301195634_init`

The following migration(s) have been applied:

migrations/
  └─ 20260301195634_init/
    └─ migration.sql

Your database is now in sync with your schema.

$

```

Create the Prisma Client by running the command `npx prisma generate`. This will create the Prisma Client in the `generated/prisma` directory, which is used by the application to interact with the database.

```
$ npx prisma generate

Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.

Generated Prisma Client (7.4.2) to ./generated/prisma in 80ms
 
```

Then seed the database with the `/config/settings.development.json` data using `npm run seed`.

```

$ npm run seed  

> nextjs-application-template-s26@0.1.0 seed
> npx tsx src/seed.ts

Seeding the database
  Creating user: admin@foo.com with role: ADMIN
  Creating user: john@foo.com with role: USER
  Adding contact: Philip Johnson
  Adding contact: Henri Casanova
  Adding contact: Kim Binsted
Database seeding completed successfully
$

```

## Running the system

Once the libraries are installed and the database seeded, you can run the application by invoking the "dev" script in the [package.json file](https://github.com/ics-software-engineering/nextjs-application-template/blob/master/app/package.json):

```

$ npm run dev

> nextjs-application-template-s26@0.1.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://XXX.XXX.XXX.XXX:3000
- Environments: .env

✓ Starting...
✓ Ready in 821ms

```

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000). You can login using the credentials in [settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json), or else register a new account.


### ESLint
You can verify that the code obeys our coding standards by running ESLint over the code in the src/ directory with:

```
$ npm run lint

> nextjs-application-template-1@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
$
```

### Using the App

First, create an account and signup to begin managing contacts. Use the email and password to sign back in later.

<img src="doc/signup.png">

Now you can see the following pages on the navbar from the landing page:
digits        - The Landing Page
Add Contact   - Form for creating a new contact
List Contacts - Displays all contacts owned by the logged in user

<img src="doc/landing-user.png">

Click on List Contacts to view and manage contacts owned by the current logged in user. You can add timestamped notes to contacts or edit their saved information.

<img src="doc/user-list-contact-page.png">

Compared to the list view of another user:

<img src="doc/admin-list-contacts-page.png">

Click on Add Contact to create a new contact for the current user.

<img src="doc/add-contact-page.png">

Logging into the admin account gives access to the Admin page

<img src="doc/admin.png">

Note that non-admin users cannot get to this page, even if they type in the URL by hand.

### Building the App

To build the application for production deployment, use the following command:

```bash
$ npm run build
```

This will compile the Next.js application and output the production build to the `.next/` directory.

After building, you can start the production server with:

```bash
$ npm start
```

Make sure your environment variables and database are properly configured before building for production.

### Testing
This project uses [Playwright](https://playwright.dev/) for end-to-end and authentication testing. Tests are located in the `tests/` directory and cover user flows, authentication, and admin features.

To run all tests:

```
$ npx playwright test
```

You can run tests for a specific file:

```
$ npx playwright test tests/john-pages.spec.ts
```

To view tests in headed mode (see the browser UI):

```
$ npx playwright test --headed
```

For more information, see the [Playwright documentation](https://playwright.dev/).


## Walkthrough

The following sections describe the major features of this template.

### Directory structure

The top-level directory structure is:

```

.github # holds the GitHub Continuous Integration action and Issue template.

config/ # holds configuration files, such as settings.development.json

doc/ # holds developer documentation, user guides, etc.

prisma/ # holds the Prisma ORM schema and seed.ts files.

public/ # holds the public images.

src/ # holds the application files.

tests/ # holds the Playwright acceptance tests.

.eslintrc.json # The ESLint configuration.

.gitignore # don't commit VSCode settings files, node_modules, and settings.production.json

```

This structure separates documentation files (such as screenshots) and configuration files (such as the settings files) from the actual Next.js application.

The src/ directory has this structure:

```

app/

  add/ # The add route
    page.tsx # The Add Contact Page

  admin/
    page.tsx # The Admin Page

  api/auth/[...nextauth]/
    route.ts # The NextAuth configuration

  auth/
    change-password/
      page.tsx # The Change Password Page

    signin/
      page.tsx # The Sign In Page

    signout/
      page.tsx # The Sign Out Page

    signup/
      page.tsx # The Sign Up / Register Page

  edit/
    page.tsx # The Edit Contacts Page

  list/
    page.tsx # The List Contacts Page

  not-authorized/
    page.tsx # The Not Authorized Page

  layout.tsx # The layout of the application

  page.tsx # The Landing Page

  providers.tsx # Session providers.

  components/
    AddContactForm.tsx # The React Hook Form for adding contact.

    EditContactForm.tsx # The Edit Contact Form.

    Footer.tsx # The application footer.

    LoadingSpinner.tsx # Indicates working.

    Navbar.tsx # The application navbar.

    ContactItem.tsx # Row in the list contact page.

    ContactItemAdmin.tsx # Row in the admin list contact page.

  lib/

    dbActions.ts # Functions to manipulate the Postgres database.

    page-protections.ts # Functions to check for logged in users and their roles.

    prisma.ts # Singleton Prisma client.

    validationSchemas.ts # Yup schemas for validating forms.

  tests/ # playwright acceptance tests.

```

### Tables

The application implements two tables "Contact" and "User". Each Contact row has the following columns: id, firstName, lastName, Location, Description, and owner. The User table has the following columns: id, email, password (hashed using bcrypt), role.

The Contact and User models are defined in [prisma/schema.prisma](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/prisma/schema.prisma).

The tables are initialized in [prisma/seed.ts](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/prisma/seed.ts) using the command `npx prisma db seed`.

### CSS

The application uses the [React implementation of Bootstrap 5](https://react-bootstrap.github.io/). You can adjust the theme by editing the `src/app/globals.css` file. To change the theme override the Bootstrap 5 CSS variables.

```css
/* Change bootstrap variable values.
 See https://getbootstrap.com/docs/5.2/customize/css-variables/
 */
body {
  --bs-light-rgb: 236, 236, 236;
}

/* Define custom styles */
.gray-background {
  background-color: var(--bs-gray-200);
  color: var(--bs-dark);
  padding-top: 10px;
  padding-bottom: 20px;
}
```

### Routing

For display and navigation among its four pages, the application uses [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing).

Routing is defined by the directory structure.

### Authentication

For authentication, the application uses the NextAuth package.

When the database is seeded, a settings file (such as [config/settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json)) is used to create users and contacts in the PostgreSQL database. That will lead to a default accounts being created.

The application allows users to register and create new accounts at any time.

### Authorization

Only logged in users can add or view their own contacts. The exception being that the admin is able to view all contacts on the admin page. 

### Configuration

The [config](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config) directory is intended to hold settings files. The repository contains one file: [config/settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json).

The [.gitignore](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/.gitignore) file prevents a file named settings.production.json from being committed to the repository. So, if you are deploying the application, you can put settings in a file named settings.production.json and it will not be committed.

### Quality Assurance

#### ESLint

The application includes a [.eslintrc.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/.eslintrc.json) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
[~/nextjs-application-template]-> npm run lint

> nextjs-application-template-1@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
[~/nextjs-application-template]->
```

ESLint should run without generating any errors.

It's significantly easier to do development with ESLint integrated directly into your IDE (such as VSCode).


#### Playwright End-to-End Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end and authentication testing. Playwright tests are located in the `tests/` directory and cover user flows, authentication, and admin features. These tests help ensure that the application works as expected from the user's perspective and that critical workflows are protected against regressions.

**How to run Playwright tests:**

- To run all tests:

  ```
  npx playwright test
  ```

- To run tests for a specific file:

  ```
  npx playwright test tests/john-pages.spec.ts
  ```

- To view tests in headed mode (see the browser UI):

  ```
  npx playwright test --headed
  ```

For more information, see the [Playwright documentation](https://playwright.dev/).


#### Continuous Integration (CI)

Continuous Integration is implemented using GitHub Actions. The workflow is defined in `.github/workflows/ci.yml` and runs automatically on every push or pull request to the `main` or `master` branches.

The CI workflow performs the following steps:

- Checks out the repository code.
- Sets up Node.js and installs dependencies.
- Installs Playwright browsers and dependencies.
- Generates the Prisma client and runs database migrations.
- Seeds the test database.
- Runs ESLint to check code quality.
- Builds the Next.js application.
- Runs Playwright end-to-end tests.
- Uploads the Playwright test report as a workflow artifact for review.

The workflow uses a PostgreSQL service for testing and sets environment variables for the test environment. You can view and download the Playwright test report from the workflow run's summary page in GitHub Actions.

For details, see the [`ci.yml` workflow file](.github/workflows/ci.yml).

<!--
## Screencasts

For more information about this system, please watch one or more of the following screencasts. Note that the current source code might differ slightly from the code in these screencasts, but the changes should be very minor.

- [Walkthrough of system user interface (6 min)](https://youtu.be/48xu1hrqUi8)
- [Data and accounts structure and initialization (18 min)](https://youtu.be/HZRjwrVBWp4)
- [Navigation, routing, pages, components (34 min)](https://youtu.be/XztTdHpv6Jw)
- [Forms (32 min)](https://youtu.be/8FyWR3gUGCM)
- [Authorization, authentication, and roles (12 min)](https://youtu.be/9HX5vuXTlvA)
-->
