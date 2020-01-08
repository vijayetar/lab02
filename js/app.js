'use strict';
// console.log("hello world");

//constructor function to make new array
const animals = [];
function Animal (Obj) {
  this.image_url = Obj.image_url;
  this.title = Obj.title;
  this.description = Obj.description;
  this.keyword = Obj.keyword;
  this.horns = Obj.horns;
  // keyArr.push(Obj.keyword);
  animals.push(this);
}

//collecting the data from json file
$.ajax('./data/page-1.json',{method:'GET', dataType:'JSON'})
  .then(data=> {
    data.forEach(value => {
      new Animal(value).render();
      // console.log(value.keyword);
    })
    dropOptions();
  });


// render images
Animal.prototype.render = function () {
  const imageTemplate = $('#image_template').html();
  const $newSection = $('<section></section>');
  $newSection.html(imageTemplate);
  $newSection.find('img').attr('src',this.image_url);
  $('main').append($newSection);
};

//make new array of keywords while making sure that they are unique
const keyArr = [];
//make a new ARRay without repeats
const dropOptions = () => {
  console.log(animals);
  animals.forEach(aniObj => {
    // console.log('hello');
    if (!keyArr.includes(aniObj.keyword)) {
      keyArr.push(aniObj.keyword);
    }
  })
  dropDownMenu(keyArr);
  chooseHorn();
}

function dropDownMenu() {
  const $newDropDown = $('#dropdown');
  keyArr.forEach(value => {
    const $options = $(`<option>${value}</option>`);
    console.log('this is value', value);
    $newDropDown.append($options);
  })
}



//make a dropdown menu with the keywords
//make keywords an event handler
// with each click, relevant images should be rendered
//remove old images when next keyword is clicked
function chooseHorn() {
  $('select')
    .change(function() {
      $('section').hide();
      let selected = $('select option:selected').text();
      animals.forEach(value => {
        if (selected === value.keyword) {
          const imageTemplate = $('#image_template').html();
          const $newSection = $('<section></section>');
          $newSection.html(imageTemplate);
          $newSection.find('img').attr('src',value.image_url);
          $('main').append($newSection);
        }
      })
    })
}
// $( "select" )
//   .change(function () {
//     var str = "";
//     $( "select option:selected" ).each(function() {
//       str += $( this ).text() + " ";
//     });
//     $( "div" ).text( str );
//   })
//   .change();
