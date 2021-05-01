
![bucketify-logo](src/images/bucketify_logo.png)  

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
## About Bucketify
Bucketify(https://www.bucketify.net/) is a cloud music player.
This makes you can play your favorite music stored in Amazon S3 anytime, anywhere.

![bucketify-demo](src/images/bucketify_demo_pc.gif)  


## Features
- Streaming playback
  - Makes you can streaming playback your favorite music in s3 bucket. 
  - It is also can mobile background playing.
- Auto generated libraries
  - Generates libraries by tracks, artist(🚧), album(🚧).
  - Allowed file extensions are only 'mp3' or 'm4a'.
- Playlists stored on the cloud(🚧)
  - Makes you can store playlists on the cloud, and play on any device, anytime, anywhere.

## Prerequisites
- Your AWS Account.
- Your S3 Bucket to store audio files.
- IAM User and IAM Policy that can access your buckets.

## Architecture
Bucketify manages **only your audio file metadata**.
  
![bucketify-how-it-work](src/images/architecture.drawio.svg)  

## License
This project is licensed under the MIT License.

[※日本語版README.mdはこちら](doc/../docs/README-ja.md)