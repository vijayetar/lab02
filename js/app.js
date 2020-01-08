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
      new Animal(value);
    })
  });

console.log('animals',animals);
