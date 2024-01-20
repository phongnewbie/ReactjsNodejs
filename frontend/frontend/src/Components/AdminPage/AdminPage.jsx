import React, { useState, useEffect } from "react";
import {
  getProduct,
  AddProductApi,
  deleteProduct,
  getProductApi,
} from "../AdminFunction/MethodProduct";
import Button from "react-bootstrap/esm/Button";
import { formatCurrency } from "../utilities/formatCurrency";
import ChatBotAdmin from "../ChatBotAdmin/ChatBotAdmin";
export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    Type: "",
    avatar: "",
    description: "",

    // Thêm các trường dữ liệu khác của sản phẩm
  });

  useEffect(() => {
    // Load products when the component mounts
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProduct();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await AddProductApi(newProduct);
      // Sau khi thêm sản phẩm, refresh danh sách sản phẩm
      loadProducts();
      // Đặt lại giá trị của newProduct để chuẩn bị cho sản phẩm mới
      setNewProduct({
        name: "",
        price: 0,
        Type: "",
        avatar: "",
        description: "",

        // Đặt lại các trường dữ liệu khác của sản phẩm
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const handleEditProduct = async (editedProduct) => {
    try {
      await getProductApi(editedProduct);
      // Sau khi chỉnh sửa, refresh danh sách sản phẩm
      loadProducts();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      // Sau khi xóa, refresh danh sách sản phẩm
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="admin_Details">
      <h2>Trang Admin</h2>
      <form className="addProduct_form">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Giá sản phẩm"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Loại"
          value={newProduct.Type}
          onChange={(e) =>
            setNewProduct({ ...newProduct, Type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Hình Ảnh"
          value={newProduct.avatar}
          onChange={(e) =>
            setNewProduct({ ...newProduct, avatar: e.target.value })
          }
        />
        {/* Thêm các trường dữ liệu khác của sản phẩm mới */}
        <button type="button" onClick={handleAddProduct}>
          Thêm Sản Phẩm
        </button>
      </form>
      <tr>
        <th style={{ width: "150px" }}>Image</th>
        <th>Product Name</th>
        <th>Product Type</th>
        <th>Price</th>
        <th style={{ width: "100px" }}></th>
      </tr>
      {products.map((sanPham) => (
        <tr key={sanPham.id}>
          <td>
            <img src={sanPham.avatar} alt="" />
          </td>
          <td className="info_product">{sanPham.name}</td>
          <td className="info_product">{sanPham.Type}</td>
          <td>{formatCurrency(sanPham.price)}</td>
          <td>
            {" "}
            <Button
              className="btn btn-danger"
              type="button"
              onClick={() => handleDeleteProduct(sanPham.id)}
            >
              Xóa
            </Button>
          </td>
        </tr>
      ))}
    </div>
  );
}
