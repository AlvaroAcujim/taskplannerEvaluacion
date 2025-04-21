El token y el idtable se consigue dentro de baserow, primero hay que crear una base de datos -> click en los 3 puntitos (numero entre parentesis)
El token se obtiene en tu perfil -> mi configuración -> fichas de la base de datos (dar permisos). La base de datos tiene que tener:
Columnas: +Fecha -> fecha con hora, +Descripción -> texto largo, +estado -> selección única opciones: 1. Pendiente 2. Finalizado 3. No iniciada, 
+titulo ->Texto de una sola línea y por último fecha_creacion -> fecha con hora. Es importante tanto el orden como esta escrito en estos comentarios.
Esto es necesario para ver si los datos incorporados en las tareas los guarda correctamente baserow.

Lo anteriormente mencionado esta comentado en el index.js como ayuda en el caso de que no se visualice este readme

Por otro lado para poder visualizar la sección de tiempo es necesario que el usuario acepte los permisos de ubicación. Esta sección da información
sobre el clima a lo largo de la semana de su residencía para cuadrar las tareas en caso de que esten pensadas al aire libre.
