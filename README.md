# Hospital Management System — Frontend

A frontend client built with **React** (via **Vite**) for the Hospital Management System. It consumes the Django REST Framework API to provide interfaces for managing patient records, appointments, doctors, and staff/admin administration. Styled with **Tailwind CSS** and secured using **JWT authentication**.

## Features

- **Patient Management UI** — create, view, update, and manage patient records
- **Appointment Scheduling UI** — book and manage appointments between patients and doctors
- **Doctor Management UI** — view and manage doctor profiles, specializations, and availability
- **Admin / Staff Dashboard** — manage hospital staff and administrative roles
- **JWT Authentication** — secure login and protected routes using token-based auth
- **Responsive Design** — built with Tailwind CSS for a consistent experience across devices
- **API Integration** — connects to the Hospital Management System backend via REST endpoints

## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)
- **HTTP Client:** Axios (or Fetch API)
- **Package Manager:** npm / yarn

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- The [backend API](https://github.com/fidelisnjoki-art/hospital-management-system) running locally or accessible remotely

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/fidelisnjoki-art/hospital-management-system-frontend.git
    cd hospital-management-system-frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the project root and add the required variables, e.g.:

    ```
    VITE_API_BASE_URL=http://127.0.0.1:8000/api
    ```

    See `.env.example` if available.

4. **Run the development server**

    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:5173/`.

5. **Build for production**

    ```bash
    npm run build
    ```

6. **Preview the production build**

    ```bash
    npm run preview
    ```

## Connecting to the Backend

This frontend expects the Hospital Management System backend to be running and accessible at the URL specified in `VITE_API_BASE_URL`. Ensure the backend's CORS settings allow requests from the frontend's origin (e.g. `http://localhost:5173`).

## Authentication

This project uses **JWT authentication** to communicate with the backend:

1. On login, the app sends credentials to the backend's token endpoint and receives an access (and refresh) token.
2. The token is stored client-side (e.g. in memory or `localStorage`, depending on implementation) and attached to subsequent requests:

    ```
    Authorization: Bearer <token>
    ```

3. Protected routes/pages check for a valid token before rendering and redirect to login if unauthenticated.

## Project Structure

```
hospital-management-system-frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api/                # Axios instance & API service calls
    ├── assets/
    ├── components/         # Reusable UI components
    ├── context/             # Auth/global context providers
    ├── pages/
    │   ├── Patients/
    │   ├── Doctors/
    │   ├── Appointments/
    │   └── Staff/
    ├── routes/              # Route definitions & protected routes
    └── styles/
```

## Running Tests

```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE) — update this section if a different license applies.

## Authors

1. Erika Gwiyo
2. Jaden Afrika
3. Fidelis Njoki
4. Favour Kendi
5. Gladwell Birika