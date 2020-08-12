const fs = require('fs');

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1;
    } else {
        return 1
    }
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            throw new Error(err);
        }
    })
}

module.exports = {
    getNewId,
    writeJSONFile
}