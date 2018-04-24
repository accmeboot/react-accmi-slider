import * as React from 'react';
import { RAsliderSettings } from '../../@types/base';
import { RAslider } from '../ReactAccmiSlider/ReactAccmiSlider';

interface AppContainerProps {}

export class AppContainer extends React.Component<AppContainerProps, {}> {
  settings: RAsliderSettings = {
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
    arrowLeftContent: '',
    arrowRightContent: ''
  };

  render() {
    return (
      <RAslider {...this.settings}>
        <div><img src='./images/1.jpg' alt='' /></div>
        <div><img src='./images/2.jpg' alt='' /></div>
        <div><img src='./images/3.jpg' alt='' /></div>
        <div><img src='./images/1.jpg' alt='' /></div>
        <div><img src='./images/2.jpg' alt='' /></div>
        <div><img src='./images/1.jpg' alt='' /></div>
        <div><img src='./images/2.jpg' alt='' /></div>
        <div><img src='./images/3.jpg' alt='' /></div>
        <div><img src='./images/1.jpg' alt='' /></div>
        <div><img src='./images/2.jpg' alt='' /></div>
      </RAslider>
    );
  }
}
