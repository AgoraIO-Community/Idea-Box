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
    let g1 = _.groupBy(rows, 'c1');
  
    let l1_keys_JSON = _.map(g1, function (v, k) {
      
      let pcnt = 0;
      let g2 = _.groupBy(v, 'c2');
      
      return {
        "children": _.map(g2, function (vv, kk) {
          let r = {
            "value": vv.length,
            "name": kk,
            "label":{
              "fontSize": 16
            },
    
          }

          let g3 = _.groupBy(vv, 'c3');
          
          if (_.findKey(g3) != 'undefined') {
            pcnt = pcnt + _.keys(g3).length
            
            r.children = _.map(g3, function (vvv, kkk) {

              let hyperlink = kkk.split("｜");

              return {
                "value": 100,
                "name": `${hyperlink[0]}`,
                "link": hyperlink[1],
                "label":{
                  "fontSize": 16
                },
              }
            })
          }
          
          return r
        
        }),
        "value": v.length,
        "name": k,
        "label":{
          "formatter": `{b}\n场景：${_.keys(g2).length}\n产品：${pcnt}`,
          "fontSize": 14,
          "lineHeight": 16,
        },
        "tooltip ": {
          "formatter": `{b}\n场景：${_.keys(g2).length}\n产品：${pcnt}`,
        }
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