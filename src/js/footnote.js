'use strict';
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
class FootNoteTag extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        footnoteJs.fn.footNoteTagFunc(this);
    }
}

class FootNoteListTag extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        footnoteJs.fn.footNoteListTagFunc(this);
    }

}


let footnoteJs = (function () {
    let fn = {

        /* 定数　*/
        prefixFootNoteId: 'footnote-',
        prefixFootNoteTargetId: 'ref-footnote-',

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
            customElements.define('foot-note', FootNoteTag);
            customElements.define('foot-note-list', FootNoteListTag);
        },
        footNoteTagFunc: function(element){
            let targetEle = null;
            const forAtr = element.getAttribute('for');
            targetEle = document.getElementById(forAtr);
            if(targetEle == null){
                // for='id' 指定が不正。
                // foot-note の直前に対象を挿入する
                targetEle = document.createElement('span');
                if(forAtr == null){
                    targetEle.id = (fn.prefixFootNoteTargetId + fn.cntNotForLinked);
                    fn.cntNotForLinked += 1;
                }else{
                    targetEle.id = forAtr;
                }
                element.before(targetEle);
            }
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

