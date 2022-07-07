import { Server, Model } from "miragejs";

function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,
    models: {
      reminder: Model,
    },
    seeds(server) {
      server.create("reminder", {
        id: 1,
        title: "Meet with Leslie Alexander",
        startDatetime: "2022-07-05T13:00",
        endDatetime: "2022-07-05T14:30",
        location: "Caruaru, PE",
      });
      server.create("reminder", {
        id: 2,
        title: "Remender to buy milk",
        startDatetime: "2022-07-20T09:00",
        endDatetime: "2022-07-20T11:30",
        location: "Caruaru, PE",
      });
      server.create("reminder", {
        id: 3,
        title: "Go to a dinner with Sara",
        startDatetime: "2022-07-22T17:00",
        endDatetime: "2022-07-22T18:30",
        location: "Caruaru, PE",
      });
    },
    routes() {
      this.urlPrefix = "http://localhost:3000";
      this.namespace = "api";

      this.get("/reminders", (schema) => {
        return schema.reminders.all();
      });

      this.post("/reminders", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.reminders.create(attrs);
      });

      this.patch("/reminders/:id", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.reminders.find(request.params.id).update(attrs);
      });

      this.delete("/reminders/:id", (schema, request) => {
        return schema.reminders.find(request.params.id).destroy();
      });
    },
  });

  return server;
}

export { makeServer };
