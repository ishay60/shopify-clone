import * as React from "react";
import ProductList from "../components/ProductList";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold text-center mt-6">Our Products</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
