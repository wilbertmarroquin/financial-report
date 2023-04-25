## Financial Report (Interview Project)

Simple financial report table to show and edit financial information.
Project according document description.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `yarn` installed globally on your machine, in terminal:

Installation:

`yarn`

Run Mock Data Server in one terminal:

`yarn mock-server`

Run App in other terminal:

`yarn dev`

To Visit App:

`http://localhost:5173/`

## API

Common format of a balance response:

```
{
  commonBalanceResponse: {
    "id": id,
    "type": string,
    "values": [
      {
        "id": number,
        "date": Date,
        "value": number-decimal
      }
    ]
  }
}
```

Common format of a transaction response:

```
{
  transactionResponse: {
    "id": id,
    "date": Date,
    "value": number-decimal,
    "title": string,
    "description": string,
    "typeId": number-option
  }
}

```

Routes mapped to the `json-server` library and used to get data:

```
{
  "/api/v1/*": "Base Route",
  "/bank/balance": {
    request-method: 'GET',
    expected-response: {
      "id": id,
      "bankName": string,
      "balance": [
        {
          "id": id,
          "date": Date,
          "value": number-decimal
        }
      ]
    },
  },
  "/income/balance": {
    request-method: 'GET',
    expected-response: List<commonBalanceResponse>,
  },
  "/cost/balance": {
    request-method: 'GET',
    expected-response: List<commonBalanceResponse>,
  },
  "/expense/balance": {
    request-method: 'GET',
    expected-response: List<commonBalanceResponse>,
  },
  "/bank/transaction": {
    request-method: 'GET',
    expected-response: List<transactionResponse>,
  },
  "/bank/transaction?date=:date&bankId=:bankId": {
    request-method: 'GET',
    expected-response: List<transactionResponse>,
  },
  "/income/transaction": {
    request-method: 'GET',
    expected-response: List<transactionResponse>,
  },
  "/income/transaction?date=:date&typeId=:typeId": {
    request-method: 'GET',
    expected-response: List<transactionResponse>,
  },
  "/cost/transaction": {
    request-method: 'GET',
    expected-response: List<transactionResponse>,
  },
  "/cost/transaction?date=:date&typeId=:typeId": {
    request-method: 'GET',
    expected-response: List<transactionResponse>,
  },
  "/expense/transaction": {
    request-method: 'GET',
    expected-response: List<transactionResponse>,
  },
  "/expense/transaction?date=:date&typeId=:typeId": {
    request-method: 'GET',
    expected-response: List<transactionResponse>,
  }
}
```
In an ideal case, the API should be able to receive one of these:

```
{
  "/[type]/transaction/[transactionId]": {
    request-method: 'PUT',
    dat-payload: {
      "typeId": [new type id]
    }
  },
  "/[type]/transaction/[transactionId]": {
    request-method: 'POST' (in some cases some backends support update with a POST),
    dat-payload: {
      "typeId": [new type id]
    }
  },
}
```

The rest of the reassignment and recalculation should be done by the backend unless you want to handle caching on the frontend.

**NOTE: The category reassignment cases are manually handled in the frontend `(\src\features\financial-report\index.tsx function sendDataMockProcessByType)` by emulating what the backend should do. In any case, the previous route is not used, and it would be ideal to use it if a backend already existed.**

## Technologies Used

- Typescript
  - I believe that using Typescript in any React project is always a good idea as it helps us maintain consistent and organized code. Using pure `Javascript` can be more flexible, but when it comes to larger projects, `Typescript` can be very helpful in terms of maintainability.
- Vite (build tool)
  - Since the project is a single view app, I think using React in a normal way is the best approach. The [React docs](https://react.dev/) advise us not to use `CRA (create-react-app)` anymore but to use NextJS. However, since the project does not require routing or other benefits of this framework, I have opted to use Vite as it is widely suggested by the community to replace `CRA`.
  - It is worth mentioning that in terms of performance, `Vite` has been shown to be better than `CRA`.
- Ant Design (components)
  - `Ant Design` has a wide variety of components ready for use, and in this case, we are interested in its `Table` component as it is easy to use and highly configurable.
  - I also chose it because it is the component library that I have used the most. Libraries such as `MaterialUI` or `Bootstrap` were also considered, but these would usually be more suitable for a larger project.
- dndkit (Drag and Drop)
  - To use drag and drop, this library has what we need, and it is also quite simple to use.
  - An extra piece of information is that it is quite compatible with `Ant Design`.
- Sass (CSS)
  - I preferred to keep the styles as simple as possible since the application is small, so I chose `Sass` over other alternatives such as `Tailwind` or `Styled Components`.
  - `Tailwind` is a popular option for projects these days, but this would result in JSX files with heavier styles, and I don't think it's worth it for a simple view project.
- Eslint(Airbnb rules) & Prettier
  - To ensure that we have well-organized code, these tools are the most common and have more documentation, and when combined with the fact that we are using `Typescript`, they help us have consistent and maintainable code.
- Axios (Request)
  - Simple library for handling requests.
  - This could be improved by also using `react-query` for cache management and request modularization.
  - In the case of GraphQL, I would recommend using `Apollo` since it basically combines axios and `react-query` for GraphQL.
- json-server
  - Since we worked with test data, this library allows us to create a simple API server to make data queries. **NOTE: The data in the table was randomly generated.**

## Approach and Assumptions

For this project, some assumptions were made since certain cases were not considered in the information document:

- API
  - The API will always return data between two static dates.
  - The API will fill in months that do not have any data to simplify mapping the table data.
  - Data such as Cost of Goods and Expenses will always be negative to avoid inconsistencies when performing calculations.
- Comments
  - For operations involving data, a library for precise calculations should be used since there are situations where calculations made with pure Javascript can produce incorrect results, some suggestions are `bignumber.js` (for financials) or `decimal.js` (for scientific data).
  - For formatting dates, a library such as moment.js can be used.
    The currency used is the US Dollar to maintain a common format for displaying amounts.
- Added
  - Highlight the selected category in drag and drop.
  - Simplification of the site for the purpose of the test.
  - Restriction on reassignment of categories, it is not possible to assign a category to a transaction that is of a different type.
- Problems
  - Since there were situations of data transfer between components, I had to use a simple context to share that data.
  - There are several aspects of feedback to the customer that could be added, but I was not able to include them.
  - Due to time constraints, there is some untyped code.
