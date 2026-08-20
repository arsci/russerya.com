import { compareDesc } from "date-fns"
import { allTechPosts } from 'contentlayer2/generated'
import Link from "next/link";
 
export default function Home() {

  const posts = allTechPosts
    .sort((a,b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    });
    
  return (
    <div className="py-8">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="preview-cards-header-blog-pages">
          <h2 className="preview-cards-header-text">Technology</h2>
          <p className="preview-cards-blog-pages-p">
            Everything technology related
          </p>
        </div>
        <div className="preview-cards">
          {posts.map((post) => (
            <Link href={post.slug} key={post._id}>
              <div className="preview-article-wrapper-div">
                <article key={post._id} className="preview-article">
                  <div className="preview-article-date-time-category-grid">
                    <div className="preview-article-date-time-col">
                      <time
                        dateTime={post.date}
                        className="preview-article-date-time"
                      >
                        {new Date(post.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          timeZone: 'UTC',
                        })}
                      </time>
                    </div>
                  </div>
                  <div className="preview-post-title">
                    <h3 className="preview-post-header">
                      <span className="absolute inset-0" />
                      {post.title}
                    </h3>
                  </div>
                  <div className="preview-post-desc">
                    <p>{post.description}</p>
                  </div>
                </article>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}