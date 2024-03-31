# Aplicación de Frontend

Esta es una aplicación de frontend basada en TypeScript, aprovechando la biblioteca React para crear interfaces de usuario y utilizando la biblioteca Material UI para el estilo de los componentes. La aplicación ofrece una interfaz sencilla para componer y enviar un correo electrónico, con dos secciones principales:

## Interfaz de composición de correo electrónico

Visor de temas
Interfaz de composición de correo electrónico
La interfaz de composición de correo electrónico consta de dos componentes principales: el campo de asunto y el campo de cuerpo.

El campo de asunto es un área de texto donde los usuarios pueden introducir el asunto deseado del correo electrónico.

El campo de cuerpo es otra área de texto donde los usuarios pueden escribir el contenido principal del correo electrónico.

Estos campos se les asignan los identificadores únicos (SubjectField y BodyField) que se utilizan para extraer los valores de entrada y enviar el correo electrónico al servidor.

## Visor de temas

El visor de temas es un lugar reservado para mostrar los temas de los correos electrónicos. Esta sección se poblará cuando la aplicación reciba una respuesta del servidor que contenga los temas de correo electrónico después de enviar el correo electrónico.

## Enviar un correo electrónico

Los usuarios pueden enviar un correo electrónico haciendo clic en el botón "Enviar correo electrónico". El botón es un componente de Material UI que activa la función SendRequest cuando se hace clic, enviando el correo electrónico al servidor utilizando la clase XMLHttpRequest. La función SendRequest se encarga de los siguientes pasos:

## Crear una solicitud HTTP

Registrar un Listener de eventos para gestionar la respuesta del servidor
Preparar el cuerpo de la solicitud utilizando los valores de SubjectField y BodyField
Enviar el correo electrónico al servidor
Registrar la respuesta HTTP en la consola
Imprimir un mensaje en la consola indicando el clic en el botón
Componentes de la interfaz de usuario
La aplicación presenta un aspecto simple con dos secciones principales:

* Sección de composición de correo electrónico: Esta sección es un diseño vertical que contiene el campo de asunto y el campo de cuerpo de texto.
* Visor de temas: Esta sección presenta un diseño sencillo que contiene el lugar reservado para los temas de correo electrónico.
Estilos de la interfaz de usuario
El usuario interfaz está diseñada con clases y estilos CSS específicos para los componentes de Material UI. La configuración del layout garantiza que la aplicación no solo tenga un aspecto visual atractivo, sino que también ofrezca una experiencia de usuario agradable. La paleta de colores principal consiste en tonos de gris y negro, con colores de fondo y texto seleccionados para optimizar la legibilidad y resaltar las entradas del usuario.

## Conclusión

Esta aplicación de frontend ofrece una interfaz sencilla y amigable para componer y enviar correos electrónicos. Integra marcos y bibliotecas modernas para crear una experiencia de usuario fluida, mientras que el lenguaje TypeScript permite un código base más robusto y mantenible. La aplicación está bien organizada y sig