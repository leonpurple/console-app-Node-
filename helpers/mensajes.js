const { bold } = require('colors')
const { resolve } = require('path')

require('colors')

const mostrarMenu = () => {

		return new Promise ( resolve => {

			console.clear()
			console.log('============================'.red)
			console.log('   selecciones una opción   '.red)
			console.log('============================\n'.red)
			console.log(`${'1.'.red} Crear tarea`)
			console.log(`${'2.'.red} Listar tarea`)
			console.log(`${'3.'.red} Listar tarea Completadas`)
			console.log(`${'4.'.red} Crear tarea`)
			console.log(`${'5.'.red} Completar tarea(s)`)
			console.log(`${'6.'.red} Borrar tarea`)
			console.log(`${'0.'.red} Salir \n`)
		
			const readline = require('readline').createInterface({
				input: process.stdin,
				output: process.stdout
			})
		
			readline.question('Seleccione una option: ', (opt) => {
				readline.close()
				resolve( opt )
			})
		
		})


}

	const pausa = () => {

				return new Promise ( resolve => {
					const readline = require('readline').createInterface({
						input: process.stdin,
						output: process.stdout
					})
			
					readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
						readline.close()
						resolve(opt)
					})
				})	
}



module.exports = {
	mostrarMenu,
	pausa
}