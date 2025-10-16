import React, { useState } from 'react'
import { useAuhtStore } from '../store/userAuthstore';
import { MessageSquare } from 'lucide-react';

function SignUppage() {

  const [showpassword, setshowpassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const { signup, isSigningUp } = useAuhtStore();

  const validateForm = () => { }
  const handleSumbit = (e) => {

  }


  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
        //left

      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='flex felx-col items-center gap-2 group'>
            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'
            >
              <MessageSquare className='siz-6 text-primary' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUppage