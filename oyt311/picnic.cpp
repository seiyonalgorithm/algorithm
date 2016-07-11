
#include <iostream>
#include <vector>
#include <new>
#include <fstream>
#include <sstream>
using namespace std;

int ** areFriends (vector<int> inputInfo, int numCouple) {

    int**  friendMap = new int*[numCouple];

    for (int i = 1; i < inputInfo.size(); i += 2*i +1)
       friendMap[inputInfo[i-1]][inputInfo[i]] = 1; 

    return friendMap;

}

int main () {

string line;
ifstream myfile("couple");

int cases = 0;
vector<int> inputInfo;
vector<int> header;

getline(myfile,line);

cases = stoi(line);

for (int i = 0; i < 3; ++i) {

    getline(myfile,line);
    string substr = "";
    stringstream ss(line);

    while (ss.good()) {
        getline(ss,substr,' ');

        try{ 
        header.push_back(stoi(substr));
        }
        catch (...) {
             }
    }

    getline(myfile,line);
    substr = "";
    stringstream kk(line);

    while (kk.good()) {
        getline(kk,substr,' ');
        try{
           inputInfo.push_back(stoi(substr));
        }
        catch(...) {}
    }

    for (int j = 0; j < header.size(); ++j)
        cout << header[j] <<endl;
    
    for (int k = 0; k < inputInfo.size(); ++k)
        cout << inputInfo[k] <<endl;

}



}
