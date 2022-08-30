interface ResponseLister {

    handlerResponse(status: number, response: string);
    handlerResponseActualizar(status: number, response: string);
    handlerResponseAdd(status: number, response: string);
    handlerResponseEliminarDev(status: number, response: string);

}