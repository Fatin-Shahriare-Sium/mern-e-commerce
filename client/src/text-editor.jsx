import React, { useState, useRef, useEffect } from 'react'
import EditorJs from 'react-editor-js';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
import Paragraph from 'editorjs-paragraph-with-alignment'
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
    raw: Raw,
    header: {
        class: Header,
        config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 1
        },
        inlineToolbar: true,
        tunes: ['anyTuneName']
    },
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
    fontSize: FontSize,
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByFile(file) {
                    console.log('file', file);
                    // let storageRef = firebase.storage().ref();
                    // let imagesRef = storageRef.child('EditorJS').child('images/' + file.name);
                    // let metadata = {
                    //     contentType: 'image/jpeg'
                    // };
                    // let uploadTask = await imagesRef.put(file, metadata);
                    // const downloadURL = await uploadTask.ref.getDownloadURL();
                    return {
                        success: 1,
                        file: {
                            url: 'https://m2w4k5m5.stackpathcdn.com/wp-content/uploads/Allah-nebula-universe.jpg'
                        }
                    }
                }
            }
        }
    },
    anyTuneName: {
        class: AlignmentTuneTool,
        config: {
            default: "right"
        },
    }
}

const TextEditor = ({ getHtml, needToPreview }) => {
    let [text, setText] = useState(localStorage.getItem('__description'))
    const editorIntance = useRef(null)

    async function handleSave() {
        const savedData = await editorIntance.current.save()
        console.log('cliced');
        return getHtml(savedData)
    }

    useEffect(() => {
        if (needToPreview) {
            handleSave()
        }
    }, [needToPreview])




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
            <EditorJs inlineToolbar={true} instanceRef={(instance) => (editorIntance.current = instance)} tools={EDITOR_JS_TOOLS} />;
        </>
    )
}

export default TextEditor;

