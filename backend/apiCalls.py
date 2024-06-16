import requests
import random
import json
import os
from datetime import datetime,timedelta

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


def save_data_to_file(filename,data):
    with open(filename, 'w') as f:
        json.dump(data, f)

def load_data_from_file(filename):
    with open(filename, 'r') as f:
        content = json.load(f)
        return content

def is_file_recent(filename,days=1):
    if os.path.exists(filename):
        file_time = datetime.fromtimestamp(os.path.getmtime(filename))
        if datetime.now() - file_time < timedelta(days=days):
            return True
    return False

def getAllProblems():
    allProblems = []
    if(is_file_recent("all_problems.json")):
        allProblems=load_data_from_file("all_problems.json")
    else:
        allProblems = getFromCF("https://codeforces.com/api/problemset.problems")
        save_data_to_file("all_problems.json",allProblems)
    if allProblems !=-1:
        condensedProblems =[]
        for problem in allProblems['result']['problems']:
            try:
                if len(problem['tags']) > 0 and problem['tags'][0] == '*special' : 
                    continue
                # condensedProblems.append({'tags' : problem['tags']})
                condensedProblems.append({'id':str(problem['contestId']) + problem['index'] , 'rating':problem['rating']})
            except KeyError:
                # print(str(problem['contestId']) + problem['index'])
                continue
        
        return condensedProblems
    
    return -1

def getAllUsers():
    #implement save to file similar to getallproblems
    all_users = []
    if(is_file_recent("all_users.json")):
        all_users=load_data_from_file("all_users.json")
    else:
        allUsers = getFromCF("https://codeforces.com/api/user.ratedList?includeRetired=false")
        all_users = [user["handle"] for user in allUsers['result']]
        save_data_to_file("all_users.json",all_users)
    # print(all_users[:10])
    # if allUsers !=-1:

    return all_users

def findMatchingNames(name):
    allUsers = getAllUsers()
    if allUsers == -1:
        return []
    matchingNames = [user for user in allUsers if name.lower() in user.lower()]
    # print(matchingNames)
    return matchingNames[:10]

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
def colorFromRating(rating):
    if rating<1200:
        return "gray"
    elif rating<1400:
        return "green"
    elif rating<1600:
        return "cyan"
    elif rating<1900:
        return "blue"
    elif rating<2100:
        return "violet"
    elif rating<2400:
        return "orange"
    elif rating<3000:
        return "red"
    else:
        return "legendary"

def userData(user):
    userdata = getFromCF("https://codeforces.com/api/user.info",{'handles':user})
    # print(userdata)
    # print(user)
    if userdata == -1:
        return -1
    else:
        return {"name":user,"title":userdata['result'][0]["rank"],"color":colorFromRating(userdata['result'][0]["rating"])}


# print(isValidUser('akkafakka'))
# print(getSolvedByUser('akkafakka'))
# problems = getAllProblems()
# if len(problems) > 0 : save_data_to_file(problems)