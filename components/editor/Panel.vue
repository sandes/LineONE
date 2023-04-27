<template>

  <div class="panel-container">


    <div class="panel-header">
      <div class="ph-files">
        Files
      </div>
      <div class="ph-options">
        <!--
        <button type="button" class="button-trans">
          <div class="b-container">
            <svg preserveAspectRatio="xMidYMin" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" class="jsx-1319342727 jsx-3027894632" style="vertical-align: middle;"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M12 18V12M9 15H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </button>
        -->


      </div>
    </div>

    <div>

      <div class="wrap-files">

        <div v-for="(file, idx) in files" :key="idx">

            <div class="file-el"
            v-on:click="open(file.name)">{{file.name}}</div>
            
        </div>

      </div>

    </div>



    <!--hide panel-->
    <div class="toggle-panel-container">
      <div
      v-on:click="$emit('toggle_panel')"
      class="toggle-panel">
        <div class="update-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 28 21" width="18px" fill="#ddd"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path></svg>
        </div>
      </div>
    </div>
    <!--end hide panel-->

  </div>

</template>

<script>
export default {
  
  data(){
    return {
      panelHeight:"initial",
      scripts:[],
      current_script:"",
      info:{},
      script_name:"",
      script_private:false,
      script_to_delete:null,
      files:[
                {
                    name:"introduction",
                },
                {
                    name:"variables",
                },
                {
                    name:"operators",
                },
                {
                    name:"strings",
                },
                {
                    name:"lists",
                },
                {
                    name:"if",
                },
                {
                    name:"loop_while",
                },
                {
                    name:"loop_for",
                },                   
                {
                    name:"functions",
                },                    
                
                {
                    name:"fibonacci",
                },                         
                {
                    name:"two_greater",
                },     
                {
                    name:"rock_paper_scissors",
                },                     
                
                

            ]

    }
  },
  
  mounted(){



  },

  methods:{

    resizePanel() {
      // your code for handling resize...
      //console.log("asd:", window.innerHeight);
      this.panelHeight = (window.innerHeight - (95 + 146 + 10)) + "px";

    },
    open(name){
          this.$emit('open_file', name);
    }      
  },

  created() {
    window.addEventListener("resize", this.resizePanel);
    this.resizePanel();
  },
  destroyed() {
    window.removeEventListener("resize", this.resizePanel);
  },  


  
}
</script>