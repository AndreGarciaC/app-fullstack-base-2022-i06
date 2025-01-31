declare const M;
class Main implements EventListenerObject, ResponseLister {
    public listaPersonas: Array<Persona> = new Array();
    public etidadesAcciones: Array<Acciones> = new Array();
    public nombre: string;
    public framework: FrameWork = new FrameWork();
    constructor() {

        this.framework.ejecutarRequest("GET", "http://localhost:8000/devices", this)


        this.listaPersonas.push(new Usuario("Juan", 12, "jPerez"));
        this.listaPersonas.push(new Administrador("Pedro", 35));
        this.listaPersonas.push(new Persona("S", 12));
        this.etidadesAcciones.push(new Usuario("Juan", 12, "jPerez"));
        this.etidadesAcciones.push(new Administrador("Juan", 12));




    }

    public handlerResponse(status: number, response: string) {
        if (status == 200) {
            let resputaString: string = response;
            let resputa: Array<Device> = JSON.parse(resputaString);
            let cajaDiv = document.getElementById("caja");

            cajaDiv.setAttribute("class", "talcoa");
            cajaDiv.setAttribute("id", "otro");
            cajaDiv.setAttribute("miAtt", "123");
            let valor = cajaDiv.getAttribute("miAtt");
            let datosVisuale: string = `<ul class="collection">`
            for (let disp of resputa) {
                datosVisuale += ` <li class="collection-item avatar">`;
                if (disp.type == 0) {
                    datosVisuale += `<img src="../static/images/lightbulb.png" alt="" class="circle">`;
                } else if (disp.type == 1) {
                    datosVisuale += `<img src="../static/images/window.png" alt="" class="circle">`;
                } else if (disp.type == 2) {
                    datosVisuale += `<img src="../static/images/desk-lamp.png" alt="" class="circle">`;
                }

                datosVisuale += `<span class="title nombreDisp">${disp.name}</span>
                <p>${disp.description}
                </p>

                <a href="#!" class="secondary-content">
                <div class="switch">
                <label>
                  Off
                  <input type="checkbox" id="cb_${disp.id}">
                  <span class="lever"></span>
                  On
                </label>
              </div>
                </a>
              </li>`
            }


            cajaDiv.innerHTML = datosVisuale;

            for (let disp of resputa) {
                let checkbox = document.getElementById("cb_" + disp.id);
                checkbox.addEventListener("click", this)
            }

        } else {
            alert("Algo salio mal")
        }
    }
    handlerResponseActualizar(status: number, response: string) {
        if (status == 200) {
            alert("Se actualizó correctamente")
        } else {
            alert("Error")
        }

    }

    handlerResponseAdd(status: number, response: string) {
        if (status == 200) {
            alert("Agregar nuevo dispositivo")
            console.log("Se hizo click para agregar");
            this.framework.ejecutarRequest("INSERT", "http://localhost:8000/new/", this);
        } else {
            alert("Error")
        }

    }

    handlerResponseEliminarDev(status: number, response: string) {

        console.log("Se hizo click para eliminar");
        this.framework.ejecutarRequest("DELETE", "http://localhost:8000/delete/", this);
        this.framework.ejecutarRequest("GET", "http://localhost:8000/devices", this);

    }




    public handleEvent(e: Event): void {
        let objetoEvento = <HTMLInputElement>e.target;


        if (e.type == "click") {

            console.log(objetoEvento.id);
            if (objetoEvento.id.startsWith("cb_")) {
                console.log("Se hizo click para prender o apagar")
                let datos = { "id": objetoEvento.id.substring(3), "state": objetoEvento.checked };
                this.framework.ejecutarRequest("POST", "http://localhost:8000/actualizar", this, datos);
            }

        }
        /*  else if (e.type == "click") {

             alert("Hola " + this.listaPersonas[0].nombre + " ");

         }
        else {

            let elemento = <HTMLInputElement>this.framework.recuperarElemento("input1");
            if (elemento.value.length > 5) {


                M.toast({ html: 'se cargo la info' })
            } else {
                alert("falta cargar el nombre o es menor a 5");
            }


        } */
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, "");
    M.updateTextFields();
    var elems1 = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems1, "");
    let btn = document.getElementById("btnSaludar");
    let btn2 = document.getElementById("btnDoble");
    let btn3 = document.getElementById("btnAgregar"); //Agrego botón para añadir dispositivo.
    let btn4 = document.getElementById("btnEliminar"); //Agrego botón para eliminir dispositivo.
    let main: Main = new Main();
    main.nombre = "Andrea"

    btn.addEventListener("click", main);
    btn2.addEventListener("dblclick", main);
    btn3.addEventListener("click", main);
    btn4.addEventListener("click", main);

});







