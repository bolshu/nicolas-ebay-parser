# NICOLAS EBAY PARSER

## How to

### Before you start

#### Install global dependencies

- node v17.6.0
- npm 8.5.1

#### Install project dependencies

Just run command

```
npm install
```

### Parsing

#### Configuration

Add urls for parsing in `index.js`.

##### Example:
```
const URLS = {
    key: value,
};
```

Where `key` is name of filter. It will be in first column in table.

`value` is url with many params.

You will have something like this:
```
const URLS = {
    macBook2019: 'https://www.ebay.com/sch/i.html?_from=R40&_nkw=macbook+pro+13+2019&_sacat=0&LH_TitleDesc=0&LH_BIN=1&_sop=15&LH_ItemCondition=4%7C3&RAM%2520Size=16%2520GB&rt=nc&Hard%2520Drive%2520Capacity=500%252D749%2520GB%7C1%2520TB%7C1%252D2%2520TB&_dcat=111422',
    macBook2020: 'https://www.ebay.com/sch/i.html?_from=R40&_nkw=macbook+pro+13+2020&_sacat=0&LH_TitleDesc=0&LH_BIN=1&_sop=15&LH_ItemCondition=4%7C3&RAM%2520Size=16%2520GB&rt=nc&Hard%2520Drive%2520Capacity=500%252D749%2520GB%7C1%2520TB%7C1%252D2%2520TB&_dcat=111422',
};
```

#### Run parsing

Just run command

```
npm run start
```

Then you can find csv-file with current date as filename.
