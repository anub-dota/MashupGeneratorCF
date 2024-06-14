import datetime
from os import environ
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains 
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait ,Select
import apiCalls
import time


# params={
#     "contestName":"test",
#     "contestDuration":120,
#     "startTime":"2024-06-14T10:00:00Z",
#     "users":["anu30bhab"],
#     "numberOfProblems":6,
#     "ratings":[800,900,1000,1200,1400,1500],
# }


def CreateContest(params):

    options = FirefoxOptions()
    options.add_argument("--headless")
    driver = webdriver.Firefox(options=options)
    # driver = webdriver.Firefox()
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
    print("Bot logged in successfully")

    driver.get("https://codeforces.com/mashup/new")
    driver.find_element(By.ID,"contestName").send_keys(params["contestName"])
    driver.find_element(By.ID,"contestDuration").send_keys(params["contestDuration"])

    # #adding the problems
    users = params["users"]
    ratings = params["ratings"]

    problems = apiCalls.getProblemList(users=users,ratingList=ratings)
    print("Problemset generated")

    for q in problems:
        questfield = WebDriverWait(driver,30).until(EC.element_to_be_clickable((By.NAME,"problemQuery")))
        questfield.send_keys(q + Keys.ENTER)
    time.sleep(1)
    driver.execute_script("window.scrollTo(0,window.innerHeight)")
    time.sleep(0.4)
    submitBtn = WebDriverWait(driver,30).until(EC.element_to_be_clickable((By.XPATH,"//input[@value='Create Mashup Contest']")))
    submitBtn.click()
    # setting contest date and time
    # defaulting date to today, and time to after 5 mins from now.. interface to select to be added in the frontend later
    date = datetime.datetime.today()

    edit = WebDriverWait(driver,30).until(EC.element_to_be_clickable((By.XPATH,"//a[text()='Edit']")))
    edit.click()

    startday = WebDriverWait(driver,30).until(EC.element_to_be_clickable((By.NAME,"startDay")))
    starttime = WebDriverWait(driver,30).until(EC.element_to_be_clickable((By.NAME,"startTime")))

    startday.send_keys(datetime.datetime.strptime(params["startTime"].split("T")[0],"%Y-%m-%d").strftime("%b/%d/%Y"))
    starttime.send_keys(params["startTime"].split("T")[1].split("Z")[0])  
    pttype = Select(driver.find_element(By.NAME,"participationType"))
    pttype.select_by_value("PERSONS_ONLY")
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    save = driver.find_element(By.ID,'generic')
    ActionChains(driver).click(on_element=save).perform()

    print("Date and time set")

    #inviting partcipants
    WebDriverWait(driver,30).until(EC.presence_of_element_located((By.CLASS_NAME,"datatable")))
    # time.sleep(0.4)
    driver.execute_script("window.scrollTo(0,window.innerHeight)")
    time.sleep(0.1)
    inviteBtn = WebDriverWait(driver,30).until(EC.presence_of_element_located((By.XPATH,"//input[@value='Manage invitations']")))
    ActionChains(driver).click(on_element=inviteBtn).perform()




    userinvite = WebDriverWait(driver,30).until(EC.presence_of_element_located((By.CLASS_NAME,"addInvitation")))
    ActionChains(driver).click(on_element=userinvite).perform()
    time.sleep(0.5)

    facebox =driver.find_element(By.ID,"facebox")

    # todo:to fix notify
    # notipri = facebox.find_element(By.XPATH,'//*[@id="notify"]')
    # # ActionChains(driver).move_to_element(notipri).click().perform()
    # notipri.click()

    textbox= facebox.find_element(By.ID,"handlesToInvite")
    textbox.click()
    # textbox = driver.switch_to.active_element
    for user in users:
        if apiCalls.isValidUser(user):
            textbox.send_keys(user + Keys.SPACE + Keys.ENTER)
    #print html content inside the textbox parent element

    time.sleep(0.5)
    sendInvite=facebox.find_element(By.CLASS_NAME,"submit")
    sendInvite.click()

    contest_link = WebDriverWait(driver,30).until(EC.presence_of_element_located((By.XPATH,"/html/body/div[6]/div[4]/div[2]/div[2]/div/p/a")))
    link = contest_link.get_attribute("href")
    print("SUCCESS")

    driver.quit()
    return link

# print(CreateContest(params))