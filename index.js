const fs = require('fs');
const rp = require('request-promise');
const parser = require('ebay-parser');

const URLS = {
    macBook2019: 'https://www.ebay.com/sch/i.html?_from=R40&_nkw=macbook+pro+13+2019&_sacat=0&LH_TitleDesc=0&LH_BIN=1&_sop=15&LH_ItemCondition=4%7C3&RAM%2520Size=16%2520GB&rt=nc&Hard%2520Drive%2520Capacity=500%252D749%2520GB%7C1%2520TB%7C1%252D2%2520TB&_dcat=111422',
    macBook2020: 'https://www.ebay.com/sch/i.html?_from=R40&_nkw=macbook+pro+13+2020&_sacat=0&LH_TitleDesc=0&LH_BIN=1&_sop=15&LH_ItemCondition=4%7C3&RAM%2520Size=16%2520GB&rt=nc&Hard%2520Drive%2520Capacity=500%252D749%2520GB%7C1%2520TB%7C1%252D2%2520TB&_dcat=111422',
};

const COUNT_OF_ADS = 10;

const ERROR_MESSAGE = 'The "data to append" was appended to file!';

const getFileName = () => {
    const date = new Date();

    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.csv`;
};

const createFileWithHeader = () => {
    const csvHeader = "Key,min,max,mid\r\n";

    fs.appendFile(getFileName(), csvHeader, function (err) {
        if (err) throw err;
        console.log(ERROR_MESSAGE);
    });
};

const appendFile = (string) => {
    fs.appendFile(getFileName(), string, function (err) {
        if (err) throw err;
        console.log(ERROR_MESSAGE);
    });
};

const getItems = async () => {
    Object.entries(URLS).forEach(([key, value]) => {
        rp(value)
            .then((html) => {
                const items = parser.parse_items(html);
                const itemsWithPrices = items.filter(({ price }) => String(price) !== "NaN");
                const firstAdsByCount = itemsWithPrices.filter((_, index) => index < COUNT_OF_ADS);
                const firstAdsByCountPrices = firstAdsByCount.map(({ price }) => price);
                const min = Math.min(...firstAdsByCountPrices);
                const max = Math.max(...firstAdsByCountPrices);
                const mid = (firstAdsByCount.reduce((acc, item) => {
                    return acc + item.price;
                }, 0) / firstAdsByCount.length);

                appendFile(`${key},${min},${max},${mid}\r\n`);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });
};

const start = async () => {
    createFileWithHeader();
    getItems();
};

start();
