Vue.component('libros', {
    data:()=>{
        return {
            libros: [],
            buscar: '',
            libro: {
                accion: 'nuevo',
                msg : '',
                idLibro: '',
                idAutor: '',
                isbn: '',
                titulo: '',
                editorial: '',
                edicion: ''
            }
        }
    },
    methods: {
        buscarlibro(){
            this.obtenerDatos(this.buscar);
        },
        guardarlibro(){
            this.obtenerDatos();
            let libros = this.libros || [];
            if( this.libro.accion == 'nuevo' ){
                this.libro.idlibro = idUnicoFecha();
                libros.push(this.libro);
            }else if( this.libro.accion == 'modificar' ){
                let index = libros.findIndex(libro=>libro.idlibro==this.libro.idlibro);
                libros[index] = this.libro;
            }else if( this.libro.accion == 'eliminar' ){
                let index = libros.findIndex(libro=>libro.idlibro==this.libro.idlibro);
                libros.splice(index,1);
            }
            localStorage.setItem('libros', JSON.stringify(libros));
            this.libro.msg = 'libro procesado con exito';
            this.nuevolibro();
            this.obtenerDatos();
        },
        modificarlibro(data){
            this.libro = JSON.parse(JSON.stringify(data));
            this.libro.accion = 'modificar';
        },
        eliminarlibro(data){
            if( confirm(`¿Esta seguro de eliminar el libro ${data.nombre}?`) ){
                this.libro.idlibro = data.idlibro;
                this.libro.accion = 'eliminar';
                this.guardarlibro();
            }
        },
        obtenerDatos(busqueda=''){
            this.libros = [];
            if( localStorage.getItem('libros')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('libros')).length; i++){
                    let data = JSON.parse(localStorage.getItem('libros'))[i];
                    if( this.buscar.length>0 ){
                        if( data.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ){
                            this.libros.push(data);
                        }
                    }else{
                        this.libros.push(data);
                    }
                }
            }
        },
        nuevolibro(){
            this.libro.accion = 'nuevo';
            this.libro.idlibro = '';
            this.libro.codigo = '';
            this.libro.nombre = '';
            this.libro.direccion = '';
            this.libro.telefono = '';
            this.libro.dui = '';
            this.libro.msg = '';
        }
    }, 
    created(){
        this.obtenerDatos();
    },
    template: `
        <div id='applibro'>
            <form @submit.prevent="guardarlibro" @reset.prevent="nuevolibro" method="post" id="frmlibro">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de libros
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmlibro" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">Codigo</div>
                            <div class="col col-md-2">
                                <input v-model="libro.codigo" placeholder="codigo" pattern="[A-Z0-9]{3,10}" required title="Codigo de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Nombre</div>
                            <div class="col col-md-2">
                                <input v-model="libro.nombre" placeholder="escribe tu nombre" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Direccion</div>
                            <div class="col col-md-2">
                                <input v-model="libro.direccion" placeholder="donde vives" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Direccion de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Telefono</div>
                            <div class="col col-md-2">
                                <input v-model="libro.telefono" placeholder="tu tel" pattern="[0-9]{4}-[0-9]{4}" required title="Telefono de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">DUI</div>
                            <div class="col col-md-2">
                                <input v-model="libro.dui" placeholder="tu DUI" pattern="[0-9]{8}-[0-9]{1}" required title="DUI de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    {{ libro.msg }}
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
            <div class="card mb-3" id="cardBuscarlibro">
                <div class="card-header text-white bg-dark">
                    Busqueda de libros
                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarlibro" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarlibro" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>DUI</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in libros" :key="item.idlibro" @click="modificarlibro(item)">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.direccion}}</td>
                                <td>{{item.telefono}}</td>
                                <td>{{item.dui}}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarlibro(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});