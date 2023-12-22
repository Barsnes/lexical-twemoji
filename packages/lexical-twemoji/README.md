# Lexical Twemoji plugin

Lexical plugin that makes all emojis a [twemoji](https://twemoji.twitter.com/content/twemoji-twitter/en.html).
The plugin does not provide any emoji pickers. It listens for changes on `TextNode`s, and parses them for any inserted emojis.

## Usage

```jsx
import {
  LexicalTwemojiPlugin,
  LexicalTwemojiNode,
} from "@barsnes/lexical-twemoji";

<LexicalComposer>
  ...other plguins
  <LexicalTwemojiPlugin />
</LexicalComposer>;
```
