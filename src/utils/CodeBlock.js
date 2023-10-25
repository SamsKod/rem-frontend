import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const CodeBlock: React.FC<{ codestring: string }> = ({ codestring }) => {
  let codeWithMinLines = codestring;
  if (codestring) { 
  const minLines = 2; // Adjust the minimum number of lines as needed

  const codeLines = codestring.split('\n');
  const emptyLines = new Array(Math.max(minLines - codeLines.length, 0)).fill('');

  codeWithMinLines = codeLines.concat(emptyLines).join('\n');
  }
return (
  <SyntaxHighlighter
    style={a11yDark}
    showLineNumbers>
    {codeWithMinLines}
  </SyntaxHighlighter>
);
};

export default CodeBlock;