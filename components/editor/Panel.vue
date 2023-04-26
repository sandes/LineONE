<template>

  <div class="panel-container">


    <div class="panel-header">
      <div class="ph-files">
        Files
      </div>
      <div class="ph-options">

        <button type="button" class="button-trans">
          <div class="b-container">
            <svg preserveAspectRatio="xMidYMin" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" class="jsx-1319342727 jsx-3027894632" style="vertical-align: middle;"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M12 18V12M9 15H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </button>
        <button type="button" class="button-trans">
          <div class="b-container">

            <svg preserveAspectRatio="xMidYMin" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" class="jsx-1319342727 jsx-3027894632" style="vertical-align: middle;"><path d="M12 11V17M9 14H15M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </button>

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


    }
  },
  
  mounted(){



  },

  methods:{

    resizePanel() {
      // your code for handling resize...
      //console.log("asd:", window.innerHeight);
      this.panelHeight = (window.innerHeight - (95 + 146 + 10)) + "px";

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