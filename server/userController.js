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
var clientId, projects, newProjects, priorityList;

var tabulateTime=function(dayEntry) {
  var result=[],resultObj;
  var tabbed=dayEntry.day_entries.reduce(function(tab,entry) {
    if(tab[entry.project]===undefined) tab[entry.project]=entry.hours;
    else tab[entry.project]+=entry.hours;
    return tab;
  },{});
  for(var key in tabbed) {
    result.push({text:key,hours:tabbed[key]});
  };
  result.sort(function(a,b){
    return a.hours-b.hours;
  });
  resultObj=result.reduce(function(obj,entry,i) {
    obj[entry.text]=i+1;
    return obj;
  },{});
  console.log('tabbled:',resultObj);
  return [result,resultObj];
};

var lastWeek=function() {
  var result=Array(7).fill(0);
  var oneDay = 24*60*60*1000;
  var today=new Date();
  var year=today.getFullYear();
  var firstDay=new Date(year,01,01);
  var diffDays = Math.round(Math.abs((firstDay.getTime() - today.getTime())/(oneDay)));
  var i=diffDays+1-6;
  for(var j=0;j<result.length;j++) {
    result[j]=i;
    i++;
  };
  return result;
};

var handleHarvestProjects=function(data,updatedList) {
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
      handleHarvestProjects(datafromH,list.map(list=>list.text));
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
  },

  handleHarvestTasks: function(req,res) {
    List.findOne({month:req.query.month,year:req.query.year,user:req.query.user})
      .exec(function(err,data) {
        priorityList=data.list;
          request.get({
            url: `https://camilliatree.harvestapp.com/daily/?slim=1`,
            headers: {
              Authorization: 'Basic '+authCode,
              ContentType: 'application/json',
              Accept: 'application/json'
            }
          }, function(err,response,body) {
                if(err) console.error(err);
                else {
                  console.log(res.statusCode);
                  var dayEntry=JSON.parse(body);
                  var tabbedObj=tabulateTime(dayEntry)[1];
                  var priorityObj=priorityList.reduce(function(obj,cur) {
                    obj[cur.text]=cur.order;
                    return obj;
                  },{});
                  var score=0;
                  for(var key in priorityObj) {
                    score+=Math.abs(tabbedObj[key]-priorityObj[key]);
                  }
                  res.status(200).send(score);
                }
          });

      })

  }
}