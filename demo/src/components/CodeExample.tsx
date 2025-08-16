import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeExampleProps {
  title: string;
  code: string;
  language?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ 
  title, 
  code, 
  language = 'typescript' 
}) => {
  return (
    <div className="code-block">
      <div className="code-title">{title}</div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeExample;
