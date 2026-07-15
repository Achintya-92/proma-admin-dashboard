# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Proma

Proma is a product management dashboard built using React. It includes product listing, filtering, sorting, pagination, analytics, and role-based access for admin and normal users.

## Features

* Responsive dashboard layout
* Product listing table
* Search products by name
* Filter products by multiple categories
* Sort by price, rating, and name
* Pagination
* Product detail page
* Product image carousel
* Analytics dashboard
* URL based filters and pagination
* Admin and user roles
* Product publish/hide functionality

## User Roles

### Admin

Admin can access the analytics dashboard and view all products. Admin can also mark products as published or hidden.

### User

Users can only access the product listing and product detail pages. Hidden products are not visible to normal users.

## Analytics

The dashboard displays:

* Total products
* Average rating
* Total inventory value
* Category distribution

Category data can be viewed using bar, pie, and line charts.

## Performance

I used the following React optimization techniques:

* `useMemo`
* `useCallback`
* `React.memo`
* Lazy loading for product images

## URL State

Search, category filters, sorting, and pagination are stored in the URL.

Example:

```text id="ivmg73"
/products?category=groceries&sort=price-desc&page=2
```

This also keeps the selected filters after refreshing the page.

## Tech Stack

* React
* React Router DOM
* Tailwind CSS
* Recharts
* Context API
* Vite

## API

Product data is fetched from DummyJSON.

```text id="ucwpfh"
https://dummyjson.com/products
```

## Run Locally

Clone the project:

```bash id="uoy7fm"
git clone <https://github.com/Achintya-92/proma-admin-dashboard.git>
```

Install dependencies:

```bash id="bphfyj"
npm install
```

Start the development server:

```bash id="em4c32"
npm run dev
```

## Login

### Admin

```text id="h6oxxq"
Email: <admin-email>
Password: <admin-password>
```

### User

```text id="y5f63k"
Email: <user-email>
Password: <user-password>
```

## Live Demo

`<vercel-link>`

## Author

Lovejot Singh
