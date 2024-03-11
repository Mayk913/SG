export interface menuGen {
    mainSesion: listaMenuI[]
}


export interface listaMenuI {
    id: number;
    id_parent: number;
    icon: string;
    link: string;
    title: string;
}


export interface hijosI {
        id: number;
        id_parent:number;
        icon: string;
        link: string;
        title: string;
        menu?:listaMenuI[]
}

export interface menuI {

    menu:opcMenu[];

  } 

export interface opcMenu {
          id: number;
          id_parent:number;
          icon: string;
          link: string;
          title: string;
          
          menu?:[
              {
              id: number;
              id_parent:number;
              icon: string;
              link: string;
              title: string;
              
              menu?:[
                  {
                  id: number;
                  id_parent:number;
                  icon: string;
                  link: string;
                  title: string;
                  }
              ]
              }
          ]
    
}
