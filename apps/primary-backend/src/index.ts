import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

/**
 * auth routes => signin, signup, 
 * api-key=> create api, get api, delete api, disable api
 * model=> get all the models,and their pricing, providers etc
 * payment => razp/stripe
 * 
 * 
 */