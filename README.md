---
__Get gene sequence and clustering from KEGG__  

__Author: Alec Wang__  

__Date: 2018.01.22__  

__version: 2.0__  
---
- require install __[vsearch](https://github.com/torognes/vsearch)__ - clustering tool

---
### folder structure
| js | sample |
|:----:|:------:|
|get_seq.js|f_gene_list.txt|
|vsearch.js||
|after_cluster.js||
|11_get_cluster_seq.js||

### after folder structure
| js | sample | result |
|:----:|:------:|:------:|
|get_seq.js|f_gene_list.txt|after_cluster(folder)|
|vsearch.js||your_gene_list.txt|alignment(folder)|
|after_cluster.js||cluster(folder)|
|11_get_cluster_seq.js||otu_table(folder)|
|||uc(folder)|
|||full_seq.fa|



## get_seq.js
> generate
>> seq_list/full_seq.fa

## vsearch.js
> ask for naming file name for result file
> do clustering
> generate
>> result/alignment
>> result/cluster
>> result/otu_table
>> result/uc
>>> all file name are your naming file name
>>> in alignment and cluster file are .fa
>>> in otu_table and uc file are .txt

## after_cluster.js
> ask for file name from result/uc
> generate
>> result/after_cluster
>>> cluster_*/cluster_*.fa
>>>> it's after cluster's sequence list in individual field
>>>>> after_cluster_2.js, after_cluster_3.js are testing file

## 1_get_cluster_seq.js
> require 1 parameter
>> for example 1_get_cluster_seq.js 0
>>> it will do the work from result/after_cluster/cluster_0/cluster_0.fa
>>>> generate
>>>>> result/after_cluster/cluster_0/cluster_0_seq.fa
