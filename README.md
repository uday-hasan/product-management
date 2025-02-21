# Product Management Dashboard

### Follow below code to run this project:

```bash
git clone https://github.com/uday-hasan/product-management.git
cd product-management
bun install | npm install
bun dev | npm run dev
```

#### Or [Click Here](https://product-management-pearl.vercel.app/) to see live demo.

### Tech Stack

- Next.js & Typescript
- State Management using Redux-Toolkit
- Local Storage for Data Persistence
- Tailwind css and [Shadcn UI](https://ui.shadcn.com/docs) component library for great UX

### Product Management (CRUD)

- <b>Show Product </b> - Show all product in a grid view.
- <b>Add Product</b> - Product name, image, price, category, status is mandatory and description is optional.
- <b>Edit Product</b> - Users can update an existing product.
- <b>Delete Product</b> - Users can delete an existing product.

### Searching, Filtering & Sorting

- <b>Search by name</b> - Dynamic search by name and use debounce function.
- <b>Filter by category</b>
- <b>Sort by price</b>

### Additional Features

- Theme toggle using Shadcn Theming [Click to checkout](https://ui.shadcn.com/docs/dark-mode/next)
- Option to add favourite
- Open modal when click on Detail in product card and shows product details
- Loading manage using ProductSkeleton

### What's happen in project while start?

- It's load 10 sample data and store it to localstorage for a great experience.
