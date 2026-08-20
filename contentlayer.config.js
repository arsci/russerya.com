import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

/** @type {import('contentlayer2/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const TechPost = defineDocumentType(() => ({
  name: "TechPost",
  filePathPattern: `blog/tech/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    author: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    ogImage: {
      type: "string",
      required: true,
    }
  },
  computedFields,
}))

export const VanPost = defineDocumentType(() => ({
  name: "VanPost",
  filePathPattern: `blog/van/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    author: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    ogImage: {
      type: "string",
      required: true,
    }
  },
  computedFields,
}))

export const HomePost = defineDocumentType(() => ({
  name: "HomePost",
  filePathPattern: `blog/home/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    author: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    ogImage: {
      type: "string",
      required: true,
    }
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [TechPost, VanPost, HomePost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
      rehypePrettyCode, 
        {
          theme: "github-dark"
        }
      ],
      [
      rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      // [
        
      //   {
      //     theme: "github-dark",
      //     onVisitLine(node) {
      //       if (node.children.length === 0) {
      //         node.children = [{ type: "text", value: " " }]
      //       }
      //     },
      //     onVisitHighlightedLine(node) {
      //       node.properties.className.push("line--highlighted")
      //     },
      //     onVisitHighlightedWord(node) {
      //       node.properties.className = ["word--highlighted"]
      //     },
      //   },
      // ],
      // [
      //   rehypeAutolinkHeadings,
      //   {
      //     properties: {
      //       className: ["subheading-anchor"],
      //       ariaLabel: "Link to section",
      //     },
      //   },
      // ],
    ],
  },
})