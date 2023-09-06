const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    //1.- Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto. (3 Puntos)
    it("GET/cafes devuelve status code 200 y arreglo no vacío", async () => {
        const response = await request(server).get("/cafes").send() //Requiriendo el servidor, evaluando la ruta y enviando una respuesta
        const body = response.body
        const status = response.statusCode;

        expect(status).toBe(200); //Validación del dato
        expect(body).toBeInstanceOf(Array) //Validación del tipo de dato
        expect(body.length).toBeGreaterThan(0) //Verificar que el arreglo no esté vacío
    })

    //2.- Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe. (2 Puntos)
    it("DELETE/cafes/:id comprobar que no se puede eliminar café no existente", async () => {
        const jwt = "token"
        const { statusCode } = await request(server)

            .delete("/cafes/6")
            .set("Authorization", jwt)
            .send()
        expect(statusCode).toBe(404)
    })

    //3.- Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201. (2 Puntos)
    it("POST/cafes prueba de efectividad al agregar nuevo producto (devuelve código 201)", async () => {
        const newCoffe = { id: 5, nombre: "Latte" }
        const response = await request(server).post("/cafes").send(newCoffe)
        const body = response.body
        const status = response.statusCode;

        expect(body).toContainEqual(newCoffe) //Comprobar que el dato enviado fue agregado efectivamente
        expect(status).toBe(201) //verificar que devuelva código 201
    })

    //4.- Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.  (3 Puntos) 
    it("PUT/cafes status 400 al modificar café con id diferente al del payload", async () => {
        const getId = "id obtenido";
        const coffe = { id: "id diferente al del payload ", nombre: "Nuevo café" };
        const { statusCode } = await request(server)

            .put(`/cafes/${getId}`)
            .send(coffe);
        expect(statusCode).toBe(400);
    })
});

