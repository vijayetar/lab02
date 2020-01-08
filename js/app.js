'use strict';
console.log("hello world");

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
      new Animal(value).render();
    })
  });

// console.log('animals',animals);

// render images
Animal.prototype.render = function () {
  const imageTemplate = $('#image_template').html();
  const $newSection = $('<section></section>');
  $newSection.html(imageTemplate);
  $newSection.find('img').attr('src',this.image_url);
  $('main').append($newSection);
};
