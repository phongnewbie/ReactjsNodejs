import React from "react";

export default function ContactAdmin() {
  return (
    <div>
      <div className="container">
        <h1>Hãy nêu lên suy nghĩ của bạn</h1>
        <form
          target="_blank"
          action="https://formsubmit.co/phongngo290902@gmail.com"
          method="POST"
        >
          <div class="max-w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 class="text-2xl text-sky-900 font-bold mb-6">
              Góp Ý của bạn là gì?
            </h2>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-600" for="name">
                Full Name
              </label>
              <input class="mt-1 p-2 w-full border rounded-md" type="text" />
            </div>

            <div class="mb-4">
              <label
                class="block text-sm font-medium text-gray-600"
                for="email"
              >
                Email Address
              </label>
              <input
                class="mt-1 p-2 w-full border rounded-md"
                name="email"
                id="email"
                type="email"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-600" for="bio">
                Opinion
              </label>
              <textarea
                class="mt-1 p-2 w-full border rounded-md"
                rows="3"
                name="Opinion"
                id="bio"
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                class="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-lime-600 px-4 py-2 font-bold rounded-md hover:opacity-80"
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
