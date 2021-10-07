import asyncio
import time
import os

#declared Variables
num_player = 5
game_name = "FIVE CARD DRAW 5P"

'''
  Function to get the current timestamp
'''
def current_milli_time():
    return round(time.time() * 1000)

timestamp = current_milli_time()

'''
  Function that makes to run parallel execution of function with for loops
'''
def background(f):
    def wrapped(*args, **kwargs):
        return asyncio.get_event_loop().run_in_executor(None, f, *args, **kwargs)
    return wrapped

'''
   Function that is going to be executed parallelly
'''
@background
def run(x, game_name):
    os.environ['CYPRESS_screenshotsFolder'] = "cypress/reports/screenshots/{}".format(timestamp, x) 
    os.environ['CYPRESS_videosFolder'] = "cypress/reports/videos/{}".format(timestamp, x)
    cmd = 'cypress run --spec=./cypress/integration/login/login.spec.js --headless --browser electron --env email=bot{},password=user.password,game-name={}'.format(x, game_name)
    print(cmd)
    os.system(cmd)

'''
  Function to be called statically if needed
'''
def static_run(email, game_name):
    os.system('cypress run --spec=./cypress/integration/gameplay/five-card-draw-2-players/case-1/fcd-player1.spec.js --headless --browser chrome --env email={},password=user.password,game-name={}'.format(email, game_name))

def check_cypress():
    print("checking the files...")
    os.system('ls')
    print("checking cypress version...")
    os.system('cypress --version')
    print("verify cypress")
    os.system('cypress verify')

check_cypress()

'''
    Call parallel execution file until range of inputted number of player
'''
for x in range(num_player):
    run(x+1, game_name)


# to call static function
#static_run('bot4', game_name)
#cypress run --spec=**/fcd-player1.spec.js --headless --browser chrome --env email=bot1,password=user.password,game-name=FIVE_CARD_DRAW_2P