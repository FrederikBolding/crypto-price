import React from "react"
import { Component } from "react"

import SEO from "../components/seo"
import MadeWithLove from "../components/MadeWithLove"

import "../components/index.css"

import CoinGecko from "coingecko-api"

const CoinGeckoClient = new CoinGecko()

class IndexPage extends Component {
  componentDidMount() {
    this.fetchPrice()
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
            {!this.state.data ? (
              <h1>Loading</h1>
            ) : (
              <>
                <h1>${this.state.data.data.ethereum.usd}</h1>
                <h2 style={{ color : (this.state.data.data.ethereum.usd_24h_change > 0 ? "#44be24" : "#ef4f1b")}}>
                  {this.state.data.data.ethereum.usd_24h_change > 0 ? "+" : ""}
                  {this.state.data.data.ethereum.usd_24h_change.toFixed(3)}%
                </h2>
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
    })
    this.setState({ data: data })
  }
}

export default IndexPage
