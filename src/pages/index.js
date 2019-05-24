import React from "react"
import { Component } from "react"

import SEO from "../components/seo"
import MadeWithLove from "../components/MadeWithLove"
import TimeAgo from 'react-timeago'

import "../components/index.css"

import CoinGecko from "coingecko-api"

const CoinGeckoClient = new CoinGecko()

class IndexPage extends Component {
  componentDidMount() {
    this.fetchPrice()
    this.interval = setInterval(() => this.fetchPrice(), 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  state = {
    data: undefined,
  }

  render() {
    return (
      <main>
        <SEO title="Ethereum Price" />
        <div className="App">
          <div className="App-content">
          <h2 className="header">Ethereum</h2>
            {!this.state.data ? (
              <h1 className="loading">Loading</h1>
            ) : (
              <>
                <h1 className="price">${this.state.data.usd.toFixed(2)}</h1>
                <h2 style={{ color : (this.state.data.usd_24h_change > 0 ? "#44be24" : "#ef4f1b")}}>
                  {this.state.data.usd_24h_change > 0 ? "+" : ""}
                  {this.state.data.usd_24h_change.toFixed(3)}%
                </h2>
                <div className="last-updated">
                Last updated: <TimeAgo date={this.state.data.last_updated_at*1000} />
                </div>
              </>
            )}
            
            <MadeWithLove
              by="Frederik Bolding"
              link="https://frederikbolding.com"
            />
          </div>
        </div>
      </main>
    )
  }

  fetchPrice = async () => {
    let data = await CoinGeckoClient.simple.price({
      ids: ["ethereum"],
      vs_currencies: ["eur", "usd"],
      include_24hr_change: true,
      include_last_updated_at: true,
    })
    this.setState({ data: data.data.ethereum })
  }
}

export default IndexPage
