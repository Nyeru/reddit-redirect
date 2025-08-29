# Old Reddit Redirect (Chrome Extension)
> Note: Reddit has an inbuilt beta option for this behaviour in preferences.
> However, images in comments may display as and <image> link rather than the actual image

## Features
- Redirects `reddit.com` to `old.reddit.com`
- Toggleable 
- Restores visibility of images in comments that are normally hidden on old Reddit (Always on)

## Current Issues
- Redirecting i.redd.it, v.redd.it urls that are often in post titles
    - These should be ignored or redirected to the comments section.
    - E.g Post is of an image with format i.redd.it/*.jpeg 
    - Current Considerations:
        - Should redirect to the comment section as expected behaviour
        - Or exclude reddit.com/media from redirects (accessign i.redd.it redirects to reddit.com which flags this extension)

## Installation (Developer Mode)
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. Visit `https://reddit.com`  → it will redirect to `https://old.reddit.com`.

## 📜 License
This project is currently unlicensed and for personal/portfolio use.