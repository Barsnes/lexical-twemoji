import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, TextNode } from "lexical";
import { useEffect } from "react";
import twemoji from "twemoji";
import emojiRegex from "emoji-regex";
import { $createTwemojiNode } from "./TwemojiNode";

const regex = emojiRegex();
function TwemojiTransform(node: TextNode, editor: LexicalEditor) {
  const textContent = node.getTextContent();
  const nodes = [];
  const emojis = textContent.match(regex);

  if (emojis) {
    let textAfter = textContent.slice(
      textContent.indexOf(emojis[0]) + emojis[0].length
    );
    if (textAfter.length === 0) {
      textAfter = "\\‰}";
    }

    emojis.map((emoji) => {
      textContent.split(emoji).map((text) => {
        if (text.length > 0) {
          nodes.push(new TextNode(text));
        }
        nodes.push(
          $createTwemojiNode("lexical-twemoji", emoji, parseEmoji(emoji))
        );
      });
    });

    const textBeforeNode = new TextNode(
      textContent.slice(0, textContent.indexOf(emojis[0]))
    );
    const textAfterNode = new TextNode(textAfter);

    const src = parseEmoji(emojis[0]);

    editor.update(
      () => {
        const emojiNode = node.replace(
          $createTwemojiNode("lexical-twemoji", emojis[0], src)
        );
        emojiNode.insertBefore(textBeforeNode);
        emojiNode.insertAfter(textAfterNode).selectStart();
        TwemojiTransform(textAfterNode, editor);
      },
      {
        onUpdate: () => {
          editor.update(() => {
            if (textAfter === "\\‰}") {
              textAfterNode.remove();
            }
          });
        },
      }
    );
  }
}

function useTwemojis(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(TextNode, (node) => {
      console.log(node);
      TwemojiTransform(node, editor);
    });

    return () => {
      removeTransform();
    };
  }, [editor]);
}

function parseEmoji(emoji: string): string {
  try {
    const result = twemoji.parse(emoji);
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, "text/html");
    return doc.querySelector("img").src;
  } catch (error) {
    console.error("Failed to parse emoji: ", error);
    throw error;
  }
}

export default function TwemojiPlugin() {
  const [editor] = useLexicalComposerContext();
  useTwemojis(editor);
  return null;
}
