import { Elysia } from "elysia";
import { AuthModel } from "./models";
import { AuthService } from "./service";
import jwt from "@elysiajs/jwt";

export const app = new Elysia({ prefix: "auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
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
    async ({ jwt, body, set, cookie: { auth } }) => {
      const { correctCredentials, userId } = await AuthService.signin(
        body.email,
        body.password,
      );

      if (correctCredentials && userId) {
        const token = await jwt.sign({ userId });

        auth.set({
          value: token,
          httpOnly: true,
          maxAge: 7 * 86400,
        });

        return {
          message: "Signed in successfully",
        } ;
      } else {
        set.status = 400; // ✅ match schema
        return {
          message: "error while signing in, Incorrect Credentials",
        } ;
      }
    },
    {
      body: AuthModel.signInSchema,
      response: {
        200: AuthModel.signInResponseSchema,
        400: AuthModel.signInFailedResponseSchema,
      },
    },
  );
