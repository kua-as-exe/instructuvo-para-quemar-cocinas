// tools.js
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
//import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'

//import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
 
export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  },
  header: {
    class: Header,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+H'
  },
  //table: Table,
  list: {
    class: List,
    inlineToolbar: true
  },
  warning: {
    class: Warning,
    inlineToolbar: true
  },
  //code: Code,
  //linkTool: LinkTool,
  //inlineCode: InlineCode,
  //image: Image,
  image: {
    class: Image,
    //class: SimpleImage,
    inlineToolbar: true,
    uploader: {
      /**
       * Upload file to the server and return an uploaded image data
       * @param {File} file - file selected from the device or pasted by drag-n-drop
       * @return {Promise.<{success, file: {url}}>}
       */
      uploadByFile(file){
        // your own uploading logic here
        return {
          success: 1,
          file: {
            url: 'https://s3-us-west-2.amazonaws.com/melingoimages/Images/14337.jpg',
            // any other image data you want to store, such as width, height, color, extension, etc
          }
        };
      },

      /**
       * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
       * @param {string} url - pasted image URL
       * @return {Promise.<{success, file: {url}}>}
       */
      uploadByUrl(url){
        // your ajax request for uploading
        return () => {
          return {
            success: 1,
            file: {
              url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
              // any other image data you want to store, such as width, height, color, extension, etc
            }
          }
        }
      }
    }
  },
  //raw: Raw,
  marker: Marker,
  quote: {
    class: Quote,
    inlineToolbar: true
  },
  //checklist: CheckList,
  embed: Embed,
  delimiter: Delimiter,
  //simpleImage: SimpleImage

}