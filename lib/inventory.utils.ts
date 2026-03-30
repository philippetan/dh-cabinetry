const getStatus = (stock: number) => {
  if (stock === 0)
    return { label: "Out of Stock", class: "bg-red-100 text-red-600" };
  if (stock <= 10)
    return { label: "Low Stock", class: "bg-yellow-100 text-yellow-600" };
  return { label: "In Stock", class: "bg-green-100 text-green-600" };
};
