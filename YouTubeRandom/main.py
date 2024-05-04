import random, requests, json
from googleapiclient.discovery import build

api_key = None
with open("secret.json") as f:
    api_key = json.load(f)["token"]

if api_key is None:
    print("Couldn't retrieve api key...")
    exit(1)

youtube = build('youtube', 'v3', developerKey=api_key)
word_site = "https://www.mit.edu/~ecprice/wordlist.10000"


def get_random_word():
    response = requests.get(word_site)
    words = response.content.splitlines()
    return random.choice(words).decode("utf-8")

random_word = get_random_word()
search_response = youtube.search().list(
    q=random_word,
    type='video',
    part='id',
    maxResults=50
).execute()

videos = search_response.get('items')
random_video = random.choice(videos)
video_id = random_video['id']['videoId']

print(f"Random YT Video : https://www.youtube.com/watch?v={video_id} (from '{random_word}')")
