const Tarea = require('../models/tarea')
/**
 * _listado: 
 * { 'uuid-123712-123123-2: { id:12,desc: asd, completadoEn:92231 } }
 */

class Tareas {

    _listado = {}

    //Es sincrono
    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })


        return listado
    }

    constructor() {
        this._listado = {}
    }


    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }
    listadoCompleto() {
        console.log()
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green
            const { desc, completadoEn } = tarea //desectructuracion aislo el id
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red
            console.log(`${idx} ${desc}:: ${estado}`)
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log()
        let contador = 0
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea //desectructuracion aislo el id
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red
            if (completadas) {
                //mostrar completadas
                if (completadoEn) {
                    contador += 1
                    console.log(`${contador.toString().green}. ${desc}:: ${completadoEn.yellow}`)

                }
            } else {
                //mostrar pendientes
                if (!completadoEn) {
                    contador += 1
                    console.log(`${contador.toString().red} ${desc}:: ${estado}`)
                }
            }
        })

    }

    toggleCompletadas(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id]
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
                
            }
        })
    }

}

module.exports = Tareas