<a href="https://www.npmjs.com/package/@barsnes/lexical-twemoji">
  <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/@barsnes/lexical-twemoji"/>
</a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a66b921-ba1e-43da-997e-3a21240f1549/deploy-status)](https://app.netlify.com/sites/lexical-twemoji/deploys)

### [Demo](https://lexical-twemoji.barsnes.dev/)

# Lexical Twemoji plugin

Lexical plugin that makes all emojis a [twemoji](https://twemoji.twitter.com/content/twemoji-twitter/en.html).
The plugin does not provide any emoji pickers. It listens for changes on `TextNode`s, and parses them for any inserted emojis.

## Usage

`npm i @barsnes/lexical-twemoji`

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
