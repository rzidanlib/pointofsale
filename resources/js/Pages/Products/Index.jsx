import Navbar from "@/Components/Navbar";
import { Link, usePage, Head, router } from "@inertiajs/react";
import React, { useState } from "react";

export default function index(props) {
  const { flash } = usePage().props;
  const [menu, setMenu] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState("");

  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  const handleSubmit = () => {
    const data = {
      menu,
      harga,
      gambar,
    };
    router.post("/products", data);
    setMenu("");
    setHarga("");
    setGambar("");
  };

  return (
    <>
      <Head title="Products" />
      <Navbar />

      <div className="min-h-screen bg-slate-300">
        <div className="grid lg:grid-cols-5 grid-cols-2 p-4">
          <div className="col-span-3 m-2">
            {props.products && props.products.length > 0 ? (
              props.products.map((product, i) => {
                return (
                  <div
                    key={i}
                    className="flex bg-white border border-gray-200 rounded-lg shadow p-2 mb-2"
                  >
                    <img
                      className="w-48 h-32 rounded-md"
                      src={`/assets/${product.gambar}`}
                      alt="Image"
                    />
                    <div className="flex flex-col px-2 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {product.menu}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 ">
                        Rp. {product.harga}
                      </p>
                    </div>
                    <div className="flex items-center ml-auto border-l-2 pl-3">
                      <Link
                        data={{ id: product.id }}
                        href={route("edit.products")}
                        as="button"
                        method="get"
                        className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                      >
                        Edit
                      </Link>
                      <Link
                        data={{ id: product.id }}
                        href={route("delete.products")}
                        as="button"
                        method="post"
                        className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div class="p-6 bg-white border border-gray-200 rounded-lg shadow">
                <h5 class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                  Menu tidak ada.
                </h5>
              </div>
            )}
          </div>

          <div className="bg-white col-span-2 m-2 rounded-md p-3 h-fit">
            {flash.message && (
              <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                role="alert"
              >
                <span className="font-medium">{flash.message}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label
                  htmlFor="nama_menu"
                  className="mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Menu
                </label>
                <input
                  type="text"
                  id="menu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5  "
                  placeholder="Masukan nama menu..."
                  onChange={(menu) => setMenu(menu.target.value)}
                  value={menu}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="harga"
                  className="mb-2 text-sm font-medium text-gray-900 "
                >
                  Harga
                </label>
                <input
                  type="number"
                  id="harga"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  "
                  placeholder="Masukan harga..."
                  onChange={(harga) => setHarga(harga.target.value)}
                  value={harga}
                  required
                />
              </div>
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
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
