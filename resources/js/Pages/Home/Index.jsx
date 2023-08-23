import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { ComponentToPrint } from "./Partials/ComponentToPrint";
import { useReactToPrint } from "react-to-print";

export default function index(props) {
  const [totalHarga, setTotalHarga] = useState(0);
  const [cart, setCart] = useState([]);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showChargedModal, setShowChargedModal] = useState(false);
  const [showPayBilldModal, setShowPayBilldModal] = useState(false);
  const [kembalian, setKembalian] = useState("0");

  const addMenuTocart = (product) => {
    let findProductInCart = cart.find((i) => {
      return i.id == product.id;
    });

    if (cart.length > 0 && findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((item) => {
        if (item.id == product.id) {
          newItem = {
            ...item,
            jumlah: item.jumlah + 1,
            totalAmount: (item.jumlah + 1) * parseInt(item.harga),
          };
          newCart.push(newItem);
        } else {
          newCart.push(item);
        }
      });
      setCart(newCart);
    } else {
      let addingProduct = {
        ...product,
        jumlah: 1,
        totalAmount: parseInt(product.harga),
      };
      setCart([...cart, addingProduct]);
    }
  };

  const handleClearSale = () => {
    setCart([]);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSavedModal = () => {
    setShowSavedModal(!showSavedModal);
  };

  const handleCloseChargedModal = () => {
    setShowChargedModal(!showChargedModal);
  };

  const handleChargedModal = (totalHarga) => {
    if (totalHarga > 0) {
      setShowChargedModal(!showChargedModal);
    }
  };

  const handleKembalian = (e) => {
    const inputKembalian = e.target.value;
    let hasilKembalian = "";

    if (inputKembalian >= totalHarga) {
      hasilKembalian = `Rp. ${(inputKembalian - totalHarga).toLocaleString(
        "id"
      )}`;
    } else {
      hasilKembalian = "Uang Kurang";
    }

    setKembalian(hasilKembalian);
  };

  const handlePayBillModal = () => {
    setShowPayBilldModal(!showPayBilldModal);
    setShowChargedModal(!showChargedModal);
    setCart([]);
  };

  const handlePayBillCloseModal = () => {
    setShowPayBilldModal(!showPayBilldModal);
  };

  useEffect(() => {
    const total = cart.reduce(
      (total, item) => total + parseInt(item.totalAmount),
      0
    );
    setTotalHarga(total);
  });

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
                    onClick={() => addMenuTocart(product)}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100"
                  >
                    <img
                      className="rounded-t-lg h-32 object-fill w-full"
                      src={`/assets/${product.gambar}`}
                      alt="product image"
                    />
                    <div className="p-2 flex flex-shrink">
                      <h5 className="text-lg font-semibold tracking-tight text-gray-900 overflow-ellipsis">
                        {product.menu}
                      </h5>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="col-span-2 m-2">
            <div className="flex justify-between items-center bg-cyan-400 rounded-t-md overflow-hidden mx-1 mb-1">
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
                <table className="w-full text-left text-gray-500 ">
                  <thead className="text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Menu</th>
                      <th className="px-6 py-3 text-center">Jumlah</th>
                      <th className="px-6 py-3">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      cart.map((item, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {item.menu}
                          </td>
                          <td className="px-6 py-4">
                            {item.jumlah > 1 ? "x " + item.jumlah : "x 1"}
                          </td>
                          <td className="px-6 py-4">
                            Rp {item.totalAmount.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 font-medium text-gray-900 text-center">
                          Produk belum dipilih
                        </td>
                        <td className="px-6 py-4"></td>
                      </tr>
                    )}

                    <tr className="text-gray-700 uppercase bg-gray-50 font-medium ">
                      <td className="px-6 py-4">Total</td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4">
                        Rp. {totalHarga.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="m-1">
              <div
                type="button"
                onClick={() => handleClearSale()}
                className="w-full text-center p-2 text-xl font-medium text-gray-900 focus:outline-none bg-white hover:bg-gray-100 cursor-pointer"
              >
                Clear Sale
              </div>
            </div>

            <div className="bg-white m-1 p-2" />

            <div className="flex m-1 text-center gap-1 text-xl cursor-pointer">
              <div
                onClick={handleSavedModal}
                className="bg-slate-400 p-5 w-1/2 font-bold hover:bg-slate-500"
              >
                Save Bill
              </div>
              <div
                onClick={handlePrint}
                className="bg-slate-400 p-5 w-1/2 font-bold hover:bg-slate-500"
              >
                Print Bill
              </div>
            </div>

            <div className="hidden">
              <ComponentToPrint
                cart={cart}
                totalHarga={totalHarga}
                ref={componentRef}
              />
            </div>

            <div
              onClick={() => handleChargedModal(totalHarga)}
              className="justify-center font-medium flex py-5 m-1 cursor-pointer text-white bg-cyan-700 hover:bg-cyan-800"
            >
              <p className="text-3xl">
                Charge Rp.{totalHarga.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showSavedModal && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-50">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8 flex flex-col justify-center items-center">
                  <h1 className="mb-4 text-3xl font-extrabold">Bill Saved</h1>
                  <img
                    src="assets/icons/checked.png"
                    alt="checked"
                    className="w-16"
                  />
                </div>
                <div className="space-y-4">
                  <button
                    onClick={handleSavedModal}
                    className="p-3 bg-black rounded-full text-white w-full font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showChargedModal && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-50">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="p-10 mx-auto">
                <h1 className="mb-4 text-3xl font-extrabold text-center">
                  Bill
                </h1>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block mb-1 font-medium text-gray-900"
                  >
                    Total harga :
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full mb-3"
                    value={`Rp ${totalHarga.toLocaleString("id")}`}
                    disabled
                  />
                  <label
                    htmlFor="email"
                    className="block mb-1 font-medium text-gray-900 dark:text-white justify-start"
                  >
                    Uang yang dibayar :
                  </label>
                  <input
                    type="number"
                    id="bayar"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full"
                    placeholder="Masukan nominal..."
                    onChange={handleKembalian}
                    required
                  />
                </div>

                <div className="font-semibold text-lg mb-4">
                  Total Uang Kembalian :{" "}
                  <span className="underline underline-offset-4">
                    {kembalian}
                    {console.log(typeof kembalian)}
                  </span>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={handleCloseChargedModal}
                    className="p-3 text-gray-900 bg-white border border-gray-300 rounded-full w-full font-semibold"
                  >
                    Close
                  </button>

                  <button
                    onClick={handlePayBillModal}
                    disabled={kembalian.includes("Uang Kurang") ? true : false}
                    className="p-3 bg-black rounded-full text-white w-full font-semibold hover:bg-slate-900"
                  >
                    Bayar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayBilldModal && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-50">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-4 flex flex-col justify-center items-center">
                  <h1 className="mb-4 text-3xl font-extrabold">
                    Bill Terbayar
                  </h1>
                  <img
                    src="assets/icons/checked.png"
                    alt="checked"
                    className="w-16 mb-4"
                  />
                  <h3 className="text-2xl font-bold">
                    Terima kasih telah berkunjung ...
                  </h3>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={handlePayBillCloseModal}
                    className="p-3 bg-black rounded-full text-white w-full font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
