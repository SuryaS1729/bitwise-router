import { Elysia } from "elysia";
import { AuthModel } from "./models";
import { AuthService } from "./service";
import { prisma } from "db";

export const app = new Elysia({ prefix: "auth" })
  .post(
    "/sign-up",
    async ({ body, status }) => {
      try {
        const userId = await AuthService.signup(body.email, body.password);
        return {
          id: userId,
        };
      } catch (e) {
        console.log(e);
        return status(400, {
          message: "error while signing up",
        });
      }
    },
    {
      body: AuthModel.signUpSchema,
      response: {
        200: AuthModel.signUpResponseSchema,
        400: AuthModel.signUpFailedResponseSchema,
      },
    },
  )
  .post(
    "/sign-in",
    async ({ body }) => {
      const userToken = await AuthService.signin(body.email, body.password);
      return {
        token: userToken,
      };
    },
    {
      body: AuthModel.signInSchema,
      response: {
        200: AuthModel.signInResponseSchema,
        400: AuthModel.signInFailedResponseSchema,
      },
    },
  );
