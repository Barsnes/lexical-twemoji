<a href="https://www.npmjs.com/package/lexical">
  <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/@barsnes/lexical-twemoji"/>
</a>

# Lexical Twemoji plugin

Lexical plugin that makes all emojis a [twemoji](https://twemoji.twitter.com/content/twemoji-twitter/en.html).
The plugin does not provide any emoji pickers. It listens for changes on `TextNode`s, and parses them for any inserted emojis.

## Usage

```jsx
import {
  LexicalTwemojiPlugin,
  LexicalTwemojiNode,
} from "@barsnes/lexical-twemoji";

const initialConfig = {
  nodes: [LexicalTwemojiNode],
};

<LexicalComposer initialConfig={initialConfig}>
  <LexicalTwemojiPlugin />
</LexicalComposer>;
```
