/**
 * Created by ngohungphuc on 01/04/2017.
 */
var notifier = require('node-notifier');

function errorNotification(err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url;

    notifier.notify({
        title: title,
        message: str
    })
}

module.exports = {
    errorNotification: errorNotification
}