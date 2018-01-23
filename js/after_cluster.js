const fs = require('fs')
const fsPath = require('fs-path')
const rl = require('readline')
const request = require('request')
const cheerio = require('cheerio')


let c_key = []
let seq_list = []

const url = 'http://www.genome.jp/dbget-bin/www_bget?-f+-n+a+'

const prompts = rl.createInterface(process.stdin, process.stdout)
prompts.question("Need the file name from result/uc/ \n", (name)=>{
  if(name.length === 0){
    console.log("You need file name")
  }else{
    fs.readFile('../result/uc/'+name, (err,content)=>{
      if(err){
        console.log('File error')
      }else{
        const data = content.toString().split('\n')
        let datas = []
        for(let i=0;i<data.length;i++){
          datas.push(
            data[i]
              .toString()
              .split('\t')
          )
          // console.log(datas[i][0]);
          if(datas[i][0] == 'C'){
            c_key.push(datas[i][8])
            // seq_list[i] = new Array()
          }
        }//for
        // console.log(c_key);
        for(let a=0;a<c_key.length-1;a++){
          seq_list[a] = new Array()
          for(let i=0;i<data.length;i++){
            datas.push(
              data[i]
                .toString()
                .split('\t')
            )
            if(datas[i][9] == c_key[a]){
              seq_list[a].push(
                url +
                datas[i][8]
                  .toString()
              )
          }
        }

      }//for
      // console.log(seq_list);
      //finish list

      for(let i=0;i<seq_list.length;i++){
        let path = `/Users/ac/Documents/TMRNAseq_v2/result/after_cluster/cluster_${i}/cluster_${i}.fa`
        let full_data_url = ''
        seq_list[i].forEach((data)=>{
          // console.log(data.toString());
          full_data_url = full_data_url + data + '\n'
        })
        fsPath.writeFile(path, full_data_url, (err)=>{
          if(err) throw err
          console.log('cluster sequence it\'s done');
        })
      }//for
    }
    })//fs
    // process.exit()
  }
} )
