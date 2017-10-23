var devtool=require('../index')
var ip=require('ip')
devtool.start('',{ip:ip.address(),port:'8088'})