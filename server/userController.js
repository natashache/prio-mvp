var List=require('./listModel.js');

module.exports= {
  saveList: function(req,res,next) {
    console.log('request:',req.body);
    var list=req.body.list;
    var month=req.body.month;
    var year=req.body.year;
    var user=req.body.user;

    List.findOneAndUpdate({month:month,year:year,user:user},{list:list},{upsert:true,new:true},function(err,result) {
          if(err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            console.log('result:',result);
            res.status(200).send('all good');
          }
        });

      // .then(function(err,result) {
      //   if(result) {
      //     result.list=list;
      //     result.save(function(err) {
      //       if(err) {
      //         // console.error(err);
      //         res.status(500).send(err);
      //       } else {
      //         res.status(200).send('List updated');
      //       }
      //     });
      //   } else {
      //     var newList=new List({
      //       month:month,
      //       year:year,
      //       user:user,
      //       list:list
      //     });
      //     newList.save(function(err,result) {
      //       if(err) {
      //         console.error(err);
      //         res.status(500).send(err);
      //       } else {
      //         res.status(200).send('List saved');
      //       }
      //     })
      //   }
      // });
  }
}