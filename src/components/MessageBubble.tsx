import Link from "next/link"

export default function MessageBubble() {
  return (
    <div className="inset-x-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 mt-10">
      <Link href="/">
      <div className="flex items-center justify-between gap-x-6 bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-500 dark:hover:bg-indigo-600 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
        <p className="text-sm leading-6 text-white">
            <strong className="font-semibold">Looking for an AWS Consultant?</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            I am available for AWS Cloud and DevOps related projects!&nbsp;<span aria-hidden="true">&rarr;</span>
        </p>
      </div>
      </Link>
    </div>
  )
}