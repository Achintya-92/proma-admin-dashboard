import { memo } from "react";
import { useNavigate } from "react-router-dom";

function ProductRow({
  product,
  isAdmin,
  hiddenProductIds = [],
  toggleProductVisibility,
}) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(
      isAdmin
        ? `/admin/products/${product.id}`
        : `/products/${product.id}`
    );
  };

  return (
    <tr
      onClick={handleRowClick}
      className="cursor-pointer transition hover:bg-slate-50"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-12 w-12 rounded-xl object-cover"
          />

          <p className="font-medium text-slate-900">
            {product.title}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {product.category}
      </td>

      <td className="px-6 py-4 font-medium text-slate-900">
        ${product.price}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            product.stock > 10
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {product.stock > 10
            ? "In Stock"
            : "Low Stock"}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-slate-700">
        ⭐ {product.rating}
      </td>

      {isAdmin && (
        <td className="px-6 py-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleProductVisibility(product.id);
            }}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              hiddenProductIds.includes(product.id)
                ? "bg-red-50 text-red-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {hiddenProductIds.includes(product.id)
              ? "Hidden"
              : "Published"}
          </button>
        </td>
      )}
    </tr>
  );
}

export default memo(ProductRow);