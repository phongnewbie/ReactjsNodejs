import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";
export default function Suggestion() {
  const [dataSanPham, setDataSanPham] = useState([]);
  useEffect(() => {
    fetch(
      "https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/SuggestProduct"
    )
      .then((res) => res.json())
      .then((data) => {
        setDataSanPham(data);
      });
  }, []);
  return (
    <div>
      <h2 className="upcoming_Header">Upcoming Product</h2>
      <div className="flex grid grid-cols-3 upcoming_Product  text-center">
        {dataSanPham.map((sanPham) => (
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

              {console.log(sanPham.Type)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
