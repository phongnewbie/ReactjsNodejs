import React from "react";
import Footer from "../Footer/Footer";

import Product from "../ProductHome/Product";
import ContactAdmin from "../Contact/ContactAdmin";
import MessageBot from "../ChatBot/MessageBot";
import HomeSlider from "../slider/HomeSlider";
import Suggestion from "../SuggestionToday/Suggestion";
export default function HomePage() {
  return (
    <div>
      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>

      <MessageBot />
      <HomeSlider />
      <Product />
      <Suggestion />
      <Footer />
    </div>
  );
}
