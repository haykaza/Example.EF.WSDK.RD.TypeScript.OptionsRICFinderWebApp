export { };
const moment = require('moment');
const getPrices = require('../APIRequests/getHistPrices');


async function checkRICs(ric: string, maturity: string, ident: any, session: any) {
    let expDate = moment(new Date(maturity)).format('YYYY-MM-DD');;
    let sDate = moment().subtract(90, 'days').format('YYYY-MM-DD')
    let eDate = moment().format('YYYY-MM-DD');
    let prices = {};
    if (expDate < moment().format('YYYY-MM-DD')) {
        ric = `${ric}^${ident[moment(expDate).format('M')].exp}${moment(expDate).format('Y').slice(-2)}`
        sDate = moment(expDate).subtract(90, 'days').format('YYYY-MM-DD')
        eDate = moment(expDate).format('YYYY-MM-DD')
    }
    if (ric.split('.')[1].charAt(0) === 'U') {
        prices = await getPrices(ric, sDate, eDate, session);
    }
    else {
        const fields = ['BID', 'ASK', 'TRDPRC_1', 'SETTLE']
        prices = await getPrices(ric, sDate, eDate, session, fields);
    }
    return [ric, prices]

};

module.exports = checkRICs;