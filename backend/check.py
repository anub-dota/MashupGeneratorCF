from selenium import webdriver
from selenium.webdriver.chrome.service import Service

PATH = "C:\Program Files (x86)\chromedriver.exe"
service =Service(executable_path="C:\Program Files (x86)\chromedriver.exe")
driver = webdriver.Chrome(service=service)

driver.get("https://codeforces.com")