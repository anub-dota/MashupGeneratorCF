import requests
import random

def getFromCF(url,params=None):
    try:
        response = requests.get(url,params=params)
        if response.status_code==200:
            return response.json()
        else:
            print(f"Error in parameters:{params}")
            return -1
    except:
        print("No internet connection")
        return -1


def getAllProblems():
    allProblems = getFromCF("https://codeforces.com/api/problemset.problems")
    if allProblems !=-1:
        condensedProblems =[]
        for problem in allProblems['result']['problems']:
            try:
                condensedProblems.append({'id':str(problem['contestId']) + problem['index'] , 'rating':problem['rating']})
            except KeyError:
                # print(str(problem['contestId']) + problem['index'])
                continue
        
        return condensedProblems
    
    return -1
    

def getSolvedByUser(user):
    solvedByUser = getFromCF("https://codeforces.com/api/user.status",{'handle':user})
    if solvedByUser==-1:
        print(f"User {user} not found")
        return []
    
    userSolvesCondensed=[]
    for problem in solvedByUser['result']:
            try:
                if problem['verdict']=="OK":
                    userSolvesCondensed.append({'id':str(problem['problem']['contestId']) + problem['problem']['index'] , 'rating':problem['problem']['rating']})
            except KeyError:
                # print(str(problem['contestId']) + problem['index'])
                continue 

    return userSolvesCondensed

def getSolvedByGroup(users): # users is a list of strings
    solvedByGroup =[]
    for user in users:
        solvedByGroup.extend(getSolvedByUser(user))

    solvedByGroup = list({problem['id']:problem for problem in solvedByGroup}.values())

    return solvedByGroup


def getProblemList(users,ratingList): # ratingList = [800,900,1000...]
    allProblems = getAllProblems()
    if allProblems == -1:
        return []
    
    problemToRemove = getSolvedByGroup(users)

    for problem in problemToRemove:
        try: 
            allProblems.remove(problem)
        except ValueError:
            continue

    problemList=[]
    for rating in ratingList:
        tmplist = []

        for problem in allProblems:
            if problem['rating']==rating:
                tmplist.append(problem['id'])
        problemList.append(random.choice(tmplist))
    
    return problemList

def isValidUser(user):
    userdata=getFromCF("https://codeforces.com/api/user.status",{'handle':user})
    if userdata == -1:
        return False
    else:
        return True


