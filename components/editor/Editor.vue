<template>
    <div>


  <div class="container">

    <div class="wrapper">

      <div class="runner">

        <div class="code">

        <div>


        <div class="ed59-wrapper">

      <EditorHeader
         v-on:run_code="run"

      />

        <div class="ed59-container-editor">

        <div v-bind:class="{
            'compress':!showPanel,
            'display-block':forceShowMenuMobile,
            'margin-left-0':!showPanel,
          }"
          class="ed59-ce-panel">

          <EditorPanel
            v-on:toggle_panel="toggle_panel"
            ref="panelMethods"
            />
        </div>


        <div class="ed59-ce-editor">
          <div class="ed59-editor">

            <div
            v-bind:style="{ width: rightSideWidth}"
            class="ed59-platform-editor">
              <textarea v-model='code'
                        id="editor"
                        name="editor"
              >
              </textarea>
            </div>

            <div id='gutter' class="gutter gutter-horizontal"></div>

            <div
              id="scrollresponse"
              v-bind:style="{ width: leftSideWidth}"
              v-bind:class="{'display-block':forceShowPanelResponse}"
              class="ed59-platform-response">

              <div class="res-con">
                <div class="ed59-title-res">Response</div>

                <div class="Close">
                  <button
                    class="close-mobile"
                    v-on:click="closePanelResponse()"
                    >
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <title>Close response</title>
                      <path d="M25.6 14.3a1 1 0 0 1 0 1.4l-4.24 4.25 4.25 4.24a1 1 0 1 1-1.42 1.42l-4.24-4.25-4.24 4.25a1 1 0 0 1-1.42-1.42l4.25-4.24-4.25-4.24a1 1 0 0 1 1.42-1.42l4.24 4.25 4.24-4.25a1 1 0 0 1 1.42 0z" fill="#8898AA" fill-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>

              </div>

              <div v-if="!finish" class="loader-container">
                <div class="lds-dual-ring mini"></div>
              </div>

              <div id="response" class="body-res"></div>
            </div>

          </div>
        </div>

    </div>

    </div>

        </div>


        </div>


      </div>
    </div>

  </div>





</div>
</template>

<script>
import * as CodeMirror from 'codemirror';


import 'codemirror/lib/codemirror.css';
//import 'codemirror/theme/monokai.css';
import 'codemirror/addon/hint/show-hint.css'


import 'codemirror/mode/precodigo/precodigo.js';
//import 'codemirror/mode/precodigo/precodigo.en.js';
//import 'codemirror/mode/precodigo/precodigo.es.js';
//import 'codemirror/mode/precodigo/precodigo.fr.js';
//import 'codemirror/mode/precodigo/precodigo.pt.js';

import 'codemirror/keymap/sublime.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/show-hint.js';

import {resize_panel} from 'precodigo/addon/editor-resize.js';

const precodigo = require('precodigo/lib/precodigo.js');

import "../../assets/css/editor.css";


import ej_for from '@/assets/files/for.txt';
import ej_operators from '@/assets/files/01_operators.txt'
import ej_variables from '@/assets/files/02_variables.txt'
import ej_operators2 from '@/assets/files/03_operators.txt'

export default {

  data(){
    return {
      showPanel:true,
      forceShowMenuMobile:false,
      forceShowPanelResponse:false,
      code:ej_operators2,
      cm:null,
      delay:null,
      finish:true,
      response_empty:false,
      rightSideWidth:"calc(70% - 5.5px)",
      leftSideWidth:"calc(30% - 8.5px)",
    }
  },

  mounted(){




    const resizer = document.getElementById('gutter');
    resize_panel(resizer);

    const left = localStorage.getItem('leftSide');
    const right = localStorage.getItem('rightSide');
    const panel = localStorage.getItem('panel');

    if (left != null && right != null) {
      this.rightSideWidth = `calc(${right}% - 5.5px)`;
      this.leftSideWidth = `calc(${left}% - 8.5px)`;
    }

    if (panel != null) {
      this.showPanel = true ? panel == 'true':false;
    }


    // codemrror
    this.cm = CodeMirror.fromTextArea(document.getElementById("editor"), {
      lineNumbers: true,
      keyMap: "sublime",
      theme:'default',
      mode:{name: "precodigo",},
      indentUnit: 4,
      matchBrackets: true,
      autoRefresh: true,
      refresh: true,
      autoCloseTags: true,
      smartIndent: true,
      styleActiveLine: { nonEmpty: true },
      extraKeys: {
        "Ctrl-Enter": "autocomplete",
      }

    });

    this.cm.setSize("100%","100%");


    //if (localStorage.getItem('code')) {

      //this.code = localStorage.getItem('code');
      this.cm.setValue(this.code);
    //}
  },

  methods:{


    toggle_panel(){

      let sp = !this.showPanel;
      localStorage.setItem('panel', sp);
      this.showPanel = sp;

    },


    run(){


      /*
      if (window.location.hostname != 'xicara.app' &&
          window.location.hostname != 'localhost') {
          document.getElementById('response').innerHTML = "Error";
        return false;
      }
      */



      if (window.innerWidth <= 700) {
        this.forceShowPanelResponse = true;
      }


      this.finish = false;
      document.getElementById('response').innerHTML = "";



      localStorage.setItem('code',this.cm.getValue());


      try{

        setTimeout(
          async () => {
            this.finish = await precodigo.run("vainilla", this.cm.getValue() + '\n');
          },
          0
        );

      }catch(err){
        this.finish = true;
        console.log("ERROR:ERROR:ERROR:ERROR:ERROR:ERROR:ERROR:ERROR:ERROR:")
      }




    }

  },



}
</script>
