import { useMemo,useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useProducts } from "../context/ProdContext";
import Table from "./Table";
import { useAuth } from "../../auth/context/AuthContext";

export default function Filters() {
  const { products = [], error, loading,hiddenProductIds,toggleProductVisibility} = useProducts();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  // URL STATE
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  //Fetching all Categories To Show
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);


//Adding and Removing Searched  Product, In URL
  const handleSearch = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.delete("page");

    setSearchParams(params);
  };

//Adding and Removing Categories selected, In URL
 const handleCategoryToggle = (selectedCategory) => {
  const params = new URLSearchParams(searchParams);


   //String to Array 
  let selectedCategories = category
    ? category.split(",")
    : [];

  if (selectedCategories.includes(selectedCategory)) {
    selectedCategories = selectedCategories.filter(
      (item) => item !== selectedCategory
    );
  } else {
    selectedCategories.push(selectedCategory);
  }

  if (selectedCategories.length > 0) {
    params.set("category", selectedCategories.join(","));
  } else {
    params.delete("category");
  }

  params.delete("page");

  setSearchParams(params);
};



//Adding and Removing Sorting Critaria In URL
  const handleSort = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    params.delete("page");

    setSearchParams(params);
  };

//Adding Changed Page No In URL
  const handlePageChange = (newPage) => {
  const params = new URLSearchParams(searchParams);

  params.set("page", newPage.toString());

  setSearchParams(params);
};

//Using UseMemo to Preserver Filtering Criteria Even Refresh
  const filteredProducts = useMemo(() => {
    let result = [...products];

//Filtering On the Basis of  Searched Items
    if (search) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

//Filtering On the Basis of Selectde Categories 
    if (category) {
      const selectedCategories = category.split(",");

      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Sorting on the basis of different Properties of Product
    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "name-asc") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
     
    result = user.role === "admin"
    ? result
    : result.filter(
        (product) =>
          !hiddenProductIds.includes(product.id)
      );

    return result;
  }, [products, search, category, sort]);


  //Added Pagination Logic
const PRODUCTS_PER_PAGE = 10;

const page =
  Number(searchParams.get("page")) || 1;

const totalPages = Math.ceil(
  filteredProducts.length / PRODUCTS_PER_PAGE
);

const startIndex =
  (page - 1) * PRODUCTS_PER_PAGE;

const endIndex =
  startIndex + PRODUCTS_PER_PAGE;

const paginatedProducts = filteredProducts.slice(
  startIndex,
  endIndex
);

  if (loading) {
    return <h1>Loading products...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (products.length === 0) {
    return (
      <h1 className="flex justify-center text-xl">
        SORRY! There is no Product in Storage
      </h1>
    );
  }

  return (
    <div>
      <div className="mb-6 flex w-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-md sm:flex-row">

        {/* SEARCH  Section*/}

        <input
          type="text"
          value={search}
          placeholder="Search products..."
          onChange={handleSearch}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {/* CATEGORY Section*/}

      <div className="relative">
  <button
    onClick={() => setCategoryOpen(!categoryOpen)}
    className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 sm:w-[220px]"
  >
    <span>
      Categories
      {category && ` (${category.split(",").length})`}
    </span>

    <span>⌄</span>
  </button>

  {categoryOpen && (
    <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-3 shadow-xl sm:w-[240px]">
      {categories.map((item) => {
        const selectedCategories = category
          ? category.split(",")
          : [];

        return (
          <label
            key={item}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(item)}
              onChange={() => handleCategoryToggle(item)}
              className="h-4 w-4"
            />

            <span className="text-sm capitalize text-slate-700">
              {item.replaceAll("-", " ")}
            </span>
          </label>
        );
      })}
    </div>
  )}
</div>

        {/* SORT Section*/}

        <select
          value={sort}
          onChange={handleSort}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none sm:w-[220px]"
        >
          <option value="">Sort By</option>

          <option value="price-asc">
            Price: Low to High
          </option>

          <option value="price-desc">
            Price: High to Low
          </option>

          <option value="rating-desc">
            Rating: High to Low
          </option>

          <option value="name-asc">
            Name: A-Z
          </option>
        </select>
      </div>

    <Table
  products={paginatedProducts}
  isAdmin={user.role === "admin"}
  hiddenProductIds={hiddenProductIds}
  toggleProductVisibility={toggleProductVisibility}
/>


{/* Pagination UI  */}
<div className="mt-6 flex items-center justify-center gap-2">
  <button
    disabled={page === 1}
    onClick={() => handlePageChange(page - 1)}
    className="rounded-lg border px-4 py-2 disabled:opacity-50"
  >
  Previous
  </button>
  {Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;

//Making Dynamic Buttons
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`h-10 w-10 rounded-lg ${
          page === pageNumber
            ? "bg-blue-600 text-white"
            : "border bg-white"
        }`}
      >
        {pageNumber}
      </button>
    );
  })}

  <button
    disabled={page === totalPages}
    onClick={() => handlePageChange(page + 1)}
    className="rounded-lg border px-4 py-2 disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
  );
}