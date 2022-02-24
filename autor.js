Vue.component('autor', {
    data:()=>{
        return {
            autores: [],
            buscar: '',
            autor: {
                accion: 'nuevo',
                msg : '',
                idAutor: '',
                codigo: '',
                nombre: '',
                pais: '',
                telefono: '',
            }
        }
    },
    methods: {
        buscarAutor(){
            this.obtenerDatos(this.buscar);
        },
        guardarAutor(){
            this.obtenerDatos();
            let autores = this.autores || [];
            if( this.autor.accion == 'nuevo' ){
                this.autor.idAutor = idUnicoFecha();
                autores.push(this.autor);
            }else if( this.autor.accion == 'modificar' ){
                let index = autores.findIndex(autor=>autor.idAutor==this.autor.idAutor);
                autores[index] = this.autor;
            }else if( this.autor.accion == 'eliminar' ){
                let index = autores.findIndex(autor=>autor.idAutor==this.autor.idAutor);
                autores.splice(index,1);
            }
            localStorage.setItem('autores', JSON.stringify(autores));
            this.autor.msg = 'Autor procesado con exito';
            this.nuevoCliente();
            this.obtenerDatos();
        },
        modificarAutor(data){
            this.autor = JSON.parse(JSON.stringify(data));
            this.autor.accion = 'modificar';
        },
        eliminarAutor(data){
            if( confirm(`¿Esta seguro de eliminar el autor ${data.nombre}?`) ){
                this.autor.idAutor = data.idAutor;
                this.autor.accion = 'eliminar';
                this.guardarAutor();
            }
        },
        obtenerDatos(busqueda=''){
            this.autores = [];
            if( localStorage.getItem('autores')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('autores')).length; i++){
                    let data = JSON.parse(localStorage.getItem('autores'))[i];
                    if( this.buscar.length>0 ){
                        if( data.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ){
                            this.autores.push(data);
                        }
                    }else{
                        this.autores.push(data);
                    }
                }
            }
        },
        nuevoAutor(){
            this.autor.accion = 'nuevo';
            this.autor.idCliente = '';
            this.autor.codigo = '';
            this.autor.nombre = '';
            this.autor.direccion = '';
            this.autor.telefono = '';
            this.autor.dui = '';
            this.autor.msg = '';
        }
    }, 
    created(){
        this.obtenerDatos();
    },
    template: `
        <div id='appAutor'>
            <form @submit.prevent="guardarAutor" @reset.prevent="nuevoAutor" method="post" id="frmAutor">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de Autores
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmAutor" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">Codigo</div>
                            <div class="col col-md-2">
                                <input v-model="autor.codigo" placeholder="codigo" pattern="[A-Z0-9]{3,10}" required title="Codigo de cliente" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Nombre</div>
                            <div class="col col-md-2">
                                <input v-model="autor.nombre" placeholder="escribe tu nombre" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de cliente" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Pais</div>
                            <div class="col col-md-2">
                                <input v-model="autor.pais" placeholder="Pais" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Direccion de cliente" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Telefono</div>
                            <div class="col col-md-2">
                                <input v-model="autor.telefono" placeholder="telefono" pattern="[0-9]{4}-[0-9]{4}" required title="Telefono de cliente" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    {{ autor.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <button type="submit" class="btn btn-primary">Guardar</button>
                                <button type="reset" class="btn btn-warning">Nuevo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="card mb-3" id="cardBuscarAutor">
                <div class="card-header text-white bg-dark">
                    Busqueda de Autores
                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarAutor" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarAutor" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Pais</th>
                                <th>Telefono</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in autores" :key="item.idAutor" @click="modificarCliente(item)">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.pais}}</td>
                                <td>{{item.telefono}}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarAutor(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});