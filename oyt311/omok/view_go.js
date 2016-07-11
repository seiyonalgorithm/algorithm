(function() {

var view = {}


view.add_circ = function (x,y) {

    var where_id = x + 10000*y
    model.dic_add('verify_data',{'cx':x,'cy':y,'r':2,'fill':dol_color},where_id)
    if (validate.isThreeThree(model.call_data('verify_data'),x,y))
        {alert('invalid'); return false}

    model.nosql_push('circ_data',{'cx':x,'cy':y,'r':2,'fill':dol_color})
    model.nosql_push('list_go', where_id)

    model.backup_data('circ_data','circ_back')
    model.backup_data('list_go','list_back')

    dol_color = dol_color == 'black' ? 'white' : 'black' 

    view.refresh() 

    if( validate.isWin(verify_data,x,y))
       {alert('win')}

}

view.remove_circ = function (all) {

    if (all == 1)
    {
        model.init_list('circ_data')
        model.init_list('list_go')
        model.init_obj('verify_data')
    }
    else
    {
       model.pop('circ_data') //마지막만 제거
       var get_last_id = model.call_data('list_go')
       get_last_id = get_last_id[get_last_id.length-1] 
       model.pop('list_go')
       model.pop_obj('verify_data',get_last_id)
    }

    dol_color = dol_color == 'black' ? 'white' : 'black' 

    view.refresh()
}

view.refresh = function() {

    var call_d = model.call_data('circ_data')
    var selection =  d3.select('svg').selectAll('circle').data(call_d)

    selection.enter().append('circle')
            .attr('cx',function(d){return d.cx})
            .attr('cy',function(d){return d.cy})
            .attr('r',function(d){return d.r})
            .attr('fill',function(d){return d.fill})

    selection.exit().remove()
}



//백업
view.recover = function () {

    console.log('recover')
    model.recover_data('circ_data','circ_back')
    model.recover_data('list_go','list_back')

    view.refresh()
    }

  if (typeof define === "function" && define.amd) this.view = view, define(view); else if (typeof module === "object" && module.exports) module.exports = view; else this.view = view;
})()
