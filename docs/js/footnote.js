/**
 * Copyright (C) yui-Kitamura 2022
 * https://yui-kitamura.eng.pro
 *
 * footnote-js
 * version 1.1 released on 2022.02.06.
 * This provide footnote for your HTML document.
 *
 * usage
 * <p>this is a <span id="hoge">sample</span> sentence.</p>
 * <foot-note for="hoge">not a official</foot-note>
 * <foot-note-list></foot-note-list>
 */

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
    'use strict';

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
                    let targetId = (fn.prefixFootNoteTargetId + fn.cntNotForLinked);
                    element.setAttribute('for', targetId)
                    targetEle.id = targetId;
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

        },
        footNoteListTagFunc: function(element){
            element.style.display = 'block';
            element.style.borderTop = '1px solid black';
            element.style.borderBottom = '1px solid black';

            // create footnote list
            const footnoteList = document.querySelectorAll('foot-note');
            footnoteList.forEach(function(noteEle){
                const footnoteRefId = noteEle.getAttribute('for');
                // original title attribute
                document.getElementById(footnoteRefId).setAttribute('title', noteEle.textContent);

                // generate list content
                let footNoteEle = document.createElement('div');
                const footnoteNum = noteEle.getAttribute('foot-note-num');
                footNoteEle.id = fn.prefixFootNoteId + footnoteNum;
                footNoteEle.innerHTML = ('<a href="#'+ footnoteRefId +'">['+ footnoteNum +']</a>. '+ noteEle.innerHTML);
                element.appendChild(footNoteEle);

                // remove foot-note tag from document
                noteEle.remove();
            });

        },

        rescueMissedFootNote: function(){
            const missedFootNoteList = document.querySelectorAll('foot-note');
            if(missedFootNoteList.length > 0){
                const missedList = document.createElement('foot-note-list');
                document.querySelector('body').appendChild(missedList);
            }
        }
    };
    return {
        fn: fn
    };
}());
footnoteJs.fn.init();
footnoteJs.fn.registerCustomTagFootNote();

window.addEventListener('DOMContentLoaded', function(){
    footnoteJs.fn.rescueMissedFootNote();
});

