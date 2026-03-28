type TokenType = 'keyword' | 'string' | 'comment' | 'function' | 'property' | 'number' | 'operator' | 'punctuation' | 'plain'

type Token = {
  type: TokenType
  value: string
}

const KEYWORDS = new Set([
  'import', 'from', 'const', 'let', 'var', 'await', 'async', 'new', 'export',
  'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends',
  'type', 'interface', 'true', 'false', 'null', 'undefined',
])

function tokenize(code: string): Token[][] {
  return code.split('\n').map((line) => {
    const tokens: Token[] = []
    let i = 0

    while (i < line.length) {
      if (line.slice(i, i + 2) === '//') {
        tokens.push({ type: 'comment', value: line.slice(i) })
        break
      }

      if (line[i] === "'" || line[i] === '"' || line[i] === '`') {
        const quote = line[i]
        let j = i + 1
        while (j < line.length && line[j] !== quote) {
          if (line[j] === '\\') j++
          j++
        }
        tokens.push({ type: 'string', value: line.slice(i, j + 1) })
        i = j + 1
        continue
      }

      if (/\d/.test(line[i]) && (i === 0 || /[\s(,=:[\-+*/]/.test(line[i - 1]))) {
        let j = i
        while (j < line.length && /[\d.]/.test(line[j])) j++
        tokens.push({ type: 'number', value: line.slice(i, j) })
        i = j
        continue
      }

      if (/[a-zA-Z_$@]/.test(line[i])) {
        let j = i
        while (j < line.length && /[a-zA-Z0-9_$@./]/.test(line[j])) j++
        const word = line.slice(i, j)

        if (KEYWORDS.has(word)) {
          tokens.push({ type: 'keyword', value: word })
        } else if (j < line.length && line[j] === '(') {
          tokens.push({ type: 'function', value: word })
        } else if (i > 0 && line[i - 1] === '.') {
          tokens.push({ type: 'function', value: word })
        } else if (j < line.length && line[j] === ':') {
          tokens.push({ type: 'property', value: word })
        } else {
          tokens.push({ type: 'plain', value: word })
        }
        i = j
        continue
      }

      if (/[=<>!+\-*/&|?]/.test(line[i])) {
        let j = i
        while (j < line.length && /[=<>!+\-*/&|?]/.test(line[j])) j++
        tokens.push({ type: 'operator', value: line.slice(i, j) })
        i = j
        continue
      }

      if (/[{}()[\],;:.]/.test(line[i])) {
        tokens.push({ type: 'punctuation', value: line[i] })
        i++
        continue
      }

      tokens.push({ type: 'plain', value: line[i] })
      i++
    }

    return tokens
  })
}

type CodeBlockProps = {
  code: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, filename, showLineNumbers = true }: CodeBlockProps) {
  const lines = tokenize(code.trim())

  return (
    <div style={{
      overflow: 'hidden',
      background: 'var(--code-bg)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      flex: 1,
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px',
        background: 'var(--code-titlebar)',
        borderBottom: '1px solid var(--code-border)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
        </div>
        {filename && (
          <span style={{
            marginLeft: 8,
            fontSize: 12,
            color: 'var(--code-comment)',
            fontFamily: '"Inter", sans-serif',
          }}>
            {filename}
          </span>
        )}
      </div>

      {/* Code content */}
      <div className="code-scroll-wrapper" style={{ padding: '14px 0', overflow: 'auto', flex: 1 }}>
        {lines.map((tokens, lineIdx) => (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              padding: '0 16px',
              lineHeight: 1.75,
              fontSize: 13,
              fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
            }}
          >
            {showLineNumbers && (
              <span style={{
                width: 32,
                flexShrink: 0,
                color: 'var(--code-comment)',
                userSelect: 'none',
                textAlign: 'right',
                marginRight: 20,
                fontSize: 12,
              }}>
                {lineIdx + 1}
              </span>
            )}
            <span style={{ flex: 1, whiteSpace: 'pre' }}>
              {tokens.map((token, tokenIdx) => (
                <span key={tokenIdx} style={{ color: `var(--code-${token.type === 'property' ? 'keyword' : token.type === 'operator' || token.type === 'punctuation' || token.type === 'plain' ? 'text' : token.type})` }}>
                  {token.value}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
