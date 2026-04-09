
import { t } from 'elysia'

//todos: later redo this page without this namespace model, just direct const as in elysia docs, best practices
export namespace AuthModel {
   export const signInSchema = t.Object({
        email: t.String(),
        password: t.String()

    })
    export type signInSchema = typeof signInSchema.static

   export const signInResponseSchema = t.Object({
        token:t.String()
    })

    export type signInResponseSchema = typeof signInResponseSchema.static



//signup
    export const signUpSchema = t.Object({
        email: t.String(),
        password: t.String()

    })
    export type signUpSchema = typeof signUpSchema.static

    export const signUpResponseSchema = t.Object({
        id:t.String()
    })

    export const signUpFailedResponseSchema = t.Object({
        message:t.Literal("error while signing up")
    })
    export type signUpResponseSchema = typeof signUpResponseSchema.static
    export type signUpFailedResponseSchema = typeof signUpFailedResponseSchema.static

}