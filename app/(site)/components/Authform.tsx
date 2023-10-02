'use client';
import { toast } from 'react-hot-toast';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import React, { useCallback, useState } from 'react'
import { BsGithub, BsGoogle } from "react-icons/bs"
import { FcGoogle, } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import router from 'next/router';
type Varient = 'LOGIN' | 'REGISTER'
export default function Authform() {
    const [varient, setvarient] = useState<Varient>('LOGIN');
    const [isloading, setisloading] = useState(false)

    const toggleVarient = useCallback(() => {

        if (varient === 'LOGIN') {
            setvarient('REGISTER')
        }
        else {
            setvarient('LOGIN')
        }

    }, [varient])

    const {
        register, handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({

        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onsubmit: SubmitHandler<FieldValues> = (data) => {
        setisloading(true);
        if (varient === 'REGISTER') {
            //axios rregister
            axios.post('/api/register', data)
                .catch(() => toast.error("Something went wrong"))
                .finally(() => setisloading(false))

        }

        if (varient === "LOGIN") {
            //axios login


            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials!');
                    }

                    if (callback?.ok && !callback?.error) {
                        // router.push('/conversations')
                        toast.success("Logged in!")
                    }
                })
                .finally(() => setisloading(false))
        }
    }

    const socialaction = (action: string) => {
        setisloading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials!');
                }

                if (callback?.ok && !callback?.error) {
                    // router.push('/conversations')
                    toast.success("Logged in!")
                }
            })
            .finally(() => setisloading(false));

        //next auth social sign in
    }
    return (
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>

            <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>

                <form action="" className='space-y-6' onSubmit={handleSubmit(onsubmit)}>

                    {varient === "REGISTER" && (
                        <Input disabled={isloading} id='name' lable='Name' register={register} errors={errors}></Input>

                    )}

                    <Input disabled={isloading} id='email' type='email' lable='Email address' register={register} errors={errors}></Input>
                    <Input disabled={isloading} id='password' type='password' lable='Password' register={register} errors={errors}></Input>


                    <div>
                        <Button fullWidth type='submit' disabled={isloading}>{varient === "LOGIN" ? "Sign in" : "Register"}</Button>
                    </div>
                </form>



                <div className='mt-6'>

                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>

                            <div className='w-full border-t border-gray-300' />




                        </div>
                        <div className='relative flex justify-center text-sm  '>
                            <span className='bg-white text-gray-500 px-2'>Or continue with</span>

                        </div>
                    </div>

                    <div className='mt-6 flex gap-2 '>

                        <AuthSocialButton onClick={() => socialaction('github')} icon={BsGithub}></AuthSocialButton>

                        <AuthSocialButton onClick={() => socialaction('google')} icon={FcGoogle}></AuthSocialButton>

                    </div>

                </div>

                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                    <div >
                        {varient === "LOGIN" ? "New to Messanger?" : "Already have an account?"}
                    </div>

                    <div
                        onClick={toggleVarient}
                        className='underline cursor-pointer'
                    >
                        {varient === "LOGIN" ? 'Create an account' : "Log in"}
                    </div>

                </div>

            </div>

        </div>
    )
}
