/**
 * Copyright (C) yui-Kitamura 2022
 * https://yui-kitamura.eng.pro
 *
 * footnote-js
 * This provide footnote for your HTML document.
 *
 * usage
 * <p>this is a <span id="hoge">sample</span> sentence.</p>
 * <foot-note for="hoge">not a official</foot-note>
 * <foot-note-list></foot-note-list>
 */

//TODO learn https://developer.mozilla.org/ja/docs/Web/API/CustomElementRegistry/define
 class FootNoteTag extends HTMLLabelElement {
     constructor(){
         super();
     }
 }

 class FootNoteListTag extends HTMLUListElement {
    constructor(){
        super();
    }

 }


let footnoteJs = (function () {
    let fn = {
        /* 変数 */
        customTagFootNote: function(){
            customElements.define('foot-note', FootNoteTag, { extends: 'label'});
            customElements.define('foot-note-list', FootNoteListTag, { extends: 'ul'});
        },


        /* 関数 */
        generateFootNoteTag: function(){
            fn.customTagFootNote();
        },

        makeFootnoteList: function(){


        },


    };
    return {
        fn: fn
    };
}());

window.addEventListener('DOMContentLoaded', function(){
    footnoteJs.fn.generateFootNoteTag();
});

