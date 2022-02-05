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

        footnoteJs.fn.footNoteTagFunc(this);

    }
}

class FootNoteListTag extends HTMLUListElement {
    constructor(){
        super();

        footnoteJs.fn.footNoteListTagFunc(this);

    }

}


let footnoteJs = (function () {
    let fn = {
        /* 変数 */
        cntFootNote: 0,
        cntNotForLinked: 0,

        /* 関数 */
        init: function(){
            fn.cntFootNote = 0;
            fn.cntNotForLinked = 0;
            fn.registerCustomTagFootNote();
        },

        registerCustomTagFootNote: function(){
            customElements.define('foot-note', FootNoteTag, { extends: 'label'});
            customElements.define('foot-note-list', FootNoteListTag, { extends: 'ul'});
        },
        footNoteTagFunc: function(element){
            // append [num] link tag
            // append alt attribute
        },
        footNoteListTagFunc: function(element){
            // ul-li style

        },

        makeFootnoteList: function(){


        },


    };
    return {
        fn: fn
    };
}());

window.addEventListener('DOMContentLoaded', function(){
    footnoteJs.fn.init();
    footnoteJs.fn.makeFootnoteList();
});

