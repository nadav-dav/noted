

module.exports = {
    NOBODY: 99999999999999,
    NOTED_STAFF : 100,
    COMPANY_IT  : 20,
    NORMAL_USER : 10,
    lowerThan   : function(previlages){
        return previlages -1;
    },
    higherThan   : function(previlages){
        return previlages +1;
    }
};