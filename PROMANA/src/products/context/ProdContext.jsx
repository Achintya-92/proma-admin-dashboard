import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";

 const ProdContext = createContext(null);

export function ProdProvider({ children }) {
  
 const [hiddenProductIds, setHiddenProductIds] = useState(() => {
  const saved = localStorage.getItem("hiddenProductIds");

  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem(
    "hiddenProductIds",
    JSON.stringify(hiddenProductIds)
  );
}, [hiddenProductIds]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/products?limit=0"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleProductVisibility = useCallback(
  (productId) => {
    setHiddenProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  },
  []
);

  return (
    <ProdContext.Provider value={{ products, loading, error,hiddenProductIds,toggleProductVisibility}}>
      {children}
    </ProdContext.Provider>
  )
}

export const useProducts = () => {
  return useContext(ProdContext);
};