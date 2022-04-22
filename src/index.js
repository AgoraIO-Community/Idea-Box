const fs = require('fs')
const _ = require('lodash');
const readXlsxFile = require('read-excel-file/node')

const json_file_path = "../data/s.xlsx"

const schema = {
  'C1': {
    prop: 'c1',
    type: String
  },
  'C2': {
    prop: 'c2',
    type: String
  },
  'C3': {
    prop: 'c3',
    type: String
  }
}

readXlsxFile(json_file_path, { schema }).then(({ rows, errors }) => {
  try {
    rows = _.groupBy(rows, 'c1');

    let l1_keys_JSON = _.map(rows, function (v, k) {
      return {
        "value": Math.random() * 100,
        "name": k,
        "path": k,
        "children": _.map(v, function (vv, kk) {
          return {
            "value": Math.random() * 100,
            "name": vv.c2,
            "path": `${k}/${vv.c2}`,
          }
        })
      }
    })

    // format end, write new json data to file.
    fs.writeFile('../data/r.json', JSON.stringify(l1_keys_JSON), function (error) {
      console.log('wrote done!');
    })

  } catch (error) {
    throw (error)
  }
})