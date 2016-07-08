import re
case = int(raw_input())

for i in range(case):
    m = re.search('(\d+) (\d+)',raw_input())
    N = int(m.group(1))
    L = int(m.group(2))
    cost = raw_input().split(' ')
    cost = filter( lambda x : not (x == ''),cost)
    cost = map(lambda x:float(x),cost)

    init_mean = sum(cost)/len(cost)
    pre_mean = init_mean
    if L is not N:
        for continue_day in range(L,N):
            for start_day in range(0,N - continue_day +1 ):
                clipped = cost[start_day : start_day+continue_day]
                mean = sum(clipped)/len(clipped) 
                mean = min(mean,pre_mean) 
                pre_mean = mean
        print '%.11f'%mean 
    else:
        print '%.11f'%pre_mean 
     





