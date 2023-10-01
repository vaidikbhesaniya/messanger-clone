'use client';

import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import React, { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
type Varient='LOGIN'| 'REGISTER'
export default function Authform() {
    const [varient, setvarient] = useState<Varient>('LOGIN');
const [isloading, setisloading] = useState(false)

const toggleVarient=useCallback(()=>{

if(varient==='LOGIN'){
    setvarient('REGISTER')
}
else{
    setvarient('LOGIN')
}

},[varient])

const {
    register,handleSubmit,
    formState:{
        errors
    }
}=useForm<FieldValues>({

    defaultValues:{
        name:'',
        email:'',
        password:''
    }
})

const onsubmit:SubmitHandler<FieldValues>=(data)=>{
setisloading(true);
if(varient==='REGISTER'){
    //axios rregister
}

if(varient==="LOGIN"){
    //axios login
}
}

const socialaction=(action:string)=>{
setisloading(true);

//next auth social sign in
}
    return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>

<div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>

<form action="" className='space-y-6' onSubmit={handleSubmit(onsubmit)}>

    {varient==="REGISTER" && (
        <Input id='email' lable='Email' register={register} errors={errors}></Input>

    )}

<Input id='email' type='email' lable='Email address' register={register} errors={errors}></Input>
<Input id='password' type='password' lable='Password' register={register} errors={errors}></Input>


<div>
    <Button >Sign in</Button>
</div>
</form>
</div>

    </div>
  )
}
