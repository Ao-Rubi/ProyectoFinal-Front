import React from 'react';
import Swal from "sweetalert2";
import Button from "react-bootstrap/esm/Button";
import ItemPedidoLista from './ItemPedidoLista';

const ItemPedido = ({pedido, consultarAPI}) => {
    // TRAER AL URL DE LA API
    const URL = process.env.REACT_APP_API_HAMBURGUESERIA;
   console.log(pedido);
    const handleEntregado = (_id) => {
        Swal.fire({
            title: "El pedido fue entregado?",
            // text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const parametros = {
                  method: "POST",
                };
                const respuesta = await fetch(URL + "entregado/" + pedido._id, parametros);
                if (respuesta.status === 200) {
                  Swal.fire(
                    "Pedido entregado",
                    "El pedido fue entregado con éxito",
                    "success"
                  );
                  // ACÁ CONSULTA A LA API
                  consultarAPI();
                  
                }
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  title: "Algo falló",
                  text: "Intenta esta acción más tarde",
                });
              }
            }
          });
    }

    return (
        <tr>
            <td className="text-black">
                <div className="truncate">
                    <ul>
                        {pedido.productosdelmenu.map((pedido, posicion) => (
                            <ItemPedidoLista
                                key={posicion}
                                pedido={pedido}
                            ></ItemPedidoLista>
                        ))}
                    </ul>
                </div>
            </td>
            <td className="text-black">{pedido.usuario}</td>
            <td className="text-black">{pedido.fecha}</td>
            <td className="text-black">
                {pedido.estado ? 'Entregado' : 'Pendiente'}
            </td>
            <td className="text-black">
                <div className="d-flex justify-content-center">
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleEntregado}
                    >
                        Cambiar estado
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default ItemPedido;