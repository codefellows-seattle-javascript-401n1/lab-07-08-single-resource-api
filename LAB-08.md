![cf](https://i.imgur.com/7v5ASc8.png) lab-08-single-resource-api (SIMPLE PERSISTANCE)
======

[![](https://img.shields.io/badge/Issues%3F-Ask%20for%20Help!-55cbe0.svg)](https://github.com/codefellows/seattle-javascript-401n1/issues/new)
[![Build Status](https://travis-ci.org/codefellows-seattle-javascript-401n1/lab-07-08-single-resource-api.svg?branch=master)](https://travis-ci.org/codefellows-seattle-javascript-401n1/lab-07-08-single-resource-api)

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas
  * also describe how long the assignment took you

# Resources
Here are some npm modules that you may find useful for this project, it is not required for you to use them.  
* [del](https://github.com/sindresorhus/del) - a npm module that makes deleting files easy
* [mkdirp](https://github.com/substack/node-mkdirp) - like `mkdir -p` but Node.js

# Directions
* Using the completed lab-07 assignment create a new branch for working on lab-08
* Add a **storage** module that will create an interface for saving and interacting with resources (stringified objects saved as json) in the filesystem
* Refactor your _simple-resource-name_ **routes** to use your new **storage** module to create, fetch, and delete resources

## Storage Module
* should have a property for setting a root directory for storing data
* should store data in sub-directories based on resource type, _e.g._ (_simple-resource-name_)
* should store data as stringified json in files named after the data's `id` property

## Tests
* You should test that your storage module can:
  * create and store new resources
  * fetch and delete resources by id

## Bonus
* **2pts** - have the **storage** module check for the type sub-directory, and create it if it does not exist
