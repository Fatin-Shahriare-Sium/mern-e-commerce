import React from 'react'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
// import Paragraph from 'editorjs-paragraph-with-alignment'
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
import FontSize from 'editorjs-inline-font-size-tool'


const editorTools = () => {

    const EDITOR_JS_TOOLS = {
        embed: Embed,
        table: Table,
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ['anyTuneName']
        },
        list: List,
        warning: Warning,
        code: Code,
        linkTool: LinkTool,
        raw: Raw,
        header: {
            class: Header,
            config: {
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
            type: 'button',
            config: {
                default: "right",
                type: 'button'
            },
        },


    }

    return { EDITOR_JS_TOOLS }
}

export default editorTools;
