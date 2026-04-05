
import { t } from 'elysia'

export namespace AuthModel {
    const signInSchema = t.Object({
        email: t.String(),
        password: t.String()

    })
    export type signInSchema = typeof signInSchema.static

    const signInResponseSchema = t.Object({
        token:t.String()
    })

    export type signInResponseSchema = typeof signInResponseSchema.static



//signup
     const signUpSchema = t.Object({
        email: t.String(),
        password: t.String()

    })
    export type signUpSchema = typeof signUpSchema.static

    const signUpResponseSchema = t.Object({
        id:t.String()
    })

    export type signUpResponseSchema = typeof signUpResponseSchema.static


}