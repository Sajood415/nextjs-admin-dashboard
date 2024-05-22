# Front-End Developer Assessment Project

## Description

This project is a front-end application built with Next.js, TypeScript, and Tailwind CSS. It is designed to fetch and display data from a public API, provide user authentication, and offer a responsive and interactive user interface. The application features a products table with filtering, sorting, and pagination functionalities, as well as a dashboard displaying key metrics and data visualizations.

## Libraries Used

- **Next.js**: A React framework for server-side rendering and generating static websites.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React**: A JavaScript library for building user interfaces.
- **Chart.js**: A JavaScript library for creating charts and graphs.
- **shadcn**: A component library for building UI elements.
- **sonner**: A toast notification library for React.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sajood415/nextjs-admin-dashboard.git
   cd nextjs-admin-dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

## Features

- **User Authentication**: Secure login and logout functionalities.
- **Products Table**: Displays a list of products with pagination, filtering, and sorting.
- **Dashboard**: Shows key metrics and data visualizations.
- **Responsive Design**: Fully responsive layout with Tailwind CSS.
- **Toast Notifications**: Provides user feedback with toast messages.

## Usage

### Authentication

- **Login**: Navigate to `/login` and use the credentials provided to log in.
- **Protected Routes**: `/products` and `/dashboard` routes are protected and require authentication.

### Products Page

- **Filtering**: Use the search input and dropdowns to filter products by category and brand.
- **Pagination**: Navigate through the pages using the pagination controls.
- **Sorting**: Sort products by different criteria using the dropdowns.

### Dashboard

- **Metrics**: View key metrics such as average rating, total products, and category counts.
- **Charts**: Visualize data with charts created using Chart.js.

## Middleware

The middleware ensures that protected routes are only accessible to authenticated users. If the user is not authenticated, they are redirected to the login page. Additionally, if the user tries to access the login page while already authenticated, they are redirected to the products page. The middleware also handles token expiration and redirects the user to the login page if the token is expired.

## Conclusion

This project demonstrates a front-end application with advanced features such as user authentication, data fetching, state management, and responsive UI design. It leverages modern libraries and frameworks to provide a robust and interactive user experience.
