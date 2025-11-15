'use client'
import { RocketLaunchIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import { NewsletterMain } from "@/components/Newsletter"
import { PhoneMain } from "@/components/Phone"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'; 
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const recaptcha = useRef(null) as any
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_V2_SITE_KEY ?? ''

  const handleSubmit = async (event: { preventDefault: () => void; target: any; }) => {
    setStatus("PENDING")
    event.preventDefault()

    const captchaValue = recaptcha.current.getValue()

    const form = event.target

    const payload = {
      email: form.email.value,
      name: form.name.value,
      message: form.comment.value,
      referPage: '3d-print-quote',
      token: captchaValue
    }

    console.log(payload)

    try {
      const response = await fetch('/api/contact', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
        }
      })

      const json = await response.json()

      if (json.data == 200) {
        console.log(json.data)
        setStatus("SUCCESS")
        return
      }

      setStatus("ERROR")
    } catch (err) {
      console.log(err);
      setStatus("ERROR")
    }
    recaptcha.current.reset();
  }
  
  return (
    <div className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1">
            <div className='grid-cols-1'>
              <div className="grid grid-rows-1 font-bold text-4xl text-center mb-2 flex-wrap">
                <p>Sign Up for notifications!</p>
              </div>
              <div className="grid-rows-1 text-2xl text-center mt-6 mb-6">
                <p>Sign up with your email or phone number to get notifications for new posts!</p>
              </div>
            </div>
          </div>
        <div className="w-full border-2 lines mt-4 mb-6" />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 px-8 mb-10 gap-8 text-center items-center justify-center">
          <div className="grid-cols-1 mb-4">
            <div className="flow-root">
              <div>
                <NewsletterMain />
              </div>
            </div>
          </div>
          <div className="grid-cols-1 mb-4">
            <div className="flow-root">
              <div>
                <PhoneMain />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}