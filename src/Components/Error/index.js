import React, {Component} from "react";


// Se quitaron los pasos de que tienen que ver con subscrpcion y se comento la validacion de si el campo stripe_source_token esta completado
// Tambien se configuraron los botones next y previous para los dos pasos restantes
// Tambien se agrego el tocken de prueba directamente en state stripe_source_token
// En el insert de la tabla Doctor se cambio el valor del campo name por username porque al registrar el usuario directamente por cognito, no se puede agregar el nombre completo
class Error extends Component {

render() {

  return (
    <h1>Error en la pagina</h1>
    );
  };
}

export default Error;