- do a find and replace for "forthepeople" and replace with your app name (should be 8 occurances) (make sure that vscode isn't hiding some matches living in .chalice)
- brew install httpie
- python createtable.py
- chalice local
- echo '{"name": "josiah"}' | http POST localhost:8000/items
- http GET localhost:8000/items
- chalice deploy
- source s3website.sh
