# react-accmi-slider

## Carousel with react

##### Carousel with react, mobile touch and desktop click.

## Package Managers

```npm
npm i react-accmi-slider
```

## Example
```jsx

import 'react-accmi-slider/css/app.css';
import RAslider from 'react-accmi-slider';

  settings = {
    arrows: true,
    duration: 0.8,
    animation: 'ease',
    visibileItem: 1,
    arrowLeftClass: 'prev',
    arrowRightClass: 'next',
    offsetRight: 0,
    dots: true,
    beforeChange: (e) => console.log(e),
    infinity: false,
    typeChange: 'carousel',
    arrowLeftContent: <span className='asd'>prev</span>,
    arrowRightContent: <span className='asd'>next</span>
  };

  <RAslider {...this.settings}>
    <div className='item'><img src='./images/1.jpg' alt='' /></div>
    <div className='item'><img src='./images/2.jpg' alt='' /></div>
    <div className='item'><img src='./images/3.jpg' alt='' /></div>
    <div className='item'><img src='./images/1.jpg' alt='' /></div>
    <div className='item'><img src='./images/2.jpg' alt='' /></div>
    <div className='item'><img src='./images/1.jpg' alt='' /></div>
    <div className='item'><img src='./images/2.jpg' alt='' /></div>
    <div className='item'><img src='./images/3.jpg' alt='' /></div>
    <div className='item'><img src='./images/1.jpg' alt='' /></div>
    <div className='item'><img src='./images/2.jpg' alt='' /></div>
  </RAslider>
```

![GitHub Logo](./src/images/gameplay.gif)


### Settings

Option          | Type    | Default  | Description
--------------- | --------| -------- | --------------
arrows          | boolean | true     | enable arrows
duration        | number  | 0.8      | transition-duration 
animation       | string  | ease     | animation-timing-function
visibileItem    | number  | 1        | count visible elements
arrowLeftClass  | string  | prev     | 
arrowRightClass | string  | next     |
arrowLeftContent| string  | <span>prev</span> | content from arrow container
arrowRightContent| string  | <span>next</span> | content from arrow container
offsetRight     | number  | 0        | padding-right in % for element
dots            | boolean | true     | enable dots (pagination)
beforeChange    | void    | ()=>null | callback before sliding
infinity        | boolean | false    | infinity sliding


### Methods

Method             | Description
------------------ | --------------
nextSlide          | 
prevSlide          | 
goToSlide(index)   | index = number slide

## Development

```sh
npm run dev
```


#### License
Copyright (c) 2018 Vjalov Mikhail

Licensed under the MIT license.