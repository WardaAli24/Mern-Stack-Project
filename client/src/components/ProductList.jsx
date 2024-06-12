// client/src/components/ProductList.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = ({ products, deleteProduct, fetchProducts }) => {
  const navigate = useNavigate();

  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  }
  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <div className=' mt-10 flex flex-col mx-auto justify-center '>
      <div className='justify-between flex'>
      <div className="bg-white py-0.1 px-2 rounded">
      <h2 className="text-xl font-bold mb-2">Product List</h2>
      </div>

        <Link to="/add-product" className="bg-black text-white hover:bg-white hover:text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
          Add Product
        </Link>
      </div>
      <table className="table-auto mt-10 w-full">
        <thead>
          <tr  className="bg-white">
            <th className="px-4 border  py-2">Name</th>
            <th className="px-4 border  py-2">Description</th>
            <th className="px-4 border  py-2">Price</th>
            <th className="px-4 border  py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.length ?
            products.map((product, index) => (
              <tr key={product._id} className={index % 2 === 0 ? 'bg-white' : 'bg-white'}>
                <td className="border px-4 py-2 text-center">{product.name}</td>
                <td className="border px-4 py-2 text-center">{product.description}</td>
                <td className="border px-4 py-2 text-center">Rs.{product.price}</td>
                <td className="border px-4 py-2 flex flex-nowrap justify-center">
                <button
                    className="bg-black text-white hover:bg-white hover:text-black font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outlines"
                    onClick={() => editProduct(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-black text-white hover:bg-white hover:text-black font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outlines"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) :
            <td className="border px-4 py-2 text-center" rowSpan={10} colSpan={10}>No Data Found</td>


          }
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
