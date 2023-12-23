import React from "react";
import { DOMExportOutput, SerializedTextNode, Spread, TextNode } from "lexical";
import twemoji from "twemoji";

type SerializedTwemojiNode = Spread<
  {
    src: string;
    text: string;
    type: "twemoji";
  },
  SerializedTextNode
>;

export class TwemojiNode extends TextNode {
  __className: string;

  static getType(): string {
    return "lexical-twemoji";
  }

  static clone(node: TwemojiNode): TwemojiNode {
    return new TwemojiNode(
      node.__className,
      node.__text,
      node.__src,
      node.__key
    );
  }

  constructor(className: string, text: string, src: string, key: any) {
    super(text, key);
    this.__className = className;
    this.__src = src;
  }

  createDOM() {
    const img = document.createElement("img");
    img.setAttribute("class", this.__className);
    img.setAttribute("data-lexical-text", "false");
    img.setAttribute("src", this.__src);
    img.setAttribute("alt", this.__text);
    img.setAttribute("style", "width: 1em; height: 1em;");

    return img;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__text);
    element.setAttribute("class", this.__className);
    element.setAttribute("data-emoji", this.__text);
    element.setAttribute("data-emoji-src", this.__src);
    return { element };
  }

  decorate() {
    return <img src={this.__src} alt={"twmoji"} />;
  }

  exportJSON(): SerializedTwemojiNode {
    return {
      ...super.exportJSON(),
      src: this.__src,
      type: "twemoji",
      text: this.__text,
    };
  }

  static importJSON(serializedNode: SerializedTwemojiNode): TwemojiNode {
    let src = twemoji.parse(serializedNode.text);
    src = src.split('src="')[1].split('"')[0];

    const node = $createTwemojiNode(
      "lexical-twemoji",
      serializedNode.text,
      src
    );

    return node;
  }

  isTextEntity(): true {
    return true;
  }

  isToken(): true {
    return true;
  }
}

export function $createTwemojiNode(
  className: string,
  emoticonText: string,
  src: string
) {
  // @ts-ignore: TODO: fix this
  return new TwemojiNode(className, emoticonText, src).setMode("token");
}
