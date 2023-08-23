import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="relative overflow-x-auto">
      <h1 className="text-2xl font-bold text-center">PRINT BILL</h1>
      <table className="w-full text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Menu</th>
            <th className="px-6 py-3 text-center">Jumlah</th>
            <th className="px-6 py-3">Harga</th>
          </tr>
        </thead>
        <tbody>
          {props.cart.map((item, i) => (
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
          ))}

          <tr className="text-gray-700 uppercase bg-gray-50 font-medium ">
            <td className="px-6 py-4">Total</td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">
              Rp. {props.totalHarga.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
