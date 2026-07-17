import { useNavigate } from "react-router-dom";
import ProductRow from "./ProductRow";

export default function Table({
  products = [],
  isAdmin,
  hiddenProductIds = [],
  toggleProductVisibility,
}) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-4 lg:px-6 py-4">Product</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock Status</th>
            <th className="px-6 py-4">Rating</th>

            {isAdmin && (
              <th className="px-6 py-4">
                Visibility
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
<ProductRow
  key={product.id}
  product={product}
  isAdmin={isAdmin}
  isHidden={hiddenProductIds.includes(product.id)}
  toggleProductVisibility={toggleProductVisibility}
/>
          ))}
        </tbody>
      </table>
    </div>
  );
}