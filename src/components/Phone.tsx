'use client'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ReCAPTCHA from 'react-google-recaptcha'; 

export function PhoneFormStacked() {

  const recaptcha = useRef(null) as any
  const [status, setStatus] = useState<string | null>(null)
  const referrer = useSearchParams().get('referrer') || 'unknown/direct'
  const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_V2_SITE_KEY ?? ''

  const [isCaptchaVisible, setCaptchaVisible] = useState(false);

  function toggleCaptchaVisible() {
    setCaptchaVisible(true)
  }

  const handleSubmit = async (event: { preventDefault: () => void; target: any; }) => {
    setStatus("PENDING")
    event.preventDefault()
    const form = event.target

    const captchaValue = recaptcha.current.getValue()

    const payload = {
      email: form.email.value,
      captchaValue,
      referrer,
    }

    try {
      const response = await fetch('', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        }
      })

      const json = await response.json()

      if (json.data == 200) {
        setStatus("SUCCESS")
        return
      }

      setStatus("ERROR")
    } catch (err) {
      console.log(err);
      setStatus("ERROR")
    }
  }

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="mt-2">
            <div>
              <label htmlFor="phone-number" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone-number"
                name="phone"
                type="tel"
                autoComplete="phone"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="12345678900"
                pattern="((\+|00)?[1-9]{2}|0)[1-9]([0-9]){8}"
                disabled={status === "SUCCESS"}
                onChange={toggleCaptchaVisible}
              />
              <input type="checkbox" required value="" className=" w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
              <label className="mt-4 select-none ms-2 text-sm font-medium text-heading"> I would like to receive offers and news</label>
              <br></br>
              <input type="checkbox" required value="" className="justify-left w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
              <label className="select-none ms-2 text-sm font-medium text-heading"> I accept the <a href="/terms" className="text-blue-600">Terms of Service</a> & <a href="/privacy" className="text-blue-600">Privacy Policy</a></label>
              
              <p className="mt-5 text-sm">By providing your phone number and checking the above boxes, you agree to receive informational SMS text message notifications from Ryan Russell (Bright Wrench Design).<br></br> Message frequency will vary.<br></br> Message & data rates may apply.<br></br> Reply HELP for help or STOP to cancel.</p>
            </div>
          </div>
        </div>
        
        <div>
          {status === null && (
            <>
              {isCaptchaVisible && (
                <div className="flex justify-center items-center mb-6">
                  <ReCAPTCHA ref={recaptcha} sitekey={CAPTCHA_SITE_KEY} className="g-recaptcha" />
                </div>
              )}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </>
          )}
          {status === "SUCCESS" && (
            <>
              <button
                disabled={true}
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Success! Welcome to the phone list!
              </button>
            </>
          )}
          {status === "PENDING" && (
            <>
              <button
                disabled={true}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-200 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowPathIcon className="h-6 items-center justify-center" />
              </button>
            </>
          )}
          {status === "ERROR" && (
            <>
              {isCaptchaVisible && (
                <div className="flex justify-center items-center mb-6">
                  <ReCAPTCHA ref={recaptcha} sitekey={CAPTCHA_SITE_KEY} className="g-captcha" />
                </div>
              )}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Oops! Either you&#39;re already subscribed,<br />
                or there was another failure. You may try again.
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export function PhoneMain() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Get notified of new posts!
        </h2>
        <h4 className="text-center text-m leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign up to get text notifications!
        </h4>
      </div>
      <PhoneFormStacked />
    </div>
  )
}



