
var Respond = {
    successfullyTo : function successfullyTo(res){
        return function(result){
            res.status(200).json(result);
        }
    },

    failureTo: function failureTo(res){
        return function(e){
            try{
                res.status(500).json({});
                console.error("ERROR:" + (e.stack || e));
            }catch(e){

            }
        }
    },

    rejectedTo: function rejectedTo(res){
        return function(){
            res.status(403).json({});
        }
    }
};

module.exports = Respond;