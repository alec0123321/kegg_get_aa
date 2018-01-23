const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const fsPath = require('fs-path')

const url = 'http://www.genome.jp/dbget-bin/www_bget?-f+-n+a+'
let full_seq = ''

fs.readFile('../sample/gene_list.txt', (err,content)=>{
  if(err){
    console.log('File error')
  }else{
    const data = content.toString().split('\n')
    let datas_url =''
    for(let i=0;i<data.length-1;i++){
      data[i] = data[i].toLowerCase()
      datas_url = url+data[i]+data[i+1]
      if((i%2)==0){
        request(datas_url, (err,res,body)=>{
          const $ = cheerio.load(body)
          let seq = []
          $('div pre').each(function(i,elem){
            seq.push(
              $(this)
                .text()
                .split('\n')
            )
          })
          let len = seq[0]
          let lens = len.length
          // console.log(lens);
          for(let i=0;i<lens;i++){
            full_seq = full_seq + len[i] + '\n'
          }
          // console.log(full_seq);
          let path = '../result/full_aa.fa'
          fsPath.writeFile(path, full_seq, (err)=>{
            if(err) throw err
            console.log('Full_seq.fa it\'s done');
          })
        })
      }
    }
  }
})
