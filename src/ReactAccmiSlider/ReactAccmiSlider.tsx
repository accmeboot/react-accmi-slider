import * as React from 'react';
import { RAsliderSettings } from '../../@types/base';

import * as Styles from './ReactAccmiSlider.scss';

interface RAsliderProps extends RAsliderSettings {
  children?: object;
}

interface RAsliderstate extends RAsliderSettings {
  main: HTMLDivElement;
  wrapper: HTMLDivElement;
  position: number;
  maxPosition: number;
}

export class RAslider extends React.Component<RAsliderProps, RAsliderstate> {
  main: HTMLDivElement;
  wrapper: HTMLDivElement;

  state = {
    arrows: this.props.arrows !== undefined ? this.props.arrows : true,
    duration: this.props.duration !== undefined ? this.props.duration : 0.8,
    animation: this.props.animation !== undefined ? this.props.animation : 'ease',
    visibileItem: this.props.visibileItem !== undefined ? this.props.visibileItem : 1,
    arrowLeftClass: this.props.arrowLeftClass !== undefined ? this.props.arrowLeftClass : 'prev',
    arrowRightClass: this.props.arrowRightClass !== undefined ? this.props.arrowRightClass : 'next',
    offsetRight: this.props.offsetRight !== undefined ? this.props.offsetRight : 0,
    dots: this.props.dots !== undefined ? this.props.dots : true,
    // beforeChange: this.props.beforeChange !== undefined ? (e) => this.props.beforeChange(e) : () => null,
    infinity: this.props.infinity !== undefined ? this.props.infinity : false,
    typeChange: this.props.typeChange !== undefined ? this.props.typeChange : 'carousel',
    arrowLeftContent: this.props.arrowLeftContent !== undefined ? this.props.arrowLeftContent : '<span>prev</span>',
    arrowRightContent: this.props.arrowRightContent !== undefined ? this.props.arrowRightContent : '<span>next</span>',
    main: this.main,
    wrapper: this.wrapper,
    position: 0,
    maxPosition: 0
  };

  componentDidMount() {
    this.setState({
      maxPosition: this.wrapper.children.length - this.state.visibileItem,
    });
  }

  render() {
    const { children } = this.props;

    console.log(children);

    return (
      <div className={Styles.accmiSlider} ref={(ref: HTMLDivElement) => this.main = ref}>
        <div className={Styles.wrapper} ref={(ref: HTMLDivElement) => this.wrapper = ref}>
          { children }
        </div>
      </div>
    );
  }
}
