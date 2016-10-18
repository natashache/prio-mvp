var List=require('./listModel.js');
var request=require('request');

var authCode='aWxvdmV3b3Jkc3dvcnRoQGdtYWlsLmNvbTpjaGUwNDIzODI=';
var options= {
  url: 'https://camilliatree.harvestapp.com/projects',
  headers: {
    Authorization: 'Basic '+authCode,
    ContentType: 'application/json',
    Accept: 'application/json'
  }
};
var clientId,projects,newProjects;

var handleHarvestData=function(data,updatedList) {
  clientId=data[0].project.client_id;
  projects=data.map(project=>project.project.name.toLowerCase());
  // console.log('client id:',clientId,'projects',projects);
  updatedList.forEach(item=>{
    if(!projects.includes(item)) {
      var data={
            project: {
              client_id: clientId,
              active: true,
              bill_by: 'none',
              name: item
            }
      };

      request.post({
        url: 'https://camilliatree.harvestapp.com/projects',
        headers: {
          Authorization: 'Basic '+authCode,
          ContentType: 'application/json',
          Accept: 'application/json'
        },
        form: data
      }, function(err,res,body) {
        if(err) console.error(err);
        else console.log(res.statusCode,res);
      });
    }
  })
};

var harvestRequest=function(list) {
  request(options,function(err,res,body) {
    var datafromH=JSON.parse(body);
    if(err) console.error(err);
    else {
      handleHarvestData(datafromH,list.map(list=>list.text));
    }
  })
};

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
            harvestRequest(result.list);
            res.status(200).send('all good');
          }
        });
  },

  getList: function(req,res) {
    console.log('request:',req.url);
    List.findOne({month:req.query.month,year:req.query.year,user:req.query.user})
    // List.find({})
        .exec(function(err,data) {
          if(err) {
            console.error(err);
            res.status(404).send('record not found');
            // next(err);
          } else {
            console.log('data:',data);
            res.status(200).send(data.list);
            // next();
          }
        })
  }
}