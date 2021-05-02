import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
            <Head>
        <meta name="description" content="Win more games!"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>LOL Dodge Tool</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument