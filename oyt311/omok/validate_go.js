( function () {

var validate = {}

//8방향
var vector = [
        {x:1,y:1,c:1},
        {x:1,y:0,c:4},
        {x:1,y:-1,c:3},
        {x:0,y:1,c:2},
        {x:0,y:-1,c:2},
        {x:-1 ,y:1 ,c:3},
        {x:-1 ,y:0 ,c:4},
        {x:-1 ,y:-1,c:1 }
]

Array.prototype.isUniqueList = function() {

    for (var i = 0; i < this.length - 1; i++)
    {   
        for (var j = 0; j <this.length; j++)
        {   
            if ( i != j)
            {   
                if (this[i] == this[j])
                {   
                return false
                }   
            }   
        }   

    }   

return true
}//end


validate.isThere = function (list_of_go,loc) {

    var isThere_index = 0

    if (list_of_go.length == 0)
        { 
            return 0;
        }

    list_of_go.some( function(val) {
                        if (val == (loc.x + 10000*loc.y))
                          { 
                              return true
                          }
                        else
                         {
                            isThere_index +=1
                             return false
                         }})

    if (isThere_index == list_of_go.length)
        {
            return 0
        }
    else
        {
            return 1
        }
} // end




validate.isWin = function(verify,x,y) {

var current_id = x + 10000*y
var current_color = verify[current_id]['fill']

for ( var i = 0; i< vector.length; i++ ) {

    var going = vector[i].x*5 + vector[i].y*10000*5
    var win = 1
    var win_rev = 1
    var current_id_rev;

//다음에 돌이 없으면 다른 방향으로 탐색
    if ( !(verify[current_id + going]))
        {continue;}

    var next_color = verify[current_id + going]['fill']

//다른 색의 돌이 나오거나 돌이 없을때까지 돌을 샘
    while ( next_color == current_color)
    {
        win += 1
        if ( !(verify[current_id + going*win]))
          {break;}
        next_color = verify[current_id + win*going]['fill']
    }
  
  console.log('win:'+ win) 
    if (win >= 5) {return true}

//중간부터 시작했을 수도 있으니, 돌의 끝에서부터 다시 샘
    current_id_rev = current_id + going*(win-1)
    try
    {next_color = verify[current_id_rev -going*win_rev]['fill'] }
    catch (err)
    {
        next_color = null
    }
    while ( next_color == current_color)
    {
        win_rev += 1
        if ( !(verify[current_id_rev - going*win_rev]))
          {break;}
        next_color = verify[current_id_rev - win_rev*going]['fill']
    }
   
   console.log('win_rev:'+win_rev) 
    if (  win_rev >=5 )
        {return true}

}

return false

} //end

validate.isThreeThree = function(verify,x,y) {

var isThreeThree_index = 0
var isFourFour_index = 0
var current_id = x + 10000*y
var current_color = verify[current_id]['fill'] == 'black' ? 'black' : null
var parallel_check = []

if (current_color)
{
    for (var i=0; i < vector.length; i++)
    {
        var go = vector[i].x*5 + vector[i].y*5*10000
        var sum = validate.isThreeCheckable(verify,current_id,go) 
        var anti_sum = validate.isThreeCheckable(verify,current_id,(-1)*go)

        //6목
        if (sum == 1)
        {
            if (anti_sum == 15) {return true}
        }
        if (sum == 3)
        {
            if (anti_sum == 7) {return true}
        }

        if ( sum == 3 || sum == 163 || sum == 5 || sum == 6) // 돌 2개
        {
            
            if ( anti_sum == 1) // 4-3
            {
                continue 
            }
            isThreeThree_index += 1 
            parallel_check.push(vector[i].c)
        }
        else if ( sum == 1 | sum == 81 | sum == 161 || sum == 241) //돌 1개 
        {
            if ( anti_sum == 1 | anti_sum == 81 | anti_sum == 161 || anti_sum == 241 || anti_sum==2 || anti_sum==162)
            {
                isThreeThree_index +=1;parallel_check.push(vector[i].c) 
            }
        }
        else if (sum ==2 || sum == 162) //돌 1개(떨어진것) 
        { 
            if (  anti_sum == 1 | anti_sum == 81 | anti_sum == 161 || anti_sum == 241) 
            {
                isThreeThree_index +=1; parallel_check.push(vector[i].c) 
            }
        }
        else if (sum ==11 || sum == 13 || sum == 14 || sum == 7 || sum ==167) //4-4 판별 
        {
            isFourFour_index+=1
        }

    }

    if (isThreeThree_index >=2 && isThreeThree_index <4)
    {
        if (parallel_check.isUniqueList()) // list가 unique하면 평행하지 않음 
        {   
            return true
        }
        else
        {
            return false
        }
    }

    else if (isThreeThree_index == 4) //십자가 모양
    {
        return true
    }
    else if (isFourFour_index >=2)
    {
        return true
    }
    else
    {
        return false
    }

}

} //end 

validate.isThreeCheckable = function(verify,current_id,go) {

    var list = []
    var color;
    var sum;
    for (var step=1; step<5; step++)
    {
        if (verify[current_id + step*go])
        {
            color = verify[current_id + step*go]['fill']
        }
        else
        {
            color = null
        }


        if (color)
        {
            if (color == 'black')
            {
                list.push(Math.pow(2,(step-1)))
            }
            else if (color == 'white')
            {
                list.push(20*Math.pow(2,(step-1)))
            }
        }
    }
    if (list.length)
    {
        sum = list.reduce( function(p,c) {return p + c})
    }
    else
    {
         sum = 0 
    }


    return sum;

    
}// end

this.validate = validate


})();
