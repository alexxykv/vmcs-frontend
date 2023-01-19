import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { ITextFile } from '../hubs/CodeSharingHub';

import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';
import { useMeeting } from '../hooks/useMeeting';

const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css'
];

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal'
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

interface EditorProps {
  file: ITextFile
}

const Editor: React.FC<EditorProps> = ({ file }) => {
  const meeting = useMeeting();
  const codeHub = useCodeSharingHub();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    console.log(file)
    setValue(file.text);
  }, [file, file.text]);

  useEffect(() => {
    codeHub.onChange((text, repositoryId, fileId) => {
      if (file.id === fileId) {
        setValue(text);
      }
    });
  }, [codeHub, file.id]);

  const handleChange = (newValue: string) => {
    console.log('change');
    codeHub.change(newValue, meeting.repositoryId, file.id);
    setValue(newValue);
  };

  return (
    <AceEditor
      mode='python'
      theme='monokai'
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
      style={{ display: 'flex', flexGrow: 1, height: '100%' }}
    />
  );
}


export default Editor;