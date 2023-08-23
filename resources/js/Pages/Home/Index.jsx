import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/react";
import React, { useState } from "react";

export default function index(props) {
  const [cart, setCart] = useState([]);

  const addMenuTocart = (product) => {};

  return (
    <>
      <Head title="Homepage" />
      <Navbar />

      <div className="min-h-screen bg-slate-300">
        <div className="grid lg:grid-cols-5 grid-cols-2 p-4">
          <div className="col-span-3 m-2 ">
            <div className="grid grid-cols-4 gap-4">
              {props.products.map((product, i) => {
                return (
                  <a
                    key={i}
                    onClick={addMenuTocart(product)}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100"
                  >
                    <img
                      className="rounded-t-lg h-32 object-fill w-full"
                      src={`/assets/${product.gambar}`}
                      alt="product image"
                    />
                    <div className="p-2 pb-5">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.menu}
                      </h5>
                      <span className="font-bold text-gray-900 dark:text-white">
                        Rp.{product.harga}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="col-span-2 m-2">
            <div className="flex justify-between items-center bg-cyan-400 rounded-t-md overflow-hidden m-1">
              <div className="w-24 p-2 bg-cyan-600">
                <img src="/assets/icons/user.png" alt="user" className="w-14" />
                <p className="font-medium">Customer</p>
              </div>
              <div className="w-ful">
                <h2 className="text-center p-2 text-3xl font-bold">
                  New Customer
                </h2>
              </div>
              <div className="w-24 p-2 bg-cyan-600">
                <img src="/assets/icons/list.png" alt="user" className="w-14" />
                <p className="font-medium">List bill</p>
              </div>
            </div>

            <div className="justify-center font-medium flex p-2 bg-white m-1">
              <p className="text-[18px]">Dine in</p>
              <img
                src="/assets/icons/down.png"
                alt="downarrow"
                className="w-6"
              />
            </div>

            <div className="bg-white p-2 m-1">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Menu
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Jumlah
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Harga
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Laptop</td>
                      <td className="px-6 py-4">$2999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="m-1">
              <div
                type="button"
                className="w-full text-center p-2 text-xl font-medium text-gray-900 focus:outline-none bg-white hover:bg-gray-100 cursor-pointer"
              >
                Clear Sale
              </div>
            </div>

            <div className="bg-white m-1 p-2" />

            <div className="flex m-1 text-center gap-1 text-xl cursor-pointer">
              <div className="bg-slate-400 p-5 w-1/2 font-bold hover:bg-slate-500">
                Save Bill
              </div>
              <div className="bg-slate-400 p-5 w-1/2 font-bold hover:bg-slate-500">
                Print Bill
              </div>
            </div>

            <div className="justify-center font-medium flex py-5 m-1 cursor-pointer text-white bg-cyan-700 hover:bg-cyan-800">
              <p className="text-3xl">Charge </p>
              <p className="text-3xl">Rp. 20000 </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
