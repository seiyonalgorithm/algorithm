#include <vector>
#include <iostream>
#include <fstream>

using namespace std;

int dx[3] = {-1,0,1};
int dy[3] = {-1,0,1};
string argument = "cat";

vector< vector<char> > readfile () {

string line;
ifstream myfile("board");

vector< vector<char> > board;
vector<char> row;

    while (getline(myfile,line))
    {
        for (int i = 0; i < line.size(); ++i)
            if ( line[i] != ' ')
                row.push_back(line[i]);
        
        board.push_back(row);
        row.clear();
    }


return board;
}//end

bool isBoard(int x, int y, char toCheck, vector< vector<char> > board){
    if (board[x][y] == toCheck)
        return true;
    else
        return false;
}//end



bool isThere(int x, int y,string word,vector< vector <char> > board,int size) {

char word_check = word[word.size() - size];



for (int i = 0 ; i < sizeof(dx)/4; ++i)
    for (int j=0; j< sizeof(dy)/4; ++j)
     {
         if (i == 1 && j == 1)
             continue;
         if (size == 0)
             return true;
         if (isBoard(x,y,word_check,board))
         {
            size --;
            if ( (x + dx[i]) >= 0 && (x +dx[i]) <=3 && (y + dy[i]) >=0 && (y +dy[i]) <=4)
                isThere(x +dx[i], y+ dy[i],word,board,size);
         }
     }

return false;
}//end

int main(int argc, char *argv[]){
   
   vector< vector<char> > board = readfile(); 
   bool istrue = false;

   for (int x = 0; x <4; ++x)
       for (int y = 0; y < 5; ++y)
           istrue += isThere(x,y,argument,board,3);

    cout << istrue << endl;

}
