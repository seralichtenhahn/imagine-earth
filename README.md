# Imagine Earth

> A university project developed by Serafin Lichtenhahn

## Introduction

This project is a Next.js application managed with the pnpm package manager. Imagine Earth integrates with the Footprint Network and Replicate APIs, utilizes a MySQL database, and incorporates AWS services for robust backend functionality. The user interface is designed with `shadcn/ui` and Tailwind CSS, providing an engaging and responsive user experience.

## Getting Started

### Prerequisites

Before starting, ensure you have:

- Node.js installed on your system.
- pnpm as your package manager.
- Access to a MySQL database.
- API keys for the Footprint Network and Replicate.
- AWS credentials for various services.

### Installation

To install and set up the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/seralichtenhahn/imagine-earth.git
   ```

2. Change directory to the project folder:

   ```bash
   cd imagine-earth
   ```

3. Install the necessary dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```plaintext
FOOTPRINT_NETWORK_API_KEY="<your-footprint-network-api-key>"
REPLICATE_API_TOKEN="<your-replicate-api-token>"

DATABASE_URL="<your-mysql-database-url>"

BASE_URL="<your-base-url>"

AWS_ACCESS_KEY_ID="<your-aws-access-key-id>"
AWS_SECRET_ACCESS_KEY="<your-aws-secret-access-key>"
AWS_REGION="<your-aws-region>"
AWS_BUCKET="<your-aws-bucket-name>"
```

Replace the placeholder text with your actual credentials.

## Database

This project uses a MySQL database. Ensure that your database is configured and running, and that the `DATABASE_URL` environment variable is set correctly.

## UI Components

The user interface is built using `shadcn/ui` and Tailwind CSS. For more information on these frameworks, you can visit:

- `shadcn/ui`: [GitHub - shadcn/ui](https://github.com/shadcn/ui)
- Tailwind CSS: [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Running the Application

To start the application locally, run:

```bash
pnpm run dev
```

The application should be accessible at `http://localhost:3000` or another specified port.

## Contributions

We welcome contributions to the Imagine Earth project. Please adhere to the code of conduct and submit pull requests for any improvements.

## License

Imagine Earth is licensed under the [MIT License](LICENSE.md).

---

For inquiries or contributions, please reach out to me. Enjoy your journey with Imagine Earth!
