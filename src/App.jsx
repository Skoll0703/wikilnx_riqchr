import { useMemo, useState } from 'react'
import './App.css'

const markdownFiles = import.meta.glob('./docs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const imageFiles = import.meta.glob('./docs/img/*', {
  eager: true,
  import: 'default',
})

function toSlug(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatInline(value) {
  const escaped = escapeHtml(value)

  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

function resolveImagePath(src) {
  if (!src) {
    return src
  }

  const decodedSrc = decodeURIComponent(src)
  const candidates = []

  if (decodedSrc.startsWith('./')) {
    candidates.push(decodedSrc)
  } else if (decodedSrc.startsWith('/')) {
    candidates.push(decodedSrc.replace(/^\//, ''))
  } else {
    candidates.push(`./docs/${decodedSrc}`)
    candidates.push(`./docs/img/${decodedSrc.replace(/^img\//, '')}`)
  }

  const directMatch = candidates.find((candidate) => imageFiles[candidate])
  if (directMatch) {
    return imageFiles[directMatch]
  }

  const fileName = decodedSrc.split('/').pop()
  const fallbackMatch = Object.keys(imageFiles).find((key) => key.endsWith(`/${fileName}`))

  return fallbackMatch ? imageFiles[fallbackMatch] : decodedSrc
}

function renderMarkdown(markdown) {
  const blocks = []
  const lines = markdown.replace(/\r/g, '').split('\n')
  let paragraphLines = []
  let listItems = []

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', content: paragraphLines.join(' ') })
      paragraphLines = []
    }
  }

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: 'list', items: listItems })
      listItems = []
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      flushList()
      return
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/)
    if (headingMatch) {
      flushParagraph()
      flushList()
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2],
      })
      return
    }

    const listMatch = trimmed.match(/^[-*]\s+(.*)$/)
    if (listMatch) {
      flushParagraph()
      listItems.push(listMatch[1])
      return
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      flushParagraph()
      flushList()
      blocks.push({
        type: 'image',
        alt: imageMatch[1],
        src: resolveImagePath(imageMatch[2]),
      })
      return
    }

    paragraphLines.push(trimmed)
  })

  flushParagraph()
  flushList()

  return blocks
}

function App() {
  const pages = useMemo(() => {
    const order = [
      'inicio',
      'instalacion',
      'hostname',
      'permisos especiales',
      'gestor de paquetes',
      'nginx y despliegue de sitio',
    ]

    return Object.entries(markdownFiles)
      .map(([filePath, content]) => {
        const name = filePath.replace('./docs/', '').replace(/\.md$/, '')
        const firstLine = content.split('\n')[0] ?? ''
        const title = firstLine.replace(/^#\s*/, '').trim() || name

        return {
          slug: toSlug(name),
          title,
          name,
          blocks: renderMarkdown(content),
        }
      })
      .sort((a, b) => {
        const aIndex = order.indexOf(a.name.toLowerCase())
        const bIndex = order.indexOf(b.name.toLowerCase())

        if (aIndex === -1 && bIndex === -1) return a.title.localeCompare(b.title)
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
  }, [])

  const [activeSlug, setActiveSlug] = useState(pages[0]?.slug ?? '')
  const currentPage = pages.find((page) => page.slug === activeSlug) ?? pages[0]

  return (
    <div className="wiki-shell">
      <aside className="sidebar">
        <div className="sidebar__header">
          <p className="eyebrow">Wiki Linux</p>
          <h1>Documentación del servidor</h1>
          <p className="sidebar__text">
            Wiki paso a paso de Linux Server.
          </p>
        </div>

        <nav className="sidebar__nav" aria-label="Páginas de la wiki">
          {pages.map((page) => (
            <button
              key={page.slug}
              type="button"
              className={`sidebar__link ${page.slug === activeSlug ? 'is-active' : ''}`}
              onClick={() => setActiveSlug(page.slug)}
            >
              {page.title}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        {currentPage ? (
          <>
            <header className="content__header">
              <p className="eyebrow">Página actual</p>
              <h2>{currentPage.title}</h2>
              <p className="content__meta">Fuente: {currentPage.name}.md</p>
            </header>

            <article className="markdown-content">
              {currentPage.blocks.map((block, index) => {
                if (block.type === 'heading') {
                  const HeadingTag = `h${Math.min(block.level + 1, 3)}`
                  return <HeadingTag key={`${currentPage.slug}-${index}`}>{block.content}</HeadingTag>
                }

                if (block.type === 'list') {
                  return (
                    <ul key={`${currentPage.slug}-${index}`}>
                      {block.items.map((item, itemIndex) => (
                        <li key={`${currentPage.slug}-${index}-${itemIndex}`} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                      ))}
                    </ul>
                  )
                }

                if (block.type === 'image') {
                  return <img key={`${currentPage.slug}-${index}`} src={block.src} alt={block.alt} className="markdown-image" />
                }

                return (
                  <p key={`${currentPage.slug}-${index}`} dangerouslySetInnerHTML={{ __html: formatInline(block.content) }} />
                )
              })}
            </article>
          </>
        ) : (
          <p>No hay contenido disponible.</p>
        )}
      </main>
    </div>
  )
}

export default App
