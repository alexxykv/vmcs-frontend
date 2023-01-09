import React, { useState } from 'react';
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
    <AceEditor
      placeholder="Placeholder Text"
      mode="python"
      theme="monokai"
      name="blah2"
      value={value}
      onChange={handleChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        useWorker: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true
      }}
    />
  );
}


export default CodeShareScreen;