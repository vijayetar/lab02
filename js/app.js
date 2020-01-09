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
  animals.push(this);
}

//collecting the data from json file
$.ajax('./data/page-1.json',{method:'GET', dataType:'JSON'})
  .then(data=> {
    data.forEach(value => {
      new Animal(value).toHtml();
    })
    animalRender();
    dropOptions();
  });

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
    $newDropDown.append($options);
  })
}

function chooseHorn() {
  $('select')
    .change(function() {
      $('div').hide();
      let select = $(this).val();
      animals.forEach(value => {
        if (select === value.keyword) {
          $('#image_template').append(value.toHtml());
        } else if (select === 'default') {
          $('#image_template').append(value.toHtml());
        }
      })
    })
}
// trying handlebars out
let templateId = '#animals-template';
Animal.prototype.toHtml = function() {
  let template = $(templateId).html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
};
function animalRender() {
  animals.forEach(animalObj => {
    $('#image_template').append(animalObj.toHtml());
  });
}
