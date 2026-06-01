// src/components/common/TablaGenerica.jsx
import React from 'react';

const TablaGenerica = ({ columnas, datos, identificadorClave = 'id' }) => {
  const thStyle = "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200";
  const tdStyle = "px-3 py-2 text-xs text-gray-700 border-b border-gray-100 whitespace-nowrap";

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr>
            {columnas.map((col, idx) => (
              <th key={idx} className={thStyle}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.length === 0 ? (
            <tr>
              <td colSpan={columnas.length} className="text-center py-4 text-xs text-gray-400">
                No hay registros disponibles.
              </td>
            </tr>
          ) : (
            datos.map((fila) => (
              <tr key={fila[identificadorClave]} className="hover:bg-gray-50/80">
                {columnas.map((col, idx) => (
                  <td key={idx} className={tdStyle}>
                    {/* Si la columna tiene una función para renderizar personalizado, la usa; si no, pinta el texto plano */}
                    {col.render ? col.render(fila) : fila[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGenerica;