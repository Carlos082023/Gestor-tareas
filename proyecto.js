const prompt = require("prompt-sync")({ sigint: true });
// array para almacenar las tareas
let tareas = [];
let categoriasNombres = [
  "Trabajo",
  "Personal",
  //agragar mas categorias si se desea
];

//funcion que muestra todas las categorias
function mostrarTodasLasCategorias() {
  console.log("categorias existentes: ");
  categoriasNombres.forEach(function (categoria, indice) {
    console.log(`${indice}: ${categoria}`);
  });
}

// funcion para cargar nuevas categorias
function agregarNuevasCategorias(nombreCategoria) {
  categoriasNombres.push(nombreCategoria);
  console.log(`categoria ${nombreCategoria} agregada correctamente`);
}

//funcion para agregar tareas
function agregarTarea(nombreRecibido, fechaRecibida = null) {
  mostrarTodasLasCategorias();
  let numeroCategoria = parseInt(
    prompt("ingrese el numero de la categoria para la nueva tarea: ")
  );
  if (numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length) {
    tareas.push({
      nombre: nombreRecibido,
      completada: false,
      fechaLimite: fechaRecibida,
      categoria: numeroCategoria,
    });
    console.log("tarea agregada con exito");
  } else {
    console.log("numero de categoria incorrecto");
  }
}
//mostrar tareas
function mostrarTareas(){
  tareas.forEach(function(tarea,indice){
    console.log(`${indice}: ${tarea.nombre}, tarea completada: ${tarea.completada ? "si" : "no"}`)
  })
}

//funcion para eliminar tareas
function eliminarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas.splice(indice, 1);
    console.log("tarea eliminada correctamente");
  } else {
    console.log("La tarea no existe");
  }
}
// funcion para tarea completada
function TareaCompletada(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].completada = true;
    console.log("Tarea marcada como completada");
  } else {
    console.log("indice de tarea invalido");
  }
}

//modificar tareas
function modificarTareas(
  indice,
  nuevoNombre,
  nuevaFecha = null,
  nuevoNUmeroCategoria
) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].nombre =
      nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre;
    tareas[indice].fechaLimite =
      nuevaFecha !== undefined ? nuevaFecha : tareas[indice].fechaLimite;
    tareas[indice].categoria =
      nuevoNUmeroCategoria !== undefined
        ? nuevoNUmeroCategoria
        : tareas[indice].categoria;
    console.log("modificacion correcta");
  } else {
    console.log("indice de tarea invalido");
  }
}

//funcion que filtra tareas por categoria
function filtrarTareasPorCategorias(numeroCategoria) {
  let tareasFiltradas = tareas.filter(function (tarea) {
    return tarea.categoria === numeroCategoria;
  });
  return tareasFiltradas;
}

// cuantas tareas completadas tenes
function contarTareasCompletadasPorCategorias(nroCategoria) {
  let tareasCategoria = filtrarTareasPorCategorias(nroCategoria);
  let tareasCompletadas = tareasCategoria.reduce(function (contador, tarea) {
    return tarea.completada ? contador + 1 : contador;
  },0);
  tareasTotal = tareasCategoria.length;
  console.log(`tareas completadas de la categoria ${categoriasNombres[nroCategoria]} : ${tareasCompletadas} de ${tareasTotal} tareas`);
}

//funcion que muestra las tareas no completdas
function mostrarTareasNoCompletadas() {
  // Filtrar tareas no completadas
  const tareasPendientes = tareas.filter(tarea => !tarea.completada);

  if (tareasPendientes.length === 0) {
    console.log("¡Felicidades! Todas las tareas están completadas.");
  } else {
    console.log("Tareas no completadas:");
    tareasPendientes.forEach(tarea => {
      console.log(
        `Nombre: ${tarea.nombre}, Categoría: ${categoriasNombres[tarea.categoria]}`
      );
    });
  }
}

//funcio para ordenar tareas por la propiedad nombre utilizando bbuble sort
function ordenarTareasPorNombre(){
  let total = tareas.length

  for(let j = 0; j < total; j++){
    for(let i = 0 ; i < total-1; i++){
      if(tareas[i].nombre > tareas[i+1].nombre){
        let tem = tareas[i]
        tareas[i] = tareas[i+1]
        tareas[i+1] = tem
      }
    }
  }
}
//funcio para ordenar tareas por la propiedad fecha utilizando bbuble sort
function ordenarTareasPorFecha(){
  let total = tareas.length

  for(let j = 0; j < total; j++){
    for(let i = 0 ; i < total-1; i++){
      if(tareas[i].fechaLimite > tareas[i+1].fechaLimite){
        let tem = tareas[i]
        tareas[i] = tareas[i+1]
        tareas[i+1] = tem
      }
    }
  }
}


// function para mostraMenu
function mostrarMenu() {
  console.log("----MENU------");
  console.log("1. agregar tarea");
  console.log("2. eliminar tarea");
  console.log("3. Marcar como completada");
  console.log("4. modificar tarea");
  console.log("5. mostrar las  tarea");
  console.log("6. mostrar todas las categorias");
  console.log("7. agregar  categorias");
  console.log("8. filtrar tareas por categorias");
  console.log("9. cantidad de tareas completadas por categorias");
  console.log("10. tareas no completadas");
  console.log("11. ordenar Tareas alfabeticamente");
  console.log("12. Ordenar Tareas por fecha limite");

  console.log("0. salir");
}

// function para interactuar con el usuario
function interactuarUsuario() {
  let opcion = -1;
  while (opcion != 0) {
    mostrarMenu();
    opcion = parseInt(prompt("ingrese la opcion seleccionada: "));
    switch (opcion) {
      case 1:
        let nombreTarea = prompt("ingrese el nombre de la tarea a cargar: ");
        agregarTarea(nombreTarea);
        break;
      case 2:
        let indice = parseInt(prompt("ingrese el indice a eliminar: "));
        eliminarTarea(indice);
        break;
      case 3:
        mostrarTareas()
        let indiceAcompletar = parseInt(
          prompt("ingrese el indice para marcar tarea completada: ")
        );
        TareaCompletada(indiceAcompletar);
        break;
      case 4:
        let indiceModificar = parseInt(
          prompt("ingrese el indice a modificar: ")
        );
        if (indiceModificar >= 0 && indiceModificar < tareas.length) {
          let opcion = parseInt(
            prompt(
              "Que propiedad desea modificar? 1. nombre, 2. fecha limite, 3. numero categoria"
            )
          );

          switch (opcion) {
            case 1:
              let nuevoNombre = prompt("ingrese el nuevo nombre de su tarea: ");
              modificarTareas(indiceModificar, nuevoNombre);
              break;
            case 2:
              let nuevaFecha = prompt(
                "ingrese la nueva fecha limite para su tarea"
              );
              modificarTareas(indiceModificar, undefined, nuevaFecha);

              break;
            case 3:
              let nuevoNUmeroCategoria = parseInt(
                prompt("ingrese nuevo numero categoria: ")
              );
              if (
                nuevaCategoria >= 0 &&
                nuevaCategoria < categoriasNombres.length
              ) {
                modificarTareas(
                  indiceModificar,
                  undefined,
                  undefined,
                  nuevoNUmeroCategoria
                );
              }
              break;

            default:
              break;
          }
        } else {
          console.log("indice de tareas incorrecto");
        }

        break;
      case 5:
        console.log("---LISTAS DE TAREAS----");
        console.log(tareas);
        break;
      case 6:
        mostrarTodasLasCategorias();
        break;
      case 7:
        let nuevaCategoria = prompt("ingrese la nueva categoria: ");
        agregarNuevasCategorias(nuevaCategoria);
        break;
      case 8:
        mostrarTodasLasCategorias();
        let numCategoria = parseInt(prompt("ingrese el numero de la categoria a filtrar: "));
        let tareasCategorias = filtrarTareasPorCategorias(numCategoria);
        
        console.log(`Tareas de la categoría ${categoriasNombres[numCategoria]}:`);
      
        // Iteramos y mostramos cada tarea de la categoría
        tareasCategorias.forEach((tarea, index) => {
          console.log(`Tarea ${index + 1}: Nombre - ${tarea.nombre}, Fecha límite - ${tarea.fechaLimite || "Sin fecha"}, Completada - ${tarea.completada ? "Sí" : "No"}`);
        });
        
        if (tareasCategorias.length === 0) {
          console.log("No hay tareas en esta categoría.");
        }
        break;
      case 9:
        mostrarTodasLasCategorias();
        let nroCateg = parseInt(prompt("ingrese el numero categoria a visualizar: "));
        contarTareasCompletadasPorCategorias(nroCateg);
        break;
      case 10:
        mostrarTareasNoCompletadas();
        break;
      case 11:
        ordenarTareasPorNombre()
        console.log("TAREAS ORDENADAS POR NOMBRE: ")
        console.log(tareas)
        break;
      case 12:
        ordenarTareasPorFecha()
        console.log("TAREAS ORDENADAS POR FECHA: ")
        console.log(tareas)
        break;  
      case 0:
        break;

      default:
        console.log("opcion invalida");
        break;
    }
  }
}

interactuarUsuario();
