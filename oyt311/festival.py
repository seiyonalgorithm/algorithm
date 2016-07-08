#-*- coding:utf-8 -*-
### algospot의 FESTIVAL 문제
'''
가장 무식한 방법으로 풀었음. 겨우 정답.(pypy로 속도 올려서 겨우 시간초과 안당함ㅋㅋㅋ)

개선할 사항; 
    대부분의 사람들이 기울기? 를 이용해서 푼 것 같은데, 그 알고리즘을 이해하고 적용해보기
    cpp로도 다시한번 작성해보기.
    정규식 말고 대부분의 사람이 parsing한 방법대로 해보고 속도가 얼마나 빨라지나 체험해보기
'''


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
     





