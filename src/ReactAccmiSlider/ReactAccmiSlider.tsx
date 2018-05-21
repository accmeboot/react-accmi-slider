import * as React from 'react';
import { RAsliderSettings, Touches } from '../../@types/base';
import * as cl from 'classnames';

import './ReactAccmiSLider.scss';

interface RAsliderProps extends RAsliderSettings {
  children: Array<JSX.Element>;
}

interface RAsliderstate extends RAsliderSettings {
  main: HTMLDivElement;
  wrapper: HTMLDivElement;
  position: number;
  maxPosition: number;
}

export default class RAslider extends React.Component<RAsliderProps, RAsliderstate> {
  main: HTMLDivElement;
  wrapper: HTMLDivElement;
  widthContainer: number;
  touches: Touches = {
    start: 0,
    end: 0,
    endDetect: false,
    current: 0
  };
  proc: number;

  state = {
    arrows: this.props.arrows !== undefined ? this.props.arrows : true,
    duration: this.props.duration !== undefined ? this.props.duration : 0.8,
    animation: this.props.animation !== undefined ? this.props.animation : 'ease',
    visibileItem: this.props.visibileItem !== undefined ? this.props.visibileItem : 1,
    arrowLeftClass: this.props.arrowLeftClass !== undefined ? this.props.arrowLeftClass : 'prev',
    arrowRightClass: this.props.arrowRightClass !== undefined ? this.props.arrowRightClass : 'next',
    offsetRight: this.props.offsetRight !== undefined ? this.props.offsetRight : 0,
    dots: this.props.dots !== undefined ? this.props.dots : true,
    beforeChange: this.props.beforeChange !== undefined ?
      (e) => this.props.beforeChange ? this.props.beforeChange(e) : null : () => null,
    infinity: this.props.infinity !== undefined ? this.props.infinity : false,
    typeChange: this.props.typeChange !== undefined ? this.props.typeChange : 'carousel',
    arrowLeftContent: this.props.arrowLeftContent !== undefined ? this.props.arrowLeftContent : <span>prev</span>,
    arrowRightContent: this.props.arrowRightContent !== undefined ? this.props.arrowRightContent : <span>next</span>,
    main: this.main,
    wrapper: this.wrapper,
    position: 0,
    maxPosition: 0
  };

  componentDidMount() {
    this.setState({
      main: this.main,
      wrapper: this.wrapper,
      maxPosition: this.wrapper.children.length - this.state.visibileItem,
    }, () => {
        this.state.wrapper.style.transition = `transform ${this.state.duration}s ${this.state.animation}`;

        this.widthContainer = this.state.main.getBoundingClientRect().width;
        this.touches = {
          start: 0,
          end: 0,
          endDetect: false,
          current: 0
        };

        if (this.state.visibileItem > 1) {
          [].forEach.call(this.state.wrapper.children, (element, index) => {
            element.style.flex = `0 0 ${(100 / this.state.visibileItem) - 5}%`;

            if (index === this.state.wrapper.children.length - 1) return;

            element.style.marginRight = `${this.state.offsetRight}%`;
          });
        }

        this.proc = this.state.visibileItem > 1 ? this.procInit() : 100;
        this.listners();
        this.state.wrapper.classList.add(this.state.typeChange);
    });
  }

  addDots(): void {}
  procInit(): number {
    const element = this.state.wrapper.children[0];
    const elementRec = element.getBoundingClientRect();
    const elementMarginRight = getComputedStyle(element).marginRight;
    const elementRight = elementMarginRight !== null ? elementMarginRight : '1';
    const elementWidth = elementRec.width + parseInt(elementRight);
    const wrapperWidth = this.state.wrapper.offsetWidth;

    return 100 / (wrapperWidth / elementWidth);
  }
  listners(): void {}

  nextSlide() {
    const newPostition = () => {
      if (this.state.infinity) {
        this.setState({
          position: this.state.position >= this.state.maxPosition ? 0 : ++this.state.position
        });

        return;
      }

      this.setState({
        position: this.state.position >= this.state.maxPosition ? this.state.position : ++this.state.position
      });
    };

    newPostition();

    const transform = () => {
      this.state.wrapper.style.transform = `translate3d(${-this.state.position * this.proc}%, 0, 0)`;
    };

    this.state.typeChange !== 'carousel' ? setTimeout(transform, (this.state.duration * 1000)) : transform();

    this.props.beforeChange ? this.props.beforeChange(this.state.position) : null;
  }

  prevSlide() {
      const newPostition = () => {
        if (this.state.infinity) {
          this.setState({
            position: this.state.position <= 0 ? 0 : --this.state.position
          });

          return;
        }

        this.setState({
          position: this.state.position <= 0 ? 0 : --this.state.position
        });
      };

      newPostition();

      const transform = () => {
        this.state.wrapper.style.transform = `translate3d(${-this.state.position * this.proc}%, 0, 0)`;
      };

      this.state.typeChange !== 'carousel' ? setTimeout(transform, (this.state.duration * 1000)) : transform();

      this.props.beforeChange ? this.props.beforeChange(this.state.position) : null;
  }

  touchStart(e) {
    this.touches.start = e.touches !== undefined ? e.touches[0].clientX : e.clientX;
    this.touches.endDetect = true;
    this.wrapper.style.transition = `transform 0s ${this.state.animation}`;
  }

  touchEnd(e) {
    this.scrollEnabled();

    const x = e.changedTouches !== undefined ? e.changedTouches[0].clientX : e.clientX;
    const proc = 100 / (this.widthContainer / (this.touches.start - x));

    this.wrapper.style.transition = `transform ${this.state.duration}s ${this.state.animation}`;
    this.touches.end = x;
    this.touches.endDetect = false;

    if (Math.abs(proc) > 20) {
      proc > 0 ? this.nextSlide() : this.prevSlide();
    } else {
      this.wrapper.style.transform = `translate3d(${(-this.state.position * this.proc)}%, 0, 0)`;
    }
  }

  touchMove(e) {
    if (this.touches.endDetect && this.state.typeChange === 'carousel') {
      const x = e.touches !== undefined ? e.touches[0].clientX : e.clientX;
      const proc = 100 / (this.widthContainer / (this.touches.start - x));

      if (Math.abs(proc) > 5) this.scrollDisable();

      this.touches.current = x;

      this.state.wrapper.style.transform = `translate3d(${(-this.state.position * this.proc) + (-proc)}%, 0, 0)`;
    }
  }

  dotsGoToSlide(index) {
    this.state.wrapper.style.transform = `translate3d(${-index * this.proc}%, 0, 0)`;

    this.setState({
      position: index
    });

    this.props.beforeChange ? this.props.beforeChange(index) : null;
  }

  scrollDisable() {
    document.ontouchmove = (e) => e.preventDefault();
  }

  scrollEnabled() {
    document.ontouchmove = (e) => true;
  }

  render() {
    const { children } = this.props;
    const {
      arrowLeftContent,
      arrowRightContent,
      arrowLeftClass,
      arrowRightClass,
      arrows,
      dots,
      position
     } = this.state;

    return (
      <div className='accmiSlider' ref={(ref: HTMLDivElement) => this.main = ref}>
        {
          arrows &&
          [
            <div key={0} className={cl('accmiSlider-arrowLeft', arrowLeftClass)} onClick={this.prevSlide.bind(this)}> { arrowLeftContent } </div>,
            <div key={1} className={cl('accmiSlider-arrowRight', arrowRightClass)} onClick={this.nextSlide.bind(this)}> { arrowRightContent } </div>
          ]
        }

        <div className={'accmiSlider-wrapper'} ref={(ref: HTMLDivElement) => this.wrapper = ref}>
          {
            children.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cl('accmiSlider-wrapper-item', item.props.className !== undefined && item.props.className)}
                  onTouchStart={this.touchStart.bind(this)}
                  onTouchEnd={this.touchEnd.bind(this)}
                  onTouchMove={this.touchMove.bind(this)}
                  onMouseDown={this.touchStart.bind(this)}
                  onMouseUp={this.touchEnd.bind(this)}
                  onMouseMove={this.touchMove.bind(this)}
                >
                  { item.props.children }
                </div>
              );
            })
          }
        </div>
        {
          dots &&
          <div className={'accmiSlider-dotsContainer'}>
            {
              children.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={cl('accmiSlider-dotsContainer-dot', {['active']: index === position})}
                    onClick={this.dotsGoToSlide.bind(this, index)}
                  />
                );
              })}
          </div>
        }
      </div>
    );
  }
}
