const React = require('react')

function getRandomIntInclusive(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomEatery() {
              var index = getRandomIntInclusive(0, 5)
              return answers [index]
}

  randomRest () {
   return Math.floor((Math.random() * restaurants.length) + 0)
 },


 <div class="popup">
   <div class="upper">Are you sure you know what you're doing?</div>
   <div class="stroke"></div>
   <div class="lower">
     <button><i class="icon-large icon-ok"></i>yes</button>
     <button><i class="icon-large icon-remove"></i>no</button>
   </div>
 </div>
