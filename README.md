# SQLite Schema Visualiser

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

Project Screenshots:



Prisma commands to run or be aware about: 

```bash
npm install prisma @prisma/client @prisma/adapter-better-sqlite3 dotenv @auth/prisma-adapter
npm install -D @types/better-sqlite3
npx prisma init --datasource-provider sqlite --output ../generated/prisma

create DB structure : npx prisma migrate dev --name init

Generate prisma client: npx prisma generate

Prisma Studio: npx prisma studio --url="file:///(File directory)/password-manager/dev.db"
```

Clone and run the front-end through nextJS:

```bash
# Clone the repository
git clone https://github.com/laksh-ahuja06/Schema-Visualizer.git

# Enter the project
cd Schema-Visualizer

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Start the Next.js development server
npm run dev
```

Then open http://localhost:3000

Open a second terminal while the Next.js server is running:

```bash
cd Schema-Visualizer
npx prisma studio
```




