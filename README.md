![gif_demo](https://user-images.githubusercontent.com/20524533/141077610-06f8e38c-2973-42b9-99a7-219977a22c28.gif)

# Day Trader Tools

This was a side-project that I created in order to address crucial profitability issues in discretionary trading - when to take partials and at what return factor. The gif above shows the fully working example, though the project was never launched due to other commitments

Partialling in trading (aka partial profit taking) is the act of partially closing a trade in order to capture profits, whilst still holding some shares in case the trade moves further in the trade's favour. 

The issue with partialling is that, like all of discretionary trading, the trader's emotions play a huge role in the effectiveness of the strategy. Fear and greed are the two dominant emotions in the market, and they are the most influential factor when it comes to trade management.

In an attempt to mechanise the process and remove the emotional component from trading in the hope of increasing profitability, I created Day Trader Tools. This was a project that aimed to tackle the most important variable in any trading strategy, profitability, with a light hearted approach. To this end, I created a 'vending machine' that took advantage of animations [Framer Motion](https://www.framer.com/motion/) in order to make the interactions visually appealing. Users would input their statistics, and my optimisation algorithm would provide them with the most favourable partialling strategy.

Users would provide their return factors matched to their probabilities (easily calculated from trade statistics) and purchase a token. The payment of the token was managed using Stripe, and so an [AWS Lambda](https://github.com/ph0ph0/DayTraderTools/tree/master/lambdas/StripePaymentLambda) was necessary to utilise Stipe's service. On pulling the lever on the vending machine, the data would be sent to a series of AWS lambdas via API Gateway. The first Lambda was the request receiver, a NodeJS function that would immediately return a status 200 to the app. This lambda would create a new 'processing' status input in a DynamoDB table and then pass on the data to the ['PartialOptimiserLambda'](https://github.com/ph0ph0/DayTraderTools/tree/master/lambdas/PartialOptimiserLambda). This is a lambda written in Python that would run the optimisation calculation. Python as chosen over NodeJS for the wealth of mathematical packages available. Whilst this python lambda was running in the cloud, the front end would poll the DynamoDB table via API Gateway and a NodeJS Lambda. Once the python lambda had finished it's calculation, it would update the DynamoDB table with a status 'complete' and provide the optimisation results. The polling lambda would then return these to the front end, and they would be displayed in the 'results bucket'.

The platform was monetised such that each token would cost $4.99. The aim was, to some extent, to 'gamify' the interaction, and to take advantage of a throughput-based strategy over a subscription-based strategy.

#### NextJS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
