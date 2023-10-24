JOE MMV LEE:

you have to use this commands AFTER PULLING the git
BEFORE you start Working.

#first step :
 Clone the project;
2. Install node_modules: `cd connectycube-js-samples/RNChat && npm install`
3. In order to use push notifications on Android, you need to create `google-services.json` file and copy it into project's `android/app` folder. Also, you need to update the `applicationId` in `android/app/build.gradle` to the one which is specified in `google-services.json`, so they must match. If you have no existing API project yet, the easiest way to go about in creating one is using this [step-by-step installation process](https://firebase.google.com/docs/android/setup)
4. Run `npm run ios` or `npm run android`.
4. In order for push notifications to work properly - it requires to do create a key/certificate and upload to ConnectyCube admin panel. The complete guide is available here https://developers.connectycube.com/reactnative/push-notifications
5. Run `npm run ios` or `npm run android`.

# Overview

XMPP-based real-time chat in React Native app demo project  

The complete guide is available here https://medium.com/@connectycube/xmpp-real-time-chat-in-react-native-8d6d5d23dd47

If you are interested in a complete cross-platform real-time Chat app - try
[ConnectyCube](https://connectycube.com/), it provides a [JavaScript SDK](https://developers.connectycube.com/js/) for real-time messaging and video calling apps which works across Browser, React Native, Native Script and Node.js environments.


The following code samples are available:

- [Chat code sample](https://github.com/ConnectyCube/connectycube-reactnative-samples/tree/master/RNChat)
- [Video Chat code sample](https://github.com/ConnectyCube/connectycube-reactnative-samples/tree/master/RNVideoChat)
- [File upload code sample](https://github.com/ConnectyCube/connectycube-reactnative-samples/tree/master/RNUploadFiles)


All the modern Chat features are supported:

* 1–1 messaging
* Group messaging
* Cross-platform
* Sent/Delivered/Read statuses
* ‘Is typing’ statuses
* File attachments
* Automatic push notifications to offline users
* Contact list
* Black list
* End-to-end Encryption via additional plugins
* Chat moderation (via Trust & Safety (TnS) feature)

[Sign Up today](https://connectycube.com/signup/)

# Issues

Please report any issues you find at [GitHub issues page](https://github.com/ConnectyCube/react-native-xmpp-demo/issues) or [contact ConnectyCube](https://connectycube.com/contact/) for better support 

# License

Code samples are released under the [MIT License](https://opensource.org/licenses/MIT).
