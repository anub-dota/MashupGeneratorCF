import datetime
from os import environ
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains 
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait ,Select
import apiCalls
import time

driver = webdriver.Firefox()
driver.get('https://codeforces.com/enter')

load_dotenv()
botUsername=environ.get('BOT_USERNAME')
botPassword=environ.get('BOT_PASSWORD')
print(botUsername,botPassword)
username = driver.find_element(By.ID,"handleOrEmail")
passwd = driver.find_element(By.ID,"password")
submitBtn = driver.find_element(By.CLASS_NAME,"submit")

# wait till loaded in
WebDriverWait(driver,10).until(EC.presence_of_element_located((By.ID,"handleOrEmail")))
username.send_keys(botUsername)
passwd.send_keys(botPassword)
ActionChains(driver).click(on_element=submitBtn).perform()

WebDriverWait(driver,10).until_not(EC.presence_of_element_located((By.CLASS_NAME,"submit")))

driver.get("https://codeforces.com/mashup/new")
driver.find_element(By.ID,"contestName").send_keys(datetime.datetime.now().strftime("%Y%m%d%H%M"))
driver.find_element(By.ID,"contestDuration").send_keys(120)

# #adding the problems
users =['bobman90','anu30bhab']
ratings = [800,900,1000,1200,1400,1500]

problems = apiCalls.getProblemList(users=users,ratingList=ratings)

for q in problems:
    questfield = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.NAME,"problemQuery")))
    questfield.send_keys(q + Keys.ENTER)
time.sleep(1)
driver.execute_script("window.scrollTo(0,window.innerHeight)")
time.sleep(0.4)
submitBtn = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH,"//input[@value='Create Mashup Contest']")))
ActionChains(driver).click(on_element=submitBtn).perform()

# setting contest date and time
# defaulting date to today, and time to after 5 mins from now.. interface to select to be added in the frontend later
date = datetime.datetime.today()

edit = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH,"//a[text()='Edit']")))
ActionChains(driver).click(on_element=edit).perform()

startday = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.NAME,"startDay")))
starttime = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.NAME,"startTime")))
startday.send_keys(date.strftime("%b/%d/%Y"))
starttime.send_keys((date + datetime.timedelta(minutes=5)).strftime("%H:%M"))
pttype = Select(driver.find_element(By.NAME,"participationType"))
pttype.select_by_value("PERSONS_ONLY")
driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
save = driver.find_element(By.ID,'generic')
ActionChains(driver).click(on_element=save).perform()



# #inviting partcipants
# WebDriverWait(driver,10).until(EC.presence_of_element_located((By.CLASS_NAME,"datatable")))
# time.sleep(0.4)
# driver.execute_script("window.scrollTo(0,window.innerHeight)")
# time.sleep(0.1)
# inviteBtn = WebDriverWait(driver,10).until(EC.presence_of_element_located((By.XPATH,"//input[@value='Manage invitations']")))
# ActionChains(driver).click(on_element=inviteBtn).perform()

# userinvite = WebDriverWait(driver,10).until(EC.presence_of_element_located((By.CLASS_NAME,"addInvitation")))
# ActionChains(driver).click(on_element=userinvite).perform()

# ##check username validity and enter

# facebox = driver.find_element(By.ID,"facebox");
# driver.execute_script("arguments[0].style.display= 'block';",facebox)

# time.sleep(2)
# privateMesg = WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.ID,"notify")))
# ActionChains(driver).click(on_element=privateMesg).perform()

# time.sleep(0.2)
# textarea = WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.XPATH,"//textarea[@id='handlesToInvite']")))
# time.sleep(0.4)
# ActionChains(driver).move_to_element(textarea).click(on_element=textarea).perform()
# for user in users:
#     if apiCalls.isValidUser(user):
#         textarea.send_keys(user + Keys.SPACE + Keys.ENTER)


# sendInvite = driver.find_element(By.XPATH,"//input[@value='Invite']")
# ActionChains(driver).click(on_element=sendInvite).perform()
time.sleep(5)
print("done")
driver.quit()

