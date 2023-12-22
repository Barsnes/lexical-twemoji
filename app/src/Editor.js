import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {
  LexicalTwemojiPlugin,
  LexicalTwemojiNode,
} from "@barsnes/lexical-twemoji";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

function onError(error) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
    nodes: [LexicalTwemojiNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={
          <div
            style={{
              border: "1px solid red",
              fontSize: "32px",
            }}
          >
            <ContentEditable />
          </div>
        }
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <LexicalTwemojiPlugin />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
