import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/styles'

const Code = ({children}) => {
  return (
    <div>
      <SyntaxHighlighter language='javascript' style={docco}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code
