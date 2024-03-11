import { menuI, listaMenuI, opcMenu, hijosI } from '../models/menu'

export let listMenu:listaMenuI[] = [
//  {"id":1,"id_parent":0,"icon":"pi pi-home","link":"/dashboard","title":"Escritorio"},
//   {"id":2,"id_padre":1,"icono":"icon","link":"/dashboard","titulo":"General"},
//   {"id":3,"id_padre":2,"icono":"icon","link":"/dashboard/aspecto_general","titulo":"Aspectos Generales"},
//   {"id":4,"id_padre":2,"icono":"icon","link":"/dashboard/mision","titulo":"Misión"},
//   {"id":5,"id_padre":2,"icono":"icon","link":"/dashboard/vision","titulo":"Visión"},
//   {"id":9,"id_padre":1,"icono":"icon","link":"/dashboard","titulo":"Detalles"},
//   {"id":10,"id_padre":9,"icono":"icon","link":"/dashboard/acercadenosotros","titulo":"Acerca de Nosotros"},
//   {"id":11,"id_padre":9,"icono":"icon","link":"/dashboard/organigrama","titulo":"Organigrama"},
//   {"id":12,"id_padre":1,"icono":"icon","link":"/dashboard","titulo":"Contacto"},
//   {"id":13,"id_padre":12,"icono":"icon","link":"/dashboard/contactos","titulo":"Enviar Mensaje"},
//   //==============================================
//   {"id":101,"id_padre":0,"icono":"pi pi-building","link":"/institution","titulo":"Admin"},
// {"id":102,"id_padre":101,"icono":"icon","link":"/institution","titulo":"Universidad"},
// {"id":103,"id_padre":102,"icono":"icon","link":"/institution/mostrar_universitys","titulo":"Mostrar"},
// {"id":104,"id_padre":102,"icono":"icon","link":"/institution/mostrar_university/:id","titulo":"Detalles"},
// {"id":105,"id_padre":102,"icono":"source","link":"/institution/create_university","titulo":"Crear Universidad"},
// {"id":106,"id_padre":102,"icono":"icon","link":"/institution/edit_university/:id","titulo":"Editar Universidad"},
// {"id":107,"id_padre":102,"icono":"icon","link":"/institution/delete_university/:id","titulo":"Eliminar Universidad"},
// {"id":108,"id_padre":101,"icono":"icon","link":"/institution","titulo":"Sedes"},
// {"id":109,"id_padre":108,"icono":"icon","link":"/institution/mostrar_headquarters","titulo":"Mostrar"},
// {"id":110,"id_padre":108,"icono":"icon","link":"/institution/mostrar_headquarter/:id","titulo":"Detalles"},
// {"id":111,"id_padre":108,"icono":"source","link":"/institution/create_headquarter","titulo":"Crear Sede"},
// {"id":112,"id_padre":108,"icono":"icon","link":"/institution/edit_headquarter/:id","titulo":"Editar Sede"},
// {"id":113,"id_padre":108,"icono":"icon","link":"/institution/delete_headquarter/:id","titulo":"Eliminar Sede"},
// {"id":114,"id_padre":101,"icono":"icon","link":"/institution","titulo":"Facultad"},
// {"id":115,"id_padre":114,"icono":"icon","link":"/institution/mostrar_facultys","titulo":"Mostrar"},
// {"id":116,"id_padre":114,"icono":"icon","link":"/institution/mostrar_faculty/:id","titulo":"Detalles"},
// {"id":117,"id_padre":114,"icono":"source","link":"/institution/create_faculty","titulo":"Crear Facultad"},
// {"id":118,"id_padre":114,"icono":"icon","link":"/institution/edit_faculty/:id","titulo":"Editar Facultad"},
// {"id":119,"id_padre":114,"icono":"icon","link":"/institution/delete_faculty/:id","titulo":"Eliminar Facultad"},
// {"id":120,"id_padre":101,"icono":"icon","link":"/institution","titulo":"Programas"},
// {"id":121,"id_padre":120,"icono":"icon","link":"/institution/mostrar_programs","titulo":"Mostrar"},
// {"id":122,"id_padre":120,"icono":"icon","link":"/institution/mostrar_program/:id","titulo":"Detalles"},
// {"id":123,"id_padre":120,"icono":"source","link":"/institution/create_program","titulo":"Crear Programa"},
// {"id":124,"id_padre":120,"icono":"icon","link":"/institution/edit_program/:id","titulo":"Editar Programa"},
// {"id":125,"id_padre":120,"icono":"icon","link":"/institution/delete_program/:id","titulo":"Eliminar Programa"},

]

export const createMenu = (list: listaMenuI[]) => {
  // console.log('menu() funciona')
  const menuNuevo: menuI = { 
    'menu':[ ]
  }
  const nuevopadres: any=[]
  const nuevoHijos: any=[]
  try {

    list.forEach((ops1:hijosI) => {

      if(ops1.id_parent==0){
        nuevopadres.push(ops1)
        
      }else{
        nuevoHijos.push(ops1)
      }
  
      nuevopadres.forEach((newP:hijosI) => {
  
        if(ops1.id_parent == newP.id){
  
          if(!newP.menu){
  
            Object.defineProperty(newP, 'menu', {
  
              value:[ops1]
  
              });
            
          }else{
  
            newP.menu.push(ops1)
          }
        }
          
        });
  
        nuevoHijos.forEach((newH:hijosI) => {
  
          if(ops1.id_parent == newH.id){
  
            if( !newH.menu ) {
              
              Object.defineProperty( newH, 'menu', {
  
                value:[ops1]
  
                });
  
            } else {
  
              newH.menu.push(ops1)
            }
          }
          
        });
      
    });
    //asigno el menu al padre y el registro  y a a los hijos el menu y el registro
  
  //asignar los valores al array menu
  
  nuevopadres.forEach((main: any) => {
  
    menuNuevo.menu.push(main)  
    // console.log('menu(): ',menuNuevo.menu)
  });

  return menuNuevo.menu;
  
    
  } catch (error) {

    console.log(error)
    return [];
  }



}

// createMenu(listMenu);

