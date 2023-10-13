# Homestead

Homestead is a real estate listing platform with a GraphQL-based API. The platform enables users to view, search, and submit real estate listings. 

View the live application here:
[Vercel Link](https://homestead-three.vercel.app/)

## Key Decisions and assumptions

1. Each listing image the user uploads should have a max size of 1MB. This is to save quota space. This limit is enforced from this app to avoid unnecessary calls to the contract.
2. The app does not use any external API (like Google Maps) to fetch location information. Locations are manually entered for now but an update can be included to fetch locations dynamically.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn or npm (This guide will use Yarn)

### Installation

1. Clone this repository:

```bash
git clone https://github.com/jillo-abdullahi/homestead.git
```

2. Navigate into the project directory:

```bash
cd homestead
```

3. Install the dependencies:

```bash
yarn
```
4. Create a `.env` file at the root of the project and add the following values (you can also refer to the `.env-template` file included.
```
# Db
DATABASE_URL="<Your Postgres db url string>"
JWT_SECRET="<Your JWT secret for authentication>"
CLIENT_BASE_URL="<http://localhost:3000 - can specify a different port.>"


# mail
MAIL_HOST=<smtp.gmail.com>
MAIL_SERVICE=<'gmail'>
MAIL_PORT=<587>
MAIL_USER=<Gmail address for sending mails>
MAIL_PASS=<Gmail address app password>
MAIL_FROM=<Same as mail user>

# cloudinary 
CLOUDINARY_API_SECRET=<Cloudinary API secret>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<Cloudinary API Key>
NEXT_PUBLIC_CLOUD_NAME=<Cloudinary cloud name>
NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER=<Folder used for image uploads on Cloudinary>
```

### Running the Application

Start the application in development mode:

```bash
yarn run dev
```

Then open http://localhost:3000 with your web browser to see the result.


### Deployment

To create an optimized production build:

```bash
yarn build
```

You can then serve the built application.

```bash
yarn start
```
## Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [TailwindCSS](https://tailwindui.com/) - The styling library.
- [Node.js](https://nodejs.org/en) - For backend implementation.
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQL server of choice.
- [TypeScript](https://www.typescriptlang.org/) - For static typing.
- [PostgresSQL](https://www.postgresql.org/) - Database used.
- [Prisma](https://www.prisma.io/) - ORM for database interactions

