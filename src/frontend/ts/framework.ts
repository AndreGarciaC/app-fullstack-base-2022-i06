class FrameWork {

  /**
   * ejecutarRequest clasifica los diferentes query con los que interactuaré con la bases de datos.
   * @param metodo Me permite identificar la intención del query para llamar al handler respectivo.
   * @param url Ruta de direccionamiento de express.
   * @param lister Interfaz que contienes la definición de los métodos.
   * @param data Datos a gestionar
   */
  public ejecutarRequest(metodo: string, url: string, lister: ResponseLister, data?: any) {
    let xmlHttp: XMLHttpRequest = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
        if (metodo == "GET") {
          lister.handlerResponse(xmlHttp.status, xmlHttp.responseText);
        }
        else if (metodo == "DELETE") {
          lister.handlerResponseEliminarDev(xmlHttp.status, xmlHttp.responseText);
        }
        else if (metodo == "INSERT") {
          lister.handlerResponseAdd(xmlHttp.status, xmlHttp.responseText);
        }
        else {
          lister.handlerResponseActualizar(xmlHttp.status, xmlHttp.responseText);
        }
      }
    }


    xmlHttp.open(metodo, url, true);
    if (metodo == "POST") {
      xmlHttp.setRequestHeader("Content-Type", "application/json")
      xmlHttp.send(JSON.stringify(data))
    } else {
      xmlHttp.send();
    }



  }

  public recuperarElemento(id: string): HTMLElement {
    let element = document.getElementById(id);
    return element;

  }
}