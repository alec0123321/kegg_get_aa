const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const fsPath = require('fs-path')


const url = 'http://www.genome.jp/dbget-bin/www_bget?-f+-n+a+'
let full_seq = ''
let file_name = process.argv[2]
let path = '../result/after_cluster/cluster_'+file_name+'/'

fs.readFile(path+'cluster_'+file_name+'.fa', (err,content)=>{
  if(err){
    console.log('File error')
  }else{
    const data = content.toString().split('\n')
    for(let i=0;i<data.length-1;i++){
        request(data[i].toString(), (err,res,body)=>{
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
          let write_path = path+'cluster_'+file_name+'_seq.fa'
          fsPath.writeFile(write_path, full_seq, (err)=>{
            if(err) throw err
            console.log('Full_seq.fa it\'s done');
          })
        })
    }
  }
})
