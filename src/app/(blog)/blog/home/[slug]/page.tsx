import { join } from 'path'
import Image from 'next/image'
import { env } from '@/env.mjs'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/utils/utils'
import { Mdx } from '@/components/MDXComponents'
import { allHomePosts } from 'contentlayer2/generated'
import ReturnButton from '@/components/ReturnButton'
import { NewsletterMain } from '@/components/Newsletter'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPostFromParams(params: { slug: string }) {
  const post = allHomePosts.find((post) => post._raw.flattenedPath === join("blog/home/", params.slug))

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(await params)

  if (!post) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL
  const ogUrl = new URL(`${url}/images/blog/home/${post.ogImage}`)

  ogUrl.searchParams.set("heading", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: `${post.title} - Home Projects - Ryan Russell`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
  },
  }
}

export default async function Post({ params }: PostPageProps) {
  
  const post = await getPostFromParams(await params)

  if (!post) notFound()

  const ogImage = `/images/blog/home/${post.ogImage}`
 
  return (
    <div>
      <div className="max-w-3xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="sm:px-8 mt-8">
            <ReturnButton />
            <div className='flex justify-center'>
                <time dateTime={post.date} className="order-first flex items-center text-base text-zinc-800 dark:text-zinc-100 sm:text-2xl">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
                </time>
            </div>
        </div>
      </div>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="sm:px-8 mt-8">
            <div className='flex justify-center mx-auto'>
              <Image
                src={ogImage}
                width="1000"
                height="1000"
                className="h-auto w-full rounded-md"
                alt="header-image"
              />
            </div>
            <div className='flex justify-center mx-auto'>
              <header className="flex flex-col items-left">
                <h1 className="mt-8 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl text-align:center">
                  {post.title}
                </h1>
              </header>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mb-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="sm:px-8 mt-8">
              <article>
                <div className='mt-8'>
                  <Mdx code={post.body.code} />
                </div>
              </article>
          </div>
        </div>
      </div>
    </div>
  )
}