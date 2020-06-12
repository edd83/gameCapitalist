import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import './MainFrame.css';
import axios, { AxiosResponse } from 'axios';
import { Business } from '../interface/business';

type PropsMainFrame = {
  func: () => void;
  money: number;
  img: string;
  business: Business;
  visit: () => void;
  visited: boolean;
};

type StateMainFrame = {
  wait: boolean;
  timer: number;
  percentage: number;
  inter: ReturnType<typeof setInterval>[];
  visited: boolean;
};

export class MainFrame extends React.Component<PropsMainFrame, StateMainFrame> {
  constructor(props: PropsMainFrame) {
    super(props);
    this.state = {
      wait: true,
      timer: 0,
      percentage: 100,
      inter: [],
      visited: false
    };
  }

  componentDidMount(): void {
    if (this.props.business && !this.props.visited) {
      this.state.inter.map((inter): void => clearInterval(inter));
      console.log('First time : ' + (Date.now() - this.props.business.time) + 'ms');
      if (this.props.business.managed) {
        setTimeout(() => {
          this.props.func();
          setInterval((): void => {
            this.props.func();
            this.startTimer();
          }, this.props.business.speed);
        }, Date.now() - this.props.business.time);
      }
      this.props.visit();
    }
  }

  // manage
  async buyManager(name: string): Promise<void> {
    const res: AxiosResponse<any> = await axios.post(`http://localhost:3001/v1/manage`, {'name': name});
    if (res.status === 201) {
      console.log(res.data);
      setInterval(() => {
        this.props.func();
        this.startTimer();
        console.log(res.data);
      }, res.data);
    }
    this.props.func();
  }

  // buy
  async buyBusiness(name: string): Promise<void> {
    const res: AxiosResponse<any> = await axios.post(`http://localhost:3001/v1/buy`, {'name': name, 'type': 'buyBusiness'});
    console.log('Buy business called and received : ' + res.data);
    this.props.func();
  }

  // buy
  async work(name: string): Promise<void> {
    const res: AxiosResponse<any> = await axios.post(`http://localhost:3001/v1/buy`, {'name': name});
    this.setState({wait: false});
    setTimeout(() => {
      this.props.func();
      this.setState({wait: true});
    }, res.data);
    this.startTimer();
  }

  //levelup
  async upgrade(name: string): Promise<void> {
    await axios.post(`http://localhost:3001/v1/levelup`, {'name': name});
    console.log('Upgraded business ' + name);
    this.props.func();
  }

  checkTimer(): void {
    if (this.state.timer <= 0 || this.state.percentage <= 0) {
      this.state.inter.map((elem) => clearInterval(elem));
      this.setState({inter: [], percentage: 100});
    }
  }

  startTimer(): void {
    this.setState({timer: this.props.business.speed});
    this.state.inter.push(setInterval(() => {
      this.setState({timer: this.state.timer - 500, percentage: ((this.state.timer-500)*100)/this.props.business.speed});
      this.checkTimer();
    }, 499));
  }


  render() {
    return (
      <div className='mainFrame'>
        <img alt={this.props.business.name} src={this.props.img}/>
        <div className='contentBusiness'>
          <div>
            <span className={this.props.business.active ? "dot dotGreen" : "dot dotRed"}></span>
            <span>{this.props.business.name}</span>
          </div>
          <div className='ProgressBarContainer'>
            <div className='ProgressBar'>
              <ProgressBar animated now={this.state.percentage} />
            </div>
            <span>Profit : {this.props.business.profit.toFixed(0)}$</span>
            <div>
              <button
                title={this.props.business.active ? 'Buy' : 'Not enough money'}
                className='buttonMainFrame'
                onClick={(): Promise<void> => this.props.business.active ? this.work(this.props.business.name) : this.buyBusiness(this.props.business.name)}
                disabled={this.props.business.managed || !this.state.wait || (!(this.props.money >= this.props.business.profit) && !this.props.business.active)}>
                {this.props.business.active ? 'Work' : 'Buy'}</button>
              <span>{!this.props.business.active && this.props.business.profit ? this.props.business.profit.toFixed(0) + '$' : (this.props.business.speed/1000).toFixed(0) + ' s'}</span>
            </div>
            <div>
              <button
                title='Manage'
                className='buttonMainFrame'
                onClick={() => this.buyManager(this.props.business.name)}
                disabled={!this.props.business.active || this.props.business.managed || !(this.props.money >= this.props.business.cost)}>Manage</button>
              <span>{this.props.business.cost.toFixed(0)}$</span>
            </div>
            <div>
              <button
              title='Upgrade the business'
              className='buttonMainFrame'
              onClick={() => this.upgrade(this.props.business.name)}
              disabled={!this.props.business.active || !(this.props.money >= this.props.business.profit)}>Upgrade</button>
              <span>{this.props.business.profit.toFixed(0)}$</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
