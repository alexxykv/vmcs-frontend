import React, { useState } from 'react';
import { Container } from '@mui/system';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";


const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));


const CodeShareScreen: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AceEditor
        mode="python"
        theme="monokai"
        value={value}
        onChange={handleChange}
        fontSize={14}
        highlightActiveLine={true}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        setOptions={{ useWorker: false, }}
        showGutter={true}
        showPrintMargin={false}
        style={{ width: '100%', height: '100%' }}
      />
    </Container>
  );
}


export default CodeShareScreen;