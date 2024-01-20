import React, { useEffect, useState, Component, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { formatCurrency } from "../utilities/formatCurrency";
import CountUp from "react-countup";
import { Waypoint } from "react-waypoint";

export default function Product() {
  const [dataSanPham, setDataSanPham] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [logged, isLogged] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [isPriceSort, setIsPriceSort] = useState(false);
  const [isPriceSortTwo, setIsPriceSortTwo] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [sortedDataTwo, setSortedDataTwo] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const handleWaypointEnter = () => {
    setVisible(true);
  };

  const handleToggleCart = () => {
    // Nếu giỏ hàng đang mở
    if (isCartOpen) {
      // Đóng giỏ hàng
      setIsCartOpen(false);
    } else {
      // Mở giỏ hàng
      setIsCartOpen(true);
    }
  };

  const handleBuy = (sanPham) => {
    const existingItem = cartItems.find((item) => item.id === sanPham.id);

    if (existingItem) {
      // If the product already exists in the cart, increase the quantity
      const updatedCart = cartItems.map((item) =>
        item.id === sanPham.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // If the product doesn't exist in the cart, add it with quantity 1
      const updatedCart = [
        ...cartItems,
        { ...sanPham, isInCart: true, quantity: 1 },
      ];
      setCartItems(updatedCart);
    }

    setTotalPrice(totalPrice + sanPham.price);
    setTotalProduct(totalProduct + 1); // Increase total quantity by 1
    console.log(totalProduct + 1);
  };

  const payment = () => {
    setCartItems([]);
    setIsCartOpen(false);
    alert("Thanh toán thành công rồi nhe ❤️");
    setTotalPrice([]);
    setTotalProduct([]);
  };
  useEffect(() => {
    fetch("https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products")
      .then((res) => res.json())
      .then((data) => {
        setDataSanPham(data);
        setSortedData([...data]);
        setSortedDataTwo([...data]);
      });
  }, []);

  const fetchData = (value) => {
    fetch("https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products")
      .then((res) => res.json())
      .then((json) => {
        const result = json.filter((product) => {
          return (
            product.name &&
            product.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        // Log các giá trị trùng khớp
        console.log(result);
        setDataSanPham(result);
        setSortedData([...result]);
        setSortedDataTwo([...result]);
      });
  };
  const deleteProduct = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);

    const totalPrice = updatedCart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(totalPrice);

    const totalProduct = updatedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setTotalProduct(totalProduct);
  };
  const handleSort = () => {
    const sortedDataCopy = [...sortedData];
    if (!isPriceSort) {
      sortedDataCopy.sort((a, b) => a.price - b.price);
      setIsPriceSort(true);
    } else {
      sortedDataCopy.sort((a, b) => b.price - a.price);
      setIsPriceSort(false);
    }
    setSortedData(sortedDataCopy);
  };

  const handleSortTwo = () => {
    const sortedDataTwoCopy = [...sortedDataTwo];
    if (!isPriceSort) {
      sortedDataTwoCopy.sort((a, b) => a.price - b.price);
      setIsPriceSort(true);
    } else {
      sortedDataTwoCopy.sort((a, b) => b.price - a.price);
      setIsPriceSort(false);
    }
    setSortedDataTwo(sortedDataTwoCopy);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Nếu số lượng giảm xuống 0 hoặc âm, loại bỏ sản phẩm khỏi giỏ hàng
      const updatedCart = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedCart);
    } else {
      // Nếu số lượng lớn hơn 0, cập nhật số lượng sản phẩm
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
    }

    // Cập nhật tổng giá tiền
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);

    // Cập nhật tổng số sản phẩm
    const totalProduct = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setTotalProduct(totalProduct);
  };
  return (
    <div>
      <i class="fa-solid fa-cart-shopping" onClick={handleToggleCart}>
        Giỏ hàng
      </i>
      {isCartOpen && (
        <div className="card-container ml-20 mt-10">
          <h2>Giỏ hàng của bạn:</h2>
          <button
            type="button"
            class="btn btn-outline-danger"
            onClick={payment}
          >
            Thanh Toán
          </button>
          <ul>
            <table
              style={{
                width: "500px",
                margin: "0 auto",
              }}
            >
              <tr>
                <th>Tên sản phẩm</th>
                <th>Hình Ảnh</th>
                <th>Số lượng</th>
                <th>Giá tiền</th>
              </tr>
              {cartItems.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>
                    <img style={{ width: "200px" }} src={item.avatar} alt="" />
                  </td>
                  <td>
                    <input
                      className="w-12"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>{formatCurrency(item.price * item.quantity)}</td>

                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteProduct(item.id)}
                    >
                      Xóa sản phẩm
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </table>
          </ul>
        </div>
      )}
      <div>
        <div style={{ marginLeft: "610px" }} className="items-center flex mt-3">
          <input
            style={{
              width: "500px",
              height: "50px",
              backgroundColor: "whitesmoke",
            }}
            type="text"
            placeholder="searching..."
            onChange={(e) => fetchData(e.target.value)}
          />

          <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="block mt-11 btnButtonSort">
          <button className="btn btn-outline-primary" onClick={handleSort}>
            Sắp xếp giá từ thấp đến cao
          </button>
          <button className="btn btn-outline-primary" onClick={handleSortTwo}>
            Sắp xếp giá từ cao đến thấp
          </button>
        </div>
      </div>
      <div>
        <Waypoint onEnter={handleWaypointEnter} bottomOffset="20%">
          <div>
            {visible && (
              <div className="container d-flex container_Count">
                <div className="d-block information_Details">
                  <div className="part_One same_Part">
                    <h1>Profits</h1>
                    <i
                      class="fa-solid fa-money-bill fa-beat"
                      style={{ color: "#74C0FC" }}
                    ></i>
                  </div>
                  <div>
                    <CountUp end={100} duration={3} prefix="₫" decimals={3} />
                  </div>
                </div>
                <div className="d-block information_Details">
                  <div className="part_Two same_Part">
                    <h1>Partner</h1>
                    <i
                      class="fa-solid fa-handshake fa-beat"
                      style={{ color: "#74C0FC" }}
                    ></i>
                  </div>
                  <div>
                    <CountUp end={100} duration={3} decimals={3} />
                  </div>
                </div>
                <div className="d-block information_Details">
                  <div className="part_Three same_Part">
                    <h1>Product</h1>
                    <i
                      style={{ color: "#74C0FC" }}
                      class="fa-brands fa-product-hunt fa-beat fa-lg"
                    ></i>
                  </div>
                  <div>
                    <CountUp end={5} duration={3} decimals={3} />
                  </div>
                </div>
                <div className="d-block information_Details">
                  <div className="part_Fourth same_Part">
                    <h1>Customer</h1>
                    <i
                      class="fa-regular fa-user fa-beat"
                      style={{ color: "#74C0FC" }}
                    ></i>
                  </div>
                  <div>
                    <CountUp end={100} duration={3} decimals={3} />
                  </div>
                </div>
              </div>

              // Thay đổi giá trị của 'end' để làm cho nó phù hợp với giá trị bạn muốn đếm đến
            )}
          </div>
        </Waypoint>
      </div>

      <div className="flex grid product_listItem grid-cols-3  text-center">
        {isPriceSort
          ? sortedData.map((sanPham) => (
              <div
                className="card  ml-24 mt-8"
                style={{
                  width: "22rem",
                  height: "18rem",
                }}
                key={sanPham.id}
              >
                <div className="groupTwo   before:hover:w-64 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-72 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
                  <div class="w-20 img_Data ml-12 h-20 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500">
                    <Link to={"/productDetails"} state={{ sanPham }}>
                      <img
                        className="w-40  h-20 object-cover bg-contain"
                        style={{ borderRadius: "500px" }}
                        src={sanPham.avatar}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="z-10 mt-4  group-hover:-translate-y-10 transition-all duration-500">
                    <span className="text_Name" style={{ fontSize: "10px" }}>
                      {sanPham.name}
                    </span>
                    <p>{formatCurrency(sanPham.price)}</p>
                  </div>
                  <a
                    class="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
                    href="#"
                    onClick={() => handleBuy(sanPham)}
                  >
                    Add to cart
                  </a>
                  {console.log(sanPham.Type)}
                </div>
              </div>
            ))
          : sortedDataTwo.map((sanPham) => (
              <div class="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-80 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
                <div class="w-20 h-20 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500">
                  <Link to={"/productDetails"} state={{ sanPham }}>
                    <img
                      className="w-40  h-20 object-cover bg-contain"
                      style={{ borderRadius: "500px" }}
                      src={sanPham.avatar}
                      alt=""
                    />
                  </Link>
                </div>
                <div class="z-10 mt-4  group-hover:-translate-y-10 transition-all duration-500">
                  <span class="text-2xl font-semibold">{sanPham.name}</span>
                  <p>{formatCurrency(sanPham.price)}</p>
                </div>
                <a
                  class="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
                  href="#"
                  onClick={() => handleBuy(sanPham)}
                >
                  Add to cart
                </a>
              </div>
            ))}
      </div>
    </div>
  );
}
