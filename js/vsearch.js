const fs = require('fs')
const spawn = require('child_process').spawn
const fsPath = require('fs-path')
const rl = require('readline')

//example for spawan
// const ls = spawn('ls', ['-lh', process.argv[2]])
//
// ls.stdout.on('data', (data)=>{
//   console.log(`輸出: ${data}`)
// })
// ls.stderr.on('data',(data)=>{
//   console.log(`錯誤: ${data}`)
// })
// ls.on('close',(code)=>{
//   console.log(`子進程退出碼: ${code}`);
// })

//make result folder
let path = [
  '/Users/ac/Documents/TMRNAseq_v2/result/cluster',
  '/Users/ac/Documents/TMRNAseq_v2/result/alignment',
  '/Users/ac/Documents/TMRNAseq_v2/result/otu_table',
  '/Users/ac/Documents/TMRNAseq_v2/result/uc'
]
path.forEach((pa)=>{
  fsPath.mkdir(pa)
})

//question ask for new file name
const prompts = rl.createInterface(process.stdin, process.stdout)
prompts.question("Name of output file name, will using on cluster, alignment, otu_table and uc files name \n",(name)=>{
  if (name.length === 0){
    console.log("you need name it !!!")
  }else{
    //vesearch make cluster file, alignment file, otu_table, uc file for catch clustering classification
    const vsearch = spawn('vsearch',
     ['--cluster_size','/Users/ac/Documents/TMRNAseq_v2/result/full_aa.fa',
     '--consout',`/Users/ac/Documents/TMRNAseq_v2/result/cluster/${name}.fa`,
     '--msaout',`/Users/ac/Documents/TMRNAseq_v2/result/alignment/${name}.fa`,
     '--otutabout',`/Users/ac/Documents/TMRNAseq_v2/result/otu_table/${name}.txt`,
     '--uc',`/Users/ac/Documents/TMRNAseq_v2/result/uc/${name}.txt`,
     '--id','0.5',
     '--clusterout_id',
     '--clusterout_sort'])

    vsearch.stdout.on('data',(data)=>{
      console.log(`processing vsearch clustering ${data}`)
    })
    vsearch.stderr.on('datas',(datas)=>{
      console.log(`error: ${datas}`);
    })
    vsearch.on('close',(code)=>{
      console.log(`exit code: ${code} ${name} it\'s finish`);
    })
    process.exit()
  }
})
