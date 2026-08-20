'use client'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'; 

export function NewsletterFormStacked() {

  const recaptcha = useRef(null) as any
  const [status, setStatus] = useState<string | null>(null)
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

    const referrer =
      new URLSearchParams(window.location.search).get('referrer') || 'unknown/direct'

    const payload = {
      email: form.email.value,
      captchaValue,
      referrer,
    }

    try {
      const response = await fetch('/api/newsletter', {
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
                disabled={status === "SUCCESS"}
                onChange={toggleCaptchaVisible}
              />
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Success! Welcome to the email list!
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
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export function NewsletterMain() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Get notified of new posts!
        </h2>
        <h4 className="text-center text-m leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign up to join the email list
        </h4>
      </div>
      <NewsletterFormStacked />
    </div>
  )
}

export function NewsletterSeries() {
  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="w-full border-t lines mt-10" />
        <div className="md:mx-auto md:w-full md:max-w-md">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
              Want to get notified when the next part in this series is released?
          </h2>
          <h4 className="text-center text-m leading-9 tracking-tight text-gray-900 dark:text-white">
              Sign up to join the email list!
          </h4>
        </div>
        <NewsletterFormStacked />
        <div className="w-full border-t lines mt-10" />
      </div>
  )
}

export function NewsletterCurious() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
      <div className="w-full border-t lines mt-10" />
      <div className="md:mx-auto md:w-full md:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Curious about the next project?
        </h2>
        <h4 className="text-center text-m leading-9 tracking-tight text-gray-900 dark:text-white">
            Join the email list to get notified about new posts!
        </h4>
      </div>
      <NewsletterFormStacked />
      <div className="w-full border-t lines mt-10 mb-10" />
    </div>
)
}


