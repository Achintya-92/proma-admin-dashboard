import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProdContext";
import { useState } from "react";


export default function ProductDetails() {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(0);
  const { products = [], error, loading } = useProducts();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (loading) {
    return <h1>Loading product...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="bg-light px-4 py-6 sm:px-6 lg:px-16">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
          Product Details
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Explore detailed information about the product
        </p>
      </div>

      {/* PRODUCT */}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* IMAGE CAROUSEL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-[350px] items-center justify-center rounded-xl bg-slate-50 sm:h-[450px]">
            <img
              src={product.images[mainImage]}
              alt={product.title}
              className="h-full w-full object-contain hover:scale-103 transition"
            />
          </div>

          {/* THUMBNAILS */}

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <button
                key={img}
                onClick={() => setMainImage(index)}
                className={`h-16 w-16 shrink-0 rounded-xl border-2 p-1 ${
                  mainImage === index
                    ? "border-blue-500"
                    : "border-slate-200"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT INFORMATION */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium capitalize text-blue-700">
            {product.category}
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 lg:text-4xl">
            {product.title}
          </h2>

          <div className="mt-3 flex items-center gap-4 bg-blue-50">
            <span className="text-amber-500">
              ⭐ {product.rating}
            </span>

            <span className="text-sm text-slate-500">
              {product.brand}
            </span>
          </div>

          <h3 className="mt-6 text-3xl font-bold text-slate-900">
            ${product.price}
          </h3>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900">
              Description
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              {product.description}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
            <div>
              <p className="text-sm text-slate-500">Stock</p>

              <p className="mt-1 font-semibold text-slate-900">
                {product.stock} units
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Availability
              </p>

              <p
                className={`mt-1 font-semibold ${
                  product.stock > 10
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {product.stock > 10
                  ? "In Stock"
                  : "Low Stock"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}