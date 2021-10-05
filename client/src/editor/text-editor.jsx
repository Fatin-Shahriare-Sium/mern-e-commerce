import React, { useState, useRef, useEffect } from 'react'
import EditorJs from 'react-editor-js';
import editorTools from './text-editor-tools';

const TextEditor = ({ needToUpdate, updateEditorState, hasData }) => {

    const editorIntance = useRef(null)
    let { EDITOR_JS_TOOLS } = editorTools()
    let [prevData, setPrevData] = useState({})

    async function handleSave() {
        const savedData = await editorIntance.current.save()
        console.log('savedData.blocks', savedData);
        let convertedHtml = convertDataToHtml(savedData.blocks)
        return updateEditorState(savedData, convertedHtml)

    }

    useEffect(() => {
        setPrevData({ ...prevData, hasData })
        console.log('has blocks', hasData);
    }, [JSON.stringify(hasData)])



    useEffect(() => {

        if (needToUpdate) {
            handleSave()
        }
        let settingBtn = document.getElementsByClassName('ce-toolbar__actions-buttons')

        settingBtn[0].addEventListener('click', () => {
            let blockTuneAligenBtn = document.getElementsByClassName('cdx-settings-button')
                ;[...blockTuneAligenBtn].forEach((sig) => sig.setAttribute('type', 'button'))
            console.log(blockTuneAligenBtn);
        })




        // let back = document.getElementById('custom')
        // back.innerHTML += x
        //iphone13 details table- https://phonesdata.com/en/smartphones/apple/iphone-13-5461225/

        // let table = document.createElement('table')
        // let thead = table.createTHead()
        // let tbody = table.createTBody()
        // let theadTr = thead.insertRow()
        // theadTr.insertCell().innerHTML = 'Allah is Almighty,alhamdulillah'
        // theadTr.insertCell().innerHTML = 'Allah is Almighty,alhamdulillah'
        // theadTr.insertCell().innerHTML = 'Allah is Almighty,alhamdulillah'
        // thead.insertRow().insertCell().innerHTML = 'Allah is Almighty'


        // tbody.insertRow().insertCell().innerHTML = 'Allah is Almighty'
        // tbody.insertRow()
        // console.log(table);


    }, [needToUpdate])




    function convertDataToHtml(blocks) {
        var convertedHtml = "";
        blocks.map(block => {

            switch (block.type) {
                case "header":
                    convertedHtml += `<h${block.data.level} class='single-product-details__title'>${block.data.text}</h${block.data.level}>`;
                    break;
                case "embded":
                    convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
                    break;
                case "paragraph":
                    convertedHtml += `<p class='single-product-details__text'>${block.data.text}</p>`;
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
                case "table":
                    let table = document.createElement('table')
                    table.className = 'table table-striped'
                    let thead = table.createTHead()
                    let tbody = table.createTBody()

                    let theadTr = thead.insertRow()

                    block.data.content[0].forEach(sig => {
                        theadTr.insertCell().innerHTML = sig
                    })

                    for (let i = 1; i < block.data.content.length; i++) {
                        let tbodyRow = tbody.insertRow()
                        block.data.content[i].forEach(sig => {
                            tbodyRow.insertCell().innerHTML = sig
                        })
                    }
                    convertedHtml += table.outerHTML

                    break;
                default:
                    console.log("Unknown block type", block.type);
                    break;
            }
        });

        return convertedHtml
    }

    return (
        <>
            <EditorJs data={hasData} inlineToolbar={true} instanceRef={(instance) => (editorIntance.current = instance)} tools={EDITOR_JS_TOOLS} >

            </EditorJs>
        </>
    )
}

export default TextEditor;

