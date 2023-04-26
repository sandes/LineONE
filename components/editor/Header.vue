<template>
  <div class="ed57-top">
    <div class="ed57-wrapper-top">
      <header class="ed57-header">
        <h1 class="ed57-h1-title">
          <span class="title">lineone.dev</span>
        </h1>

        <div class="ed57-container-header">

          <h1 class="header-page__logo editor">
            Lineone
          </h1>



          <div class="ed57-wr-b" >


            <div title="Ejecutar"
            class="ed57-b-run ed57-button"
            v-on:click="$emit('run_code')">

            <svg xmlns="http://www.w3.org/2000/svg" class="icon-white" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 17l5-5-5-5v10z"/>
            </svg>
            <span class="ed57-run-text">Run</span>
          </div>
        </div>
        <div class="ed57-profile">
          <div class="ed57-yr-header2">

            <div>

            <button type="button" name="button" class="bfp">

            <div class="feedback">

              
              

              <github-button href="https://github.com/sandes/LineONE" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star sandes/LineONE on GitHub">Star</github-button>
            </div>
          </button>

          
          </div>





            <nav
              v-on:click="$emit('show_menu_mobile')"
              class="header-nav-menu-mobile">

            <a class="MenuButton">
              <svg width="16" height="10" viewBox="0 0 16 10">
                <title>Open mobile</title>
                <g fill="var(--knockoutColor)" fill-rule="evenodd">
                  <rect y="8" width="16" height="2" rx="1"></rect>
                  <rect y="4" width="16" height="2" rx="1"></rect>
                  <rect width="16" height="2" rx="1"></rect>
                </g>
              </svg>
            </a>
            </nav>

          </div>
        </div>
        </div>

      </header>
    </div>
  </div>

</template>

<script>


import GithubButton from 'vue-github-button'
import Logo from '~/assets/images/logo.png';


  export default {

    components:{
      GithubButton
    },

    data(){
      return{
        Logo,
      }
    }

  }

</script>
