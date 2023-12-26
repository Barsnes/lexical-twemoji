import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, TextNode } from "lexical";
import { useEffect } from "react";
import twemoji from "twemoji";
import emojiRegex from "emoji-regex";
import { $createTwemojiNode } from "./TwemojiNode";

const regex = emojiRegex();
function TwemojiTransform(
  node: TextNode,
  editor: LexicalEditor,
  twemojiOptions: TwemojiOptions
) {
  const textContent = node.getTextContent();
  const emojis = textContent.match(regex);

  if (emojis) {
    let textAfter = textContent.slice(
      textContent.indexOf(emojis[0]) + emojis[0].length
    );
    if (textAfter.length === 0) {
      textAfter = "\\‰}";
    }

    const textBeforeNode = new TextNode(
      textContent.slice(0, textContent.indexOf(emojis[0]))
    );
    const textAfterNode = new TextNode(textAfter);

    const src = parseEmoji(emojis[0], twemojiOptions);

    editor.update(
      () => {
        const emojiNode = node.replace(
          $createTwemojiNode(emojis[0], src)
        );
        emojiNode.insertBefore(textBeforeNode);
        emojiNode.insertAfter(textAfterNode).selectStart();
        TwemojiTransform(textAfterNode, editor, twemojiOptions);
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

function useTwemojis(editor: LexicalEditor, twemojiOptions: TwemojiOptions) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(TextNode, (node) => {
      console.log(node);
      TwemojiTransform(node, editor, twemojiOptions);
    });

    return () => {
      removeTransform();
    };
  }, [editor]);
}

function parseEmoji(emoji: string, twemojiOptions: TwemojiOptions): string {
  try {
    const result = twemoji.parse(emoji, twemojiOptions);
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, "text/html");
    return doc.querySelector("img").src;
  } catch (error) {
    console.error("Failed to parse emoji: ", error);
    throw error;
  }
}

type TwemojiPluginProps = {
  /**
   * Options to pass to twemoji.parse
   */
  twemojiOptions?: TwemojiOptions;
};

export default function TwemojiPlugin({ twemojiOptions }: TwemojiPluginProps) {
  const [editor] = useLexicalComposerContext();
  useTwemojis(editor, twemojiOptions);
  return null;
}
