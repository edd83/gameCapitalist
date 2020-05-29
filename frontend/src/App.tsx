import React, { useEffect } from 'react';
import './App.css';
import { MainFrame } from './Components/MainFrame';
import pizzatruck from './Components/pizzaTruck.svg'
import busTour from './Components/busTour.svg'
import asiaRestaurant from './Components/asiaRestaurant.svg'
import realEstate from './Components/realEstate.svg'
import gameCompany from './Components/gameCompany.svg'
import axios from 'axios';
import { Business } from './interface/business';
import { GameType } from './interface/gametype';

type StateApp = {
  data: GameType;
  intervals: ReturnType<typeof setTimeout>[];
}

const img = [
  { src: pizzatruck },
  { src: busTour },
  { src: asiaRestaurant },
  { src: realEstate },
  { src: gameCompany }
];

export class App extends React.Component<{}, StateApp> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {} as GameType,
      intervals: []
    };
    this.update = this.update.bind(this);
  }

  async update(): Promise<void> {
    const data = await axios.get(`http://localhost:3001/v1/update`);
    this.setState({data: data.data});
  }

  async componentWillMount(): Promise<void> {
    this.update();
  }

  async componentDidUpdate(): Promise<void> {
    this.state.intervals.map((inter): void => clearInterval(inter));
    this.state.data.businesses.map((biz: Business): void => {
      if (biz.managed) {
        const inter = setInterval(() => this.update(), biz.speed);
        this.state.intervals.push(inter);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Cash: {this.state.data && this.state.data.money && this.state.data.money.toFixed(0)}$</h1>
        {this.state.data && this.state.data.businesses && this.state.data.businesses.map((elem: Business, i: number) => {
          return <MainFrame key={i} money={this.state.data.money} img={img[i].src} func={this.update} business={elem}/>
        })}
      </div>
    );
  }
}