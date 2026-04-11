import {Elysia} from 'elysia';
import { AuthModel } from './models';
import { AuthService } from './service';

export const app = new Elysia({prefix: "auth"})
.post("/sign-up", async ({body})=>{
    const userId = await AuthService.signup(body.email,body.password);
    return {
        id:userId
    }


},{
    body:AuthModel.signUpSchema,
    response:{
        200: AuthModel.signUpResponseSchema,
        400:AuthModel.signUpFailedResponseSchema
    }
})
.post("/sign-in", async ({body})=>{
    const userToken = await AuthService.signin(body.email,body.password);
    return{
        token: userToken
    }

},{
    body: AuthModel.signInSchema,
    response:{
        200:AuthModel.signInResponseSchema,
        400:AuthModel.signInFailedResponseSchema
    }
})