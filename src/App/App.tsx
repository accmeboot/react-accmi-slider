import * as React from 'react';
import { RAsliderSettings } from '../../@types/base';

import '../../dist/css/app.css';
import RAslider from '../ReactAccmiSlider/ReactAccmiSlider';

interface AppContainerProps {}

export class AppContainer extends React.Component<AppContainerProps, {}> {

  componentDidMount() {
    this.slider.dotsGoToSlide(5);
  }

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
    arrowLeftContent: <span className='asd'>prev</span>,
    arrowRightContent: <span className='asd'>next</span>
  };

  slider: any;

  render() {
    return (
      <RAslider ref={ref => this.slider = ref} {...this.settings}>
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
    );
  }
}
