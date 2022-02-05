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
        prefixFootNoteId: 'foot-note-',
        prefixFootNoteTargetId: 'ref-foot-note-',

        /* 変数 */
        cntFootNote: 0,
        cntNotForLinked: 0,

        /* 関数 */
        init: function(){
            fn.cntFootNote = 0;
            fn.cntNotForLinked = 0;
        },

        registerCustomTagFootNote: function(){
            customElements.define('foot-note', FootNoteTag);
            customElements.define('foot-note-list', FootNoteListTag);
        },
        footNoteTagFunc: function(element){
            const forAtr = element.getAttribute('for');
            let targetEle = document.getElementById(forAtr);
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
            element.setAttribute('foot-note-num', (fn.cntFootNote + 1));
            // append [num] link tag
            let numLinkEle = document.createElement('sup');
            numLinkEle.innerHTML =
                ('<a href="#'+ fn.prefixFootNoteId + (fn.cntFootNote + 1) +'">['+ (fn.cntFootNote + 1) +']</a>');
            fn.cntFootNote += 1;
            targetEle.appendChild(numLinkEle);

            // append title attribute
            targetEle.setAttribute('title', element.textContent);
        },
        footNoteListTagFunc: function(element){
            element.style.display = 'block';
            element.style.borderTop = '1px solid black';
            element.style.borderBottom = '1px solid black';

            // create footnote list
            const footnoteList = document.querySelectorAll('foot-note');
            footnoteList.forEach(function(noteEle){
                let footNoteEle = document.createElement('div');
                const footnoteNum = noteEle.getAttribute('foot-note-num');
                const footnoteRefId = noteEle.getAttribute('for');
                footNoteEle.id = fn.prefixFootNoteId + footnoteNum;
                footNoteEle.innerHTML = ('<a href="#'+ footnoteRefId +'">['+ footnoteNum +']</a>. '+ noteEle.innerHTML);
                element.appendChild(footNoteEle);

                // remove foot-note tag from document
                noteEle.remove();
            });

        },

        makeFootnoteList: function(){


        },


    };
    return {
        fn: fn
    };
}());
footnoteJs.fn.registerCustomTagFootNote();

window.addEventListener('DOMContentLoaded', function(){
    footnoteJs.fn.init();
});

