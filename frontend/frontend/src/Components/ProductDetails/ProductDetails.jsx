import React, { useState } from "react";
import Product from "../ProductHome/Product";
import NavBar from "../NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";
import { incrementLikes, incrementDislikes } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLikeClick = () => {
    dispatch(incrementLikes());
  };

  const handleDislikeClick = () => {
    dispatch(incrementDislikes());
  };
  const likeCount = useSelector((state) => state.likes.likes);
  const dislikeCount = useSelector((state) => state.likes.dislikes);
  const { sanPham } = location.state;
  return (
    <div>
      <header className="header_Details">Chi Tiết Sản Phẩm</header>
      <div className="allProduct_Detail">
        <div className=" cardBox  mt-12 mb-5">
          <div className="cardTwo">
            <img style={{ borderRadius: "100%" }} src={sanPham.avatar} alt="" />
            <div className="h4">{sanPham.name}</div>

            <div className="content">
              <div className="h3">{formatCurrency(sanPham.price)}</div>
              <p>{sanPham.Location}</p>
            </div>
          </div>
        </div>
        <div className="product_Details mt-14 mb-4 w-96">
          <p>Mô Tả Sản Phẩm</p>
          <p>{sanPham.description}</p>
        </div>
        <div>
          <h1 className="text-red-800 fw-bolder text-center rating_Vote">
            Lượt đánh giá
          </h1>
          <div className="flex reactButton">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.n05W4n89KGhhgOTtMBX1JQHaHa&pid=Api&P=0&h=180"
              alt="Like"
              onClick={handleLikeClick}
            />
            <span id="like-count">{likeCount}</span>
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.-qSzGJCR-IFupDvxRk44hQHaHI&pid=Api&P=0&h=180"
              alt="dislike"
              onClick={handleDislikeClick}
            />
            <span id="dislike-count">{dislikeCount}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
