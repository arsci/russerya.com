'use client'
import { RocketLaunchIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
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
                <p>3D Printing and Design Services</p>
              </div>
              <div className="grid-rows-1 text-2xl text-center mt-6 mb-6">
                <p>Sacramento, California</p>
              </div>
            </div>
          </div>
        <div className="w-full border-2 lines mt-4 mb-6" />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 px-8 mb-10 gap-8 text-center items-center justify-center">
          <div className="grid-cols-1 mb-4">
            <div className="flow-root">
              <div>
                <p className="mt-8">We offer professional local 3D printing and design services based in Sacramento, California.</p>
                <p className="mt-4">We can help with full project lifecycles, helping you design your project in Onshape and print for local pickup or shipping.</p>
                <p className="mt-4">Just need a way to print your design? We can take your finished design files and print them locally and ship! </p>
              </div>
            </div>
          </div>
          <div className="flow-root mx-14">
            <div className="flex items-center justify-center">
              <RocketLaunchIcon className="h-16 mb-2 items-center justify-center" />
            </div>
            <p className="text-lg font-bold text-center mb-2">Reach out for a quote today!</p>
            <p className="text-center mb-4">Describe your project and see how we can help</p>
            <div className="flex justify-center mb-2">
              <a href='#'
                onClick={() => setOpen(true)}
              >
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-10 py-3 font-semibold leading-6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get a Quote
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full border-t lines grid" />
        <div className="mt-16 w-full">
          <div className="flex justify-center gap-20 items-center grid-cols-1">
            <div className='photo-circle'>
              <Image
                src='/images/printing/cover.jpg'
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                width="640"
                height="640"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className='photo-circle'>
              <Image
                src='/images/printing/clip.jpg'
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                width="640"
                height="640"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-center gap-20 items-center grid-cols-1">
            <div className='photo-circle'>
              <Image
                src='/images/printing/onshape.png'
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                width="640"
                height="640"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className='photo-circle'>
              <Image
                src='/images/printing/prusa.png'
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                width="640"
                height="640"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white dark:dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Request a quote
                      </DialogTitle>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                            <div className="mt-2">
                              <div>
                                <label htmlFor="name" className="sr-only">
                                  Name
                                </label>
                                <input
                                  id="name"
                                  name="name"
                                  type="text"
                                  autoComplete="name"
                                  required
                                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Name"
                                />
                              </div>
                            </div>
                            <div className="mt-2">
                              <div>
                                <label htmlFor="email-address" className="sr-only">
                                  Email address
                                </label>
                                <input
                                  id="email-address"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  required
                                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Email address"
                                />
                              </div>
                            </div>
                            <div className="mt-2">
                              <label htmlFor="comment" className="sr-only">
                                Message
                              </label>
                              <textarea
                                rows={4}
                                name="comment"
                                id="comment"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={'Tell us about your project, the more details the better!'}
                              />
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6">
                            {status === null && (
                              <>
                                <div className="flex justify-center items-center mb-6">
                                  <ReCAPTCHA ref={recaptcha} sitekey={CAPTCHA_SITE_KEY} className="g-recaptcha" />
                                </div>
                                <button
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Send
                                </button>
                                <button
                                  type="button"
                                  className="mt-2 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  onClick={() => setOpen(false)}
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {status === "SUCCESS" && (
                              <>
                                <button
                                  disabled={true}
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Message Sent!
                                </button>
                                <button
                                  type="button"
                                  className="mt-2 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  onClick={() => setOpen(false)}
                                >
                                  Close
                                </button>
                              </>
                            )}
                            {status === "PENDING" && (
                              <>
                                <button
                                  disabled={true}
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-indigo-200 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  <ArrowPathIcon className="h-6 items-center justify-center" />
                                </button>
                                <button
                                  type="button"
                                  className="mt-2 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  onClick={() => setOpen(false)}
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {status === "ERROR" && (
                              <>
                                <div className="flex justify-center items-center mb-6">
                                  <ReCAPTCHA ref={recaptcha} sitekey={CAPTCHA_SITE_KEY} className="g-recaptcha" />
                                </div>
                                <button
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Oops! We encountered an error. Please try again.
                                </button>
                                <button
                                  type="button"
                                  className="mt-2 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  onClick={() => setOpen(false)}
                                >
                                  Close
                                </button>
                              </>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}