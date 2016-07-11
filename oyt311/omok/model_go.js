( function() {

var empty ;
var model = {}

var _this = this

// _this[backup] = _this[original]은 call by reference의 효과를 지닌다
// 따라서 이런 방식으로 복사하여 call by value를 고수한다.
var call_by_value_array = function (list_a, list_b) {
    _this[list_a] = new Array()
    _this[list_b].forEach( function(val) {
        _this[list_a].push(val) })
}

model.nosql_push = function(list,input_data) {
    _this[list].push(input_data) }

model.dic_add = function(dic,input_data,id) {
    _this[dic][id] = input_data}

model.incr = function(data,incr) {
    if ( Number.isInteger(data) && Number.isInteger(incr))
        {_this[data] += incr }
    else
        {console.log("error:data or incr is not integer") }
}

model.pop = function(list) {
    _this[list].pop() }

model.init_list = function(list) {
    _this[list]  = [] }
model.init_obj = function(obj) {
    _this[obj]  = {} }

model.pop_obj = function(obj,key) {
    delete _this[obj][key] }

model.backup_data = function (original,backup) {
    call_by_value_array(backup,original)
      }

model.recover_data = function(original,backup) {
    call_by_value_array(original,backup)
}


model.call_data = function(called_data) {
    return _this[called_data]}


  if (typeof define === "function" && define.amd) this.model = model, define(model); else if (typeof module === "object" && module.exports) module.exports = model; else this.model = model;


}) ();
