import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
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
          <ContentEditable className="lexical" />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <LexicalTwemojiPlugin />
    </LexicalComposer>
  );
}
