<template>

<div class="container">

  <div class="header-top">
    <div class="wrapper-header">

    <div class="header-container">
        <div class="header-container--nav">
            <h1 class="header-page__logo">

                Lineone
            </h1>
    




            <div class="feedback">

              
              

<github-button href="https://github.com/sandes/LineONE" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star sandes/LineONE on GitHub">Star</github-button>
</div>


        </div>
    </div>

    </div>
  </div>


  <div class="section-container">

    <div class="section-wrapper">
      <div class="section-signup cross">

        <div class="section-codehub">

          <div class="section-cross-action">
            <h1 class="title">
              <em>
                <span id="title" class="styles_word__3haUq">
                   LineOne
                </span>
              </em>


            </h1>
            <h3 class="subtitle">
              <div>
                <span>Lineone is an intuitive web-based-programming language writen in Javascript, that has been crafted to facilitate the learning of coding, with a primary emphasis on honing computational logic skills.</span>
                
              </div>

              

            </h3>
            <div class="section-signup bb">
              <div class="section-su-btn">

                <button class="btn signup">
                  <NuxtLink to="/editor" class="btn toSignup">
                    <span class="text-default">Open editor</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" class="HoverArrow">
                      <g fill-rule="evenodd"><path d="M0 5h7" class="HoverArrow__linePath"></path> <path d="M1 1l4 4-4 4" class="HoverArrow__tipPath"></path></g></svg>
                  </NuxtLink>
                </button>
              </div>

            </div>

          </div>
        </div>


        <div class="section-avatar">

          <LandingCode/>
        </div>

      </div>
    </div>
  </div>

<footer>
    <div class="section-footer">
        <div class="footer-wrapper">
            <div class="footer-items">
                <div class="footer">
                    <div class="footer-links">
                        <p>
                          Created with ❤️ by <a target="_blank" href="https://github.com/sandes">sandes</a>
                        </p>


                    </div>


                </div>

            </div>
        </div>
    </div>
</footer>



</div>

</template>

<script>

import TwSVG from '~/assets/images/twitter.svg?raw=';
import YTSVG from '~/assets/images/youtube.svg?raw=';
import Logo from '~/assets/images/logo.png';
import Vercel from '~/assets/images/vercel.png';

import GithubButton from 'vue-github-button'

export default {

    components:{
      GithubButton
    },

    data(){
      return{
        TwSVG,
        YTSVG,
        Logo,
        Vercel,
      }
    }


}
</script>
