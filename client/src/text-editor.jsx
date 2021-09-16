import React, { useState, useRef } from 'react'
import EditorJs from 'react-editor-js';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import ChangeFontSize from '@quanzo/change-font-size'
import FontSize from 'editorjs-inline-font-size-tool'
import edjsParser from 'editorjs-parser'

export const EDITOR_JS_TOOLS = {
    embed: Embed,
    table: Table,
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: Image,
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
    fontSize: FontSize
}
const TextEditor = ({ getHtml }) => {
    let [text, setText] = useState(localStorage.getItem('__description'))
    const editorIntance = useRef(null)
    let see = (data) => {
        console.log(data);
    }

    const customParsers = {
        customBlock: function (data, config) {
            // parsing functionality
            // the config arg is user provided config merged with default config
        },
        image: function (data, config) {
            return `<img src="${data.file.url}" alt="${data.caption}" >`
        }
    }

    const parser = new edjsParser(undefined, customParsers);

    async function handleSave() {
        const savedData = await editorIntance.current.save()
        console.log(savedData)
        let markup = parser.parse(savedData)

        getHtml(markup)
    }




    function convertDataToHtml(blocks) {
        var convertedHtml = "";
        blocks.map(block => {

            switch (block.type) {
                case "header":
                    convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                    break;
                case "embded":
                    convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
                    break;
                case "paragraph":
                    convertedHtml += `<p>${block.data.text}</p>`;
                    break;
                case "delimiter":
                    convertedHtml += "<hr />";
                    break;
                case "image":
                    convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
                    break;
                case "list":
                    convertedHtml += "<ul>";
                    block.data.items.forEach(function (li) {
                        convertedHtml += `<li>${li}</li>`;
                    });
                    convertedHtml += "</ul>";
                    break;
                default:
                    console.log("Unknown block type", block.type);
                    break;
            }
        });
        console.log(convertedHtml);
        return convertedHtml;
    }

    return (
        <>
            <EditorJs inlineToolbar={true} instanceRef={(instance) => (editorIntance.current = instance)} onChange={handleSave} onCompareBlocks={(data) => { console.log(data); }} tools={EDITOR_JS_TOOLS} />;
        </>
    )
}

export default TextEditor;
