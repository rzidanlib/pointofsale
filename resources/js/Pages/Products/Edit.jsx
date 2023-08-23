import Navbar from "@/Components/Navbar";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Edit(props) {
  console.log(props);
  const { flash } = usePage().props;
  const [menu, setMenu] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState("");

  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  const handleSubmit = () => {
    const data = {
      id: props.products.id,
      menu,
      harga,
      gambar,
    };
    router.post("/products/update", data);
    setMenu("");
    setHarga("");
    setGambar("");
  };

  return (
    <>
      <Head title="Edit Products" />
      <Navbar />

      <section className="bg-slate-300 min-h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 bg-white rounded-lg shadow-xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900">Edit Menu</h2>
              <div className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="menu"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Menu
                  </label>
                  <input
                    type="text"
                    id="menu"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                    placeholder="Update Menu..."
                    onChange={(menu) => setMenu(menu.target.value)}
                    defaultValue={props.products.menu}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="menu"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Harga
                  </label>
                  <input
                    type="text"
                    id="harga"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                    placeholder="Update Menu..."
                    onChange={(harga) => setHarga(harga.target.value)}
                    defaultValue={props.products.harga}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="gambar"
                    className="mb-2 text-sm font-medium text-gray-900 "
                  >
                    Gambar menu
                  </label>
                  <input
                    type="file"
                    id="gambar"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  "
                    placeholder="Masukan harga..."
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
