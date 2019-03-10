import React from "react";
import App, { Container } from "next/app";
import StateProvider from "components/StateProvider";

class MyApp extends App {
  initialState = {
    agenda: {
      items: []
    }
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <StateProvider initialState={this.initialState}>
          <Component {...pageProps} />
        </StateProvider>
      </Container>
    );
  }
}

export default MyApp;
