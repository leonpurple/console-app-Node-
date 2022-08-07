require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar


} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')



const main = async () => {

    let opt = ''
    const tareas = new Tareas()

    const tareasDB = leerDB()

    if ( tareasDB ) { //cargar tareas
      tareas.cargarTareasFromArray( tareasDB )
    }

    do {
        //imprimir el menu
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripción:')
                tareas.crearTarea(desc)

                break

            case '2':
                tareas.listadoCompleto()
                break

            case '3':
                tareas.listarPendientesCompletadas(true)
                break
                
            case '4':    
                tareas.listarPendientesCompletadas(false)// Listar pendientes
                break

            case '6':    
                    const id = await listadoTareasBorrar( tareas.listadoArr )
                    if ( id!== '0'){
                        const ok = await confirmar( '¿Estás Seguro? ' )
                        if ( ok ){
                            tareas.borrarTarea( id )
                            console.log( 'tarea Borrarda' )    
                        }
                    
                    }
                    break

        }

        guardarDB( tareas.listadoArr )

        await pausa()

    } while (opt !== '0')

}

main()